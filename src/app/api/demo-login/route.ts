import { PostDemoLoginRequest } from '@/shared/api/contracts/auth.contract';
import { ErrorEnvelope } from '@/shared/types/api.types';
import { NextResponse } from 'next/server';

const allowedDemoRoles = ['manager', 'reviewer', 'speaker'] as const;

export async function POST(request: Request) {
  const body = (await request.json()) as PostDemoLoginRequest; //Провалидировать
  const role = body.role;

  const isRoleAllowed = allowedDemoRoles.includes(role);

  if (!isRoleAllowed) {
    return NextResponse.json(
      {
        error: {
          code: 'INVALID_ROLE',
          message: 'Недопустимая demo-роль',
        },
      } satisfies ErrorEnvelope,
      { status: 400 },
    );
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set('demo-role', role, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });

  return response;
}
