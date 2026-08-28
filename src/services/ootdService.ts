import { supabase } from '../lib/supabase';

export type OotdEntryInput = {
  outfitId?: string | null;
  date: string;
  location?: string | null;
  occasion?: string | null;
  weather?: Record<string, unknown> | null;
  rating?: number | null;
  photoUrl?: string | null;
};

export const getOotdEntries = async (userId: string) => {
  const { data, error } = await supabase
    .from('ootd_entries')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false });
  if (error) throw error;
  return data || [];
};

export const createOotdEntry = async (userId: string, entry: OotdEntryInput) => {
  const { data, error } = await supabase
    .from('ootd_entries')
    .insert({
      outfit_id: entry.outfitId || null,
      date: entry.date,
      location: entry.location || null,
      occasion: entry.occasion || null,
      weather: entry.weather || null,
      rating: entry.rating || null,
      photo_url: entry.photoUrl || null,
    })
    .select('*')
    .single();
  if (error) throw error;
  return data;
};
