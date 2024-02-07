import { type NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
	const atk = request.cookies.get('atk');
	const url = request.nextUrl.clone();
	url.pathname = '/login';
	if (!atk) {
		return NextResponse.redirect(url);
	}
}

export const config = {
	matcher: '/',
};
