'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { Plus, Pencil, Trash2, Save, Eye, Search, Shield, Truck, FileText, Package, Headphones } from 'lucide-react';
import { defaultSiteConfig, type Service } from '@/lib/site-config';
import Link from 'next/link';

const iconOptions = [
  { value: 'Search', label: 'Search', icon: Search },
  { value: 'Shield', label: 'Shield', icon: Shield },
  { value: 'Truck', label: 'Truck', icon: Truck },
  { value: 'FileText', label: 'Document', icon: FileText },
  { value: 'Package', label: 'Package', icon: Package },
  { value: 'Headphones', label: 'Support', icon: Headphones },
];

const getIconComponent = (iconName: string) => {
  const option = iconOptions.find(o => o.value === iconName);
  return option?.icon || Search;
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(defaultSiteConfig.services);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [saved, setSaved] = useState(false);
  const [newService, setNewService] = useState<Partial<Service>>({
    title: '',
    description: '',
    icon: 'Search',
    isVisible: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAddService = () => {
    if (newService.title && newService.description) {
      setServices([
        ...services,
        {
          id: Date.now().toString(),
          title: newService.title,
          description: newService.description,
          icon: newService.icon || 'Search',
          isVisible: true,
        }
      ]);
      setNewService({ title: '', description: '', icon: 'Search', isVisible: true });
      setIsAddDialogOpen(false);
    }
  };

  const handleEditService = () => {
    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? editingService : s));
      setEditingService(null);
    }
  };

  const handleDelete = (id: string) => {
    setServices(services.filter(s => s.id !== id));
  };

  const handleToggleVisibility = (id: string) => {
    setServices(services.map(s => 
      s.id === id ? { ...s, isVisible: !s.isVisible } : s
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Services</h1>
          <p className="text-muted-foreground mt-1">Manage the services displayed on your website</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/#services" target="_blank">
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
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Service</DialogTitle>
                <DialogDescription>Add a service to display on your website</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Service Title</Label>
                  <Input
                    value={newService.title}
                    onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                    placeholder="e.g., Mineral Sourcing"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={newService.description}
                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                    placeholder="Describe the service..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Icon</Label>
                  <div className="grid grid-cols-6 gap-2">
                    {iconOptions.map((option) => (
                      <Button
                        key={option.value}
                        variant={newService.icon === option.value ? "default" : "outline"}
                        size="icon"
                        className="h-10 w-10"
                        title={option.label}
                        onClick={() => setNewService({ ...newService, icon: option.value })}
                      >
                        <option.icon className="w-4 h-4" />
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddService}>Add Service</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-foreground">{services.length}</div>
            <p className="text-xs text-muted-foreground">Total Services</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-500">{services.filter(s => s.isVisible).length}</div>
            <p className="text-xs text-muted-foreground">Visible</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-muted-foreground">{services.filter(s => !s.isVisible).length}</div>
            <p className="text-xs text-muted-foreground">Hidden</p>
          </CardContent>
        </Card>
      </div>

      {/* Services List */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Service List</CardTitle>
          <CardDescription>Toggle visibility to show/hide services on your website</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {services.map((service) => {
              const IconComponent = getIconComponent(service.icon);
              return (
                <div 
                  key={service.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border border-border/50 bg-card hover:border-primary/30 transition-colors ${!service.isVisible ? 'opacity-60' : ''}`}
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground">{service.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{service.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Switch 
                      checked={service.isVisible}
                      onCheckedChange={() => handleToggleVisibility(service.id)}
                    />
                    
                    <div className="flex items-center gap-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-foreground"
                            onClick={() => setEditingService(service)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Service</DialogTitle>
                            <DialogDescription>Update service details</DialogDescription>
                          </DialogHeader>
                          {editingService && (
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label>Title</Label>
                                <Input
                                  value={editingService.title}
                                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                  value={editingService.description}
                                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                                  rows={3}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Icon</Label>
                                <div className="grid grid-cols-6 gap-2">
                                  {iconOptions.map((option) => (
                                    <Button
                                      key={option.value}
                                      variant={editingService.icon === option.value ? "default" : "outline"}
                                      size="icon"
                                      className="h-10 w-10"
                                      onClick={() => setEditingService({ ...editingService, icon: option.value })}
                                    >
                                      <option.icon className="w-4 h-4" />
                                    </Button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setEditingService(null)}>Cancel</Button>
                            <Button onClick={handleEditService}>Save Changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => handleDelete(service.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
