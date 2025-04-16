
// Main layout component that provides the app's structure
// Features:
// - Responsive sidebar navigation for desktop
// - Mobile bottom navigation bar
// - Uses Lucide React for icons
// - Tailwind CSS for styling and responsive design

import { ReactNode } from "react";
import { CircleDollarSign, Home, PieChart, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // Get current route to highlight active navigation items
  const location = useLocation();
  
  // Navigation items used in both sidebar and mobile navigation
  const mainNavItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "Add Expense",
      href: "/add",
      icon: <CircleDollarSign className="h-5 w-5" />,
    },
    {
      title: "Reports",
      href: "/reports",
      icon: <PieChart className="h-5 w-5" />,
    },
    {
      title: "Accountants",
      href: "/accountants",
      icon: <Users className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar - hidden on mobile */}
      <div className="hidden md:flex flex-col bg-sidebar w-64 p-4 text-sidebar-foreground">
        <div className="flex items-center gap-2 py-4 px-2 mb-6">
          <CircleDollarSign className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">ExpenseTracker</span>
        </div>
        
        <nav className="space-y-1">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent",
                location.pathname === item.href
                  ? "bg-sidebar-accent text-primary"
                  : "text-sidebar-foreground hover:text-sidebar-foreground"
              )}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile bottom navigation - visible only on mobile */}
      <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 md:hidden">
        <div className="grid h-full grid-cols-4">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center",
                location.pathname === item.href
                  ? "text-primary"
                  : "text-gray-500 hover:text-primary"
              )}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.title}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-y-auto pb-16 md:pb-0">
        <main className="container max-w-screen-xl mx-auto py-6 px-4 md:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
