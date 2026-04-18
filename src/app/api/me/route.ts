import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { manager, reviewer, speaker } from '@/shared/data';

export async function GET() {
  const cookiesStore = await cookies();
  const role = cookiesStore.get('demo-role')?.value;

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

  switch (role) {
    case 'manager':
      return NextResponse.json(manager);
    case 'reviewer':
      return NextResponse.json(reviewer);
    case 'speaker':
      return NextResponse.json(speaker);
  }

  return NextResponse.json(
    {
      error: {
        code: 'USER_NOT_FOUND',
        message: 'Пользователь не найден',
      },
    },
    { status: 401 },
  );
}
