'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Trash2, CheckCircle } from 'lucide-react';

interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function ContactsPage() {
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      const res = await fetch('/api/cms/contacts');
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data);
      }
    } catch (err) {
      setError('Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: number) => {
    try {
      await fetch('/api/cms/contacts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_read: true }),
      });
      
      setSubmissions(prev =>
        prev.map(s => s.id === id ? { ...s, is_read: true } : s)
      );
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  };

  const deleteSubmission = async (id: number) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;

    setDeleting(true);
    try {
      await fetch('/api/cms/contacts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      
      setSubmissions(prev => prev.filter(s => s.id !== id));
      setSelectedId(null);
    } catch (err) {
      alert('Failed to delete submission');
    } finally {
      setDeleting(false);
    }
  };

  const selected = submissions.find(s => s.id === selectedId);
  const unreadCount = submissions.filter(s => !s.is_read).length;

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading submissions...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="mb-8">
        <Link href="/admin" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">← Back to Dashboard</Link>
        <h1 className="text-4xl font-bold mb-2">📧 Contact Submissions</h1>
        <p className="text-gray-600">
          View emails and messages from your website visitors
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="mb-6 flex items-center gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 flex-1">
          <p className="text-blue-900">
            <strong>{submissions.length}</strong> total submissions • 
            <strong className="ml-2 text-orange-600">{unreadCount}</strong> unread
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submissions List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <h3 className="font-bold">Submissions</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {submissions.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <Mail className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No submissions yet</p>
                </div>
              ) : (
                submissions.map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => {
                      setSelectedId(sub.id);
                      if (!sub.is_read) markAsRead(sub.id);
                    }}
                    className={`w-full text-left p-4 border-b hover:bg-blue-50 transition-colors ${
                      selectedId === sub.id ? 'bg-blue-100' : sub.is_read ? '' : 'bg-yellow-50'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {!sub.is_read && (
                        <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{sub.name}</p>
                        <p className="text-xs text-gray-500 truncate">{sub.email}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(sub.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-2">
          {selected ? (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{selected.name}</h2>
                  <p className="text-gray-600">{selected.email}</p>
                  {selected.phone && <p className="text-gray-600">{selected.phone}</p>}
                  {selected.company && <p className="text-gray-600">{selected.company}</p>}
                </div>
                <div className="flex gap-2">
                  {!selected.is_read && (
                    <button
                      onClick={() => markAsRead(selected.id)}
                      className="bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1 rounded-lg text-sm font-semibold flex items-center gap-1"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark Read
                    </button>
                  )}
                  <button
                    onClick={() => deleteSubmission(selected.id)}
                    disabled={deleting}
                    className="bg-red-100 hover:bg-red-200 disabled:bg-gray-200 text-red-800 px-3 py-1 rounded-lg text-sm font-semibold flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-xs text-gray-500 mb-1">Received on</p>
                <p className="text-sm font-semibold">
                  {new Date(selected.created_at).toLocaleString()}
                </p>
              </div>

              {selected.subject && (
                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 mb-2">Subject</h3>
                  <p className="text-gray-700">{selected.subject}</p>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-2">Message</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-wrap">{selected.message}</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  💡 <strong>Reply via email:</strong> Send your response to <strong>{selected.email}</strong>
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <Mail className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 text-lg">Select a submission to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
