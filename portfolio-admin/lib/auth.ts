import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-secret-key'
);

export interface TokenPayload {
    userId: string;
    email: string;
    role: string;
}

export async function signToken(payload: TokenPayload): Promise<string> {
    const token = await new jose.SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(JWT_SECRET);

    return token;
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
    try {
        const { payload } = await jose.jwtVerify(token, JWT_SECRET);
        return payload as TokenPayload;
    } catch (error) {
        return null;
    }
}

export async function getTokenFromRequest(
    request: NextRequest
): Promise<string | null> {
    const authHeader = request.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
        return authHeader.substring(7);
    }

    // Also check cookies
    const token = request.cookies.get('auth-token')?.value;
    return token || null;
}

export async function requireAuth(
    request: NextRequest
): Promise<{ authorized: true; user: TokenPayload } | { authorized: false; response: NextResponse }> {
    const token = await getTokenFromRequest(request);

    if (!token) {
        return {
            authorized: false,
            response: NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            ),
        };
    }

    const payload = await verifyToken(token);

    if (!payload) {
        return {
            authorized: false,
            response: NextResponse.json(
                { error: 'Invalid or expired token' },
                { status: 401 }
            ),
        };
    }

    return { authorized: true, user: payload };
}
