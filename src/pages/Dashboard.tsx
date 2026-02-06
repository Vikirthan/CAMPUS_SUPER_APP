import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { Card, CardContent } from "@/components/ui/card";
import {
  Utensils, ShoppingBag, Car, BookOpen, MapPin, Users, Shield, Mail,
  ArrowRight, Clock, CheckCircle, AlertTriangle, XCircle,
} from "lucide-react";

const QUICK_ACTIONS = [
  { to: "/mess-menu", icon: Utensils, label: "Mess Menu", color: "gradient-pulse" },
  { to: "/marketplace", icon: ShoppingBag, label: "Marketplace", color: "gradient-exchange" },
  { to: "/cab-pool", icon: Car, label: "Cab Pool", color: "gradient-exchange" },
  { to: "/nearby", icon: MapPin, label: "Nearby Hub", color: "gradient-explorer" },
  { to: "/study-assistant", icon: BookOpen, label: "Study AI", color: "gradient-academic" },
  { to: "/mail-summarizer", icon: Mail, label: "Mail AI", color: "gradient-pulse" },
  { to: "/clubs", icon: Users, label: "Clubs", color: "gradient-clubs" },
];

export default function Dashboard() {
  const { user } = useAuth();
  const { stats, posts } = useData();

  const recentPosts = posts.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Good {new Date().getHours() < 12 ? "Morning" : new Date().getHours() < 17 ? "Afternoon" : "Evening"},{" "}
          {user?.displayName?.split(" ")[0]} 👋
        </h1>
        <p className="text-muted-foreground mt-1">Here's what's happening on campus today</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Posts", value: stats.total, icon: ShoppingBag, color: "text-primary" },
          { label: "Pending", value: stats.pending, icon: Clock, color: "text-exchange" },
          { label: "Approved", value: stats.approved, icon: CheckCircle, color: "text-explorer" },
          { label: "Rejected", value: stats.rejected, icon: XCircle, color: "text-destructive" },
        ].map((stat) => (
          <Card key={stat.label} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-3xl font-bold animate-count-up">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
          {QUICK_ACTIONS.map((action) => (
            <Link
              key={action.to}
              to={action.to}
              className="group flex flex-col items-center gap-3 p-4 rounded-xl bg-card border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <action.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium text-center">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Admin quick link */}
      {user?.role === "admin" && (
        <Link
          to="/admin"
          className="flex items-center justify-between p-5 rounded-xl gradient-primary text-primary-foreground hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6" />
            <div>
              <p className="font-semibold text-lg">Admin Portal</p>
              <p className="text-sm opacity-80">{stats.pending} posts pending verification</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5" />
        </Link>
      )}

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {recentPosts.map((post, i) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow" style={{ animationDelay: `${i * 80}ms` }}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full shrink-0 ${
                  post.status === "verified" ? "bg-explorer" : post.status === "rejected" ? "bg-destructive" : "bg-exchange"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{post.title}</p>
                  <p className="text-xs text-muted-foreground capitalize">{post.type.replace("-", " ")} • {new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${
                  post.status === "verified" ? "status-verified" : post.status === "rejected" ? "status-rejected" : "status-unverified"
                }`}>
                  {post.status}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
