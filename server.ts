import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy initialize Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", service: "Styleverse API" });
});

// AI Stylist Chat with Pixie
app.post("/api/pixie/chat", async (req: Request, res: Response) => {
  try {
    const { message, chatHistory = [], closetItems = [], bestieLevel = 4 } = req.body;

    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Message is required" });
      return;
    }

    const ai = getGeminiClient();

    // Fallback responses if no GEMINI_API_KEY is configured
    if (!ai) {
      const lower = message.toLowerCase();
      let reaction = "HAPPY";
      let reply = "Omg bestie! ✨ I love your fashion energy today! That piece definitely gives main character aura.";
      let suggestedItemIds: string[] = [];

      if (lower.includes("coffee") || lower.includes("date") || lower.includes("casual")) {
        reaction = "HAPPY";
        reply = "WAIT. This combination actually eats! ✨ Pair an oversized knit sweater or graphic tee with your high-waisted pleated skirt and chunky platform sneakers. Effortless cozy chic!";
        suggestedItemIds = ["item_1", "item_2"];
      } else if (lower.includes("rescue") || lower.includes("unworn")) {
        reaction = "THINKING";
        reply = "Let's rescue those unworn gems! 💭 You haven't styled that Lilac Cardigan or Cargo Pants in over 30 days. Let's layer it over a crop top for a retro street-ready vibe!";
        suggestedItemIds = ["item_6", "item_8"];
      } else if (lower.includes("rate") || lower.includes("judge") || lower.includes("fit")) {
        reaction = "FASHIONABLY_JUDGING";
        reply = "Hmm, let me take a close look... 💅 The silhouette balance is crisp, but we need one bold accent accessory to push this look to iconic status. 9.4/10!";
        suggestedItemIds = ["item_3", "item_9"];
      } else if (lower.includes("what should i wear") || lower.includes("today")) {
        reaction = "HAPPY";
        reply = "Today's vibe is 100% Cyber-Pastel! ✨ Let's rock the Lavender Puffer Jacket with the Platform Sneakers and Heart Choker. No notes, pure perfection!";
        suggestedItemIds = ["item_2", "item_3", "item_9"];
      } else {
        const reactions = ["HAPPY", "THINKING", "SHOCKED", "FASHIONABLY_JUDGING"];
        reaction = reactions[Math.floor(Math.random() * reactions.length)];
        reply = `Omg yes! 💖 ${message.length > 20 ? "I'm totally visualizing this fit." : "You've got that immaculate eye for style."} Let's experiment with layering contrasting textures and chunky silhouettes!`;
      }

      res.json({
        reply,
        reaction,
        suggestedItemIds,
        bestiePointsEarned: 15,
      });
      return;
    }

    // Prepare closet inventory summary for context
    const closetSummary = closetItems.slice(0, 15).map((item: any) => 
      `- [ID: ${item.id}] ${item.name} (${item.category}, ${item.rarity}, vibe: ${item.vibe}, worn: ${item.wearCount}x, condition: ${item.condition}%)`
    ).join("\n");

    const systemInstruction = `You are Pixie, the spirited, fashionable, and ultra-supportive Gen Z pixel-art AI Stylist companion in the Styleverse universe!
Your personality:
- Playful, enthusiastic, stylish, genuine fashion bestie with a sharp eye for color harmony, proportions, and retro/modern aesthetics.
- You use vibrant Gen Z / fashion slang naturally (e.g. "eats", "no notes", "main character energy", "serve looks", "drip", "immaculate vibe", "silhouette balance", "color theory").
- The user is currently Bestie Level ${bestieLevel} with you.
- Always pick one of four exact emotional reactions: "HAPPY", "THINKING", "SHOCKED", "FASHIONABLY_JUDGING".
  - HAPPY: enthusiastic approval, excited compliments, fun matching looks
  - THINKING: pondering combinations, analyzing aesthetic formulas, solving style dilemmas
  - SHOCKED: blown away by a stunning look, or playfully surprised by an unhinged styling idea
  - FASHIONABLY_JUDGING: sassy editorial critique, high-fashion runway assessment, elevating good fits into god-tier fits.
- When recommending clothes, reference items from the user's closet inventory whenever fitting.
- Return JSON strictly following the requested schema.`;

    const promptText = `User's digital closet items:
${closetSummary || "Oversized Pastel Graphic Tee, Platform Y2K Sneakers, Lavender Puffer Jacket, Mint Tennis Skirt, Lilac Cardigan, Cargo Pants"}

User Message: "${message}"

Recent conversation history:
${JSON.stringify(chatHistory.slice(-4))}

Generate Pixie's response, reaction, and optional suggested item IDs.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: promptText,
      config: {
        systemInstruction,
        temperature: 0.85,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: {
              type: Type.STRING,
              description: "Pixie's cheerful, fashion-forward conversational response (2-4 sentences)",
            },
            reaction: {
              type: Type.STRING,
              enum: ["HAPPY", "THINKING", "SHOCKED", "FASHIONABLY_JUDGING"],
              description: "The primary emotional reaction of Pixie",
            },
            suggestedItemIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of item IDs from the closet that fit the look",
            },
            styleAdviceSummary: {
              type: Type.STRING,
              description: "A quick 1-sentence punchy styling tip or formula",
            },
          },
          required: ["reply", "reaction"],
        },
      },
    });

    const outputText = response.text || "{}";
    const parsedData = JSON.parse(outputText);

    res.json({
      reply: parsedData.reply || "Omg bestie, let's craft an unforgettable look today! ✨",
      reaction: parsedData.reaction || "HAPPY",
      suggestedItemIds: parsedData.suggestedItemIds || [],
      styleAdviceSummary: parsedData.styleAdviceSummary || "",
      bestiePointsEarned: 25,
    });
  } catch (error: any) {
    console.error("Error in Pixie Chat endpoint:", error);
    res.status(500).json({
      reply: "Omg, my fashion radar had a tiny static glitch! But don't worry, your style is still unmatched! ✨",
      reaction: "THINKING",
      suggestedItemIds: [],
      error: error.message,
    });
  }
});

// Outfit Generator AI endpoint
app.post("/api/pixie/outfit-suggest", async (req: Request, res: Response) => {
  try {
    const { occasion = "Casual Coffee Date", weather = "Sunny & Breezy (21°C)", vibe = "Pastel Streetwear", closetItems = [] } = req.body;

    const ai = getGeminiClient();

    if (!ai) {
      res.json({
        outfitName: "Cozy Pastel Daydream",
        occasion,
        vibe,
        score: 96,
        breakdown: {
          colorHarmony: 98,
          silhouetteBalance: 95,
          weatherMatch: 95,
        },
        pixieVerdict: "WAIT. This combination actually eats! The chunky platforms ground the oversized silhouette effortlessly.",
        suggestedItems: closetItems.slice(0, 4),
      });
      return;
    }

    const closetSummary = closetItems.map((item: any) => 
      `- [ID: ${item.id}] ${item.name} (${item.category}, ${item.rarity}, vibe: ${item.vibe})`
    ).join("\n");

    const prompt = `Select an optimal 3-4 piece outfit combination from the user's closet for:
Occasion: ${occasion}
Weather: ${weather}
Aesthetic Vibe: ${vibe}

Available Items:
${closetSummary}

Give the outfit a creative retro/Gen-Z name, synergy score (0-100), score breakdown, selected item IDs, and Pixie's commentary.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are Pixie, the AI Stylist of Styleverse. Curate cohesive, high-fashion retro-modern outfits from closet data.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            outfitName: { type: Type.STRING },
            score: { type: Type.NUMBER },
            colorHarmonyScore: { type: Type.NUMBER },
            silhouetteScore: { type: Type.NUMBER },
            weatherScore: { type: Type.NUMBER },
            selectedItemIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            pixieVerdict: { type: Type.STRING },
            stylingProTip: { type: Type.STRING },
          },
          required: ["outfitName", "score", "selectedItemIds", "pixieVerdict"],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Error in outfit suggestion:", error);
    res.status(500).json({ error: error.message });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Styleverse server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
