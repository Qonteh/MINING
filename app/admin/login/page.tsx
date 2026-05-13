'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!username || !password) {
        throw new Error('Please enter username and password');
      }

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      router.push('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #f0f9ff, #e0e7ff)',
      padding: '1rem',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '28rem',
        background: 'white',
        padding: '2rem',
        borderRadius: '0.5rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem',
        }}>
          <h1 style={{
            fontSize: '2.25rem',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '0.5rem',
          }}>
            🔐 Admin Panel
          </h1>
          <p style={{ color: '#6b7280' }}>Mining Web Management</p>
        </div>

        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}>
          <div>
            <label htmlFor="username" style={{
              display: 'block',
              color: '#374151',
              fontWeight: '500',
              marginBottom: '0.5rem',
            }}>
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '1rem',
              }}
            />
          </div>

          <div>
            <label htmlFor="password" style={{
              display: 'block',
              color: '#374151',
              fontWeight: '500',
              marginBottom: '0.5rem',
            }}>
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '1rem',
              }}
            />
            <p style={{
              fontSize: '0.75rem',
              color: '#6b7280',
              marginTop: '0.5rem',
            }}>
              Default: admin123
            </p>
          </div>

          {error && (
            <div style={{
              padding: '0.75rem',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '0.375rem',
              color: '#991b1b',
              fontSize: '0.875rem',
            }}>
              <strong>Error:</strong> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.5rem',
              background: '#4f46e5',
              color: 'white',
              borderRadius: '0.5rem',
              fontWeight: '600',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.5 : 1,
            }}
          >
            {loading ? '🔄 Logging in...' : '✓ Login'}
          </button>
        </form>

        <div style={{
          marginTop: '1.5rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #e5e7eb',
        }}>
          <div style={{
            textAlign: 'center',
            fontSize: '0.875rem',
            color: '#4b5563',
          }}>
            <p style={{
              fontWeight: '600',
              marginBottom: '0.75rem',
              color: '#111827',
            }}>
              Demo Credentials
            </p>
            <div style={{ lineHeight: '1.6', fontSize: '0.75rem' }}>
              <p><strong>Username:</strong> admin</p>
              <p><strong>Password:</strong> admin123</p>
              <p><strong>Database:</strong> mining_web</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
