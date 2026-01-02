import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Service role client for admin operations (use server-side only)
export const getServiceRoleClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

// Database types
export type HeroSection = {
  id: string
  greeting_text: string
  name: string
  description: string
  cta_text: string
  cta_link: string
  hero_image_url: string
  portfolio_link: string
  linkedin_link: string
  availability_text: string
  education_text: string
  institution: string
  role_title: string
  projects_count: string
  role_description: string
  created_at: string
  updated_at: string
}

export type AboutSection = {
  id: string
  heading: string
  phone: string
  email: string
  cv_url: string
  image1_url: string
  image2_url: string
  created_at: string
  updated_at: string
}

export type Skill = {
  id: string
  name: string
  order_index: number
  is_active: boolean
  created_at: string
}

export type Service = {
  id: string
  title: string
  icon_class: string
  order_index: number
  is_active: boolean
  created_at: string  
}

export type SoftSkill = {
  id: string
  title: string
  description: string
  icon_class: string
  order_index: number
  is_active: boolean
  created_at: string
}

export type Project = {
  id: string
  title: string
  description: string
  image_url: string
  live_url: string
  github_url?: string
  order_index: number
  is_featured: boolean
  is_active: boolean
  created_at: string
}

export type Stats = {
  id: string
  months_experience: number
  projects_completed: number
  professionalism_percent: number
  video_thumbnail_url: string
  created_at: string
  updated_at: string
}

export type ContactInfo = {
  id: string
  email: string
  linkedin_url: string
  address_1: string
  address_2: string
  footer_name: string
  copyright_text: string
  created_at: string
  updated_at: string
}

export type SiteSettings = {
  id: string
  meta_title: string
  meta_description: string
  og_image_url: string
  favicon_url: string
  logo_url: string
  google_analytics_id?: string
  facebook_pixel_id?: string
  created_at: string
  updated_at: string
}

export type User = {
  id: string
  email: string
  password_hash: string
  role: string
  created_at: string
}
