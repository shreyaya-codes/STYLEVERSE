import { supabase } from '../lib/supabase';

export type PurchaseAnalysisInput = {
  itemName: string;
  imageUrl?: string | null;
  compatibilityScore?: number | null;
  similarItems?: unknown[];
  newOutfitCount?: number;
  wardrobeGap?: boolean;
  predictedCostPerWear?: number | null;
  decision?: string | null;
};

export const getPurchaseAnalyses = async (userId: string) => {
  const { data, error } = await supabase
    .from('purchase_analyses')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
};

export const createPurchaseAnalysis = async (
  userId: string,
  analysis: PurchaseAnalysisInput
) => {
  const { data, error } = await supabase
    .from('purchase_analyses')
    .insert({
      item_name: analysis.itemName,
      image_url: analysis.imageUrl || null,
      compatibility_score: analysis.compatibilityScore || null,
      similar_items: analysis.similarItems || [],
      new_outfit_count: analysis.newOutfitCount || 0,
      wardrobe_gap: analysis.wardrobeGap || false,
      predicted_cost_per_wear: analysis.predictedCostPerWear || null,
      decision: analysis.decision || null,
    })
    .select('*')
    .single();
  if (error) throw error;
  return data;
};
