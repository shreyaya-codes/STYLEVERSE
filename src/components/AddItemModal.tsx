import React, { useState } from 'react';
import { ClothingItem, Category, Rarity, AestheticVibe } from '../types';
import { PixelClothingArtwork } from './PixelClothingItemArtwork';
import { Plus, X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (newItem: Omit<ClothingItem, 'id'>, imageFile?: File | null) => Promise<void> | void;
  isSaving?: boolean;
}

export const AddItemModal: React.FC<AddItemModalProps> = ({
  isOpen,
  onClose,
  onAddItem,
  isSaving = false,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('Tops');
  const [rarity, setRarity] = useState<Rarity>('Rare');
  const [vibe, setVibe] = useState<AestheticVibe>('Streetwear');
  const [imageType, setImageType] = useState<ClothingItem['imageType']>('oversized_tee');
  const [color, setColor] = useState('#d3bcfc');
  const [tagsInput, setTagsInput] = useState('Oversized, Pastel');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const presetColors = [
    '#d3bcfc', '#a4f0e9', '#ffd9e2', '#ffd54f', '#b39ddb', '#ff80ab', '#ffffff', '#212121'
  ];

  const imageTypeOptions: { id: ClothingItem['imageType']; label: string; cat: Category }[] = [
    { id: 'oversized_tee', label: 'Graphic Tee', cat: 'Tops' },
    { id: 'crop_top', label: 'Crop Tank', cat: 'Tops' },
    { id: 'knit_cardigan', label: 'Knit Cardigan', cat: 'Tops' },
    { id: 'tennis_skirt', label: 'Tennis Skirt', cat: 'Bottoms' },
    { id: 'cargo_pants', label: 'Cargo Pants', cat: 'Bottoms' },
    { id: 'puffer_jacket', label: 'Puffer Jacket', cat: 'Outerwear' },
    { id: 'cloud_hoodie', label: 'Cloud Hoodie', cat: 'Outerwear' },
    { id: 'platform_sneakers', label: 'Platform Sneakers', cat: 'Shoes' },
    { id: 'mary_janes', label: 'Mary Janes', cat: 'Shoes' },
    { id: 'cat_beanie', label: 'Cat Beanie', cat: 'Headwear' },
    { id: 'heart_choker', label: 'Heart Choker', cat: 'Accessories' },
    { id: 'sunglasses', label: 'Cyber Sunglasses', cat: 'Accessories' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || isSaving) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newItem: Omit<ClothingItem, 'id'> = {
      name: name.trim(),
      category,
      rarity,
      vibe,
      wearCount: 0,
      condition: 100,
      imageType,
      color,
      tags,
      daysSinceLastWorn: 0,
      isFavorite: false,
      acquiredDate: new Date().toISOString().split('T')[0],
      resaleValue: Math.floor(Math.random() * 600) + 300,
    };

    await onAddItem(newItem, imageFile);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });
    setName('');
    setImageFile(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[#180065]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl pixel-border pixel-box-shadow-lg max-w-lg w-full p-6 flex flex-col gap-5 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b-2 border-[#f0ebff]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#ff4081]" />
            <h2 className="font-heading font-extrabold text-xl text-[#180065]">
              Add to Digital Closet
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-[#f0ebff] pixel-border-2 flex items-center justify-center font-bold text-[#180065] hover:bg-[#e5deff]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Live Preview of the Item */}
          <div className="w-full h-36 bg-[#fcf8ff] rounded-2xl pixel-border flex items-center justify-center">
            {imageFile ? (
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Clothing preview"
                className="max-h-28 max-w-full object-contain rounded-xl pixel-border-2 bg-white"
              />
            ) : (
              <PixelClothingArtwork imageType={imageType} color={color} size={84} />
            )}
          </div>

          {/* Item Name */}
          <div>
            <label className="block font-mono-pixel text-xs font-bold text-[#180065] mb-1">
              Item Name:
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Pastel Chunky Knit Cardigan"
              className="w-full px-3 py-2 bg-[#fcf8ff] pixel-border-2 rounded-xl text-xs font-mono-pixel text-[#180065] focus:outline-none focus:bg-white"
            />
          </div>

          {/* Category & Rarity */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-mono-pixel text-xs font-bold text-[#180065] mb-1">
                Category:
              </label>
              <select
                value={category}
                onChange={(e) => {
                  const cat = e.target.value as Category;
                  setCategory(cat);
                  const matchingType = imageTypeOptions.find((o) => o.cat === cat);
                  if (matchingType) setImageType(matchingType.id);
                }}
                className="w-full px-3 py-2 bg-[#fcf8ff] pixel-border-2 rounded-xl text-xs font-mono-pixel text-[#180065] focus:outline-none"
              >
                {(['Tops', 'Bottoms', 'Outerwear', 'Shoes', 'Accessories', 'Headwear'] as Category[]).map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-mono-pixel text-xs font-bold text-[#180065] mb-1">
                Rarity:
              </label>
              <select
                value={rarity}
                onChange={(e) => setRarity(e.target.value as Rarity)}
                className="w-full px-3 py-2 bg-[#fcf8ff] pixel-border-2 rounded-xl text-xs font-mono-pixel text-[#180065] focus:outline-none"
              >
                {(['Common', 'Rare', 'Epic', 'Legendary'] as Rarity[]).map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Artwork Silhouette Style */}
          <div>
            <label className="block font-mono-pixel text-xs font-bold text-[#180065] mb-1">
              Pixel Silhouette:
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {imageTypeOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => {
                    setImageType(opt.id);
                    setCategory(opt.cat);
                  }}
                  className={`p-1.5 rounded-xl pixel-border-2 text-[10px] font-mono-pixel font-bold truncate transition-all ${
                    imageType === opt.id
                      ? 'bg-[#b39ddb] text-[#180065]'
                      : 'bg-[#fcf8ff] text-[#49454f] hover:bg-[#f0ebff]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Color Palette Picker */}
          <div>
            <label className="block font-mono-pixel text-xs font-bold text-[#180065] mb-1">
              Primary Color Palette:
            </label>
            <div className="flex items-center gap-2">
              {presetColors.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-7 h-7 rounded-full pixel-border-2 transition-transform ${
                    color === c ? 'scale-125 ring-2 ring-[#180065]' : 'hover:scale-110'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Optional Image Upload */}
          <div>
            <label className="block font-mono-pixel text-xs font-bold text-[#180065] mb-1">
              Clothing Image:
            </label>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="w-full px-3 py-2 bg-[#fcf8ff] pixel-border-2 rounded-xl text-xs font-mono-pixel text-[#180065] focus:outline-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block font-mono-pixel text-xs font-bold text-[#180065] mb-1">
              Style Tags (comma separated):
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. Y2K, Cropped, Kawaii"
              className="w-full px-3 py-2 bg-[#fcf8ff] pixel-border-2 rounded-xl text-xs font-mono-pixel text-[#180065] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="mt-2 w-full py-3 bg-[#a4f0e9] text-[#00201e] pixel-border rounded-xl pixel-box-shadow-mint font-mono-pixel font-bold text-xs hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Add Item to Wardrobe'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
