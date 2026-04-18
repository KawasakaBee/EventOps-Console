import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookiesStore = await cookies();
  const role = cookiesStore.get('demo-role');

  if (!role) {
    return NextResponse.json(
      {
        error: {
          code: 'ROLE_NOT_FOUND',
          message: 'Роль не найдена',
        },
      },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.delete('demo-role');

  return response;
}
