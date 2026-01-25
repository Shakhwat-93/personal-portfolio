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
