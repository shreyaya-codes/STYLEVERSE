import { supabase } from '../lib/supabase';
import { SavedOutfit } from '../types';
import { SavedOutfitRow, toSavedOutfit, toSavedOutfitInsert } from './mappers';

export const getSavedOutfits = async (userId: string): Promise<SavedOutfit[]> => {
  const { data, error } = await supabase
    .from('saved_outfits')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []).map((row) => toSavedOutfit(row as SavedOutfitRow));
};

export const saveOutfit = async (
  userId: string,
  outfit: Omit<SavedOutfit, 'id' | 'createdAt'>
): Promise<SavedOutfit> => {
  const { data, error } = await supabase
    .from('saved_outfits')
    .insert(toSavedOutfitInsert(outfit))
    .select('*')
    .single();
  if (error) throw error;
  return toSavedOutfit(data as SavedOutfitRow);
};

export const recordOutfitWear = async (
  userId: string,
  outfit: SavedOutfit
): Promise<SavedOutfit> => {
  const { data, error } = await supabase
    .from('saved_outfits')
    .update({ worn_count: outfit.wornCount + 1 })
    .eq('id', outfit.id)
    .eq('user_id', userId)
    .select('*')
    .single();
  if (error) throw error;
  return toSavedOutfit(data as SavedOutfitRow);
};
