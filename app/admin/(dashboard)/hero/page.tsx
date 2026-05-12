'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save, Eye, RotateCcw, Image as ImageIcon } from 'lucide-react';
import { defaultSiteConfig } from '@/lib/site-config';
import Link from 'next/link';

export default function HeroEditorPage() {
  const [hero, setHero] = useState(defaultSiteConfig.hero);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // In production, save to database
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    setHero(defaultSiteConfig.hero);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Hero Section</h1>
          <p className="text-muted-foreground mt-1">Edit the main banner of your website</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/" target="_blank">
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
        {/* Main Content */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Main Content</CardTitle>
            <CardDescription>Edit the hero title and description</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={hero.subtitle}
                onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
                placeholder="e.g., GLOBAL MINERAL SOLUTIONS"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title1">Title Line 1</Label>
              <Input
                id="title1"
                value={hero.title1}
                onChange={(e) => setHero({ ...hero, title1: e.target.value })}
                placeholder="e.g., CONNECTING MINERALS."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title2">Title Line 2 (Highlighted)</Label>
              <Input
                id="title2"
                value={hero.title2}
                onChange={(e) => setHero({ ...hero, title2: e.target.value })}
                placeholder="e.g., POWERING POSSIBILITIES."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={hero.description}
                onChange={(e) => setHero({ ...hero, description: e.target.value })}
                placeholder="Enter hero description..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Buttons */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Call-to-Action Buttons</CardTitle>
            <CardDescription>Configure the hero buttons</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/50 space-y-3">
              <p className="text-sm font-medium text-foreground">Primary Button</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="btn1Text">Button Text</Label>
                  <Input
                    id="btn1Text"
                    value={hero.button1Text}
                    onChange={(e) => setHero({ ...hero, button1Text: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="btn1Link">Link</Label>
                  <Input
                    id="btn1Link"
                    value={hero.button1Link}
                    onChange={(e) => setHero({ ...hero, button1Link: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-muted/50 space-y-3">
              <p className="text-sm font-medium text-foreground">Secondary Button</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="btn2Text">Button Text</Label>
                  <Input
                    id="btn2Text"
                    value={hero.button2Text}
                    onChange={(e) => setHero({ ...hero, button2Text: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="btn2Link">Link</Label>
                  <Input
                    id="btn2Link"
                    value={hero.button2Link}
                    onChange={(e) => setHero({ ...hero, button2Link: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Floating Badges</CardTitle>
            <CardDescription>Edit the floating text badges on the hero</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/50 space-y-3">
              <p className="text-sm font-medium text-foreground">Bottom Left Badge</p>
              <div className="space-y-2">
                <Label htmlFor="badge1">Line 1</Label>
                <Input
                  id="badge1"
                  value={hero.badgeText1}
                  onChange={(e) => setHero({ ...hero, badgeText1: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="badge2">Line 2</Label>
                <Input
                  id="badge2"
                  value={hero.badgeText2}
                  onChange={(e) => setHero({ ...hero, badgeText2: e.target.value })}
                />
              </div>
            </div>

            <div className="p-4 rounded-lg bg-muted/50 space-y-3">
              <p className="text-sm font-medium text-foreground">Top Right Badge</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="yearsNum">Number</Label>
                  <Input
                    id="yearsNum"
                    value={hero.yearsNumber}
                    onChange={(e) => setHero({ ...hero, yearsNumber: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearsText">Label</Label>
                  <Input
                    id="yearsText"
                    value={hero.yearsText}
                    onChange={(e) => setHero({ ...hero, yearsText: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hero Image */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Hero Image</CardTitle>
            <CardDescription>Change the main hero background image</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center">
                <ImageIcon className="w-10 h-10 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Current: {hero.heroImage}</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="heroImage">Image Path</Label>
              <Input
                id="heroImage"
                value={hero.heroImage}
                onChange={(e) => setHero({ ...hero, heroImage: e.target.value })}
                placeholder="/images/hero-mineral.jpg"
              />
              <p className="text-xs text-muted-foreground">
                Upload images to /public/images/ folder and enter the path here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview */}
      <Card className="border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
          <CardDescription>See how your changes will look</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-6 rounded-lg bg-secondary text-secondary-foreground">
            <p className="text-primary text-xs font-semibold tracking-widest mb-2">{hero.subtitle}</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-1">{hero.title1}</h2>
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">{hero.title2}</h2>
            <p className="text-secondary-foreground/70 text-sm max-w-md mb-4">{hero.description}</p>
            <div className="flex gap-2">
              <Button size="sm">{hero.button1Text}</Button>
              <Button size="sm" variant="outline">{hero.button2Text}</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
