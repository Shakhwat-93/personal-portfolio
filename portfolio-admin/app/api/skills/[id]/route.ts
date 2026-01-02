import { NextRequest, NextResponse } from 'next/server';
import { getServiceRoleClient } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth';

//PUT - Update skill
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const auth = await requireAuth(request);

    if (!auth.authorized) {
        return auth.response;
    }

    try {
        const { id } = await params;
        const body = await request.json();
        const supabaseAdmin = getServiceRoleClient();

        const { data, error } = await supabaseAdmin
            .from('skills')
            .update(body)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            return NextResponse.json(
                { error: 'Failed to update skill' },
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

// DELETE - Delete skill
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const auth = await requireAuth(request);

    if (!auth.authorized) {
        return auth.response;
    }

    try {
        const { id } = await params;
        const supabaseAdmin = getServiceRoleClient();

        const { error } = await supabaseAdmin
            .from('skills')
            .delete()
            .eq('id', id);

        if (error) {
            return NextResponse.json(
                { error: 'Failed to delete skill' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
