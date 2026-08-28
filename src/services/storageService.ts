import { supabase } from '../lib/supabase';

const CLOTHING_BUCKET = 'clothing-images';

const getExtension = (file: File) => {
  const fromName = file.name.split('.').pop();
  if (fromName) return fromName.toLowerCase();
  return file.type.split('/').pop() || 'jpg';
};

export const uploadClothingImage = async (
  userId: string,
  itemId: string,
  file: File
): Promise<string> => {
  const path = `clothing/${userId}/${itemId}/image.${getExtension(file)}`;
  const { error } = await supabase.storage
    .from(CLOTHING_BUCKET)
    .upload(path, file, { upsert: true, contentType: file.type });
  if (error) throw error;
  return path;
};

export const deleteClothingImage = async (imagePath?: string) => {
  if (!imagePath || imagePath.startsWith('blob:') || imagePath.startsWith('http')) return;
  const { error } = await supabase.storage.from(CLOTHING_BUCKET).remove([imagePath]);
  if (error) throw error;
};

export const getClothingImageUrl = async (imagePath?: string): Promise<string | undefined> => {
  if (!imagePath) return undefined;
  if (imagePath.startsWith('blob:') || imagePath.startsWith('http')) return imagePath;
  const { data, error } = await supabase.storage.from(CLOTHING_BUCKET).createSignedUrl(imagePath, 60 * 60);
  if (error) throw error;
  return data.signedUrl;
};
