import { cookies } from 'next/headers';

/**
 * Clear any session-related cookies for the current request lifecycle.
 * This is a lightweight placeholder aligned with the existing session helpers.
 */
export async function clearSession() {
  const store = cookies();

  for (const cookie of store.getAll()) {
    if (cookie.name.toLowerCase().includes('session') || cookie.name === 'currentUser') {
      store.delete(cookie.name);
    }
  }
}
