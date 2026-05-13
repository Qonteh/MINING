'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Mail, Settings, FileText, BarChart3 } from 'lucide-react';

interface Stats {
  totalContacts: number;
  unreadContacts: number;
  sections: number;
  siteTitle: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalContacts: 0,
    unreadContacts: 0,
    sections: 0,
    siteTitle: 'Loading...',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [settingsRes, sectionsRes, contactsRes] = await Promise.all([
          fetch('/api/cms/settings'),
          fetch('/api/cms/sections'),
          fetch('/api/cms/contacts'),
        ]);

        const settings = await settingsRes.json();
        const sections = await sectionsRes.json();
        const contacts = await contactsRes.json();

        const unreadCount = contacts.filter((c: any) => !c.is_read).length;

        setStats({
          totalContacts: contacts.length,
          unreadContacts: unreadCount,
          sections: sections.length,
          siteTitle: settings.site_title || 'AXXEN International',
        });
      } catch (error) {
        console.error('Failed to load stats:', error);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  const cards = [
    {
      icon: Settings,
      title: 'Website Settings',
      description: 'Edit colors, fonts, images, company info',
      href: '/admin/website-settings',
      color: 'from-blue-500 to-blue-600',
      stat: stats.siteTitle,
    },
    {
      icon: FileText,
      title: 'Page Sections',
      description: 'Manage hero, about, services, and more',
      href: '/admin/page-sections',
      color: 'from-purple-500 to-purple-600',
      stat: `${stats.sections} sections`,
    },
    {
      icon: Mail,
      title: 'Contact Submissions',
      description: 'View emails and messages from visitors',
      href: '/admin/contacts',
      color: 'from-orange-500 to-orange-600',
      stat: `${stats.unreadContacts}/${stats.totalContacts} unread`,
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'View website traffic and statistics',
      href: '/admin/analytics',
      color: 'from-green-500 to-green-600',
      stat: 'Coming soon',
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome to CMS Dashboard 🎨</h1>
        <p className="text-gray-600">
          Manage your website content, settings, and contact submissions
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                href={card.href}
                className="group"
              >
                <div className={`bg-gradient-to-br ${card.color} rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer h-full`}>
                  <div className="flex items-start justify-between mb-4">
                    <Icon className="w-12 h-12 opacity-80" />
                    <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
                      {card.stat}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-white/80 text-sm">{card.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-bold text-blue-900 mb-2">💡 Quick Tips</h3>
        <ul className="text-blue-800 space-y-2 text-sm">
          <li>• <strong>Website Settings:</strong> Update your site colors, fonts, and company information</li>
          <li>• <strong>Page Sections:</strong> Edit content for each section like Hero, About, Services</li>
          <li>• <strong>Contact Submissions:</strong> View and manage emails from your website visitors</li>
          <li>• <strong>Changes:</strong> Updates are saved to the database and reflect live on your website</li>
        </ul>
      </div>
    </div>
  );
}
