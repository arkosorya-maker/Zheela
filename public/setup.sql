-- Run this in your Supabase SQL Editor

-- 1. Create a table to hold dynamic content
CREATE TABLE IF NOT EXISTS site_content (
  section_key text PRIMARY KEY,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Turn on Row Level Security (RLS) but allow anonymous access since we don't have login
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON site_content FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON site_content FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON site_content FOR UPDATE USING (true);

-- Insert default rows so they can be updated
INSERT INTO site_content (section_key, content) VALUES
('profile', '{"image_url": "/profile.png"}'),
('translations', '{}')
ON CONFLICT (section_key) DO NOTHING;


-- 2. Setup storage for profile images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Allows public access to view files
CREATE POLICY "Avatar public read" ON storage.objects
FOR SELECT USING (bucket_id = 'avatars');

-- Allow anonymous uploads
CREATE POLICY "Avatar insert" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "Avatar update" ON storage.objects
FOR UPDATE USING (bucket_id = 'avatars');
