import { AestheticVibe, Category, ClothingItem, Quest, Rarity, SavedOutfit, UserProfile } from '../types';

export type ProfileRow = {
  id: string;
  user_id: string;
  name: string;
  level: number;
  title: string;
  sp: number;
  streak_days: number;
  bestie_level: number;
  bestie_xp: number;
  bestie_max_xp: number;
  avatar_data: UserProfile['avatar'] | null;
};

export type ClothingItemRow = {
  id: string;
  user_id: string;
  name: string;
  category: string;
  rarity: string;
  vibe: string;
  wear_count: number;
  condition: number;
  image_type: ClothingItem['imageType'] | string;
  image_url: string | null;
  color: string;
  tags: string[] | null;
  days_since_last_worn: number;
  is_favorite: boolean;
  acquired_date: string;
  resale_value: number | null;
};

export type SavedOutfitRow = {
  id: string;
  user_id: string;
  name: string;
  occasion: string;
  item_ids: string[] | null;
  score: number;
  vibe: string;
  created_at: string;
  worn_count: number;
};

export type QuestRow = {
  id: string;
  user_id: string;
  quest_template_id: string;
  title: string;
  description: string;
  reward_sp: number;
  reward_bestie_xp: number;
  progress: number;
  target: number;
  completed: boolean;
  claimed: boolean;
  type: Quest['type'] | string;
};

export const toProfile = (row: ProfileRow): UserProfile => ({
  name: row.name,
  level: row.level,
  title: row.title,
  sp: row.sp,
  streakDays: row.streak_days,
  bestieLevel: row.bestie_level,
  bestieXp: row.bestie_xp,
  bestieMaxXp: row.bestie_max_xp,
  avatar: row.avatar_data || {
    hairStyle: 'bob',
    hairColor: '#b39ddb',
    skinTone: '#ffd8be',
  },
});

export const toProfileUpdate = (profile: Partial<UserProfile>) => ({
  ...(profile.name !== undefined ? { name: profile.name } : {}),
  ...(profile.level !== undefined ? { level: profile.level } : {}),
  ...(profile.title !== undefined ? { title: profile.title } : {}),
  ...(profile.sp !== undefined ? { sp: profile.sp } : {}),
  ...(profile.streakDays !== undefined ? { streak_days: profile.streakDays } : {}),
  ...(profile.bestieLevel !== undefined ? { bestie_level: profile.bestieLevel } : {}),
  ...(profile.bestieXp !== undefined ? { bestie_xp: profile.bestieXp } : {}),
  ...(profile.bestieMaxXp !== undefined ? { bestie_max_xp: profile.bestieMaxXp } : {}),
  ...(profile.avatar !== undefined ? { avatar_data: profile.avatar } : {}),
});

export const toClothingItem = (row: ClothingItemRow): ClothingItem => ({
  id: row.id,
  name: row.name,
  category: row.category as Category,
  rarity: row.rarity as Rarity,
  vibe: row.vibe as AestheticVibe,
  wearCount: row.wear_count,
  condition: row.condition,
  imageType: row.image_type as ClothingItem['imageType'],
  customImageUrl: row.image_url || undefined,
  color: row.color,
  tags: Array.isArray(row.tags) ? row.tags : [],
  daysSinceLastWorn: row.days_since_last_worn,
  isFavorite: row.is_favorite,
  acquiredDate: row.acquired_date,
  resaleValue: row.resale_value || undefined,
});

export const toClothingInsert = (item: Omit<ClothingItem, 'id'> | ClothingItem) => ({
  name: item.name,
  category: item.category,
  rarity: item.rarity,
  vibe: item.vibe,
  wear_count: item.wearCount,
  condition: item.condition,
  image_type: item.imageType,
  image_url: item.customImageUrl || null,
  color: item.color,
  tags: item.tags,
  days_since_last_worn: item.daysSinceLastWorn,
  is_favorite: item.isFavorite,
  acquired_date: item.acquiredDate,
  resale_value: item.resaleValue || null,
});

export const toClothingUpdate = (item: Partial<ClothingItem>) => ({
  ...(item.name !== undefined ? { name: item.name } : {}),
  ...(item.category !== undefined ? { category: item.category } : {}),
  ...(item.rarity !== undefined ? { rarity: item.rarity } : {}),
  ...(item.vibe !== undefined ? { vibe: item.vibe } : {}),
  ...(item.wearCount !== undefined ? { wear_count: item.wearCount } : {}),
  ...(item.condition !== undefined ? { condition: item.condition } : {}),
  ...(item.imageType !== undefined ? { image_type: item.imageType } : {}),
  ...(item.customImageUrl !== undefined ? { image_url: item.customImageUrl || null } : {}),
  ...(item.color !== undefined ? { color: item.color } : {}),
  ...(item.tags !== undefined ? { tags: item.tags } : {}),
  ...(item.daysSinceLastWorn !== undefined ? { days_since_last_worn: item.daysSinceLastWorn } : {}),
  ...(item.isFavorite !== undefined ? { is_favorite: item.isFavorite } : {}),
  ...(item.acquiredDate !== undefined ? { acquired_date: item.acquiredDate } : {}),
  ...(item.resaleValue !== undefined ? { resale_value: item.resaleValue || null } : {}),
});

export const toSavedOutfit = (row: SavedOutfitRow): SavedOutfit => ({
  id: row.id,
  name: row.name,
  occasion: row.occasion,
  itemIds: Array.isArray(row.item_ids) ? row.item_ids : [],
  score: Number(row.score),
  vibe: row.vibe,
  createdAt: row.created_at,
  wornCount: row.worn_count,
});

export const toSavedOutfitInsert = (
  outfit: Omit<SavedOutfit, 'id' | 'createdAt'>
) => ({
  name: outfit.name,
  occasion: outfit.occasion,
  item_ids: outfit.itemIds,
  score: outfit.score,
  vibe: outfit.vibe,
  worn_count: outfit.wornCount,
});

export const toQuest = (row: QuestRow): Quest => ({
  id: row.id,
  templateId: row.quest_template_id,
  title: row.title,
  description: row.description,
  rewardSp: row.reward_sp,
  rewardBestieXp: row.reward_bestie_xp,
  progress: row.progress,
  target: row.target,
  completed: row.completed,
  claimed: row.claimed,
  type: row.type as Quest['type'],
});

export const toQuestInsert = (quest: Quest) => ({
  quest_template_id: quest.templateId || quest.id,
  title: quest.title,
  description: quest.description,
  reward_sp: quest.rewardSp,
  reward_bestie_xp: quest.rewardBestieXp,
  progress: quest.progress,
  target: quest.target,
  completed: quest.completed,
  claimed: quest.claimed,
  type: quest.type,
});
