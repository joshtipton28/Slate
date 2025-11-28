"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type CurrentUserMenuProps = {
  user: {
    id: string;
    email: string | null;
    name?: string | null;
    role: string;
  };
};

export function CurrentUserMenu({ user }: CurrentUserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch('/api/auth/logout', { method: 'POST' });
    if (response.ok) {
      router.push('/auth/sign-in');
    }
  };

  const label = user.name || user.email || 'User';
  const initials = label.slice(0, 1).toUpperCase();

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 0.75rem',
          borderRadius: '9999px',
          border: '1px solid #ccc',
          background: '#fff',
          cursor: 'pointer',
        }}
      >
        <span
          aria-hidden
          style={{
            width: '2rem',
            height: '2rem',
            borderRadius: '9999px',
            background: '#111',
            color: '#fff',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
          }}
        >
          {initials}
        </span>
        <span style={{ fontWeight: 600 }}>{label}</span>
      </button>

      {isOpen ? (
        <div
          role="menu"
          aria-label="Current user menu"
          style={{
            position: 'absolute',
            right: 0,
            marginTop: '0.5rem',
            minWidth: '220px',
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: '0.75rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            padding: '0.75rem',
          }}
        >
          <div style={{ marginBottom: '0.5rem' }}>
            <div style={{ fontWeight: 700 }}>{label}</div>
            {user.email && user.email !== user.name ? (
              <div style={{ color: '#555', fontSize: '0.9rem' }}>{user.email}</div>
            ) : null}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                marginTop: '0.35rem',
                padding: '0.2rem 0.6rem',
                borderRadius: '9999px',
                border: '1px solid #e0e0e0',
                background: '#f6f6f6',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.02em',
              }}
            >
              <span style={{ fontWeight: 600 }}>Role:</span>
              <span>{user.role}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '0.55rem 0.75rem',
              borderRadius: '0.65rem',
              border: '1px solid #b91c1c',
              background: '#ef4444',
              color: '#fff',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>
      ) : null}
    </div>
  );
}
