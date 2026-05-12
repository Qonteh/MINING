'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Save, Eye, Gem, Image as ImageIcon } from 'lucide-react';
import { defaultSiteConfig, type Mineral } from '@/lib/site-config';
import Link from 'next/link';

export default function MineralsPage() {
  const [minerals, setMinerals] = useState<Mineral[]>(defaultSiteConfig.minerals);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingMineral, setEditingMineral] = useState<Mineral | null>(null);
  const [saved, setSaved] = useState(false);
  const [newMineral, setNewMineral] = useState<Partial<Mineral>>({
    name: '',
    quality: '',
    image: '/images/',
    origin: '',
    isVisible: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAddMineral = () => {
    if (newMineral.name && newMineral.quality) {
      setMinerals([
        ...minerals,
        {
          id: Date.now().toString(),
          name: newMineral.name || '',
          quality: newMineral.quality || '',
          image: newMineral.image || '/images/mineral.jpg',
          origin: newMineral.origin || '',
          isVisible: newMineral.isVisible ?? true,
        }
      ]);
      setNewMineral({ name: '', quality: '', image: '/images/', origin: '', isVisible: true });
      setIsAddDialogOpen(false);
    }
  };

  const handleEditMineral = () => {
    if (editingMineral) {
      setMinerals(minerals.map(m => m.id === editingMineral.id ? editingMineral : m));
      setEditingMineral(null);
    }
  };

  const handleDelete = (id: string) => {
    setMinerals(minerals.filter(m => m.id !== id));
  };

  const handleToggleVisibility = (id: string) => {
    setMinerals(minerals.map(m => 
      m.id === id ? { ...m, isVisible: !m.isVisible } : m
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Minerals</h1>
          <p className="text-muted-foreground mt-1">Manage the minerals displayed on your website</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/#minerals" target="_blank">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Link>
          </Button>
          <Button size="sm" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            {saved ? 'Saved!' : 'Save Changes'}
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Mineral
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Mineral</DialogTitle>
                <DialogDescription>Add a mineral card to your website</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Mineral Name</Label>
                  <Input
                    value={newMineral.name}
                    onChange={(e) => setNewMineral({ ...newMineral, name: e.target.value })}
                    placeholder="e.g., Tanzanite"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Quality Description</Label>
                  <Input
                    value={newMineral.quality}
                    onChange={(e) => setNewMineral({ ...newMineral, quality: e.target.value })}
                    placeholder="e.g., Premium Quality"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Origin</Label>
                  <Input
                    value={newMineral.origin}
                    onChange={(e) => setNewMineral({ ...newMineral, origin: e.target.value })}
                    placeholder="e.g., Tanzania"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Image Path</Label>
                  <Input
                    value={newMineral.image}
                    onChange={(e) => setNewMineral({ ...newMineral, image: e.target.value })}
                    placeholder="/images/mineral.jpg"
                  />
                  <p className="text-xs text-muted-foreground">Upload to /public/images/ folder</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddMineral}>Add Mineral</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-foreground">{minerals.length}</div>
            <p className="text-xs text-muted-foreground">Total Minerals</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-500">{minerals.filter(m => m.isVisible).length}</div>
            <p className="text-xs text-muted-foreground">Visible on Site</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-muted-foreground">{minerals.filter(m => !m.isVisible).length}</div>
            <p className="text-xs text-muted-foreground">Hidden</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">{new Set(minerals.map(m => m.origin)).size}</div>
            <p className="text-xs text-muted-foreground">Origins</p>
          </CardContent>
        </Card>
      </div>

      {/* Minerals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {minerals.map((mineral) => (
          <Card key={mineral.id} className={`border-border/50 ${!mineral.isVisible ? 'opacity-60' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden">
                  {mineral.image ? (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <Gem className="w-8 h-8 text-primary" />
                    </div>
                  ) : (
                    <ImageIcon className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-foreground truncate">{mineral.name}</h3>
                    <Switch
                      checked={mineral.isVisible}
                      onCheckedChange={() => handleToggleVisibility(mineral.id)}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">{mineral.quality}</p>
                  <p className="text-xs text-muted-foreground mt-1">Origin: {mineral.origin}</p>
                  <p className="text-xs text-muted-foreground truncate">Image: {mineral.image}</p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-border/50">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingMineral(mineral)}
                    >
                      <Pencil className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Mineral</DialogTitle>
                      <DialogDescription>Update mineral details</DialogDescription>
                    </DialogHeader>
                    {editingMineral && (
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Mineral Name</Label>
                          <Input
                            value={editingMineral.name}
                            onChange={(e) => setEditingMineral({ ...editingMineral, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Quality</Label>
                          <Input
                            value={editingMineral.quality}
                            onChange={(e) => setEditingMineral({ ...editingMineral, quality: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Origin</Label>
                          <Input
                            value={editingMineral.origin}
                            onChange={(e) => setEditingMineral({ ...editingMineral, origin: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Image Path</Label>
                          <Input
                            value={editingMineral.image}
                            onChange={(e) => setEditingMineral({ ...editingMineral, image: e.target.value })}
                          />
                        </div>
                      </div>
                    )}
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setEditingMineral(null)}>Cancel</Button>
                      <Button onClick={handleEditMineral}>Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:bg-destructive/10"
                  onClick={() => handleDelete(mineral.id)}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Help */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="py-4">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Tip:</strong> Toggle the switch to show/hide minerals on your website. Upload mineral images to the /public/images/ folder and use the path like /images/filename.jpg
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
