'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { broadcastCmsUpdate } from '@/components/cms-live-refresh';

interface PageSection {
  id: number;
  section_name: string;
  section_key: string;
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
  button_text: string;
  button_url: string;
  is_visible: boolean;
  order_index: number;
}

export default function PageSectionsPage() {
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState<PageSection[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editForm, setEditForm] = useState<Partial<PageSection>>({});

  useEffect(() => {
    loadSections();
  }, []);

  const loadSections = async () => {
    try {
      const res = await fetch('/api/cms/sections');
      if (res.ok) {
        const data = await res.json();
        setSections(data);
      }
    } catch (err) {
      setError('Failed to load sections');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (section: PageSection) => {
    setEditingId(section.id);
    setEditForm(section);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm(prev => ({
      ...prev,
      is_visible: e.target.checked,
    }));
  };

  const handleSave = async () => {
    if (!editingId) return;
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/cms/sections', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });

      if (!res.ok) throw new Error('Failed to save');

      const updated = await res.json();
      setSections(prev => prev.map(s => s.id === updated.id ? updated : s));
      broadcastCmsUpdate();
      setSuccess('Section updated successfully! ✨');
      setEditingId(null);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const toggleVisibility = async (section: PageSection) => {
    setSaving(true);
    try {
      const res = await fetch('/api/cms/sections', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...section,
          is_visible: !section.is_visible,
        }),
      });

      if (!res.ok) throw new Error('Failed to update');

      const updated = await res.json();
      setSections(prev => prev.map(s => s.id === updated.id ? updated : s));
      broadcastCmsUpdate();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading sections...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <Link href="/admin" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">← Back to Dashboard</Link>
        <h1 className="text-4xl font-bold mb-2">📄 Page Sections Editor</h1>
        <p className="text-gray-600">Edit content for each section on your landing page</p>
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

      <div className="space-y-6">
        {sections.map(section => (
          <div key={section.id} className="bg-white rounded-lg shadow overflow-hidden">
            {editingId === section.id ? (
              <div className="p-6 bg-blue-50">
                <h3 className="text-2xl font-bold mb-6">✏️ Editing: {section.section_name}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={editForm.title || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">Subtitle</label>
                    <input
                      type="text"
                      name="subtitle"
                      value={editForm.subtitle || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">Description</label>
                    <textarea
                      name="description"
                      value={editForm.description || ''}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-gray-700 mb-2">Image URL</label>
                      <input
                        type="text"
                        name="image_url"
                        value={editForm.image_url || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-gray-700 mb-2">Button Text</label>
                      <input
                        type="text"
                        name="button_text"
                        value={editForm.button_text || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">Button URL</label>
                    <input
                      type="text"
                      name="button_url"
                      value={editForm.button_url || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editForm.is_visible !== false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 rounded"
                      />
                      <span className="font-semibold text-gray-700">Visible on website</span>
                    </label>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-2 px-6 rounded-lg"
                    >
                      {saving ? 'Saving...' : '✓ Save'}
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">{section.section_name}</h3>
                    <p className="text-gray-500 text-sm">Key: {section.section_key}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleVisibility(section)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        section.is_visible
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {section.is_visible ? '👁️ Visible' : '🚫 Hidden'}
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-2 text-sm">
                  <p><strong>Title:</strong> {section.title || '(not set)'}</p>
                  <p><strong>Subtitle:</strong> {section.subtitle || '(not set)'}</p>
                  <p><strong>Description:</strong> {section.description ? section.description.substring(0, 100) + '...' : '(not set)'}</p>
                  {section.image_url && <p><strong>Image:</strong> {section.image_url.substring(0, 50)}...</p>}
                  {section.button_text && <p><strong>Button:</strong> {section.button_text}</p>}
                </div>
                <button
                  onClick={() => startEdit(section)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  ✏️ Edit Section
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
