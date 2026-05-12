import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'gemora-minerals-admin-secret-key-change-in-production'
);

// Demo admin user - In production, connect to PostgreSQL database
const DEMO_ADMIN = {
  id: 1,
  email: 'admin@gemora.com',
  password: 'admin123',
  name: 'Admin User',
  role: 'admin',
  created_at: new Date(),
};

export interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: string;
  created_at: Date;
}

export interface SessionPayload {
  userId: number;
  email: string;
  name: string;
  role: string;
  expiresAt: Date;
}

export async function createSession(user: AdminUser): Promise<string> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  
  const token = await new SignJWT({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    expiresAt: expiresAt.toISOString(),
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
  
  const cookieStore = await cookies();
  cookieStore.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  });
  
  return token;
}

export async function verifySession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;
  
  if (!token) return null;
  
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
}

export async function authenticateAdmin(email: string, password: string): Promise<AdminUser | null> {
  // Demo mode - check against demo credentials
  // In production, replace this with database query
  if (email === DEMO_ADMIN.email && password === DEMO_ADMIN.password) {
    return {
      id: DEMO_ADMIN.id,
      email: DEMO_ADMIN.email,
      name: DEMO_ADMIN.name,
      role: DEMO_ADMIN.role,
      created_at: DEMO_ADMIN.created_at,
    };
  }
  
  return null;
}
