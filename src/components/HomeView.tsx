import React from 'react';
import { UserProfile, ClothingItem, ClosetStats } from '../types';
import { PixieFullBody, PixieBadge } from './PixieSprite';
import { PixelClothingCard } from './PixelClothingCard';
import { Sparkles, Shirt, Wand2, Compass, ArrowRight, Flame, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HomeViewProps {
  userProfile: UserProfile;
  closetItems: ClothingItem[];
  closetStats: ClosetStats;
  onNavigate: (tab: any) => void;
  onClaimDailyBonus: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  userProfile,
  closetItems,
  closetStats,
  onNavigate,
  onClaimDailyBonus,
}) => {
  const favoriteItems = closetItems.filter((i) => i.isFavorite).slice(0, 4);

  return (
    <div className="flex-1 max-w-7xl mx-auto p-4 md:p-8 w-full flex flex-col gap-6">
      {/* Hero Welcome Stage */}
      <div className="bg-white rounded-3xl pixel-border pixel-box-shadow p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex-1 flex flex-col gap-3 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ffd9e2] rounded-full pixel-border-2 text-xs font-mono-pixel font-bold text-[#6c2040] self-start">
            <Flame className="w-3.5 h-3.5 fill-[#ff4081] text-[#ff4081]" />
            <span>DAY {userProfile.streakDays} STREAK ACTIVE</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl md:text-5xl text-[#180065] tracking-tight leading-tight">
            Welcome back, <span className="text-[#9575cd]">{userProfile.name}!</span>
          </h1>

          <p className="font-body text-sm md:text-base text-[#49454f] max-w-lg leading-relaxed">
            Pixie prepared your daily style recommendation. Your closet health is sitting at a stellar <strong className="text-[#180065]">{closetStats.healthScore}/100</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('ai_stylist')}
              className="px-5 py-3 bg-[#b39ddb] text-[#180065] pixel-border rounded-xl pixel-box-shadow font-mono-pixel font-bold text-xs hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Consult Pixie AI</span>
            </button>

            <button
              onClick={() => onNavigate('closet')}
              className="px-5 py-3 bg-[#a4f0e9] text-[#00201e] pixel-border rounded-xl pixel-box-shadow-mint font-mono-pixel font-bold text-xs hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2"
            >
              <Shirt className="w-4 h-4" />
              <span>Explore Wardrobe</span>
            </button>
          </div>
        </div>

        {/* Mascot Mascot Stage */}
        <div className="shrink-0 relative flex items-center justify-center p-2">
          <PixieFullBody size={200} />
        </div>
      </div>

      {/* Quick Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Closet Stats Widget */}
        <div 
          onClick={() => onNavigate('closet')}
          className="bg-white rounded-2xl pixel-border pixel-box-shadow p-5 flex flex-col justify-between gap-3 cursor-pointer hover:-translate-y-0.5 transition-transform group"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono-pixel text-xs font-bold text-[#68548d]">WARDROBE AUDIT</span>
            <ArrowRight className="w-4 h-4 text-[#180065] group-hover:translate-x-1 transition-transform" />
          </div>
          <div>
            <span className="font-heading font-black text-3xl text-[#180065]">
              {closetStats.totalItems} Items
            </span>
            <p className="text-xs text-[#49454f] mt-0.5">
              {closetStats.unworn30dCount} unworn items ready for re-styling
            </p>
          </div>
        </div>

        {/* Style Me Quick Launch */}
        <div 
          onClick={() => onNavigate('style_me')}
          className="bg-white rounded-2xl pixel-border pixel-box-shadow p-5 flex flex-col justify-between gap-3 cursor-pointer hover:-translate-y-0.5 transition-transform group"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono-pixel text-xs font-bold text-[#68548d]">STYLE ME</span>
            <ArrowRight className="w-4 h-4 text-[#180065] group-hover:translate-x-1 transition-transform" />
          </div>
          <div>
            <span className="font-heading font-black text-3xl text-[#180065]">
              Outfit Canvas
            </span>
            <p className="text-xs text-[#49454f] mt-0.5">
              Build high-synergy outfits with live score feedback
            </p>
          </div>
        </div>

        {/* Bestie Rank Quick Launch */}
        <div 
          onClick={() => onNavigate('quests')}
          className="bg-white rounded-2xl pixel-border pixel-box-shadow p-5 flex flex-col justify-between gap-3 cursor-pointer hover:-translate-y-0.5 transition-transform group"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono-pixel text-xs font-bold text-[#68548d]">QUESTS & REWARDS</span>
            <ArrowRight className="w-4 h-4 text-[#180065] group-hover:translate-x-1 transition-transform" />
          </div>
          <div>
            <span className="font-heading font-black text-3xl text-[#180065]">
              Level {userProfile.level}
            </span>
            <p className="text-xs text-[#49454f] mt-0.5">
              Earn SP & XP for daily challenges
            </p>
          </div>
        </div>
      </div>

      {/* Favorite Pieces Showcase */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-extrabold text-xl text-[#180065] flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#ff4081] fill-[#ff4081]" />
            <span>Favorite Pieces</span>
          </h2>
          <button
            onClick={() => onNavigate('closet')}
            className="font-mono-pixel text-xs text-[#68548d] hover:underline font-bold"
          >
            View All →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {favoriteItems.map((item) => (
            <PixelClothingCard
              key={item.id}
              item={item}
              onClick={() => onNavigate('closet')}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
