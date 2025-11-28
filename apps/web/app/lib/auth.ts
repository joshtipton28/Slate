import { cookies } from 'next/headers';

export type SessionUser = {
  id: string;
  email: string | null;
  name?: string | null;
  role: string;
};

/**
 * Retrieve the current user from a serialized cookie payload.
 * This mirrors the shape expected by the layouts and CurrentUserMenu.
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  const userCookie = cookies().get('currentUser')?.value;
  if (!userCookie) return null;

  try {
    return JSON.parse(userCookie) as SessionUser;
  } catch (error) {
    console.warn('Unable to parse currentUser cookie', error);
    return null;
  }
}
