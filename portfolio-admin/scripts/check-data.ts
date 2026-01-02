
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

async function checkData() {
    const envPath = path.join(process.cwd(), '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const env: Record<string, string> = {};
    envContent.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) env[key.trim()] = value.trim();
    });

    const supabase = createClient(env['NEXT_PUBLIC_SUPABASE_URL'], env['SUPABASE_SERVICE_ROLE_KEY']);

    const tables = [
        'hero_section', 'about_section', 'skills', 'services',
        'soft_skills', 'projects', 'stats', 'contact_info', 'site_settings'
    ];

    console.log('--- Checking Database Content ---');
    for (const table of tables) {
        const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true });
        if (error) {
            console.error(`❌ ${table}: Error - ${error.message}`);
        } else {
            console.log(`${count === 0 ? '⚠️' : '✅'} ${table}: ${count} rows`);
        }
    }
}

checkData();
