import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only authorized for admin routes
    if (pathname.startsWith('/admin')) {
        const token = request.cookies.get('auth-token')?.value;

        // If on login page
        if (pathname === '/admin/login') {
            if (token) {
                // Verify token logic could be here, but for middleware speed just check existence
                // Usually we want to verify it, but `verifyToken` uses `jose` which is Edge compatible.
                // Let's verify to be safe.
                const payload = await verifyToken(token);
                if (payload) {
                    return NextResponse.redirect(new URL('/admin', request.url));
                }
            }
            // Allow access to login if no token or invalid
            return NextResponse.next();
        }

        // Protected admin routes
        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        const payload = await verifyToken(token);
        if (!payload) {
            // Invalid token, clear it and redirect
            const response = NextResponse.redirect(new URL('/admin/login', request.url));
            response.cookies.delete('auth-token');
            return response;
        }

        // Authorized
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
