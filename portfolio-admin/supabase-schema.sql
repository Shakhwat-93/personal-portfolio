-- Portfolio Admin Panel Database Schema
-- Run this SQL in your Supabase SQL Editor to create all tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table for admin authentication
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hero Section
CREATE TABLE IF NOT EXISTS hero_section (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  greeting_text TEXT DEFAULT 'Hey there, I''m',
  name TEXT DEFAULT 'Shakhwat Hossain Rasel',
  description TEXT DEFAULT 'Highly motivated Computer Science student with a strong foundation in Web Development (HTML5, CSS3, JavaScript).',
  cta_text TEXT DEFAULT 'Lets Connect',
  cta_link TEXT DEFAULT 'https://www.linkedin.com/in/shakhwat-hossain-rasel-46506628b',
  hero_image_url TEXT DEFAULT 'hero-img.jpg',
  portfolio_link TEXT DEFAULT 'https://shakhwat-93.github.io/',
  linkedin_link TEXT DEFAULT 'https://www.linkedin.com/in/shakhwat-hossain-rasel-46506628b',
  availability_text TEXT DEFAULT 'Available for IT roles',
  education_text TEXT DEFAULT 'B.Sc in CSE (Running)',
  institution TEXT DEFAULT 'Southeast University',
  role_title TEXT DEFAULT 'Web Developer',
  projects_count TEXT DEFAULT '3+',
  role_description TEXT DEFAULT 'Responsive Design Expert',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- About Section
CREATE TABLE IF NOT EXISTS about_section (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  heading TEXT DEFAULT 'I''m Shakhwat Hossain, a developer with a proven ability to quickly learn new technologies.',
  phone TEXT DEFAULT '+8801315-183993',
  email TEXT DEFAULT 'shakhwat.rasel989@gmail.com',
  cv_url TEXT DEFAULT 'Shakhwat Hossain Rasel (5).pdf',
  image1_url TEXT DEFAULT 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600',
  image2_url TEXT DEFAULT 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=600',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skills
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  icon_class TEXT DEFAULT 'fa-solid fa-code',
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Soft Skills
CREATE TABLE IF NOT EXISTS soft_skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  icon_class TEXT DEFAULT 'fa-solid fa-star',
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  live_url TEXT,
  github_url TEXT,
  order_index INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Stats
CREATE TABLE IF NOT EXISTS stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  months_experience INTEGER DEFAULT 3,
  projects_completed INTEGER DEFAULT 5,
  professionalism_percent INTEGER DEFAULT 100,
  video_thumbnail_url TEXT DEFAULT 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Info
CREATE TABLE IF NOT EXISTS contact_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT DEFAULT 'shakhwat.rasel989@gmail.com',
  linkedin_url TEXT DEFAULT 'https://www.linkedin.com/in/shakhwat-hossain-rasel-46506628b',
  address_1 TEXT DEFAULT 'Modhubag, Dhaka',
  address_2 TEXT DEFAULT 'Mahiganj, Rangpur',
  footer_name TEXT DEFAULT 'Rasel',
  copyright_text TEXT DEFAULT '2025 © Shakhwat Hossain Rasel. All rights reserved.',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Site Settings
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  meta_title TEXT DEFAULT 'Shakhwat Hossain Rasel - Web Developer',
  meta_description TEXT DEFAULT 'Portfolio of Shakhwat Hossain Rasel, Web Developer',
  og_image_url TEXT,
  favicon_url TEXT,
  logo_url TEXT DEFAULT 'Untitled design.svg',
  google_analytics_id TEXT,
  facebook_pixel_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default data

-- Hero Section (insert one row)
INSERT INTO hero_section (id) VALUES (uuid_generate_v4())
ON CONFLICT DO NOTHING;

-- About Section (insert one row)
INSERT INTO about_section (id) VALUES (uuid_generate_v4())
ON CONFLICT DO NOTHING;

-- Skills (insert default skills)
INSERT INTO skills (name, order_index) VALUES
  ('HTML5', 1),
  ('CSS3', 2),
  ('JavaScript', 3),
  ('Tailwind', 4),
  ('Wordpress', 5)
ON CONFLICT DO NOTHING;

-- Services
INSERT INTO services (title, order_index) VALUES
  ('Web Development', 1),
  ('Landing Page', 2),
  ('Responsive Design', 3),
  ('SEO Friendly Website', 4)
ON CONFLICT DO NOTHING;

-- Soft Skills  
INSERT INTO soft_skills (title, description, icon_class, order_index) VALUES
  ('Problem Solving', 'Resolving technical issues efficiently.', 'fa-solid fa-puzzle-piece', 1),
  ('Communication', 'Professional communication ensuring clarity.', 'fa-solid fa-comments', 2),
  ('Quick Learner', 'Adapt to new technologies quickly.', 'fa-solid fa-bolt', 3),
  ('Time Management', 'Work productively under pressure.', 'fa-solid fa-clock', 4)
ON CONFLICT DO NOTHING;

-- Projects
INSERT INTO projects (title, description, image_url, live_url, order_index) VALUES
  ('Responsive Food Website', 'HTML5 / CSS3 / JS', 'Screenshot 2025-11-17 003022.png', 'https://shakhwat-93.github.io/sohan-food/', 1),
  ('SaaS Website', 'Web Design', 'saas.png', 'https://shakhwat-93.github.io/Saas-website/', 2),
  ('Fresh Fruits Website', 'Development', 'fresh.png', 'https://shakhwat-93.github.io/assignment-3/', 3),
  ('Cost Management System', 'System', 'cost.png', 'https://shakhwat-93.github.io/cost-management/', 4)
ON CONFLICT DO NOTHING;

-- Stats (insert one row)
INSERT INTO stats (id) VALUES (uuid_generate_v4())
ON CONFLICT DO NOTHING;

-- Contact Info (insert one row)
INSERT INTO contact_info (id) VALUES (uuid_generate_v4())
ON CONFLICT DO NOTHING;

-- Site Settings (insert one row)
INSERT INTO site_settings (id) VALUES (uuid_generate_v4())
ON CONFLICT DO NOTHING;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at columns
CREATE TRIGGER update_hero_section_updated_at BEFORE UPDATE ON hero_section
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_about_section_updated_at BEFORE UPDATE ON about_section
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stats_updated_at BEFORE UPDATE ON stats
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_info_updated_at BEFORE UPDATE ON contact_info
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
