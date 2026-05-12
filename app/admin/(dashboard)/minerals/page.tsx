'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Search, Gem } from 'lucide-react';

// Mock data - replace with database queries
const initialMinerals = [
  { id: 1, name: 'Gold Ore', category: 'Precious Metals', origin: 'South Africa', price: 1850, stock: 500, isActive: true, isFeatured: true },
  { id: 2, name: 'Diamond Rough', category: 'Gemstones', origin: 'Botswana', price: 5200, stock: 150, isActive: true, isFeatured: true },
  { id: 3, name: 'Copper Concentrate', category: 'Base Metals', origin: 'Chile', price: 320, stock: 2000, isActive: true, isFeatured: false },
  { id: 4, name: 'Lithium Carbonate', category: 'Industrial', origin: 'Australia', price: 780, stock: 800, isActive: true, isFeatured: true },
  { id: 5, name: 'Silver Bars', category: 'Precious Metals', origin: 'Mexico', price: 28, stock: 1200, isActive: true, isFeatured: false },
  { id: 6, name: 'Emerald Raw', category: 'Gemstones', origin: 'Colombia', price: 3500, stock: 75, isActive: false, isFeatured: false },
];

export default function MineralsPage() {
  const [minerals, setMinerals] = useState(initialMinerals);
  const [search, setSearch] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingMineral, setEditingMineral] = useState<typeof initialMinerals[0] | null>(null);

  const filteredMinerals = minerals.filter(mineral => 
    mineral.name.toLowerCase().includes(search.toLowerCase()) ||
    mineral.category.toLowerCase().includes(search.toLowerCase()) ||
    mineral.origin.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setMinerals(minerals.filter(m => m.id !== id));
  };

  const handleToggleActive = (id: number) => {
    setMinerals(minerals.map(m => 
      m.id === id ? { ...m, isActive: !m.isActive } : m
    ));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Minerals</h1>
          <p className="text-muted-foreground mt-1">Manage your mineral inventory and catalog</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Mineral
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Mineral</DialogTitle>
              <DialogDescription>Add a new mineral to your inventory catalog.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="e.g., Gold Ore" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" placeholder="e.g., Precious Metals" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="origin">Origin</Label>
                  <Input id="origin" placeholder="e.g., South Africa" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price per Unit ($)</Label>
                  <Input id="price" type="number" placeholder="0.00" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input id="stock" type="number" placeholder="0" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe the mineral..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsAddDialogOpen(false)}>
                Add Mineral
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardDescription>Total Minerals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{minerals.length}</div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardDescription>Active</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">{minerals.filter(m => m.isActive).length}</div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardDescription>Featured</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{minerals.filter(m => m.isFeatured).length}</div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardDescription>Categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(minerals.map(m => m.category)).size}</div>
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
                placeholder="Search minerals..." 
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Minerals Table */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Mineral Inventory</CardTitle>
          <CardDescription>A list of all minerals in your catalog</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mineral</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Origin</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMinerals.map((mineral) => (
                  <TableRow key={mineral.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Gem className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{mineral.name}</p>
                          {mineral.isFeatured && (
                            <Badge variant="secondary" className="text-xs">Featured</Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{mineral.category}</TableCell>
                    <TableCell>{mineral.origin}</TableCell>
                    <TableCell className="text-right font-medium">${mineral.price.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{mineral.stock.toLocaleString()} kg</TableCell>
                    <TableCell>
                      <Badge 
                        variant={mineral.isActive ? "default" : "secondary"}
                        className={mineral.isActive ? "bg-chart-3 hover:bg-chart-3/80" : ""}
                      >
                        {mineral.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => handleDelete(mineral.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
