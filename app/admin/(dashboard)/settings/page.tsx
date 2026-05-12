'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Bell, 
  Shield, 
  Database,
  Save,
  RefreshCw,
  Key,
  User
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  // General settings state
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Gemora Minerals',
    siteDescription: 'Premium Global Mineral Solutions',
    tagline: 'Delivering excellence in mineral trading since 1999',
  });

  // Contact settings state
  const [contactSettings, setContactSettings] = useState({
    email: 'info@gemora.com',
    phone: '+1 (555) 123-4567',
    address: '123 Mineral Way, Mining City, MC 12345',
    supportEmail: 'support@gemora.com',
  });

  // Notification settings state
  const [notifications, setNotifications] = useState({
    emailInquiries: true,
    emailWeeklyReport: true,
    emailNewsletter: false,
    browserNotifications: true,
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast({
      title: 'Settings saved',
      description: 'Your settings have been updated successfully.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your website configuration and preferences</p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                <CardTitle>Site Information</CardTitle>
              </div>
              <CardDescription>Basic information about your website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input 
                  id="siteName" 
                  value={generalSettings.siteName}
                  onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Input 
                  id="siteDescription" 
                  value={generalSettings.siteDescription}
                  onChange={(e) => setGeneralSettings({...generalSettings, siteDescription: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Textarea 
                  id="tagline" 
                  value={generalSettings.tagline}
                  onChange={(e) => setGeneralSettings({...generalSettings, tagline: e.target.value})}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                <CardTitle>SEO Settings</CardTitle>
              </div>
              <CardDescription>Search engine optimization settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input id="metaTitle" defaultValue="Gemora Minerals | Premium Global Mineral Solutions" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea 
                  id="metaDescription" 
                  defaultValue="Gemora Minerals is a trusted mineral dealer delivering premium quality minerals with integrity, reliability, and global excellence."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Settings */}
        <TabsContent value="contact" className="space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                <CardTitle>Contact Information</CardTitle>
              </div>
              <CardDescription>Public contact details displayed on your website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Primary Email
                  </Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={contactSettings.email}
                    onChange={(e) => setContactSettings({...contactSettings, email: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="supportEmail">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Support Email
                  </Label>
                  <Input 
                    id="supportEmail" 
                    type="email"
                    value={contactSettings.supportEmail}
                    onChange={(e) => setContactSettings({...contactSettings, supportEmail: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number
                </Label>
                <Input 
                  id="phone" 
                  value={contactSettings.phone}
                  onChange={(e) => setContactSettings({...contactSettings, phone: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Address
                </Label>
                <Textarea 
                  id="address" 
                  value={contactSettings.address}
                  onChange={(e) => setContactSettings({...contactSettings, address: e.target.value})}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
              <CardDescription>Connect your social media profiles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input id="linkedin" placeholder="https://linkedin.com/company/gemora" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="twitter">Twitter / X</Label>
                  <Input id="twitter" placeholder="https://x.com/gemora" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                <CardTitle>Email Notifications</CardTitle>
              </div>
              <CardDescription>Configure when you receive email notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Inquiry Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive an email when someone submits a contact form
                  </p>
                </div>
                <Switch 
                  checked={notifications.emailInquiries}
                  onCheckedChange={(checked) => setNotifications({...notifications, emailInquiries: checked})}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Report</Label>
                  <p className="text-sm text-muted-foreground">
                    Get a weekly summary of website activity
                  </p>
                </div>
                <Switch 
                  checked={notifications.emailWeeklyReport}
                  onCheckedChange={(checked) => setNotifications({...notifications, emailWeeklyReport: checked})}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Newsletter Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive product updates and announcements
                  </p>
                </div>
                <Switch 
                  checked={notifications.emailNewsletter}
                  onCheckedChange={(checked) => setNotifications({...notifications, emailNewsletter: checked})}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Browser Notifications</CardTitle>
              <CardDescription>Real-time alerts in your browser</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Browser Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Show desktop notifications for important events
                  </p>
                </div>
                <Switch 
                  checked={notifications.browserNotifications}
                  onCheckedChange={(checked) => setNotifications({...notifications, browserNotifications: checked})}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                <CardTitle>Account Settings</CardTitle>
              </div>
              <CardDescription>Manage your admin account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="adminName">Display Name</Label>
                <Input id="adminName" defaultValue="Admin User" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="adminEmail">Email Address</Label>
                <Input id="adminEmail" type="email" defaultValue="admin@gemora.com" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-primary" />
                <CardTitle>Change Password</CardTitle>
              </div>
              <CardDescription>Update your admin password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Button variant="outline">Update Password</Button>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <CardTitle>Security Options</CardTitle>
              </div>
              <CardDescription>Additional security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button variant="outline" size="sm">Enable</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Session Timeout</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically log out after 7 days of inactivity
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Database Settings */}
        <TabsContent value="database" className="space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                <CardTitle>Database Connection</CardTitle>
              </div>
              <CardDescription>PostgreSQL database configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="text-sm text-muted-foreground mb-4">
                  Set your database connection string as an environment variable:
                </p>
                <code className="block p-3 rounded bg-secondary text-secondary-foreground text-sm font-mono overflow-x-auto">
                  DATABASE_URL=postgresql://user:password@host:5432/database
                </code>
              </div>
              
              <div className="grid gap-2">
                <Label>Connection Status</Label>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-destructive" />
                  <span className="text-sm text-muted-foreground">Not connected</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Add the DATABASE_URL environment variable to connect
                </p>
              </div>
              
              <Separator />
              
              <div>
                <Label className="mb-2 block">Database Schema</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Run the setup script in pgAdmin to create the required tables:
                </p>
                <code className="block p-3 rounded bg-secondary text-secondary-foreground text-sm font-mono">
                  scripts/setup-database.sql
                </code>
              </div>
              
              <Button variant="outline" className="mt-4">
                <RefreshCw className="w-4 h-4 mr-2" />
                Test Connection
              </Button>
            </CardContent>
          </Card>

          <Card className="border-destructive/30 bg-destructive/5">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>Irreversible database actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Reset All Data</p>
                  <p className="text-sm text-muted-foreground">
                    Delete all content and reset to defaults
                  </p>
                </div>
                <Button variant="destructive" size="sm">Reset Data</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
