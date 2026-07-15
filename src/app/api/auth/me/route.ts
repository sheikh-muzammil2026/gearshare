import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // সার্ভার সাইড থেকে কুকি রিড করা (যা httpOnly হলেও করা যায়)
  const cookieHeader = request.headers.get('cookie') || '';
  const isLoggedIn = cookieHeader.includes('user_session=');

  return NextResponse.json({ isLoggedIn });
}
