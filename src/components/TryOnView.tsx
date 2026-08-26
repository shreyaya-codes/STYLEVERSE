import React, { useState } from 'react';
import { ClothingItem, UserProfile } from '../types';
import { PixelClothingArtwork } from './PixelClothingItemArtwork';
import { Camera, Sparkles, RefreshCw, Download, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TryOnViewProps {
  userProfile: UserProfile;
  closetItems: ClothingItem[];
  onUpdateAvatar: (avatarConfig: UserProfile['avatar']) => void;
}

export const TryOnView: React.FC<TryOnViewProps> = ({
  userProfile,
  closetItems,
  onUpdateAvatar,
}) => {
  const [hairColor, setHairColor] = useState(userProfile.avatar.hairColor || '#9575cd');
  const [skinTone, setSkinTone] = useState(userProfile.avatar.skinTone || '#ffd8be');
  const [selectedTopId, setSelectedTopId] = useState(userProfile.avatar.topId || 'item_1');
  const [selectedBottomId, setSelectedBottomId] = useState(userProfile.avatar.bottomId || 'item_4');
  const [selectedShoesId, setSelectedShoesId] = useState(userProfile.avatar.shoesId || 'item_2');

  const hairColors = ['#9575cd', '#ff80ab', '#80deea', '#ffd54f', '#424242', '#d1c4e9', '#ffffff'];
  const skinTones = ['#ffd8be', '#f8bbd0', '#ffcc80', '#bcaaa4', '#8d6e63', '#4e342e'];

  const tops = closetItems.filter((i) => i.category === 'Tops');
  const bottoms = closetItems.filter((i) => i.category === 'Bottoms');
  const shoes = closetItems.filter((i) => i.category === 'Shoes');

  const handleSaveAvatar = () => {
    onUpdateAvatar({
      hairStyle: 'bob',
      hairColor,
      skinTone,
      topId: selectedTopId,
      bottomId: selectedBottomId,
      shoesId: selectedShoesId,
    });
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto p-4 md:p-8 w-full flex flex-col gap-6">
      <div>
        <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-[#180065]">
          TRY-ON DRESSING ROOM
        </h1>
        <p className="text-sm md:text-base text-[#49454f]">
          Interactive pixel paper-doll dressing room. Customize hair, skin tones, and try on your closet pieces.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Pixel Doll Stage (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl pixel-border pixel-box-shadow p-6 flex flex-col items-center justify-between min-h-[480px] relative overflow-hidden">
          <div className="w-full flex items-center justify-between pb-3 border-b-2 border-[#f0ebff]">
            <span className="font-mono-pixel text-xs font-bold text-[#68548d]">
              PIXEL AVATAR PREVIEW
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#a4f0e9] text-[#00201e] text-[11px] font-mono-pixel font-bold">
              HD Vector Canvas
            </span>
          </div>

          {/* Center Doll Vector */}
          <div className="relative py-6 flex items-center justify-center">
            <div className="w-64 h-80 bg-[#fcf8ff] rounded-3xl pixel-border-2 flex items-center justify-center p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-pixel-dots opacity-40" />

              {/* Pixel Paper Doll SVG */}
              <svg viewBox="0 0 64 96" className="w-full h-full drop-shadow-md" style={{ shapeRendering: 'crispEdges' }}>
                {/* Hair back */}
                <rect x="22" y="12" width="20" height="20" fill={hairColor} />
                <rect x="18" y="16" width="28" height="16" fill={hairColor} />

                {/* Head & Skin */}
                <rect x="24" y="16" width="16" height="16" fill={skinTone} />
                <rect x="28" y="32" width="8" height="4" fill={skinTone} />

                {/* Face details */}
                <rect x="26" y="22" width="3" height="4" fill="#180065" />
                <rect x="27" y="23" width="1" height="1" fill="#ffffff" />
                <rect x="35" y="22" width="3" height="4" fill="#180065" />
                <rect x="36" y="23" width="1" height="1" fill="#ffffff" />
                <rect x="29" y="28" width="6" height="2" fill="#d81b60" />
                <rect x="25" y="26" width="3" height="2" fill="#ff80ab" />
                <rect x="36" y="26" width="3" height="2" fill="#ff80ab" />

                {/* Hair front bangs */}
                <rect x="22" y="10" width="20" height="8" fill={hairColor} />
                <rect x="20" y="16" width="4" height="10" fill={hairColor} />
                <rect x="40" y="16" width="4" height="10" fill={hairColor} />

                {/* Top Shirt */}
                <rect x="20" y="36" width="24" height="18" fill="#d3bcfc" />
                <rect x="24" y="40" width="16" height="10" fill="#a4f0e9" />
                <rect x="14" y="36" width="6" height="12" fill="#d3bcfc" />
                <rect x="44" y="36" width="6" height="12" fill="#d3bcfc" />

                {/* Bottom Skirt / Pants */}
                <rect x="22" y="54" width="20" height="14" fill="#a4f0e9" />
                <line x1="26" y1="54" x2="24" y2="68" stroke="#136964" strokeWidth="1" />
                <line x1="38" y1="54" x2="40" y2="68" stroke="#136964" strokeWidth="1" />

                {/* Legs */}
                <rect x="24" y="68" width="6" height="14" fill={skinTone} />
                <rect x="34" y="68" width="6" height="14" fill={skinTone} />

                {/* Shoes */}
                <rect x="22" y="82" width="8" height="8" fill="#ffd9e2" />
                <rect x="22" y="86" width="8" height="4" fill="#ffffff" />
                <rect x="34" y="82" width="8" height="8" fill="#ffd9e2" />
                <rect x="34" y="86" width="8" height="4" fill="#ffffff" />
              </svg>
            </div>
          </div>

          <button
            onClick={handleSaveAvatar}
            className="w-full py-3 bg-[#a4f0e9] text-[#00201e] pixel-border rounded-xl pixel-box-shadow-mint font-mono-pixel font-bold text-xs hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Apply Avatar Look</span>
          </button>
        </div>

        {/* Right: Customization Controls (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          {/* Hair & Skin Palette */}
          <div className="bg-white rounded-3xl pixel-border pixel-box-shadow p-6 flex flex-col gap-4">
            <h3 className="font-heading font-extrabold text-base text-[#180065]">
              Avatar Features
            </h3>

            {/* Hair color selector */}
            <div>
              <span className="block font-mono-pixel text-xs text-[#49454f] font-bold mb-2">
                Hair Color:
              </span>
              <div className="flex items-center gap-2">
                {hairColors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setHairColor(c)}
                    className={`w-8 h-8 rounded-full pixel-border-2 transition-transform ${
                      hairColor === c ? 'scale-125 ring-2 ring-[#180065]' : 'hover:scale-110'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Skin tone selector */}
            <div>
              <span className="block font-mono-pixel text-xs text-[#49454f] font-bold mb-2">
                Skin Tone:
              </span>
              <div className="flex items-center gap-2">
                {skinTones.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSkinTone(s)}
                    className={`w-8 h-8 rounded-full pixel-border-2 transition-transform ${
                      skinTone === s ? 'scale-125 ring-2 ring-[#180065]' : 'hover:scale-110'
                    }`}
                    style={{ backgroundColor: s }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Quick Wardrobe Swapper */}
          <div className="bg-white rounded-3xl pixel-border pixel-box-shadow p-6 flex flex-col gap-3">
            <h3 className="font-heading font-extrabold text-base text-[#180065]">
              Equip from Closet
            </h3>

            {/* Tops Carousel */}
            <div>
              <span className="block font-mono-pixel text-xs text-[#68548d] font-bold mb-1.5">
                Tops:
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {tops.map((top) => (
                  <button
                    key={top.id}
                    onClick={() => setSelectedTopId(top.id)}
                    className={`p-2 rounded-xl pixel-border-2 flex flex-col items-center gap-1 shrink-0 ${
                      selectedTopId === top.id ? 'bg-[#d3bcfc]' : 'bg-[#fcf8ff] hover:bg-[#f0ebff]'
                    }`}
                  >
                    <PixelClothingArtwork imageType={top.imageType} color={top.color} size={36} />
                    <span className="font-mono-pixel text-[9px] text-[#180065] font-bold max-w-[60px] truncate">
                      {top.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottoms Carousel */}
            <div>
              <span className="block font-mono-pixel text-xs text-[#68548d] font-bold mb-1.5">
                Bottoms:
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {bottoms.map((bottom) => (
                  <button
                    key={bottom.id}
                    onClick={() => setSelectedBottomId(bottom.id)}
                    className={`p-2 rounded-xl pixel-border-2 flex flex-col items-center gap-1 shrink-0 ${
                      selectedBottomId === bottom.id ? 'bg-[#a4f0e9]' : 'bg-[#fcf8ff] hover:bg-[#f0ebff]'
                    }`}
                  >
                    <PixelClothingArtwork imageType={bottom.imageType} color={bottom.color} size={36} />
                    <span className="font-mono-pixel text-[9px] text-[#180065] font-bold max-w-[60px] truncate">
                      {bottom.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
