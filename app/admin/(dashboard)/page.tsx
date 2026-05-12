'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  MessageSquare,
  Eye,
  Image,
  FileEdit,
  Gem,
  Briefcase,
  Phone,
  Palette,
  ArrowRight,
  Clock,
  Mail,
} from 'lucide-react';
import { demoMessages } from '@/lib/site-config';

const quickActions = [
  { name: 'Edit Hero', href: '/admin/hero', icon: Image, color: 'bg-blue-500/10 text-blue-500' },
  { name: 'Edit About', href: '/admin/about', icon: FileEdit, color: 'bg-green-500/10 text-green-500' },
  { name: 'Minerals', href: '/admin/minerals', icon: Gem, color: 'bg-purple-500/10 text-purple-500' },
  { name: 'Services', href: '/admin/services', icon: Briefcase, color: 'bg-orange-500/10 text-orange-500' },
  { name: 'Contact Info', href: '/admin/contact-info', icon: Phone, color: 'bg-cyan-500/10 text-cyan-500' },
  { name: 'Appearance', href: '/admin/appearance', icon: Palette, color: 'bg-pink-500/10 text-pink-500' },
];

export default function AdminDashboardPage() {
  const unreadCount = demoMessages.filter(m => !m.isRead).length;
  const totalMessages = demoMessages.length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your Gemora website content</p>
        </div>
        <Button asChild className="w-fit">
          <Link href="/" target="_blank">
            <Eye className="w-4 h-4 mr-2" />
            View Website
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Unread Messages
            </CardTitle>
            <Mail className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{unreadCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {totalMessages} total contact submissions
            </p>
            <Button asChild variant="link" className="p-0 h-auto mt-2 text-primary">
              <Link href="/admin/messages">
                View all messages <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Website Sections
            </CardTitle>
            <FileEdit className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">8</div>
            <p className="text-xs text-muted-foreground mt-1">
              Editable content sections
            </p>
            <p className="text-xs text-green-500 mt-2">All sections active</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Minerals Listed
            </CardTitle>
            <Gem className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">5</div>
            <p className="text-xs text-muted-foreground mt-1">
              Products showcased on website
            </p>
            <Button asChild variant="link" className="p-0 h-auto mt-2 text-primary">
              <Link href="/admin/minerals">
                Manage minerals <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
          <CardDescription>Jump to any section to edit your website content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                href={action.href}
                className="flex flex-col items-center gap-3 p-4 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-accent/5 transition-all group"
              >
                <div className={`p-3 rounded-xl ${action.color}`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {action.name}
                </span>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Messages */}
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Recent Messages</CardTitle>
            <CardDescription>Latest contact form submissions</CardDescription>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/messages">View All</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {demoMessages.slice(0, 4).map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-4 p-4 rounded-lg border ${
                  message.isRead ? 'border-border/50 bg-background' : 'border-primary/30 bg-primary/5'
                }`}
              >
                <div className={`p-2 rounded-full ${message.isRead ? 'bg-muted' : 'bg-primary/20'}`}>
                  <MessageSquare className={`w-4 h-4 ${message.isRead ? 'text-muted-foreground' : 'text-primary'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-foreground">{message.name}</span>
                    {!message.isRead && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{message.message}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {new Date(message.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                    <span className="mx-1">|</span>
                    <Mail className="w-3 h-3" />
                    {message.email}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">How to Manage Your Website</h3>
              <p className="text-sm text-muted-foreground">
                Use the sidebar navigation to edit different sections of your landing page. Click on any section to update text, images, and settings.
              </p>
            </div>
            <Button asChild variant="outline" className="shrink-0">
              <Link href="/" target="_blank">Preview Site</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
