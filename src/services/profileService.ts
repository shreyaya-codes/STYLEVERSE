import { supabase } from '../lib/supabase';
import { UserProfile } from '../types';
import { initialUserProfile } from '../data/mockData';
import { ProfileRow, toProfile, toProfileUpdate } from './mappers';

export const getProfile = async (userId: string): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) throw error;
  return data ? toProfile(data as ProfileRow) : null;
};

export const createProfile = async (
  userId: string,
  profile: UserProfile = initialUserProfile
): Promise<UserProfile> => {
  const { data, error } = await supabase
    .from('profiles')
    .insert({
      name: profile.name,
      level: profile.level,
      title: profile.title,
      sp: profile.sp,
      streak_days: profile.streakDays,
      bestie_level: profile.bestieLevel,
      bestie_xp: profile.bestieXp,
      bestie_max_xp: profile.bestieMaxXp,
      avatar_data: profile.avatar,
    })
    .select('*')
    .single();
  if (error) throw error;
  return toProfile(data as ProfileRow);
};

export const ensureProfile = async (userId: string): Promise<UserProfile> => {
  const existing = await getProfile(userId);
  if (existing) return existing;
  return createProfile(userId);
};

export const updateProfile = async (
  userId: string,
  profile: Partial<UserProfile>
): Promise<UserProfile> => {
  const { data, error } = await supabase
    .from('profiles')
    .update(toProfileUpdate(profile))
    .eq('user_id', userId)
    .select('*')
    .single();
  if (error) throw error;
  return toProfile(data as ProfileRow);
};
