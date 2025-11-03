import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  Wallet,
  Bot,
  Settings,
  Search,
  Bell,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConnectWallet } from "./ConnectWallet"; // <-- IMPORT THE NEW COMPONENT

const navItems = [
  { icon: BookOpen, label: "Journal", path: "/" },
  { icon: Wallet, label: "Portfolio", path: "/portfolio" },
  { icon: Bot, label: "Agents", path: "/agents" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false); // Note: sidebarOpen is not used, can be removed if mobile menu isn't planned

  return (
    <div className="min-h-screen flex flex-col pb-20 lg:pb-0">
      {/* Top Header - Desktop */}
      <header className="h-14 lg:h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 shadow-elegant">
        <div className="h-full px-3 lg:px-4 flex items-center justify-between gap-2 lg:gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-glow">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg lg:text-xl font-bold text-gradient">
              AI Crypto
            </span>
          </div>

          {/* Search Bar - Desktop only */}
          <div className="flex-1 max-w-md hidden lg:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search entries, assets..."
                className="pl-10 bg-muted/50 border-border"
              />
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* === THIS IS THE FIX === */}
            {/* The old static buttons are replaced with our new dynamic component. */}
            <ConnectWallet />
            {/* ======================= */}

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <div className="flex flex-1">
        <aside className="hidden lg:block sticky top-16 left-0 h-[calc(100vh-4rem)] w-20 bg-sidebar border-r border-sidebar-border">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link key={item.path} to={item.path}>
                  <div
                    className={`
                    flex items-center justify-center p-3 rounded-lg
                    transition-all duration-200
                    ${
                      isActive
                        ? "bg-sidebar-accent border-l-4 border-sidebar-primary text-sidebar-primary-foreground"
                        : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
                    }
                  `}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-lg shadow-elegant">
        <div className="flex items-center justify-around h-20 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center justify-center flex-1 h-full"
              >
                <div className={`
                  flex flex-col items-center gap-1 px-3 py-2 rounded-lg
                  transition-all duration-200
                  ${isActive ? 'text-primary' : 'text-muted-foreground'}
                `}>
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-medium">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
