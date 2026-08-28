export type Rarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';

export type Category = 'Tops' | 'Bottoms' | 'Outerwear' | 'Shoes' | 'Accessories' | 'Dresses' | 'Headwear';

export type AestheticVibe = 'Streetwear' | 'Y2K' | 'Pastel Goth' | 'Cyber-Pastel' | 'Preppy' | 'Cozy' | 'Techwear' | 'Kawaii' | 'Clean Girl' | 'Vintage Indie';

export type PixieReaction = 'HAPPY' | 'THINKING' | 'SHOCKED' | 'FASHIONABLY_JUDGING';

export interface ClothingItem {
  id: string;
  name: string;
  category: Category;
  rarity: Rarity;
  vibe: AestheticVibe;
  wearCount: number;
  condition: number; // 0 - 100
  imageType: 'oversized_tee' | 'platform_sneakers' | 'puffer_jacket' | 'tennis_skirt' | 'cat_beanie' | 'cargo_pants' | 'mary_janes' | 'knit_cardigan' | 'heart_choker' | 'cloud_hoodie' | 'pleated_skirt' | 'sunglasses' | 'tote_bag' | 'crop_top';
  customImageUrl?: string;
  color: string;
  tags: string[];
  daysSinceLastWorn: number;
  isFavorite: boolean;
  acquiredDate: string;
  resaleValue?: number;
}

export interface ClosetStats {
  healthScore: number;
  totalItems: number;
  mostWornCategory: string;
  unworn30dCount: number;
  sustainabilityScore: number;
  colorDiversity: number;
  averageCondition: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'pixie';
  text: string;
  timestamp: string;
  reaction?: PixieReaction;
  suggestedItemIds?: string[];
  outfitDetails?: {
    name: string;
    score: number;
    items: string[];
  };
}

export interface SavedOutfit {
  id: string;
  name: string;
  occasion: string;
  itemIds: string[];
  score: number;
  vibe: string;
  createdAt: string;
  wornCount: number;
}

export interface UserProfile {
  name: string;
  level: number;
  title: string;
  sp: number; // Style Points
  streakDays: number;
  bestieLevel: number;
  bestieXp: number;
  bestieMaxXp: number;
  avatar: {
    hairStyle: string;
    hairColor: string;
    skinTone: string;
    topId?: string;
    bottomId?: string;
    shoesId?: string;
    accessoryId?: string;
  };
}

export interface Quest {
  id: string;
  templateId?: string;
  title: string;
  description: string;
  rewardSp: number;
  rewardBestieXp: number;
  progress: number;
  target: number;
  completed: boolean;
  claimed: boolean;
  type: 'daily' | 'achievement';
}

export interface ShopItem {
  id: string;
  name: string;
  category: Category;
  rarity: Rarity;
  vibe: AestheticVibe;
  priceSp: number;
  imageType: ClothingItem['imageType'];
  color: string;
  isLimited?: boolean;
}
