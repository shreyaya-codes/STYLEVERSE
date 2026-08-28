import React, { useState } from 'react';
import { ShopItem, ClothingItem, UserProfile } from '../types';
import { PixelClothingArtwork } from './PixelClothingItemArtwork';
import { Sparkles, Gift, ShoppingBag, Star, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ShopViewProps {
  userProfile: UserProfile;
  shopItems: ShopItem[];
  onBuyItem: (item: ShopItem) => Promise<void> | void;
  onGachaPull: (cost: number) => Promise<ClothingItem | null> | ClothingItem | null;
  onInsufficientSp?: (message: string) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  userProfile,
  shopItems,
  onBuyItem,
  onGachaPull,
  onInsufficientSp,
}) => {
  const [pulledItem, setPulledItem] = useState<ClothingItem | null>(null);
  const [isPulling, setIsPulling] = useState(false);

  const handlePull = async (cost: number) => {
    if (userProfile.sp < cost) {
      onInsufficientSp?.(`You need ${cost} SP to make a pull! Earn more by styling outfits or completing quests.`);
      return;
    }

    setIsPulling(true);
    setTimeout(() => {
      void (async () => {
        try {
          const item = await onGachaPull(cost);
          setPulledItem(item);

          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#ffd54f', '#ff80ab', '#a4f0e9', '#d3bcfc'],
          });
        } finally {
          setIsPulling(false);
        }
      })();
    }, 600);
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto p-4 md:p-8 w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-[#180065]">
            STYLEVERSE BOUTIQUE & GACHA
          </h1>
          <p className="text-sm md:text-base text-[#49454f]">
            Spend your Style Points (SP) on rare wardrobe drops, limited cyber-pastel releases, and lucky mystery boxes.
          </p>
        </div>

        {/* Current Balance */}
        <div className="px-4 py-2 bg-[#a4f0e9] pixel-border-2 rounded-2xl pixel-box-shadow-mint flex items-center gap-2 self-start sm:self-auto">
          <Sparkles className="w-4 h-4 text-[#136964]" />
          <span className="font-mono-pixel text-sm font-bold text-[#00201e]">
            {userProfile.sp.toLocaleString()} SP Balance
          </span>
        </div>
      </div>

      {/* Lucky Gacha Box Feature Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Standard Gacha Box */}
        <div className="bg-white rounded-3xl pixel-border pixel-box-shadow p-6 flex flex-col justify-between gap-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-[#d3bcfc] rounded-full text-xs font-mono-pixel font-bold text-[#180065] pixel-border-2">
              MYSTERY BOX
            </span>
            <span className="font-mono-pixel text-xs text-[#7a7580]">Guaranteed Rare+</span>
          </div>

          <div className="flex flex-col items-center py-4">
            <div className="w-24 h-24 rounded-2xl bg-[#fcf8ff] pixel-border flex items-center justify-center relative">
              <Gift className={`w-12 h-12 text-[#9575cd] ${isPulling ? 'animate-bounce' : ''}`} />
            </div>
            <h3 className="font-heading font-extrabold text-lg text-[#180065] mt-3">
              Standard Pastel Drop
            </h3>
            <p className="text-xs text-[#49454f] text-center max-w-xs mt-1">
              Pull from a curated rotation of Streetwear, Y2K and Cozy aesthetic essentials.
            </p>
          </div>

          <button
            onClick={() => handlePull(100)}
            disabled={isPulling}
            className="w-full py-3 bg-[#b39ddb] text-[#180065] pixel-border rounded-xl pixel-box-shadow font-mono-pixel font-bold text-xs hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Open Box (100 SP)</span>
          </button>
        </div>

        {/* Deluxe Legendary Box */}
        <div className="bg-[#fffdfa] rounded-3xl pixel-border pixel-box-shadow p-6 flex flex-col justify-between gap-4 relative overflow-hidden border-[#ffd54f]">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-[#ffd54f] rounded-full text-xs font-mono-pixel font-bold text-[#3e001e] pixel-border-2">
              DELUXE CYBER BOX
            </span>
            <span className="font-mono-pixel text-xs text-[#d97706] font-bold">★ High Epic/Legendary Rate</span>
          </div>

          <div className="flex flex-col items-center py-4">
            <div className="w-24 h-24 rounded-2xl bg-[#fff9db] pixel-border-2 flex items-center justify-center relative border-[#ffd54f]">
              <Zap className={`w-12 h-12 text-[#ffd54f] fill-[#ffd54f] ${isPulling ? 'animate-spin' : ''}`} />
            </div>
            <h3 className="font-heading font-extrabold text-lg text-[#180065] mt-3">
              Cyber-Pastel Luxe Drop
            </h3>
            <p className="text-xs text-[#49454f] text-center max-w-xs mt-1">
              High tier outerwear, holographic platforms, and limited animated accessories.
            </p>
          </div>

          <button
            onClick={() => handlePull(250)}
            disabled={isPulling}
            className="w-full py-3 bg-[#ffd54f] text-[#3e001e] pixel-border rounded-xl pixel-box-shadow font-mono-pixel font-bold text-xs hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
          >
            <Star className="w-4 h-4 fill-current" />
            <span>Open Deluxe (250 SP)</span>
          </button>
        </div>
      </div>

      {/* Featured Boutique Catalog */}
      <div className="flex flex-col gap-4">
        <h2 className="font-heading font-extrabold text-xl text-[#180065]">
          Daily Featured Boutique
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {shopItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl pixel-border pixel-box-shadow p-4 flex flex-col justify-between gap-3"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-pixel font-bold bg-[#f0ebff] text-[#68548d] pixel-border-2">
                  {item.rarity}
                </span>
                <span className="text-[10px] font-mono-pixel font-bold text-[#136964]">
                  {item.vibe}
                </span>
              </div>

              <div className="py-2 flex items-center justify-center">
                <div className="w-20 h-20 bg-[#fcf8ff] rounded-xl pixel-border-2 flex items-center justify-center">
                  <PixelClothingArtwork imageType={item.imageType} color={item.color} size={60} />
                </div>
              </div>

              <div>
                <h4 className="font-heading font-bold text-sm text-[#180065] truncate">
                  {item.name}
                </h4>
              </div>

              <button
                onClick={() => onBuyItem(item)}
                className="w-full py-2 bg-[#a4f0e9] text-[#00201e] pixel-border-2 rounded-xl text-xs font-mono-pixel font-bold hover:bg-[#89d4cd] transition-colors flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Buy for {item.priceSp} SP</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Pulled Item Reveal Modal */}
      {pulledItem && (
        <div 
          className="fixed inset-0 bg-[#180065]/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setPulledItem(null)}
        >
          <div 
            className="bg-white rounded-3xl pixel-border pixel-box-shadow-lg max-w-sm w-full p-6 text-center flex flex-col items-center gap-4 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-3 py-1 rounded-full bg-[#ffd54f] text-[#3e001e] font-mono-pixel text-xs font-bold pixel-border-2">
              🎉 NEW UNLOCK!
            </div>

            <div className="w-32 h-32 bg-[#fcf8ff] rounded-2xl pixel-border flex items-center justify-center">
              <PixelClothingArtwork
                imageType={pulledItem.imageType}
                color={pulledItem.color}
                size={90}
              />
            </div>

            <div>
              <span className="font-mono-pixel text-xs text-[#68548d] font-bold">
                {pulledItem.rarity} • {pulledItem.vibe}
              </span>
              <h3 className="font-heading font-extrabold text-lg text-[#180065] mt-0.5">
                {pulledItem.name}
              </h3>
            </div>

            <button
              onClick={() => setPulledItem(null)}
              className="w-full py-3 bg-[#a4f0e9] text-[#00201e] pixel-border rounded-xl font-mono-pixel font-bold text-xs"
            >
              Add to Closet
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
