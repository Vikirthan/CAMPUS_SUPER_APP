import React, { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard, Utensils, Mail, Newspaper, Search as SearchIcon, ShoppingBag, Car, ArrowLeftRight,
  MapPin, UtensilsCrossed, BookOpen, BrainCircuit, Users, Shield, LogOut, Menu, X, ChevronDown, ChevronRight,
  GraduationCap, Compass, Repeat,
} from "lucide-react";

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [{ to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" }],
  },
  {
    label: "Daily Pulse",
    color: "pulse",
    items: [
      { to: "/mess-menu", icon: Utensils, label: "Mess Menu" },
      { to: "/mail-summarizer", icon: Mail, label: "AI Mail Summarizer" },
      { to: "/campus-feed", icon: Newspaper, label: "Campus Feed" },
    ],
  },
  {
    label: "Student Exchange",
    color: "exchange",
    items: [
      { to: "/lost-found", icon: SearchIcon, label: "Lost & Found" },
      { to: "/marketplace", icon: ShoppingBag, label: "Marketplace" },
      { to: "/cab-pool", icon: Car, label: "Cab Pool" },
      { to: "/skills", icon: Repeat, label: "Skill Exchange" },
    ],
  },
  {
    label: "Explorer's Guide",
    color: "explorer",
    items: [
      { to: "/nearby", icon: MapPin, label: "Nearby Hub" },
      { to: "/food-search", icon: UtensilsCrossed, label: "Food Search" },
    ],
  },
  {
    label: "Academic Cockpit",
    color: "academic",
    items: [
      { to: "/timetable", icon: BookOpen, label: "Timetable" },
      { to: "/study-assistant", icon: BrainCircuit, label: "AI Study Assistant" },
    ],
  },
  {
    label: "Community",
    color: "clubs",
    items: [{ to: "/clubs", icon: Users, label: "Clubs & Community" }],
  },
];

const ADMIN_GROUP = {
  label: "Administration",
  items: [{ to: "/admin", icon: Shield, label: "Admin Portal" }],
};

export default function AppLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleGroup = (label: string) =>
    setCollapsed((prev) => ({ ...prev, [label]: !prev[label] }));

  const allGroups = user?.role === "admin" ? [...NAV_GROUPS, ADMIN_GROUP] : NAV_GROUPS;

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <Compass className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">Nexus</h1>
            <p className="text-xs text-sidebar-foreground/60">IIT Ropar</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 space-y-1">
        {allGroups.map((group) => (
          <div key={group.label} className="mb-2">
            <button
              onClick={() => toggleGroup(group.label)}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50 hover:text-sidebar-foreground/70 transition-colors"
            >
              {group.label}
              {collapsed[group.label] ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
            {!collapsed[group.label] && (
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.to;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-sidebar-primary/25"
                          : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                      }`}
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
            {user?.displayName?.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.displayName}</p>
            <p className="text-xs text-sidebar-foreground/50 capitalize">{user?.role}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className="w-full justify-start text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-sidebar flex-shrink-0 transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border px-4 lg:px-8 h-16 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-secondary">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:block">
              Welcome, <span className="font-semibold text-foreground">{user?.displayName}</span>
            </span>
          </div>
        </div>

        {/* Page content */}
        <div className="p-4 lg:p-8 animate-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
