import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Gem, 
  MessageSquare, 
  Globe, 
  TrendingUp,
  Users,
  Package,
  DollarSign,
  Activity
} from 'lucide-react';

// Mock data - in production, fetch from database
const stats = [
  { 
    title: 'Total Minerals', 
    value: '24', 
    change: '+2 this month',
    icon: Gem,
    color: 'text-primary'
  },
  { 
    title: 'Active Inquiries', 
    value: '12', 
    change: '+5 new',
    icon: MessageSquare,
    color: 'text-chart-2'
  },
  { 
    title: 'Global Locations', 
    value: '8', 
    change: 'Across 6 continents',
    icon: Globe,
    color: 'text-chart-3'
  },
  { 
    title: 'Monthly Views', 
    value: '2.4K', 
    change: '+12% from last month',
    icon: TrendingUp,
    color: 'text-chart-4'
  },
];

const recentActivity = [
  { id: 1, action: 'New inquiry received', user: 'John Smith', time: '5 minutes ago', type: 'inquiry' },
  { id: 2, action: 'Mineral stock updated', user: 'Admin', time: '1 hour ago', type: 'mineral' },
  { id: 3, action: 'New inquiry received', user: 'Sarah Johnson', time: '3 hours ago', type: 'inquiry' },
  { id: 4, action: 'Service description updated', user: 'Admin', time: '5 hours ago', type: 'service' },
  { id: 5, action: 'Location added', user: 'Admin', time: '1 day ago', type: 'location' },
];

const quickStats = [
  { label: 'Total Users', value: '1,234', icon: Users },
  { label: 'Products', value: '24', icon: Package },
  { label: 'Revenue', value: '$45.2K', icon: DollarSign },
  { label: 'Active Now', value: '23', icon: Activity },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here&apos;s what&apos;s happening with Gemora Minerals.</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border/50 hover:border-primary/30 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Activity</CardTitle>
            <CardDescription>Latest actions and updates on your website</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div 
                  key={activity.id} 
                  className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className={`p-2 rounded-full ${
                    activity.type === 'inquiry' ? 'bg-chart-2/20 text-chart-2' :
                    activity.type === 'mineral' ? 'bg-primary/20 text-primary' :
                    activity.type === 'service' ? 'bg-chart-3/20 text-chart-3' :
                    'bg-chart-4/20 text-chart-4'
                  }`}>
                    {activity.type === 'inquiry' ? <MessageSquare className="w-4 h-4" /> :
                     activity.type === 'mineral' ? <Gem className="w-4 h-4" /> :
                     activity.type === 'service' ? <Package className="w-4 h-4" /> :
                     <Globe className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.user}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Quick Stats</CardTitle>
            <CardDescription>Key metrics at a glance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quickStats.map((stat) => (
                <div 
                  key={stat.label}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <stat.icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                  </div>
                  <span className="font-semibold text-foreground">{stat.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Database Connection Notice */}
      <Card className="border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Database Setup Required
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            To see real data, connect your PostgreSQL database by setting the <code className="px-1.5 py-0.5 rounded bg-muted text-foreground text-sm">DATABASE_URL</code> environment variable.
          </p>
          <div className="p-4 rounded-lg bg-secondary text-secondary-foreground font-mono text-sm overflow-x-auto">
            DATABASE_URL=postgresql://user:password@host:5432/database
          </div>
          <p className="text-sm text-muted-foreground">
            Then run the SQL script in <code className="px-1.5 py-0.5 rounded bg-muted text-foreground text-xs">scripts/setup-database.sql</code> using pgAdmin to create the tables.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
