import { NextRequest, NextResponse } from 'next/server';
import { supabase, getServiceRoleClient } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth';

// GET - Fetch site settings
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('site_settings')
            .select('*')
            .single();

        if (error) {
            return NextResponse.json(
                { error: 'Failed to fetch site settings' },
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

// PUT - Update site settings
export async function PUT(request: NextRequest) {
    const auth = await requireAuth(request);

    if (!auth.authorized) {
        return auth.response;
    }

    try {
        const body = await request.json();
        const supabaseAdmin = getServiceRoleClient();

        const { data: existing } = await supabaseAdmin
            .from('site_settings')
            .select('id')
            .single();

        if (!existing) {
            return NextResponse.json(
                { error: 'Site settings not found' },
                { status: 404 }
            );
        }

        const { data, error } = await supabaseAdmin
            .from('site_settings')
            .update({
                ...body,
                updated_at: new Date().toISOString(),
            })
            .eq('id', existing.id)
            .select()
            .single();

        if (error) {
            return NextResponse.json(
                { error: 'Failed to update site settings' },
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
