import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'; // 👈 নেক্সট জেএস এর অফিশিয়াল কুকি রিডার

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('user_session'); // আপনার কুকির নাম

  // যদি টোকেন থাকে, তবে isLoggedIn true হবে
  return NextResponse.json({ isLoggedIn: !!token });
}
