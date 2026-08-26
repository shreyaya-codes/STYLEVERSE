import React from 'react';
import { ClothingItem } from '../types';
import { PixelClothingArtwork } from './PixelClothingItemArtwork';
import { RotateCw, ShieldCheck, Star, Heart } from 'lucide-react';

interface PixelClothingCardProps {
  item: ClothingItem;
  onClick?: () => void;
  onWear?: (e: React.MouseEvent) => void;
  onToggleFavorite?: (e: React.MouseEvent) => void;
  selected?: boolean;
}

export const PixelClothingCard: React.FC<PixelClothingCardProps> = ({
  item,
  onClick,
  onWear,
  onToggleFavorite,
  selected = false,
}) => {
  // Rarity styling
  const getRarityBadge = (rarity: ClothingItem['rarity']) => {
    switch (rarity) {
      case 'Legendary':
        return 'bg-[#ffd54f] text-[#3e001e] border-[#180065]';
      case 'Epic':
        return 'bg-[#ffd9e2] text-[#6c2040] border-[#180065]';
      case 'Rare':
        return 'bg-[#d3bcfc] text-[#230f45] border-[#180065]';
      default:
        return 'bg-[#f0ebff] text-[#49454f] border-[#180065]';
    }
  };

  // Vibe tag styling
  const getVibeBadge = (vibe: ClothingItem['vibe']) => {
    switch (vibe) {
      case 'Streetwear':
        return 'bg-[#a4f0e9] text-[#00201e]';
      case 'Y2K':
        return 'bg-[#d3bcfc] text-[#230f45]';
      case 'Preppy':
        return 'bg-[#ffd9e2] text-[#3e001e]';
      case 'Cyber-Pastel':
        return 'bg-[#a4f0e9] text-[#00201e]';
      case 'Cozy':
        return 'bg-[#ffd54f] text-[#3e001e]';
      default:
        return 'bg-[#ebe5ff] text-[#180065]';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`group relative bg-white rounded-2xl pixel-border transition-all duration-150 cursor-pointer select-none overflow-hidden flex flex-col justify-between ${
        selected
          ? 'ring-4 ring-[#b39ddb] translate-x-1 translate-y-1 shadow-none'
          : 'pixel-box-shadow hover:-translate-y-1 hover:pixel-box-shadow-lg active:translate-x-1 active:translate-y-1 active:shadow-none'
      }`}
      style={{ minHeight: '230px' }}
    >
      {/* Top Header Section inside card with Star Rarity */}
      <div className="p-3 pb-0 flex items-center justify-between z-10">
        <div
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border-2 ${getRarityBadge(
            item.rarity
          )}`}
        >
          <Star className="w-3 h-3 fill-current" />
          <span>{item.rarity}</span>
        </div>

        {onToggleFavorite && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(e);
            }}
            className="p-1 rounded-full hover:bg-[#f6f1ff] transition-colors"
            title={item.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                item.isFavorite ? 'fill-[#ff4081] text-[#ff4081]' : 'text-[#7a7580] hover:text-[#180065]'
              }`}
            />
          </button>
        )}
      </div>

      {/* Center Artwork Canvas with Pastel Glow */}
      <div className="relative py-2 flex items-center justify-center flex-1">
        <div className="w-24 h-24 rounded-xl bg-[#fcf8ff] border-2 border-[#e5deff] flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#f0ebff]/60" />
          <PixelClothingArtwork
            imageType={item.imageType}
            color={item.color}
            size={76}
          />
        </div>
      </div>

      {/* Bottom Metadata Section */}
      <div className="p-3 pt-1 border-t-2 border-[#f0ebff] bg-[#faf7ff] flex flex-col gap-1.5">
        {/* Title */}
        <h4 className="font-heading font-bold text-[14px] text-[#180065] truncate leading-tight" title={item.name}>
          {item.name}
        </h4>

        {/* Vibe Tag Badge */}
        <div>
          <span
            className={`inline-block text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider font-mono-pixel ${getVibeBadge(
              item.vibe
            )}`}
          >
            {item.vibe}
          </span>
        </div>

        {/* Stats Row: Wear count & Condition */}
        <div className="flex items-center justify-between text-[11px] font-mono-pixel text-[#49454f] pt-1">
          <div className="flex items-center gap-1 text-[#180065] font-bold" title={`Worn ${item.wearCount} times`}>
            <RotateCw className="w-3 h-3 text-[#68548d]" />
            <span>{item.wearCount}x</span>
          </div>

          <div
            className={`flex items-center gap-1 font-bold ${
              item.condition >= 90 ? 'text-[#136964]' : item.condition >= 75 ? 'text-[#d97706]' : 'text-[#ba1a1a]'
            }`}
            title={`Condition: ${item.condition}%`}
          >
            <ShieldCheck className="w-3 h-3" />
            <span>{item.condition}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
