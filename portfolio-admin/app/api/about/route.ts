import { NextRequest, NextResponse } from 'next/server';
import { supabase, getServiceRoleClient } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth';

// GET - Fetch about section
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('about_section')
            .select('*')
            .single();

        if (error) {
            return NextResponse.json(
                { error: 'Failed to fetch about data' },
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

// PUT - Update about section
export async function PUT(request: NextRequest) {
    const auth = await requireAuth(request);

    if (!auth.authorized) {
        return auth.response;
    }

    try {
        const body = await request.json();
        const supabaseAdmin = getServiceRoleClient();

        const { data: existing } = await supabaseAdmin
            .from('about_section')
            .select('id')
            .single();

        if (!existing) {
            return NextResponse.json(
                { error: 'About section not found' },
                { status: 404 }
            );
        }

        const { data, error } = await supabaseAdmin
            .from('about_section')
            .update({
                ...body,
                updated_at: new Date().toISOString(),
            })
            .eq('id', existing.id)
            .select()
            .single();

        if (error) {
            return NextResponse.json(
                { error: 'Failed to update about section' },
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
