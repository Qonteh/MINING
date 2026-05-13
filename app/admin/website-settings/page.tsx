'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { broadcastCmsUpdate } from '@/components/cms-live-refresh';

interface Settings {
  id?: number;
  site_title: string;
  site_description: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  logo_url: string;
  favicon_url: string;
  font_family: string;
  company_email: string;
  company_phone: string;
  company_address: string;
}

const colorPresets = {
  primary_color: ['#c9a227', '#2563eb', '#0f766e', '#b45309', '#be123c'],
  secondary_color: ['#1e2b4a', '#1e40af', '#0f172a', '#374151', '#14532d'],
  accent_color: ['#daa520', '#f59e0b', '#84cc16', '#ec4899', '#22d3ee'],
} as const;

const defaultSettings: Settings = {
  site_title: '',
  site_description: '',
  primary_color: '#2563eb',
  secondary_color: '#1e40af',
  accent_color: '#f59e0b',
  logo_url: '',
  favicon_url: '',
  font_family: 'Inter, sans-serif',
  company_email: '',
  company_phone: '',
  company_address: '',
};

function safeText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function safeColor(value: unknown, fallback: string): string {
  if (typeof value !== 'string') return fallback;
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value) ? value : fallback;
}

function normalizeSettings(data: Partial<Settings> | null | undefined): Settings {
  return {
    site_title: safeText(data?.site_title, defaultSettings.site_title),
    site_description: safeText(data?.site_description, defaultSettings.site_description),
    primary_color: safeColor(data?.primary_color, defaultSettings.primary_color),
    secondary_color: safeColor(data?.secondary_color, defaultSettings.secondary_color),
    accent_color: safeColor(data?.accent_color, defaultSettings.accent_color),
    logo_url: safeText(data?.logo_url),
    favicon_url: safeText(data?.favicon_url),
    font_family: safeText(data?.font_family, defaultSettings.font_family),
    company_email: safeText(data?.company_email),
    company_phone: safeText(data?.company_phone),
    company_address: safeText(data?.company_address),
  };
}

export default function WebsiteSettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const res = await fetch('/api/cms/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings(normalizeSettings(data));
      }
    } catch (err) {
      console.error('Failed to load settings:', err);
      setError('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (field: 'primary_color' | 'secondary_color' | 'accent_color', value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/cms/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error('Failed to save settings');

      broadcastCmsUpdate();
      setSuccess('Settings saved successfully! ✨');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <Link href="/admin" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">← Back to Dashboard</Link>
        <h1 className="text-4xl font-bold mb-2">🎨 Website Settings</h1>
        <p className="text-gray-600">Customize your website appearance and company information</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Site Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6">📝 Site Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Site Title</label>
              <input
                type="text"
                name="site_title"
                value={settings.site_title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your website title"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Site Description</label>
              <textarea
                name="site_description"
                value={settings.site_description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description of your website"
              />
            </div>
          </div>
        </div>

        {/* Colors */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6">🎨 Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Primary Color</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="color"
                  name="primary_color"
                  value={settings.primary_color}
                  onChange={(e) => handleColorChange('primary_color', e.target.value)}
                  className="w-20 h-10 rounded cursor-pointer border border-gray-300"
                />
                <input
                  type="text"
                  value={settings.primary_color}
                  readOnly
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div className="flex gap-2">
                {colorPresets.primary_color.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleColorChange('primary_color', color)}
                    className={`h-8 w-8 rounded-full border-2 ${settings.primary_color === color ? 'border-gray-900' : 'border-gray-300'}`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select ${color}`}
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Secondary Color</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="color"
                  name="secondary_color"
                  value={settings.secondary_color}
                  onChange={(e) => handleColorChange('secondary_color', e.target.value)}
                  className="w-20 h-10 rounded cursor-pointer border border-gray-300"
                />
                <input
                  type="text"
                  value={settings.secondary_color}
                  readOnly
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div className="flex gap-2">
                {colorPresets.secondary_color.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleColorChange('secondary_color', color)}
                    className={`h-8 w-8 rounded-full border-2 ${settings.secondary_color === color ? 'border-gray-900' : 'border-gray-300'}`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select ${color}`}
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Accent Color</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="color"
                  name="accent_color"
                  value={settings.accent_color}
                  onChange={(e) => handleColorChange('accent_color', e.target.value)}
                  className="w-20 h-10 rounded cursor-pointer border border-gray-300"
                />
                <input
                  type="text"
                  value={settings.accent_color}
                  readOnly
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div className="flex gap-2">
                {colorPresets.accent_color.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleColorChange('accent_color', color)}
                    className={`h-8 w-8 rounded-full border-2 ${settings.accent_color === color ? 'border-gray-900' : 'border-gray-300'}`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select ${color}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Images & Branding */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6">🖼️ Images & Branding</h2>
          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Logo URL</label>
              <input
                type="text"
                name="logo_url"
                value={settings.logo_url}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/logo.png"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Favicon URL</label>
              <input
                type="text"
                name="favicon_url"
                value={settings.favicon_url}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/favicon.ico"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Font Family</label>
              <input
                type="text"
                name="font_family"
                value={settings.font_family}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Inter, sans-serif"
              />
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6">🏢 Company Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="company_email"
                value={settings.company_email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="info@company.com"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                name="company_phone"
                value={settings.company_phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+1 (800) 123-4567"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Address</label>
              <textarea
                name="company_address"
                value={settings.company_address}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="123 Main St, City, State 12345"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            {saving ? 'Saving...' : '✓ Save Settings'}
          </button>
          <Link
            href="/admin"
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
