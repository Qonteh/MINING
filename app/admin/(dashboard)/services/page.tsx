'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
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
import { Plus, Pencil, Trash2, GripVertical, Truck, Shield, Globe, Clock, Award, Headphones } from 'lucide-react';

// Mock data - replace with database queries
const iconOptions = [
  { value: 'truck', label: 'Shipping', icon: Truck },
  { value: 'shield', label: 'Security', icon: Shield },
  { value: 'globe', label: 'Global', icon: Globe },
  { value: 'clock', label: 'Time', icon: Clock },
  { value: 'award', label: 'Quality', icon: Award },
  { value: 'headphones', label: 'Support', icon: Headphones },
];

const getIcon = (iconName: string) => {
  const option = iconOptions.find(o => o.value === iconName);
  return option?.icon || Truck;
};

const initialServices = [
  { id: 1, title: 'Global Shipping', description: 'Worldwide delivery with secure packaging and real-time tracking for all mineral shipments.', icon: 'truck', isActive: true, order: 1 },
  { id: 2, title: 'Quality Assurance', description: 'Rigorous testing and certification to ensure the highest quality standards for every mineral.', icon: 'award', isActive: true, order: 2 },
  { id: 3, title: 'Secure Transactions', description: 'Bank-grade security protocols protect all your transactions and sensitive data.', icon: 'shield', isActive: true, order: 3 },
  { id: 4, title: 'International Markets', description: 'Access to premium mineral markets across 50+ countries worldwide.', icon: 'globe', isActive: true, order: 4 },
  { id: 5, title: 'Fast Processing', description: 'Quick order processing and expedited shipping options available.', icon: 'clock', isActive: true, order: 5 },
  { id: 6, title: '24/7 Support', description: 'Round-the-clock customer support to assist with all your needs.', icon: 'headphones', isActive: false, order: 6 },
];

export default function ServicesPage() {
  const [services, setServices] = useState(initialServices);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleToggleActive = (id: number) => {
    setServices(services.map(s => 
      s.id === id ? { ...s, isActive: !s.isActive } : s
    ));
  };

  const handleDelete = (id: number) => {
    setServices(services.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Services</h1>
          <p className="text-muted-foreground mt-1">Manage the services displayed on your website</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
              <DialogDescription>Add a new service to display on your website.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="e.g., Global Shipping" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="icon">Icon</Label>
                <div className="grid grid-cols-6 gap-2">
                  {iconOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant="outline"
                      size="icon"
                      className="h-10 w-10"
                      title={option.label}
                    >
                      <option.icon className="w-4 h-4" />
                    </Button>
                  ))}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe the service..." rows={3} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsAddDialogOpen(false)}>
                Add Service
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardDescription>Total Services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{services.length}</div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardDescription>Active</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">{services.filter(s => s.isActive).length}</div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardDescription>Inactive</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-muted-foreground">{services.filter(s => !s.isActive).length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Services List */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Service List</CardTitle>
          <CardDescription>Drag to reorder services on your website</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {services.sort((a, b) => a.order - b.order).map((service) => {
              const IconComponent = getIcon(service.icon);
              return (
                <div 
                  key={service.id}
                  className="flex items-center gap-4 p-4 rounded-lg border border-border/50 bg-card hover:border-primary/30 transition-colors"
                >
                  <button className="cursor-grab text-muted-foreground hover:text-foreground">
                    <GripVertical className="w-5 h-5" />
                  </button>
                  
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-foreground">{service.title}</h3>
                      <Badge variant={service.isActive ? "default" : "secondary"} className={service.isActive ? "bg-chart-3 hover:bg-chart-3/80" : ""}>
                        {service.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{service.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`active-${service.id}`} className="text-sm text-muted-foreground sr-only">
                        Active
                      </Label>
                      <Switch 
                        id={`active-${service.id}`}
                        checked={service.isActive}
                        onCheckedChange={() => handleToggleActive(service.id)}
                      />
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                        <Pencil className="w-4 h-4" />
                      </Button>
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
