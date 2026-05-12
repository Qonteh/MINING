'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Plus, Pencil, Trash2, MapPin, Building2 } from 'lucide-react';

// Mock data - replace with database queries
const initialLocations = [
  { id: 1, country: 'South Africa', city: 'Johannesburg', address: '123 Mining District, Gauteng', lat: -26.2041, lng: 28.0473, isHeadquarters: true, isActive: true },
  { id: 2, country: 'United States', city: 'Denver', address: '456 Mineral Ave, Colorado 80202', lat: 39.7392, lng: -104.9903, isHeadquarters: false, isActive: true },
  { id: 3, country: 'Australia', city: 'Perth', address: '789 Resources Way, WA 6000', lat: -31.9505, lng: 115.8605, isHeadquarters: false, isActive: true },
  { id: 4, country: 'United Kingdom', city: 'London', address: '10 Trading Street, EC2A 4BX', lat: 51.5074, lng: -0.1278, isHeadquarters: false, isActive: true },
  { id: 5, country: 'China', city: 'Shanghai', address: '88 Commerce Road, Pudong', lat: 31.2304, lng: 121.4737, isHeadquarters: false, isActive: true },
  { id: 6, country: 'Brazil', city: 'Belo Horizonte', address: '321 Mining Zone, MG', lat: -19.9167, lng: -43.9345, isHeadquarters: false, isActive: false },
];

export default function LocationsPage() {
  const [locations, setLocations] = useState(initialLocations);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleToggleActive = (id: number) => {
    setLocations(locations.map(l => 
      l.id === id ? { ...l, isActive: !l.isActive } : l
    ));
  };

  const handleDelete = (id: number) => {
    setLocations(locations.filter(l => l.id !== id));
  };

  const activeLocations = locations.filter(l => l.isActive);
  const headquarters = locations.find(l => l.isHeadquarters);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Global Locations</h1>
          <p className="text-muted-foreground mt-1">Manage your worldwide office and mining locations</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Location
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Location</DialogTitle>
              <DialogDescription>Add a new office or mining location.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" placeholder="e.g., South Africa" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="e.g., Johannesburg" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Full address" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="lat">Latitude</Label>
                  <Input id="lat" type="number" step="0.0001" placeholder="-26.2041" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lng">Longitude</Label>
                  <Input id="lng" type="number" step="0.0001" placeholder="28.0473" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="headquarters" />
                <Label htmlFor="headquarters">Mark as Headquarters</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsAddDialogOpen(false)}>
                Add Location
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardDescription>Total Locations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{locations.length}</div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardDescription>Active</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">{activeLocations.length}</div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardDescription>Countries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {new Set(locations.map(l => l.country)).size}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Headquarters Card */}
      {headquarters && (
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              <CardTitle className="text-foreground">Headquarters</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{headquarters.city}, {headquarters.country}</h3>
                <p className="text-muted-foreground mt-1">{headquarters.address}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Coordinates: {headquarters.lat}, {headquarters.lng}
                </p>
              </div>
              <Badge className="bg-primary hover:bg-primary/80">Main Office</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Locations Grid */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>All Locations</CardTitle>
          <CardDescription>Manage your global presence</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {locations.filter(l => !l.isHeadquarters).map((location) => (
              <div 
                key={location.id}
                className="p-4 rounded-lg border border-border/50 bg-card hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{location.city}</h3>
                      <p className="text-sm text-muted-foreground">{location.country}</p>
                    </div>
                  </div>
                  <Badge variant={location.isActive ? "default" : "secondary"} className={location.isActive ? "bg-chart-3 hover:bg-chart-3/80" : ""}>
                    {location.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{location.address}</p>
                
                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={location.isActive}
                      onCheckedChange={() => handleToggleActive(location.id)}
                    />
                    <span className="text-sm text-muted-foreground">Active</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => handleDelete(location.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
