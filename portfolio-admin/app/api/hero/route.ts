import { NextRequest, NextResponse } from 'next/server';
import { supabase, getServiceRoleClient } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth';

// GET - Fetch hero section data (public endpoint)
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('hero_section')
            .select('*')
            .single();

        if (error) {
            return NextResponse.json(
                { error: 'Failed to fetch hero data' },
                { status: 500 }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Get hero error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// PUT - Update hero section (admin only)
export async function PUT(request: NextRequest) {
    const auth = await requireAuth(request);

    if (!auth.authorized) {
        return auth.response;
    }

    try {
        const body = await request.json();
        const supabaseAdmin = getServiceRoleClient();

        // First get the existing record ID
        const { data: existing } = await supabaseAdmin
            .from('hero_section')
            .select('id')
            .single();

        if (!existing) {
            return NextResponse.json(
                { error: 'Hero section not found' },
                { status: 404 }
            );
        }

        // Update the record
        const { data, error } = await supabaseAdmin
            .from('hero_section')
            .update({
                ...body,
                updated_at: new Date().toISOString(),
            })
            .eq('id', existing.id)
            .select()
            .single();

        if (error) {
            console.error('Update error:', error);
            return NextResponse.json(
                { error: 'Failed to update hero section' },
                { status: 500 }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Update hero error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
