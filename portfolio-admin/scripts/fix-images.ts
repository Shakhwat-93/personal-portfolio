
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

async function fixImages() {
    const envPath = path.join(process.cwd(), '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const env: Record<string, string> = {};
    envContent.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) env[key.trim()] = value.trim();
    });

    const supabase = createClient(env['NEXT_PUBLIC_SUPABASE_URL'], env['SUPABASE_SERVICE_ROLE_KEY']);

    console.log('--- Fixing Missing Images ---');

    // 1. Fix Hero Image
    const { error: heroError } = await supabase
        .from('hero_section')
        .update({
            hero_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop' // Professional Headshot
        })
        .neq('hero_image_url', 'http%'); // Only update if it looks bad or is default

    if (heroError) console.error('Hero Update Error:', heroError.message);
    else console.log('✅ Hero image updated.');

    // 2. Fix About Images
    const { error: aboutError } = await supabase
        .from('about_section')
        .update({
            image1_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1000&auto=format&fit=crop', // Coding setup
            image2_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop'  // Laptop
        })
        .neq('image1_url', 'http%');

    if (aboutError) console.error('About Update Error:', aboutError.message);
    else console.log('✅ About images updated.');

    // 3. Fix Project Images (Loop through all projects)
    const { data: projects } = await supabase.from('projects').select('id');
    if (projects) {
        for (const p of projects) {
            await supabase.from('projects').update({
                image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop' // Code screen
            }).eq('id', p.id);
        }
        console.log('✅ Project images updated.');
    }

    // 4. Fix Stats Video Thumbnail
    await supabase.from('stats').update({
        video_thumbnail_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop'
    }).neq('video_thumbnail_url', 'http%');
    console.log('✅ Stats thumbnail updated.');

    // 5. Fix Site Logo / Favicon
    await supabase.from('site_settings').update({
        logo_url: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', // Generic Profile Icon
        favicon_url: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        og_image_url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1000&auto=format&fit=crop'
    }).neq('logo_url', 'http%');
    console.log('✅ Site settings updated.');

}

fixImages();
