import { createClient } from '@supabase/supabase-js';

// Provide dummy values during build time to prevent crashes
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    if (typeof window !== 'undefined') {
        console.warn('Supabase credentials are missing. Check your integration.');
    }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

