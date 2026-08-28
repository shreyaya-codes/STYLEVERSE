import { supabase } from '../lib/supabase';
import { ClothingItem } from '../types';
import { initialClosetItems } from '../data/mockData';
import { ClothingItemRow, toClothingInsert, toClothingItem, toClothingUpdate } from './mappers';
import { deleteClothingImage, getClothingImageUrl, uploadClothingImage } from './storageService';

const resolveImageUrls = async (items: ClothingItem[]) =>
  Promise.all(items.map(async (item) => ({
    ...item,
    customImageUrl: await getClothingImageUrl(item.customImageUrl),
  })));

export const getWardrobe = async (userId: string): Promise<ClothingItem[]> => {
  const { data, error } = await supabase
    .from('clothing_items')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return resolveImageUrls((data || []).map((row) => toClothingItem(row as ClothingItemRow)));
};

export const addClothingItem = async (
  userId: string,
  item: Omit<ClothingItem, 'id'>,
  imageFile?: File | null
): Promise<ClothingItem> => {
  const { data, error } = await supabase
    .from('clothing_items')
    .insert(toClothingInsert(item))
    .select('*')
    .single();
  if (error) throw error;

  let created = toClothingItem(data as ClothingItemRow);
  if (imageFile) {
    const imagePath = await uploadClothingImage(userId, created.id, imageFile);
    created = await updateClothingItem(userId, created.id, { customImageUrl: imagePath });
  }
  return {
    ...created,
    customImageUrl: await getClothingImageUrl(created.customImageUrl),
  };
};

export const updateClothingItem = async (
  userId: string,
  itemId: string,
  updates: Partial<ClothingItem>
): Promise<ClothingItem> => {
  const { data, error } = await supabase
    .from('clothing_items')
    .update(toClothingUpdate(updates))
    .eq('id', itemId)
    .eq('user_id', userId)
    .select('*')
    .single();
  if (error) throw error;
  const updated = toClothingItem(data as ClothingItemRow);
  return {
    ...updated,
    customImageUrl: await getClothingImageUrl(updated.customImageUrl),
  };
};

export const deleteClothingItem = async (userId: string, item: ClothingItem) => {
  await deleteClothingImage(item.customImageUrl);
  const { error } = await supabase
    .from('clothing_items')
    .delete()
    .eq('id', item.id)
    .eq('user_id', userId);
  if (error) throw error;
};

export const toggleFavorite = async (userId: string, item: ClothingItem): Promise<ClothingItem> =>
  updateClothingItem(userId, item.id, { isFavorite: !item.isFavorite });

export const recordWear = async (userId: string, item: ClothingItem): Promise<ClothingItem> =>
  updateClothingItem(userId, item.id, {
    wearCount: item.wearCount + 1,
    daysSinceLastWorn: 0,
  });

export const repairItem = async (userId: string, item: ClothingItem): Promise<ClothingItem> =>
  updateClothingItem(userId, item.id, { condition: 100 });

export const seedMockWardrobeIfEmpty = async (userId: string): Promise<ClothingItem[]> => {
  const current = await getWardrobe(userId);
  if (current.length > 0) return current;

  const { data, error } = await supabase
    .from('clothing_items')
    .insert(initialClosetItems.map((item) => {
      const { id: _id, ...rest } = item;
      return toClothingInsert(rest);
    }))
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return resolveImageUrls((data || []).map((row) => toClothingItem(row as ClothingItemRow)));
};
