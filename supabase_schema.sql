-- PROFILE TABLE
CREATE TABLE profile (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  location TEXT,
  bio TEXT,
  image_url TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  facebook_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- HERO CONTENT TABLE
CREATE TABLE hero_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  heading_line1 TEXT NOT NULL,
  heading_line2 TEXT NOT NULL,
  highlight_text TEXT NOT NULL,
  subtext TEXT,
  experience_stat TEXT,
  projects_stat TEXT,
  tech_stack_stat TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PROJECTS TABLE
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT,
  image_url TEXT,
  link TEXT,
  year TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SKILLS TABLE
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL,
  items TEXT[] NOT NULL,
  display_order INTEGER DEFAULT 0
);

-- ABOUT SECTION TABLE
CREATE TABLE about_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- EDUCATION TABLE
CREATE TABLE education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  degree TEXT NOT NULL,
  institution TEXT NOT NULL,
  duration TEXT,
  display_order INTEGER DEFAULT 0
);

-- EXPERIENCE TABLE
CREATE TABLE experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  duration TEXT,
  description TEXT,
  display_order INTEGER DEFAULT 0
);

-- STORAGE SETUP
-- Run this in the Supabase SQL Editor to DEFINITIVELY unlock your 'portfolio' bucket

-- 1. Ensure the bucket is public and exists
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio', 'portfolio', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. RESET: Clear ALL existing storage policies to start fresh
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Portfolio_Insert" ON storage.objects;
DROP POLICY IF EXISTS "Portfolio_Update" ON storage.objects;
DROP POLICY IF EXISTS "Portfolio_Delete" ON storage.objects;
DROP POLICY IF EXISTS "Anon Upload Access" ON storage.objects;
DROP POLICY IF EXISTS "Anon Delete Access" ON storage.objects;
DROP POLICY IF EXISTS "Master_Unlock_Portfolio" ON storage.objects;
DROP POLICY IF EXISTS "View Buckets" ON storage.buckets;

-- 3. THE FREEDOM POLICY
-- This is the "God Mode" policy. It allows anyone to do anything to the 'portfolio' bucket.
CREATE POLICY "Absolute_Freedom"
ON storage.objects FOR ALL
TO public, anon, authenticated
USING (bucket_id = 'portfolio')
WITH CHECK (bucket_id = 'portfolio');

-- 4. Make bucket metadata visible
CREATE POLICY "Visible_Buckets"
ON storage.buckets FOR SELECT
TO public, anon, authenticated
USING (id = 'portfolio');





