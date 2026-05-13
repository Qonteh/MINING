'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LogOut, Menu, X } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Skip auth check for login page
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }
    checkAuth();
  }, [isLoginPage]);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/check', {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  // Show children directly for login page
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-900 text-white transition-all duration-300 fixed h-full left-0 top-0 z-40`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h1 className={`font-bold text-xl ${!sidebarOpen && 'hidden'}`}>
            Admin Panel
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-800 rounded"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <Link
            href="/admin"
            className="block p-3 rounded hover:bg-slate-800 transition"
          >
            <span className={!sidebarOpen ? 'hidden' : ''}>Dashboard</span>
          </Link>
          <Link
            href="/admin/products"
            className="block p-3 rounded hover:bg-slate-800 transition"
          >
            <span className={!sidebarOpen ? 'hidden' : ''}>Products</span>
          </Link>
          <Link
            href="/admin/users"
            className="block p-3 rounded hover:bg-slate-800 transition"
          >
            <span className={!sidebarOpen ? 'hidden' : ''}>Users</span>
          </Link>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 p-3 rounded hover:bg-slate-800 transition text-red-400"
          >
            <LogOut size={20} />
            <span className={!sidebarOpen ? 'hidden' : ''}>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
