import React, { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, CheckCircle, XCircle, Clock, AlertTriangle, ShoppingBag, Search, Car, Repeat } from "lucide-react";
import { toast } from "sonner";

const TYPE_ICONS: Record<string, any> = {
  "lost-found": Search,
  marketplace: ShoppingBag,
  "cab-pool": Car,
  skill: Repeat,
};

const TYPE_LABELS: Record<string, string> = {
  "lost-found": "Lost & Found",
  marketplace: "Marketplace",
  "cab-pool": "Cab Pool",
  skill: "Skill Exchange",
  club: "Clubs",
  food: "Food",
};

export default function AdminPortal() {
  const { posts, updatePostStatus, stats } = useData();
  const [activeTab, setActiveTab] = useState("unverified");

  const filtered = activeTab === "all" ? posts : posts.filter((p) => p.status === activeTab);

  const handleApprove = (id: string) => {
    updatePostStatus(id, "verified");
    toast.success("Post approved and now publicly visible!");
  };

  const handleReject = (id: string) => {
    updatePostStatus(id, "rejected");
    toast.info("Post rejected and hidden from public view.");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Shield className="w-7 h-7 text-primary" /> Admin Portal
        </h1>
        <p className="text-muted-foreground">Review and moderate all user-generated content</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total", value: stats.total, icon: ShoppingBag, color: "text-primary", bg: "bg-primary/10" },
          { label: "Pending", value: stats.pending, icon: Clock, color: "text-exchange", bg: "bg-exchange/10" },
          { label: "Approved", value: stats.approved, icon: CheckCircle, color: "text-explorer", bg: "bg-explorer/10" },
          { label: "Rejected", value: stats.rejected, icon: XCircle, color: "text-destructive", bg: "bg-destructive/10" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
          <TabsTrigger value="unverified">Pending ({stats.pending})</TabsTrigger>
          <TabsTrigger value="verified">Approved ({stats.approved})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({stats.rejected})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <div className="space-y-3">
            {filtered.map((post, i) => {
              const Icon = TYPE_ICONS[post.type] || ShoppingBag;
              return (
                <Card key={post.id} className="hover:shadow-md transition-all animate-fade-in" style={{ animationDelay: `${i * 40}ms` }}>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-semibold">{post.title}</h3>
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${
                            post.status === "verified" ? "status-verified" : post.status === "rejected" ? "status-rejected" : "status-unverified"
                          }`}>
                            {post.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{post.description}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{TYPE_LABELS[post.type] || post.type}</span>
                          <span>•</span>
                          <span>by {post.createdBy}</span>
                          <span>•</span>
                          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      {post.status === "unverified" && (
                        <div className="flex gap-2 shrink-0">
                          <Button size="sm" onClick={() => handleApprove(post.id)} className="bg-explorer hover:bg-explorer/90 text-explorer-foreground">
                            <CheckCircle className="w-4 h-4 mr-1" /> Approve
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleReject(post.id)} className="text-destructive hover:bg-destructive/10">
                            <XCircle className="w-4 h-4 mr-1" /> Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-12">No posts in this category.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
