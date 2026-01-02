
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

async function verify() {
    console.log('Reading credentials...');
    const envPath = path.join(process.cwd(), 'ENV_TEMPLATE.txt');
    let envContent = '';
    try {
        envContent = fs.readFileSync(envPath, 'utf-8');
    } catch (e) {
        console.error('Failed to read ENV_TEMPLATE.txt');
        return;
    }

    const env: Record<string, string> = {};
    envContent.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            env[key.trim()] = value.trim();
        }
    });

    const url = env['NEXT_PUBLIC_SUPABASE_URL'];
    const key = env['SUPABASE_SERVICE_ROLE_KEY'];
    const email = env['ADMIN_EMAIL'];
    const password = env['ADMIN_PASSWORD'];

    if (!url || !key || !email || !password) {
        console.error('Missing credentials.');
        return;
    }

    const supabase = createClient(url, key);

    console.log('Checking database...');

    // 1. Check if tables exist (users)
    const { error: tableError } = await supabase.from('users').select('id').limit(1);
    if (tableError) {
        console.error('❌ Table check failed:', tableError.message);
        if (tableError.code === '42P01') {
            console.log('⚠️ TABLES DO NOT EXIST. Please run the SQL migration schema in Supabase Dashboard.');
        }
        return;
    }

    // 2. Check if admin user exists
    const { data: users, error: userError } = await supabase.from('users').select('*').eq('email', email).single();

    if (userError && userError.code !== 'PGRST116') { // PGRST116 is "The result contains 0 rows"
        console.error('Error checking user:', userError.message);
        return;
    }

    if (users) {
        console.log('✅ Admin user already exists. You can log in.');
    } else {
        console.log('⚠️ Admin user not found. Creating...');
        const hashedPassword = await bcrypt.hash(password, 10);
        const { error: createError } = await supabase.from('users').insert({
            email,
            password_hash: hashedPassword,
            role: 'admin'
        });

        if (createError) {
            console.error('❌ Failed to create admin user:', createError.message);
        } else {
            console.log('✅ Admin user created successfully!');
        }
    }
}

verify();
