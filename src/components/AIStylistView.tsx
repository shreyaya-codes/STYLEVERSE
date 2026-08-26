import React, { useState, useRef, useEffect } from 'react';
import { PixieReaction, ChatMessage, ClothingItem, UserProfile } from '../types';
import { PixieExpression, PixieBadge, PixieFullBody } from './PixieSprite';
import { PixelClothingArtwork } from './PixelClothingItemArtwork';
import { Send, Sparkles, Wand2, RefreshCw, Flame, Heart, Volume2, Bot, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AIStylistViewProps {
  userProfile: UserProfile;
  closetItems: ClothingItem[];
  onAddSp: (amount: number) => void;
  onAddBestieXp: (amount: number) => void;
  onWearOutfitItems?: (itemIds: string[]) => void;
}

export const AIStylistView: React.FC<AIStylistViewProps> = ({
  userProfile,
  closetItems,
  onAddSp,
  onAddBestieXp,
  onWearOutfitItems,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_1',
      sender: 'pixie',
      text: 'Omg hi bestie! ✨ Ready to serve some looks today? I was just organizing your digital closet.',
      timestamp: '10:42 AM',
      reaction: 'HAPPY',
    },
    {
      id: 'msg_2',
      sender: 'user',
      text: 'I need an outfit for a casual coffee date.',
      timestamp: '10:43 AM',
    },
    {
      id: 'msg_3',
      sender: 'pixie',
      text: 'WAIT. This combination actually eats. Let me pull up that oversized knit sweater you got last week.',
      timestamp: '10:43 AM',
      reaction: 'HAPPY',
      suggestedItemIds: ['item_1', 'item_4', 'item_2'],
      outfitDetails: {
        name: 'Cozy Cafe Pastels',
        score: 96,
        items: ['Oversized Pastel Graphic Tee', 'Mint Pleated Tennis Skirt', 'Platform Chunky Y2K Sneakers'],
      },
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [currentReaction, setCurrentReaction] = useState<PixieReaction>('HAPPY');
  const [isLoading, setIsLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Quick suggestion pills matching Image 9
  const promptSuggestions = [
    { label: 'What should I wear?', bg: 'bg-[#a4f0e9] text-[#00201e] border-[#136964]' },
    { label: 'Style this top', bg: 'bg-[#ffd9e2] text-[#3e001e] border-[#6c2040]' },
    { label: 'Rescue my closet', bg: 'bg-[#d3bcfc] text-[#230f45] border-[#453268]' },
    { label: 'Rate my current drip', bg: 'bg-[#ffd54f] text-[#3e001e] border-[#180065]' },
    { label: 'Y2K Cyber aesthetic look', bg: 'bg-[#f0ebff] text-[#180065] border-[#180065]' },
  ];

  // Auto-scroll chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage.trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);
    setCurrentReaction('THINKING');

    try {
      const res = await fetch('/api/pixie/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          chatHistory: messages.slice(-6).map((m) => ({ role: m.sender, content: m.text })),
          closetItems,
          bestieLevel: userProfile.bestieLevel,
        }),
      });

      const data = await res.json();
      const reaction: PixieReaction = data.reaction || 'HAPPY';
      setCurrentReaction(reaction);

      const pixieMsg: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        sender: 'pixie',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        reaction,
        suggestedItemIds: data.suggestedItemIds,
      };

      setMessages((prev) => [...prev, pixieMsg]);
      onAddBestieXp(data.bestiePointsEarned || 20);
      onAddSp(15);
    } catch (err) {
      console.error(err);
      const fallbackMsg: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        sender: 'pixie',
        text: 'That silhouette is iconic! Layer the cropped jacket over a high-waist skirt for pure retro energy! ✨',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        reaction: 'HAPPY',
        suggestedItemIds: ['item_3', 'item_4'],
      };
      setMessages((prev) => [...prev, fallbackMsg]);
      setCurrentReaction('HAPPY');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWearLook = (itemIds?: string[]) => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#a4f0e9', '#d3bcfc', '#ffd9e2', '#ffd54f'],
    });
    onAddSp(50);
    onAddBestieXp(30);
    if (itemIds && onWearOutfitItems) {
      onWearOutfitItems(itemIds);
    }
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row gap-6 p-4 md:p-8 max-w-7xl mx-auto w-full relative">
      {/* Left Panel: Pixie Stage & Bestie Meter (From Image 9) */}
      <div className="w-full lg:w-80 shrink-0 flex flex-col gap-5">
        {/* Bestie Level Card (From Image 9 top left) */}
        <div className="bg-white rounded-3xl pixel-border pixel-box-shadow p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-heading font-extrabold text-sm text-[#180065]">
              Bestie Level
            </span>
            <span className="font-mono-pixel text-xs font-bold px-2 py-0.5 rounded-full bg-[#f0ebff] text-[#68548d] pixel-border-2">
              Lvl {userProfile.bestieLevel}
            </span>
          </div>

          {/* Striped XP Progress Bar (From Image 9) */}
          <div className="w-full h-4 bg-[#e5deff] rounded-full pixel-border-2 overflow-hidden p-0.5">
            <div
              className="h-full rounded-full striped-bar-mint transition-all duration-500"
              style={{ width: `${(userProfile.bestieXp / userProfile.bestieMaxXp) * 100}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono-pixel text-[#49454f]">
            <span>XP Progress</span>
            <span className="font-bold text-[#136964]">
              {userProfile.bestieXp} / {userProfile.bestieMaxXp} XP
            </span>
          </div>
        </div>

        {/* Pixie Character Showcase Stage */}
        <div className="bg-white rounded-3xl pixel-border pixel-box-shadow p-5 flex flex-col items-center gap-4 relative overflow-hidden">
          <div className="absolute top-3 left-3 px-2 py-0.5 rounded-lg bg-[#ffd9e2] text-[#6c2040] text-[10px] font-mono-pixel font-bold">
            Live AI Companion
          </div>

          {/* Large Expression Portrait or Full Body */}
          <div className="mt-4 flex flex-col items-center">
            <PixieExpression
              reaction={currentReaction}
              size={150}
              showLabel={true}
            />
          </div>

          {/* Emotion Quick Switcher (From Image 8 character sheet) */}
          <div className="w-full pt-3 border-t-2 border-[#f0ebff] flex flex-col gap-2">
            <span className="font-mono-pixel text-[10px] font-bold text-[#7a7580] uppercase tracking-wider text-center">
              Pixie Expression Sheet
            </span>
            <div className="grid grid-cols-2 gap-1.5 font-mono-pixel text-[10px]">
              {(['HAPPY', 'THINKING', 'SHOCKED', 'FASHIONABLY_JUDGING'] as PixieReaction[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setCurrentReaction(r)}
                  className={`py-1.5 px-2 rounded-xl pixel-border-2 font-bold transition-all text-center truncate ${
                    currentReaction === r
                      ? 'bg-[#180065] text-white'
                      : 'bg-[#fcf8ff] text-[#180065] hover:bg-[#f0ebff]'
                  }`}
                >
                  {r === 'FASHIONABLY_JUDGING' ? 'JUDGING' : r}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Interactive Chat with Pixie (From Image 9) */}
      <div className="flex-1 bg-white rounded-3xl pixel-border pixel-box-shadow p-4 md:p-6 flex flex-col justify-between min-h-[580px]">
        {/* Chat Stream Window */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[460px]">
          {messages.map((msg) => {
            const isPixie = msg.sender === 'pixie';

            return (
              <div
                key={msg.id}
                className={`flex gap-3 items-start ${isPixie ? 'justify-start' : 'justify-end'}`}
              >
                {/* Pixie Avatar Icon */}
                {isPixie && (
                  <div className="shrink-0 mt-0.5">
                    <PixieBadge size={38} />
                  </div>
                )}

                {/* Message Bubble Container */}
                <div
                  className={`max-w-md md:max-w-lg p-4 rounded-2xl pixel-border transition-all ${
                    isPixie
                      ? 'bg-[#ffffff] text-[#180065] pixel-box-shadow-sm'
                      : 'bg-[#b39ddb] text-[#180065] pixel-box-shadow-lavender font-semibold'
                  }`}
                >
                  <p className="font-body text-sm md:text-base leading-relaxed">
                    {msg.text}
                  </p>

                  {/* If Outfit is suggested */}
                  {msg.suggestedItemIds && msg.suggestedItemIds.length > 0 && (
                    <div className="mt-3.5 pt-3 border-t-2 border-[#f0ebff] flex flex-col gap-2.5">
                      <div className="flex items-center justify-between text-xs font-mono-pixel font-bold text-[#68548d]">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-[#ff4081]" />
                          Curated Outfit Look
                        </span>
                        {msg.outfitDetails?.score && (
                          <span className="px-2 py-0.5 rounded-md bg-[#a4f0e9] text-[#00201e]">
                            {msg.outfitDetails.score}% Synergy
                          </span>
                        )}
                      </div>

                      {/* Mini item previews */}
                      <div className="flex flex-wrap gap-2">
                        {msg.suggestedItemIds.map((itemId) => {
                          const item = closetItems.find((i) => i.id === itemId);
                          if (!item) return null;
                          return (
                            <div
                              key={itemId}
                              className="flex items-center gap-2 p-2 bg-[#fcf8ff] rounded-xl pixel-border-2"
                            >
                              <div className="w-8 h-8 rounded-lg bg-white pixel-border-2 flex items-center justify-center">
                                <PixelClothingArtwork
                                  imageType={item.imageType}
                                  color={item.color}
                                  size={24}
                                />
                              </div>
                              <div className="flex flex-col">
                                <span className="font-heading font-bold text-xs text-[#180065] truncate max-w-[120px]">
                                  {item.name}
                                </span>
                                <span className="font-mono-pixel text-[10px] text-[#7a7580]">
                                  {item.rarity}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => handleWearLook(msg.suggestedItemIds)}
                        className="mt-1 w-full py-2 bg-[#a4f0e9] pixel-border-2 rounded-xl text-xs font-mono-pixel font-bold text-[#00201e] hover:bg-[#89d4cd] transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Wear this Look (+50 SP & +30 XP)</span>
                      </button>
                    </div>
                  )}

                  <span className="block text-[10px] font-mono-pixel text-[#7a7580] mt-1 text-right">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Loading bubble */}
          {isLoading && (
            <div className="flex gap-3 items-start">
              <PixieBadge size={38} />
              <div className="p-3.5 bg-white rounded-2xl pixel-border pixel-box-shadow-sm flex items-center gap-2 text-xs font-mono-pixel text-[#68548d]">
                <div className="w-2 h-2 rounded-full bg-[#9575cd] animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-[#9575cd] animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-[#9575cd] animate-bounce [animation-delay:0.4s]" />
                <span>Pixie is styling...</span>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Bottom Section: Quick Pills & Inset Input (From Image 9) */}
        <div className="mt-4 pt-3 border-t-2 border-[#f0ebff] flex flex-col gap-3">
          {/* Quick Action Suggestion Pills (From Image 9) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {promptSuggestions.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(item.label)}
                className={`px-3.5 py-1.5 rounded-full font-mono-pixel text-xs font-bold pixel-border-2 whitespace-nowrap hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all ${item.bg}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Input Box & Send Button (From Image 9) */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Tell Pixie what you need..."
              className="flex-1 px-4 py-3 bg-[#fcf8ff] rounded-2xl pixel-input font-body text-sm text-[#180065] placeholder:text-[#7a7580] focus:outline-none focus:bg-white"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="p-3 bg-[#180065] text-white rounded-2xl pixel-border pixel-box-shadow-sm hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:opacity-50 transition-all flex items-center justify-center"
              title="Send to Pixie"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
