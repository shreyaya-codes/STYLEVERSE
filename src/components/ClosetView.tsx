import React, { useState } from 'react';
import { ClothingItem, ClosetStats, Category, Rarity, AestheticVibe } from '../types';
import { PixelClothingCard } from './PixelClothingCard';
import { PixelClothingArtwork } from './PixelClothingItemArtwork';
import { 
  BarChart3, 
  SlidersHorizontal, 
  Plus, 
  Sparkles, 
  RotateCw, 
  ShieldAlert, 
  Check, 
  Tag, 
  Heart,
  Wrench,
  Shirt,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

interface ClosetViewProps {
  items: ClothingItem[];
  closetStats: ClosetStats;
  onSelectItem: (item: ClothingItem) => void;
  onAddItem: () => void;
  onWearItem: (item: ClothingItem) => void;
  onRepairItem: (item: ClothingItem) => void;
  onToggleFavorite: (item: ClothingItem) => void;
  onLaunchUnwornRescue: () => void;
}

export const ClosetView: React.FC<ClosetViewProps> = ({
  items,
  closetStats,
  onSelectItem,
  onAddItem,
  onWearItem,
  onRepairItem,
  onToggleFavorite,
  onLaunchUnwornRescue,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [rarityFilter, setRarityFilter] = useState<string>('ALL');
  const [vibeFilter, setVibeFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'wear_desc' | 'condition_desc' | 'rarity' | 'newest'>('wear_desc');
  const [selectedItemForModal, setSelectedItemForModal] = useState<ClothingItem | null>(null);

  const categories: string[] = ['ALL', 'TOPS', 'BOTTOMS', 'OUTERWEAR', 'SHOES', 'ACCESSORIES', 'HEADWEAR'];

  // Filter items
  const filteredItems = items.filter((item) => {
    if (selectedCategory !== 'ALL' && item.category.toUpperCase() !== selectedCategory) {
      return false;
    }
    if (rarityFilter !== 'ALL' && item.rarity !== rarityFilter) {
      return false;
    }
    if (vibeFilter !== 'ALL' && item.vibe !== vibeFilter) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'wear_desc') return b.wearCount - a.wearCount;
    if (sortBy === 'condition_desc') return b.condition - a.condition;
    if (sortBy === 'newest') return b.id.localeCompare(a.id);
    return 0;
  });

  return (
    <div className="flex-1 flex flex-col lg:flex-row gap-6 p-4 md:p-8 max-w-7xl mx-auto w-full relative">
      {/* Left / Main Section: Closet Items & Filters */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Header (From Image 2) */}
        <div>
          <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-[#180065] tracking-tight">
            MY CLOSET
          </h1>
          <p className="font-body text-sm md:text-base text-[#49454f] mt-1">
            Everything you own. One beautiful little universe.
          </p>
        </div>

        {/* Filter Pills Row (From Image 2) */}
        <div className="bg-white rounded-2xl pixel-border pixel-box-shadow p-2.5 md:p-3.5 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full font-mono-pixel text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#180065] text-white pixel-border-2'
                      : 'bg-white text-[#180065] pixel-border-2 hover:bg-[#f6f1ff]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Filter Dropdown/Button */}
          <button
            onClick={() => setShowFilterDrawer(!showFilterDrawer)}
            className={`px-4 py-1.5 rounded-xl font-mono-pixel text-xs font-bold pixel-border-2 flex items-center gap-1.5 transition-all ${
              showFilterDrawer || rarityFilter !== 'ALL' || vibeFilter !== 'ALL'
                ? 'bg-[#b39ddb] text-[#180065]'
                : 'bg-white text-[#180065] hover:bg-[#f6f1ff]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter</span>
            {(rarityFilter !== 'ALL' || vibeFilter !== 'ALL') && (
              <span className="w-2 h-2 rounded-full bg-[#ff4081]" />
            )}
          </button>
        </div>

        {/* Extended Filter Options */}
        {showFilterDrawer && (
          <div className="bg-[#f6f1ff] rounded-2xl pixel-border p-4 flex flex-wrap items-center gap-4 text-xs font-mono-pixel">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#180065]">Rarity:</span>
              {['ALL', 'Common', 'Rare', 'Epic', 'Legendary'].map((r) => (
                <button
                  key={r}
                  onClick={() => setRarityFilter(r)}
                  className={`px-2.5 py-1 rounded-lg border-2 ${
                    rarityFilter === r
                      ? 'bg-[#180065] text-white border-[#180065]'
                      : 'bg-white text-[#180065] border-[#d3bcfc]'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-[#180065]">Sort:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-white pixel-border-2 rounded-lg px-2 py-1 text-[#180065] focus:outline-none"
              >
                <option value="wear_desc">Most Worn</option>
                <option value="condition_desc">Highest Condition</option>
                <option value="newest">Recently Acquired</option>
              </select>
            </div>

            {(rarityFilter !== 'ALL' || vibeFilter !== 'ALL') && (
              <button
                onClick={() => {
                  setRarityFilter('ALL');
                  setVibeFilter('ALL');
                }}
                className="text-[#ba1a1a] hover:underline font-bold ml-auto"
              >
                Reset Filters
              </button>
            )}
          </div>
        )}

        {/* Items Grid (Matching Image 2) */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-3xl pixel-border p-12 text-center flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-[#f0ebff] flex items-center justify-center pixel-border-2">
              <Shirt className="w-8 h-8 text-[#68548d]" />
            </div>
            <h3 className="font-heading font-bold text-lg text-[#180065]">No items match your filter</h3>
            <p className="text-sm text-[#7a7580] max-w-sm">
              Try adjusting your category or rarity filter to view other digital clothing pieces in your wardrobe.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('ALL');
                setRarityFilter('ALL');
              }}
              className="mt-2 px-4 py-2 bg-[#a4f0e9] pixel-border rounded-xl font-mono-pixel text-xs font-bold"
            >
              Show All Items
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {filteredItems.map((item) => (
              <PixelClothingCard
                key={item.id}
                item={item}
                onClick={() => {
                  setSelectedItemForModal(item);
                  onSelectItem(item);
                }}
                onWear={(e) => {
                  e.stopPropagation();
                  onWearItem(item);
                }}
                onToggleFavorite={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(item);
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Right Sidebar Widget: "CLOSET HEALTH" (From Image 2) */}
      <div className="w-full lg:w-80 shrink-0 flex flex-col gap-5">
        <div className="bg-white rounded-3xl pixel-border pixel-box-shadow p-6 flex flex-col gap-6">
          {/* Card Header (From Image 2) */}
          <div className="flex items-center gap-2.5 pb-2">
            <div className="p-2 bg-[#d3bcfc] rounded-xl pixel-border-2">
              <BarChart3 className="w-5 h-5 text-[#180065]" />
            </div>
            <h3 className="font-heading font-extrabold text-lg text-[#180065] tracking-wide">
              CLOSET HEALTH
            </h3>
          </div>

          {/* Circular Donut Gauge (Score: 82 / 100) (From Image 2) */}
          <div className="flex flex-col items-center justify-center relative my-2">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#f0ebff"
                  strokeWidth="10"
                  fill="none"
                />
                {/* Animated Mint/Cyan Progress Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#a4f0e9"
                  strokeWidth="10"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * closetStats.healthScore) / 100}
                  strokeLinecap="round"
                  fill="none"
                  className="transition-all duration-1000 ease-out"
                />
                {/* Secondary Purple Accent */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#68548d"
                  strokeWidth="10"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * 25) / 100}
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.3"
                />
              </svg>

              {/* Center Gauge Text (From Image 2) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-heading font-black text-3xl text-[#180065] leading-none">
                  {closetStats.healthScore}
                </span>
                <span className="font-mono-pixel text-[11px] font-bold text-[#7a7580] mt-0.5">
                  / 100
                </span>
              </div>
            </div>
            <span className="font-mono-pixel text-[11px] text-[#136964] font-bold mt-2">
              High Utility & Sustainability
            </span>
          </div>

          {/* Stats Breakdown List (From Image 2) */}
          <div className="flex flex-col gap-3.5 pt-2 border-t-2 border-[#f0ebff] font-mono-pixel text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#49454f]">Total Items</span>
              <span className="font-bold text-[#180065] text-sm">
                {closetStats.totalItems}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#49454f]">Most Worn</span>
              <span className="px-2.5 py-0.5 rounded-lg bg-[#f0ebff] text-[#180065] font-bold">
                {closetStats.mostWornCategory}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#49454f]">Unworn (30d)</span>
              <span className="font-bold text-[#ba1a1a]">
                {closetStats.unworn30dCount} items
              </span>
            </div>
          </div>

          {/* Unworn Rescue Banner */}
          <div className="bg-[#fff9db] rounded-2xl pixel-border-2 p-3.5 flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#6c2040]">
              <Sparkles className="w-3.5 h-3.5 text-[#ff4081]" />
              <span>Pixie's Wardrobe Tip</span>
            </div>
            <p className="text-[11px] font-body text-[#49454f]">
              You have 12 unworn pieces! Styling them into an outfit awards <strong className="text-[#136964]">+150 SP</strong> bonus.
            </p>
            <button
              onClick={onLaunchUnwornRescue}
              className="mt-1 w-full py-2 bg-[#ffd9e2] pixel-border-2 rounded-xl text-xs font-mono-pixel font-bold text-[#6c2040] hover:bg-[#ffb0c9] transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Rescue Unworn Clothes</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Action Button '+' (From Image 2 bottom right) */}
      <button
        onClick={onAddItem}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-14 h-14 bg-[#180065] text-white rounded-2xl pixel-border pixel-box-shadow flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-20 group"
        title="Add new item to digital closet"
      >
        <Plus className="w-7 h-7 group-hover:rotate-90 transition-transform duration-200" />
      </button>

      {/* Item Detail Modal */}
      {selectedItemForModal && (
        <div 
          className="fixed inset-0 bg-[#180065]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedItemForModal(null)}
        >
          <div 
            className="bg-white rounded-3xl pixel-border pixel-box-shadow-lg max-w-md w-full p-6 flex flex-col gap-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono-pixel text-xs text-[#68548d] font-bold uppercase tracking-wider">
                  {selectedItemForModal.category} • {selectedItemForModal.vibe}
                </span>
                <h2 className="font-heading font-extrabold text-xl text-[#180065] mt-0.5">
                  {selectedItemForModal.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedItemForModal(null)}
                className="w-8 h-8 rounded-xl bg-[#f0ebff] pixel-border-2 flex items-center justify-center font-bold text-[#180065] hover:bg-[#e5deff]"
              >
                ✕
              </button>
            </div>

            {/* Item Showcase */}
            <div className="w-full h-48 bg-[#fcf8ff] rounded-2xl pixel-border flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-pixel-dots opacity-40" />
              <PixelClothingArtwork
                imageType={selectedItemForModal.imageType}
                color={selectedItemForModal.color}
                size={120}
              />
            </div>

            {/* Stats Breakdown */}
            <div className="grid grid-cols-3 gap-2.5 text-center font-mono-pixel">
              <div className="p-3 bg-[#f6f1ff] rounded-xl pixel-border-2">
                <span className="text-[10px] text-[#7a7580] block">Wear Count</span>
                <span className="font-bold text-sm text-[#180065]">
                  {selectedItemForModal.wearCount}x
                </span>
              </div>
              <div className="p-3 bg-[#f6f1ff] rounded-xl pixel-border-2">
                <span className="text-[10px] text-[#7a7580] block">Condition</span>
                <span className="font-bold text-sm text-[#136964]">
                  {selectedItemForModal.condition}%
                </span>
              </div>
              <div className="p-3 bg-[#f6f1ff] rounded-xl pixel-border-2">
                <span className="text-[10px] text-[#7a7580] block">Last Worn</span>
                <span className="font-bold text-sm text-[#180065]">
                  {selectedItemForModal.daysSinceLastWorn}d ago
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {selectedItemForModal.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-[#ebe5ff] text-[#180065] font-mono-pixel text-[11px] font-bold"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2.5 pt-2">
              <button
                onClick={() => {
                  onWearItem(selectedItemForModal);
                  setSelectedItemForModal({
                    ...selectedItemForModal,
                    wearCount: selectedItemForModal.wearCount + 1,
                    daysSinceLastWorn: 0,
                  });
                }}
                className="flex-1 py-3 bg-[#b39ddb] text-[#180065] pixel-border rounded-xl pixel-box-shadow-sm font-mono-pixel font-bold text-xs hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                <RotateCw className="w-4 h-4" />
                <span>Wear Today (+10 SP)</span>
              </button>

              <button
                onClick={() => {
                  onRepairItem(selectedItemForModal);
                  setSelectedItemForModal({
                    ...selectedItemForModal,
                    condition: 100,
                  });
                }}
                className="py-3 px-4 bg-[#a4f0e9] text-[#00201e] pixel-border rounded-xl pixel-box-shadow-sm font-mono-pixel font-bold text-xs hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5"
                title="Repair condition back to 100%"
              >
                <Wrench className="w-4 h-4" />
                <span>Repair</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
