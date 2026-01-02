import { NextRequest, NextResponse } from 'next/server';
import { supabase, getServiceRoleClient } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth';

// GET - Fetch all projects
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('is_active', true)
            .order('order_index', { ascending: true });

        if (error) {
            return NextResponse.json(
                { error: 'Failed to fetch projects' },
                { status: 500 }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// POST - Create new project
export async function POST(request: NextRequest) {
    const auth = await requireAuth(request);

    if (!auth.authorized) {
        return auth.response;
    }

    try {
        const body = await request.json();
        const supabaseAdmin = getServiceRoleClient();

        const { data, error } = await supabaseAdmin
            .from('projects')
            .insert(body)
            .select()
            .single();

        if (error) {
            return NextResponse.json(
                { error: 'Failed to create project' },
                { status: 500 }
            );
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
