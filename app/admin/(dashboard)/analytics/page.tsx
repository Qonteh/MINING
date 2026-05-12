'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { TrendingUp, TrendingDown, Users, Eye, Clock, Globe } from 'lucide-react';
import { useState } from 'react';

// Mock data for charts
const visitorData = [
  { name: 'Jan', visitors: 1200, pageViews: 4800 },
  { name: 'Feb', visitors: 1400, pageViews: 5200 },
  { name: 'Mar', visitors: 1100, pageViews: 4100 },
  { name: 'Apr', visitors: 1800, pageViews: 6400 },
  { name: 'May', visitors: 2100, pageViews: 7800 },
  { name: 'Jun', visitors: 1900, pageViews: 7200 },
  { name: 'Jul', visitors: 2400, pageViews: 8600 },
];

const inquiryData = [
  { name: 'Mon', inquiries: 12 },
  { name: 'Tue', inquiries: 19 },
  { name: 'Wed', inquiries: 8 },
  { name: 'Thu', inquiries: 15 },
  { name: 'Fri', inquiries: 22 },
  { name: 'Sat', inquiries: 6 },
  { name: 'Sun', inquiries: 4 },
];

const mineralCategoryData = [
  { name: 'Precious Metals', value: 35, color: 'var(--chart-1)' },
  { name: 'Gemstones', value: 25, color: 'var(--chart-2)' },
  { name: 'Base Metals', value: 20, color: 'var(--chart-3)' },
  { name: 'Industrial', value: 15, color: 'var(--chart-4)' },
  { name: 'Rare Earth', value: 5, color: 'var(--chart-5)' },
];

const topCountries = [
  { country: 'United States', visitors: 2450, percentage: 28 },
  { country: 'United Kingdom', visitors: 1820, percentage: 21 },
  { country: 'Germany', visitors: 1340, percentage: 15 },
  { country: 'Australia', visitors: 980, percentage: 11 },
  { country: 'Canada', visitors: 760, percentage: 9 },
];

const stats = [
  { 
    title: 'Total Visitors', 
    value: '12.4K', 
    change: '+12.5%',
    trend: 'up',
    icon: Users 
  },
  { 
    title: 'Page Views', 
    value: '48.2K', 
    change: '+8.2%',
    trend: 'up',
    icon: Eye 
  },
  { 
    title: 'Avg. Session', 
    value: '4m 32s', 
    change: '-2.1%',
    trend: 'down',
    icon: Clock 
  },
  { 
    title: 'Countries', 
    value: '52', 
    change: '+3',
    trend: 'up',
    icon: Globe 
  },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-1">Track your website performance and visitor insights</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>{stat.title}</CardDescription>
              <div className="p-2 rounded-lg bg-muted">
                <stat.icon className="w-4 h-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                <span className={`text-sm flex items-center ${
                  stat.trend === 'up' ? 'text-chart-3' : 'text-destructive'
                }`}>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visitors Chart */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Visitors & Page Views</CardTitle>
            <CardDescription>Monthly traffic overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={visitorData}>
                  <defs>
                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      border: '1px solid var(--border)',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="visitors" 
                    stroke="var(--chart-1)" 
                    fillOpacity={1} 
                    fill="url(#colorVisitors)" 
                    strokeWidth={2}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="pageViews" 
                    stroke="var(--chart-2)" 
                    fillOpacity={1} 
                    fill="url(#colorPageViews)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Inquiries Chart */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Weekly Inquiries</CardTitle>
            <CardDescription>Contact form submissions this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={inquiryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      border: '1px solid var(--border)',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar 
                    dataKey="inquiries" 
                    fill="var(--chart-1)" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mineral Categories */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Interest by Category</CardTitle>
            <CardDescription>Most viewed mineral categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mineralCategoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {mineralCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      border: '1px solid var(--border)',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Countries */}
        <Card className="lg:col-span-2 border-border/50">
          <CardHeader>
            <CardTitle>Top Countries</CardTitle>
            <CardDescription>Visitors by geographic location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCountries.map((item, index) => (
                <div key={item.country} className="flex items-center gap-4">
                  <span className="w-6 text-sm font-medium text-muted-foreground">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-foreground">{item.country}</span>
                      <span className="text-sm text-muted-foreground">
                        {item.visitors.toLocaleString()} visitors
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                  <span className="w-12 text-right text-sm font-medium text-primary">
                    {item.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Note about real analytics */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-sm">
            <strong className="text-foreground">Note:</strong> This is sample data for demonstration. 
            Connect to a real analytics service (like Vercel Analytics, Google Analytics, or Plausible) 
            to see actual visitor data.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
