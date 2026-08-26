import React, { useState } from 'react';
import { ClothingItem, UserProfile } from '../types';
import { PixelClothingArtwork } from './PixelClothingItemArtwork';
import { PixieExpression } from './PixieSprite';
import { Sparkles, Wand2, RefreshCw, Check, Heart, Plus, Trash2, RotateCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface StyleMeViewProps {
  closetItems: ClothingItem[];
  userProfile: UserProfile;
  onSaveOutfit: (outfit: { name: string; itemIds: string[]; occasion: string; score: number }) => void;
  onWearOutfit: (itemIds: string[]) => void;
}

export const StyleMeView: React.FC<StyleMeViewProps> = ({
  closetItems,
  userProfile,
  onSaveOutfit,
  onWearOutfit,
}) => {
  const [selectedTop, setSelectedTop] = useState<ClothingItem | null>(closetItems.find(i => i.category === 'Tops') || null);
  const [selectedBottom, setSelectedBottom] = useState<ClothingItem | null>(closetItems.find(i => i.category === 'Bottoms') || null);
  const [selectedShoes, setSelectedShoes] = useState<ClothingItem | null>(closetItems.find(i => i.category === 'Shoes') || null);
  const [selectedOuter, setSelectedOuter] = useState<ClothingItem | null>(closetItems.find(i => i.category === 'Outerwear') || null);
  const [selectedAcc, setSelectedAcc] = useState<ClothingItem | null>(closetItems.find(i => i.category === 'Accessories') || null);

  const [occasion, setOccasion] = useState('Casual Coffee Date');
  const [vibe, setVibe] = useState('Pastel Streetwear');
  const [isGenerating, setIsGenerating] = useState(false);

  const occasions = ['Casual Coffee Date', 'Campus Lecture', 'Night Out / Rave', 'Sunday Cozy Day', 'Summer Picnic', 'Art Gallery Walk'];
  const vibes = ['Pastel Streetwear', 'Y2K Cyber', 'Preppy Chic', 'Cozy Oversized', 'Clean Girl'];

  // Calculate synergy score
  const calculateScore = () => {
    let score = 75;
    if (selectedTop && selectedBottom) score += 10;
    if (selectedShoes) score += 8;
    if (selectedOuter) score += 5;
    if (selectedAcc) score += 2;
    return Math.min(score, 99);
  };

  const currentScore = calculateScore();

  const handleAutoMatch = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const tops = closetItems.filter(i => i.category === 'Tops');
      const bottoms = closetItems.filter(i => i.category === 'Bottoms');
      const shoes = closetItems.filter(i => i.category === 'Shoes');
      const outer = closetItems.filter(i => i.category === 'Outerwear');
      const acc = closetItems.filter(i => i.category === 'Accessories');

      if (tops.length) setSelectedTop(tops[Math.floor(Math.random() * tops.length)]);
      if (bottoms.length) setSelectedBottom(bottoms[Math.floor(Math.random() * bottoms.length)]);
      if (shoes.length) setSelectedShoes(shoes[Math.floor(Math.random() * shoes.length)]);
      if (outer.length) setSelectedOuter(outer[Math.floor(Math.random() * outer.length)]);
      if (acc.length) setSelectedAcc(acc[Math.floor(Math.random() * acc.length)]);

      setIsGenerating(false);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#a4f0e9', '#d3bcfc', '#ffd9e2'],
      });
    }, 400);
  };

  const handleSaveAndWear = () => {
    const itemIds = [
      selectedTop?.id,
      selectedBottom?.id,
      selectedShoes?.id,
      selectedOuter?.id,
      selectedAcc?.id,
    ].filter(Boolean) as string[];

    onSaveOutfit({
      name: `${vibe} for ${occasion}`,
      itemIds,
      occasion,
      score: currentScore,
    });
    onWearOutfit(itemIds);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
    });
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto p-4 md:p-8 w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-[#180065]">
            STYLE ME
          </h1>
          <p className="text-sm md:text-base text-[#49454f]">
            Mix, match, and let Pixie rate your outfit combinations with precision synergy.
          </p>
        </div>

        <button
          onClick={handleAutoMatch}
          disabled={isGenerating}
          className="px-5 py-3 bg-[#a4f0e9] pixel-border rounded-2xl pixel-box-shadow-mint font-mono-pixel font-bold text-xs text-[#00201e] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2 select-none"
        >
          <Wand2 className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>Pixie Smart Match</span>
        </button>
      </div>

      {/* Main Builder Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Canvas Slots (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl pixel-border pixel-box-shadow p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between border-b-2 border-[#f0ebff] pb-3">
            <span className="font-mono-pixel text-xs font-bold text-[#68548d] uppercase tracking-wider">
              Outfit Mannequin Canvas
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono-pixel text-xs text-[#7a7580]">Synergy Score:</span>
              <span className="font-heading font-black text-xl text-[#180065] px-2.5 py-0.5 rounded-lg bg-[#ffd9e2] pixel-border-2">
                {currentScore}/100
              </span>
            </div>
          </div>

          {/* Slots Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {/* Slot: Outerwear */}
            <div className="p-3 bg-[#fcf8ff] rounded-2xl pixel-border-2 flex flex-col items-center gap-2 relative">
              <span className="font-mono-pixel text-[10px] font-bold text-[#7a7580]">OUTERWEAR</span>
              {selectedOuter ? (
                <div className="flex flex-col items-center text-center">
                  <PixelClothingArtwork imageType={selectedOuter.imageType} color={selectedOuter.color} size={64} />
                  <span className="font-heading font-bold text-xs text-[#180065] truncate w-full mt-1">
                    {selectedOuter.name}
                  </span>
                  <button onClick={() => setSelectedOuter(null)} className="text-[10px] text-[#ba1a1a] hover:underline mt-0.5">
                    Remove
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    const found = closetItems.find(i => i.category === 'Outerwear');
                    if (found) setSelectedOuter(found);
                  }}
                  className="w-full h-24 border-2 border-dashed border-[#b39ddb] rounded-xl flex items-center justify-center text-xs text-[#68548d] font-bold hover:bg-[#f0ebff]"
                >
                  + Add Outer
                </button>
              )}
            </div>

            {/* Slot: Top */}
            <div className="p-3 bg-[#fcf8ff] rounded-2xl pixel-border-2 flex flex-col items-center gap-2 relative">
              <span className="font-mono-pixel text-[10px] font-bold text-[#7a7580]">TOP</span>
              {selectedTop ? (
                <div className="flex flex-col items-center text-center">
                  <PixelClothingArtwork imageType={selectedTop.imageType} color={selectedTop.color} size={64} />
                  <span className="font-heading font-bold text-xs text-[#180065] truncate w-full mt-1">
                    {selectedTop.name}
                  </span>
                  <button onClick={() => setSelectedTop(null)} className="text-[10px] text-[#ba1a1a] hover:underline mt-0.5">
                    Remove
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    const found = closetItems.find(i => i.category === 'Tops');
                    if (found) setSelectedTop(found);
                  }}
                  className="w-full h-24 border-2 border-dashed border-[#b39ddb] rounded-xl flex items-center justify-center text-xs text-[#68548d] font-bold hover:bg-[#f0ebff]"
                >
                  + Add Top
                </button>
              )}
            </div>

            {/* Slot: Bottom */}
            <div className="p-3 bg-[#fcf8ff] rounded-2xl pixel-border-2 flex flex-col items-center gap-2 relative">
              <span className="font-mono-pixel text-[10px] font-bold text-[#7a7580]">BOTTOM</span>
              {selectedBottom ? (
                <div className="flex flex-col items-center text-center">
                  <PixelClothingArtwork imageType={selectedBottom.imageType} color={selectedBottom.color} size={64} />
                  <span className="font-heading font-bold text-xs text-[#180065] truncate w-full mt-1">
                    {selectedBottom.name}
                  </span>
                  <button onClick={() => setSelectedBottom(null)} className="text-[10px] text-[#ba1a1a] hover:underline mt-0.5">
                    Remove
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    const found = closetItems.find(i => i.category === 'Bottoms');
                    if (found) setSelectedBottom(found);
                  }}
                  className="w-full h-24 border-2 border-dashed border-[#b39ddb] rounded-xl flex items-center justify-center text-xs text-[#68548d] font-bold hover:bg-[#f0ebff]"
                >
                  + Add Bottom
                </button>
              )}
            </div>

            {/* Slot: Shoes */}
            <div className="p-3 bg-[#fcf8ff] rounded-2xl pixel-border-2 flex flex-col items-center gap-2 relative">
              <span className="font-mono-pixel text-[10px] font-bold text-[#7a7580]">SHOES</span>
              {selectedShoes ? (
                <div className="flex flex-col items-center text-center">
                  <PixelClothingArtwork imageType={selectedShoes.imageType} color={selectedShoes.color} size={64} />
                  <span className="font-heading font-bold text-xs text-[#180065] truncate w-full mt-1">
                    {selectedShoes.name}
                  </span>
                  <button onClick={() => setSelectedShoes(null)} className="text-[10px] text-[#ba1a1a] hover:underline mt-0.5">
                    Remove
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    const found = closetItems.find(i => i.category === 'Shoes');
                    if (found) setSelectedShoes(found);
                  }}
                  className="w-full h-24 border-2 border-dashed border-[#b39ddb] rounded-xl flex items-center justify-center text-xs text-[#68548d] font-bold hover:bg-[#f0ebff]"
                >
                  + Add Shoes
                </button>
              )}
            </div>

            {/* Slot: Accessory */}
            <div className="p-3 bg-[#fcf8ff] rounded-2xl pixel-border-2 flex flex-col items-center gap-2 relative">
              <span className="font-mono-pixel text-[10px] font-bold text-[#7a7580]">ACCESSORY</span>
              {selectedAcc ? (
                <div className="flex flex-col items-center text-center">
                  <PixelClothingArtwork imageType={selectedAcc.imageType} color={selectedAcc.color} size={64} />
                  <span className="font-heading font-bold text-xs text-[#180065] truncate w-full mt-1">
                    {selectedAcc.name}
                  </span>
                  <button onClick={() => setSelectedAcc(null)} className="text-[10px] text-[#ba1a1a] hover:underline mt-0.5">
                    Remove
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    const found = closetItems.find(i => i.category === 'Accessories');
                    if (found) setSelectedAcc(found);
                  }}
                  className="w-full h-24 border-2 border-dashed border-[#b39ddb] rounded-xl flex items-center justify-center text-xs text-[#68548d] font-bold hover:bg-[#f0ebff]"
                >
                  + Add Acc
                </button>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleSaveAndWear}
              className="flex-1 py-3 px-4 bg-[#b39ddb] text-[#180065] pixel-border rounded-xl pixel-box-shadow font-mono-pixel font-bold text-xs hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              <RotateCw className="w-4 h-4" />
              <span>Wear This Look Today (+50 SP)</span>
            </button>
          </div>
        </div>

        {/* Right: Pixie's Live Verdict & Formula Context (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Pixie Outfit Verdict Card */}
          <div className="bg-white rounded-3xl pixel-border pixel-box-shadow p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <PixieExpression reaction="HAPPY" size={54} />
              <div>
                <span className="font-mono-pixel text-xs text-[#68548d] font-bold">PIXIE'S VERDICT</span>
                <h3 className="font-heading font-bold text-base text-[#180065]">
                  "Flawless color harmony!"
                </h3>
              </div>
            </div>

            <p className="font-body text-xs md:text-sm text-[#49454f] bg-[#fcf8ff] p-3.5 rounded-2xl pixel-border-2">
              The pairing of pastel tones with chunky footwear balances the oversized aesthetic cleanly. The heart chain choker brings high-impact edge to the top silhouette.
            </p>

            {/* Occasion & Vibe Pickers */}
            <div className="flex flex-col gap-3 pt-2 border-t-2 border-[#f0ebff]">
              <div>
                <label className="block font-mono-pixel text-[11px] font-bold text-[#180065] mb-1">
                  Target Occasion:
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full bg-[#fcf8ff] pixel-border-2 rounded-xl px-3 py-2 text-xs font-mono-pixel text-[#180065] focus:outline-none"
                >
                  {occasions.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-mono-pixel text-[11px] font-bold text-[#180065] mb-1">
                  Aesthetic Formula:
                </label>
                <select
                  value={vibe}
                  onChange={(e) => setVibe(e.target.value)}
                  className="w-full bg-[#fcf8ff] pixel-border-2 rounded-xl px-3 py-2 text-xs font-mono-pixel text-[#180065] focus:outline-none"
                >
                  {vibes.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
