import { NextResponse } from 'next/server'
import { auth_login} from "@/app/actions/auth";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    const isAuthenticated = await auth_login();
    if (!((isAuthenticated).ok)) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/details/:path*', '/dashboard/:path*'],
}