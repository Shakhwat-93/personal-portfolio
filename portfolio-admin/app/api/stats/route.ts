import { NextRequest, NextResponse } from 'next/server';
import { supabase, getServiceRoleClient } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth';

// GET - Fetch stats
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('stats')
            .select('*')
            .single();

        if (error) {
            return NextResponse.json(
                { error: 'Failed to fetch stats' },
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

// PUT - Update stats
export async function PUT(request: NextRequest) {
    const auth = await requireAuth(request);

    if (!auth.authorized) {
        return auth.response;
    }

    try {
        const body = await request.json();
        const supabaseAdmin = getServiceRoleClient();

        const { data: existing } = await supabaseAdmin
            .from('stats')
            .select('id')
            .single();

        if (!existing) {
            return NextResponse.json(
                { error: 'Stats not found' },
                { status: 404 }
            );
        }

        const { data, error } = await supabaseAdmin
            .from('stats')
            .update({
                ...body,
                updated_at: new Date().toISOString(),
            })
            .eq('id', existing.id)
            .select()
            .single();

        if (error) {
            return NextResponse.json(
                { error: 'Failed to update stats' },
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
