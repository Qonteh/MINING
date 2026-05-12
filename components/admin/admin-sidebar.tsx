'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileEdit,
  Image,
  Gem,
  Briefcase,
  MessageSquare,
  Phone,
  Palette,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  BarChart3,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logoutAction } from '@/app/admin/actions';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navigation = [
  { 
    name: 'Dashboard', 
    href: '/admin', 
    icon: LayoutDashboard,
    description: 'Overview & activity'
  },
  { 
    name: 'Hero Section', 
    href: '/admin/hero', 
    icon: Image,
    description: 'Main banner content'
  },
  { 
    name: 'About Section', 
    href: '/admin/about', 
    icon: FileEdit,
    description: 'About us content'
  },
  { 
    name: 'Minerals', 
    href: '/admin/minerals', 
    icon: Gem,
    description: 'Manage mineral cards'
  },
  { 
    name: 'Services', 
    href: '/admin/services', 
    icon: Briefcase,
    description: 'Manage services'
  },
  { 
    name: 'Stats & Reach', 
    href: '/admin/stats', 
    icon: BarChart3,
    description: 'Stats & global reach'
  },
  { 
    name: 'Contact Info', 
    href: '/admin/contact-info', 
    icon: Phone,
    description: 'Phone, email, address'
  },
  { 
    name: 'Messages', 
    href: '/admin/messages', 
    icon: MessageSquare,
    description: 'Contact submissions'
  },
  { 
    name: 'Social Links', 
    href: '/admin/social', 
    icon: Globe,
    description: 'Social media links'
  },
  { 
    name: 'Appearance', 
    href: '/admin/appearance', 
    icon: Palette,
    description: 'Colors & fonts'
  },
];

interface AdminSidebarProps {
  user: {
    name: string;
    email: string;
    role: string;
  };
}

export function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={cn(
      "flex flex-col h-full bg-secondary text-secondary-foreground",
      !mobile && collapsed ? "w-20" : "w-72"
    )}>
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border/50">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
          <Gem className="w-5 h-5 text-primary" />
        </div>
        {(!collapsed || mobile) && (
          <div className="flex-1 min-w-0">
            <h2 className="font-serif font-semibold text-primary-foreground truncate">Gemora Admin</h2>
            <p className="text-xs text-muted-foreground truncate">Website Manager</p>
          </div>
        )}
        {!mobile && (
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 text-muted-foreground hover:text-foreground"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        <p className={cn(
          "px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
          collapsed && !mobile && "text-center"
        )}>
          {collapsed && !mobile ? "Nav" : "Website Sections"}
        </p>
        {navigation.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/admin' && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.name}
              href={item.href}
              title={collapsed ? item.name : undefined}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-accent/10 hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {(!collapsed || mobile) && (
                <div className="flex-1 min-w-0">
                  <span className="font-medium truncate block">{item.name}</span>
                  <span className={cn(
                    "text-xs truncate block",
                    isActive ? "text-primary-foreground/70" : "text-muted-foreground/70"
                  )}>
                    {item.description}
                  </span>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* View Site Link */}
      <div className="p-2 border-t border-border/50">
        <Link
          href="/"
          target="_blank"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-accent/10 hover:text-foreground transition-all",
            collapsed && !mobile && "justify-center"
          )}
        >
          <Globe className="w-5 h-5 shrink-0" />
          {(!collapsed || mobile) && <span className="font-medium">View Website</span>}
        </Link>
      </div>

      {/* User Section */}
      <div className="p-2 border-t border-border/50">
        {(!collapsed || mobile) && (
          <div className="px-3 py-2 mb-2">
            <p className="font-medium text-sm text-foreground truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
        )}
        <form action={logoutAction}>
          <Button
            type="submit"
            variant="ghost"
            className={cn(
              "w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10",
              collapsed && !mobile && "justify-center px-0"
            )}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {(!collapsed || mobile) && <span className="ml-3">Sign Out</span>}
          </Button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-secondary border-b border-border/50 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Gem className="w-4 h-4 text-primary" />
            </div>
            <span className="font-serif font-semibold text-primary-foreground">Gemora Admin</span>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72 bg-secondary">
              <SidebarContent mobile />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 bottom-0 z-40 border-r border-border/50">
        <SidebarContent />
      </aside>
    </>
  );
}
