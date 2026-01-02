import { NextRequest, NextResponse } from 'next/server';
import { supabase, getServiceRoleClient } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth';

// GET - Fetch contact info
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('contact_info')
            .select('*')
            .single();

        if (error) {
            return NextResponse.json(
                { error: 'Failed to fetch contact info' },
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

// PUT - Update contact info
export async function PUT(request: NextRequest) {
    const auth = await requireAuth(request);

    if (!auth.authorized) {
        return auth.response;
    }

    try {
        const body = await request.json();
        const supabaseAdmin = getServiceRoleClient();

        const { data: existing } = await supabaseAdmin
            .from('contact_info')
            .select('id')
            .single();

        if (!existing) {
            return NextResponse.json(
                { error: 'Contact info not found' },
                { status: 404 }
            );
        }

        const { data, error } = await supabaseAdmin
            .from('contact_info')
            .update({
                ...body,
                updated_at: new Date().toISOString(),
            })
            .eq('id', existing.id)
            .select()
            .single();

        if (error) {
            return NextResponse.json(
                { error: 'Failed to update contact info' },
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
