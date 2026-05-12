'use server';

import { authenticateAdmin, createSession, deleteSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function loginAction(
  prevState: { error: string | null },
  formData: FormData
): Promise<{ error: string | null }> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  try {
    const user = await authenticateAdmin(email, password);
    
    if (!user) {
      return { error: 'Invalid email or password' };
    }

    await createSession(user);
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'An error occurred during login. Please check your database connection.' };
  }

  redirect('/admin');
}

export async function logoutAction(): Promise<void> {
  await deleteSession();
  redirect('/admin/login');
}
