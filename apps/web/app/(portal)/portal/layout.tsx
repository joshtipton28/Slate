import { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { CurrentUserMenu } from '../../components/CurrentUserMenu';
import { getCurrentUser } from '../../lib/auth';

export default async function PortalLayout({ children }: { children: ReactNode }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect('/auth/sign-in');
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.25rem',
          borderBottom: '1px solid #e2e8f0',
          background: '#fff',
        }}
      >
        <div style={{ fontWeight: 800, fontSize: '1rem' }}>Customer portal</div>
        <CurrentUserMenu
          user={{
            id: currentUser.id,
            email: currentUser.email,
            name: currentUser.name,
            role: currentUser.role,
          }}
        />
      </header>
      <main style={{ padding: '1.25rem' }}>{children}</main>
    </div>
  );
}
