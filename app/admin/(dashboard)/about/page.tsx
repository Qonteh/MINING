'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save, Eye, RotateCcw, Plus, Trash2, GripVertical } from 'lucide-react';
import { defaultSiteConfig } from '@/lib/site-config';
import Link from 'next/link';

const iconOptions = ['Leaf', 'CheckCircle', 'Truck', 'Shield', 'Award', 'Star'];

export default function AboutEditorPage() {
  const [about, setAbout] = useState(defaultSiteConfig.about);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    setAbout(defaultSiteConfig.about);
  };

  const updateFeature = (index: number, field: string, value: string) => {
    const newFeatures = [...about.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setAbout({ ...about, features: newFeatures });
  };

  const addFeature = () => {
    setAbout({
      ...about,
      features: [...about.features, { icon: 'Star', title: 'NEW FEATURE', description: 'Description here' }]
    });
  };

  const removeFeature = (index: number) => {
    setAbout({
      ...about,
      features: about.features.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">About Section</h1>
          <p className="text-muted-foreground mt-1">Edit the about us content</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/#about" target="_blank">
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
            <CardDescription>Edit the about section text</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={about.subtitle}
                onChange={(e) => setAbout({ ...about, subtitle: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title1">Title Line 1</Label>
              <Input
                id="title1"
                value={about.title1}
                onChange={(e) => setAbout({ ...about, title1: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title2">Title Line 2 (Highlighted)</Label>
              <Input
                id="title2"
                value={about.title2}
                onChange={(e) => setAbout({ ...about, title2: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={about.description}
                onChange={(e) => setAbout({ ...about, description: e.target.value })}
                rows={5}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="buttonText">Button Text</Label>
              <Input
                id="buttonText"
                value={about.buttonText}
                onChange={(e) => setAbout({ ...about, buttonText: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Image */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>About Image</CardTitle>
            <CardDescription>Change the about section image</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <p className="text-sm text-muted-foreground">Current: {about.aboutImage}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="aboutImage">Image Path</Label>
              <Input
                id="aboutImage"
                value={about.aboutImage}
                onChange={(e) => setAbout({ ...about, aboutImage: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features */}
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Feature Cards</CardTitle>
            <CardDescription>Manage the feature highlights</CardDescription>
          </div>
          <Button size="sm" variant="outline" onClick={addFeature}>
            <Plus className="w-4 h-4 mr-2" />
            Add Feature
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {about.features.map((feature, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted/50 border border-border/50">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-muted rounded cursor-move">
                    <GripVertical className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Icon</Label>
                      <select
                        value={feature.icon}
                        onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                      >
                        {iconOptions.map(icon => (
                          <option key={icon} value={icon}>{icon}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={feature.title}
                        onChange={(e) => updateFeature(index, 'title', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Input
                        value={feature.description}
                        onChange={(e) => updateFeature(index, 'description', e.target.value)}
                      />
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => removeFeature(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
