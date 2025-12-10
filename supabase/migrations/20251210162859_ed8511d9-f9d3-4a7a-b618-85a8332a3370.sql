-- First create the update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create memories table for gallery media
CREATE TABLE public.memories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  description TEXT,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL DEFAULT 'image',
  storage_url TEXT,
  display_order INTEGER DEFAULT 0,
  aspect_ratio TEXT DEFAULT 'square',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.memories ENABLE ROW LEVEL SECURITY;

-- Allow public read access (this is a public anniversary site)
CREATE POLICY "Memories are viewable by everyone" 
ON public.memories 
FOR SELECT 
USING (true);

-- Make the IMAGES bucket public for gallery display
UPDATE storage.buckets SET public = true WHERE id = 'IMAGES';

-- Create storage policies for public access
CREATE POLICY "Images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'IMAGES');

-- Create trigger for updated_at
CREATE TRIGGER update_memories_updated_at
BEFORE UPDATE ON public.memories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample memories to get started
INSERT INTO public.memories (title, file_path, file_type, aspect_ratio, display_order) VALUES
('Our First Adventure', 'sample-1.jpg', 'image', 'portrait', 1),
('Sweet Moments', 'sample-2.jpg', 'image', 'landscape', 2),
('Together Forever', 'sample-3.jpg', 'image', 'square', 3),
('Sunset Love', 'sample-4.jpg', 'image', 'landscape', 4),
('Hand in Hand', 'sample-5.jpg', 'image', 'portrait', 5),
('Our Story', 'sample-6.jpg', 'image', 'square', 6);