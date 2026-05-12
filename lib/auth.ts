import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { queryOne } from './db';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'gemora-minerals-admin-secret-key-change-in-production'
);

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

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
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
  const user = await queryOne<AdminUser & { password_hash: string }>(
    'SELECT id, email, name, role, password_hash, created_at FROM admin_users WHERE email = $1',
    [email]
  );
  
  if (!user) return null;
  
  const isValid = await verifyPassword(password, user.password_hash);
  if (!isValid) return null;
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password_hash, ...adminUser } = user;
  return adminUser;
}
