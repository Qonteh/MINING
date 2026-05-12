'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save, Eye, RotateCcw, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { defaultSiteConfig } from '@/lib/site-config';
import Link from 'next/link';

export default function ContactInfoPage() {
  const [contact, setContact] = useState(defaultSiteConfig.contact);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    setContact(defaultSiteConfig.contact);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Contact Information</h1>
          <p className="text-muted-foreground mt-1">Update your business contact details</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/#contact" target="_blank">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Link>
          </Button>
          <Button size="sm" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            {saved ? 'Saved!' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section Titles */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Section Content</CardTitle>
            <CardDescription>Edit the contact section titles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={contact.subtitle}
                onChange={(e) => setContact({ ...contact, subtitle: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title1">Title Line 1</Label>
              <Input
                id="title1"
                value={contact.title1}
                onChange={(e) => setContact({ ...contact, title1: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title2">Title Line 2 (Highlighted)</Label>
              <Input
                id="title2"
                value={contact.title2}
                onChange={(e) => setContact({ ...contact, title2: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={contact.description}
                onChange={(e) => setContact({ ...contact, description: e.target.value })}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Primary Contact */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Primary Contact</CardTitle>
            <CardDescription>Main contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                Phone Number
              </Label>
              <Input
                id="phone"
                value={contact.phone}
                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Address */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Office Address
            </CardTitle>
            <CardDescription>Your physical location</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address1">Address Line 1</Label>
              <Input
                id="address1"
                value={contact.address1}
                onChange={(e) => setContact({ ...contact, address1: e.target.value })}
                placeholder="Street address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address2">Address Line 2</Label>
              <Input
                id="address2"
                value={contact.address2}
                onChange={(e) => setContact({ ...contact, address2: e.target.value })}
                placeholder="City, State, Country"
              />
            </div>
          </CardContent>
        </Card>

        {/* Business Hours */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Business Hours
            </CardTitle>
            <CardDescription>Your operating hours</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hours1">Weekday Hours</Label>
              <Input
                id="hours1"
                value={contact.hours1}
                onChange={(e) => setContact({ ...contact, hours1: e.target.value })}
                placeholder="e.g., Monday - Friday: 9AM - 6PM"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hours2">Weekend Hours</Label>
              <Input
                id="hours2"
                value={contact.hours2}
                onChange={(e) => setContact({ ...contact, hours2: e.target.value })}
                placeholder="e.g., Saturday: 10AM - 4PM"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview */}
      <Card className="border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>How your contact info will appear</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 rounded-lg bg-secondary">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Address</p>
                <p className="text-sm text-muted-foreground">{contact.address1}</p>
                <p className="text-sm text-muted-foreground">{contact.address2}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Email</p>
                <p className="text-sm text-muted-foreground">{contact.email}</p>
                <p className="text-sm text-muted-foreground">{contact.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Hours</p>
                <p className="text-sm text-muted-foreground">{contact.hours1}</p>
                <p className="text-sm text-muted-foreground">{contact.hours2}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
