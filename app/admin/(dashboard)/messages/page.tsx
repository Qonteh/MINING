'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  MessageSquare, 
  Mail, 
  Clock, 
  Search, 
  Archive, 
  Trash2, 
  Eye,
  CheckCircle,
  MailOpen,
  Reply
} from 'lucide-react';
import { demoMessages, type ContactMessage } from '@/lib/site-config';

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>(demoMessages);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'archived'>('all');

  const filteredMessages = messages.filter(m => {
    const matchesSearch = 
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.message.toLowerCase().includes(search.toLowerCase());
    
    if (filter === 'unread') return matchesSearch && !m.isRead;
    if (filter === 'archived') return matchesSearch && m.isArchived;
    return matchesSearch && !m.isArchived;
  });

  const handleMarkAsRead = (id: string) => {
    setMessages(messages.map(m => m.id === id ? { ...m, isRead: true } : m));
  };

  const handleMarkAsUnread = (id: string) => {
    setMessages(messages.map(m => m.id === id ? { ...m, isRead: false } : m));
  };

  const handleArchive = (id: string) => {
    setMessages(messages.map(m => m.id === id ? { ...m, isArchived: true } : m));
    setSelectedMessage(null);
  };

  const handleDelete = (id: string) => {
    setMessages(messages.filter(m => m.id !== id));
    setSelectedMessage(null);
  };

  const unreadCount = messages.filter(m => !m.isRead && !m.isArchived).length;
  const archivedCount = messages.filter(m => m.isArchived).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground mt-1">Contact form submissions from your website</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{messages.length}</div>
                <p className="text-xs text-muted-foreground">Total Messages</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Mail className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{unreadCount}</div>
                <p className="text-xs text-muted-foreground">Unread</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{messages.filter(m => m.isRead).length}</div>
                <p className="text-xs text-muted-foreground">Read</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded-lg">
                <Archive className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{archivedCount}</div>
                <p className="text-xs text-muted-foreground">Archived</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="border-border/50">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search messages..." 
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'unread' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('unread')}
              >
                Unread ({unreadCount})
              </Button>
              <Button
                variant={filter === 'archived' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('archived')}
              >
                Archived
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
          <CardDescription>Click on a message to view details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredMessages.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No messages found</p>
              </div>
            ) : (
              filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                    message.isRead 
                      ? 'border-border/50 bg-background hover:bg-muted/50' 
                      : 'border-primary/30 bg-primary/5 hover:bg-primary/10'
                  }`}
                  onClick={() => {
                    setSelectedMessage(message);
                    handleMarkAsRead(message.id);
                  }}
                >
                  <div className={`p-2 rounded-full ${message.isRead ? 'bg-muted' : 'bg-primary/20'}`}>
                    {message.isRead ? (
                      <MailOpen className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Mail className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-medium ${message.isRead ? 'text-foreground' : 'text-foreground'}`}>
                        {message.name}
                      </span>
                      {!message.isRead && (
                        <Badge className="bg-primary text-primary-foreground">New</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{message.message}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {message.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(message.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMessage(message);
                    }}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Message Detail Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Message from {selectedMessage?.name}</DialogTitle>
            <DialogDescription>
              {selectedMessage?.email} | {selectedMessage && new Date(selectedMessage.createdAt).toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="p-4 rounded-lg bg-muted/50 min-h-[150px]">
              <p className="text-foreground whitespace-pre-wrap">{selectedMessage?.message}</p>
            </div>
          </div>
          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href={`mailto:${selectedMessage?.email}`}>
                  <Reply className="w-4 h-4 mr-2" />
                  Reply via Email
                </a>
              </Button>
              {selectedMessage?.isRead ? (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => selectedMessage && handleMarkAsUnread(selectedMessage.id)}
                >
                  Mark as Unread
                </Button>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => selectedMessage && handleMarkAsRead(selectedMessage.id)}
                >
                  Mark as Read
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => selectedMessage && handleArchive(selectedMessage.id)}
              >
                <Archive className="w-4 h-4 mr-2" />
                Archive
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => selectedMessage && handleDelete(selectedMessage.id)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
