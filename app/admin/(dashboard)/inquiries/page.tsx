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
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Eye, Mail, Clock, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// Mock data - replace with database queries
const initialInquiries = [
  { 
    id: 1, 
    name: 'John Smith', 
    email: 'john.smith@example.com', 
    phone: '+1 555-123-4567',
    company: 'Mining Corp Ltd',
    subject: 'Bulk Gold Ore Order',
    message: 'We are interested in placing a bulk order for gold ore. Please provide pricing for quantities of 1000kg or more. We need delivery to our facility in Nevada.',
    status: 'new',
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    notes: ''
  },
  { 
    id: 2, 
    name: 'Sarah Johnson', 
    email: 'sarah.j@mineraltraders.com', 
    phone: '+44 20 7946 0958',
    company: 'Mineral Traders UK',
    subject: 'Partnership Inquiry',
    message: 'Hello, we are a UK-based mineral trading company looking to establish a partnership. We are particularly interested in your diamond and emerald inventory.',
    status: 'in_progress',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    notes: 'Sent initial partnership proposal'
  },
  { 
    id: 3, 
    name: 'Michael Chen', 
    email: 'm.chen@techmetals.cn', 
    phone: '+86 10 6512 3456',
    company: 'Tech Metals China',
    subject: 'Lithium Supply Agreement',
    message: 'We require a steady supply of lithium carbonate for our battery manufacturing plant. Looking to discuss long-term supply agreements.',
    status: 'resolved',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    notes: 'Signed 2-year supply contract'
  },
  { 
    id: 4, 
    name: 'Emma Williams', 
    email: 'emma.w@jewelcrafters.com', 
    phone: '+1 212-555-8900',
    company: 'JewelCrafters NYC',
    subject: 'Gemstone Quality Inquiry',
    message: 'I am a jewelry designer looking for high-quality gemstones. Can you provide certificates of authenticity and quality grades for your emeralds?',
    status: 'new',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    notes: ''
  },
  { 
    id: 5, 
    name: 'Robert Brown', 
    email: 'r.brown@industrialmin.com', 
    phone: '+1 713-555-2345',
    company: 'Industrial Minerals Inc',
    subject: 'Copper Concentrate Specs',
    message: 'Please send detailed specifications and assay reports for your copper concentrate. We need minimum 25% copper content.',
    status: 'in_progress',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    notes: 'Sent product specifications document'
  },
];

const statusConfig = {
  new: { label: 'New', color: 'bg-chart-2 hover:bg-chart-2/80', icon: Clock },
  in_progress: { label: 'In Progress', color: 'bg-primary hover:bg-primary/80', icon: MessageSquare },
  resolved: { label: 'Resolved', color: 'bg-chart-3 hover:bg-chart-3/80', icon: CheckCircle },
  closed: { label: 'Closed', color: 'bg-muted hover:bg-muted/80', icon: XCircle },
};

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState<typeof initialInquiries[0] | null>(null);

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = 
      inquiry.name.toLowerCase().includes(search.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(search.toLowerCase()) ||
      inquiry.subject.toLowerCase().includes(search.toLowerCase()) ||
      inquiry.company.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id: number, newStatus: string) => {
    setInquiries(inquiries.map(i => 
      i.id === id ? { ...i, status: newStatus } : i
    ));
    if (selectedInquiry?.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }
  };

  const stats = {
    total: inquiries.length,
    new: inquiries.filter(i => i.status === 'new').length,
    inProgress: inquiries.filter(i => i.status === 'in_progress').length,
    resolved: inquiries.filter(i => i.status === 'resolved').length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Contact Inquiries</h1>
        <p className="text-muted-foreground mt-1">Manage and respond to customer inquiries</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardDescription>Total Inquiries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardDescription>New</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">{stats.new}</div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardDescription>In Progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.inProgress}</div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardDescription>Resolved</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">{stats.resolved}</div>
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
                placeholder="Search inquiries..." 
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inquiries Table */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>All Inquiries</CardTitle>
          <CardDescription>Click on an inquiry to view details and respond</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contact</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Received</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInquiries.map((inquiry) => {
                  const StatusIcon = statusConfig[inquiry.status as keyof typeof statusConfig].icon;
                  return (
                    <TableRow key={inquiry.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell>
                        <div>
                          <p className="font-medium">{inquiry.name}</p>
                          <p className="text-sm text-muted-foreground">{inquiry.company}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="max-w-xs truncate">{inquiry.subject}</p>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusConfig[inquiry.status as keyof typeof statusConfig].color}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusConfig[inquiry.status as keyof typeof statusConfig].label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDistanceToNow(inquiry.createdAt, { addSuffix: true })}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => setSelectedInquiry(inquiry)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            asChild
                          >
                            <a href={`mailto:${inquiry.email}`}>
                              <Mail className="w-4 h-4" />
                            </a>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Inquiry Detail Dialog */}
      <Dialog open={!!selectedInquiry} onOpenChange={() => setSelectedInquiry(null)}>
        <DialogContent className="sm:max-w-2xl">
          {selectedInquiry && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedInquiry.subject}</DialogTitle>
                <DialogDescription>
                  From {selectedInquiry.name} at {selectedInquiry.company}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Email</Label>
                    <p className="font-medium">{selectedInquiry.email}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Phone</Label>
                    <p className="font-medium">{selectedInquiry.phone}</p>
                  </div>
                </div>
                
                <div>
                  <Label className="text-muted-foreground">Message</Label>
                  <p className="mt-1 p-3 rounded-lg bg-muted/50">{selectedInquiry.message}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Status</Label>
                    <Select 
                      value={selectedInquiry.status} 
                      onValueChange={(value) => handleStatusChange(selectedInquiry.id, value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Received</Label>
                    <p className="mt-2 font-medium">
                      {formatDistanceToNow(selectedInquiry.createdAt, { addSuffix: true })}
                    </p>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="notes" className="text-muted-foreground">Internal Notes</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Add notes about this inquiry..."
                    className="mt-1"
                    defaultValue={selectedInquiry.notes}
                    rows={3}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedInquiry(null)}>
                  Close
                </Button>
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <a href={`mailto:${selectedInquiry.email}?subject=Re: ${selectedInquiry.subject}`}>
                    <Mail className="w-4 h-4 mr-2" />
                    Reply via Email
                  </a>
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
