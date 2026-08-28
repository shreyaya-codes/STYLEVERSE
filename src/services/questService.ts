import { supabase } from '../lib/supabase';
import { Quest } from '../types';
import { initialQuests } from '../data/mockData';
import { QuestRow, toQuest, toQuestInsert } from './mappers';

export const getQuests = async (userId: string): Promise<Quest[]> => {
  const { data, error } = await supabase
    .from('quests')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return (data || []).map((row) => toQuest(row as QuestRow));
};

export const seedQuestsIfEmpty = async (userId: string): Promise<Quest[]> => {
  const current = await getQuests(userId);
  if (current.length > 0) return current;

  const { data, error } = await supabase
    .from('quests')
    .upsert(initialQuests.map((quest) => toQuestInsert(quest)), {
      onConflict: 'user_id,quest_template_id',
    })
    .select('*')
    .order('created_at', { ascending: true });
  if (error) throw error;
  return (data || []).map((row) => toQuest(row as QuestRow));
};

export const updateQuestProgress = async (
  userId: string,
  quest: Quest,
  progressDelta: number
): Promise<Quest> => {
  const progress = Math.min(quest.target, quest.progress + progressDelta);
  const { data, error } = await supabase
    .from('quests')
    .update({
      progress,
      completed: progress >= quest.target,
    })
    .eq('id', quest.id)
    .eq('user_id', userId)
    .select('*')
    .single();
  if (error) throw error;
  return toQuest(data as QuestRow);
};

export const claimQuest = async (userId: string, quest: Quest): Promise<Quest> => {
  if (!quest.completed || quest.claimed) {
    throw new Error('Quest is not ready to claim');
  }

  const { data, error } = await supabase
    .from('quests')
    .update({ claimed: true })
    .eq('id', quest.id)
    .eq('user_id', userId)
    .eq('completed', true)
    .eq('claimed', false)
    .select('*')
    .single();
  if (error) throw error;
  return toQuest(data as QuestRow);
};
