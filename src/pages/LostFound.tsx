import React, { useState } from "react";
import { useData, NexusPost } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";

export default function LostFound() {
  const { getPostsByType, addPost } = useData();
  const { user } = useAuth();
  const [filter, setFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", location: "", subType: "lost" });

  const posts = getPostsByType("lost-found").filter((p) => {
    if (filter === "lost") return p.subType === "lost";
    if (filter === "found") return p.subType === "found";
    if (filter === "verified") return p.status === "verified";
    return true;
  });

  const handleSubmit = () => {
    if (!form.title || !form.description) {
      toast.error("Please fill in all required fields");
      return;
    }
    addPost({
      type: "lost-found",
      title: form.title,
      description: form.description,
      location: form.location,
      subType: form.subType,
      createdBy: user?.username || "unknown",
    });
    toast.success("Post created! Pending admin verification.");
    setDialogOpen(false);
    setForm({ title: "", description: "", location: "", subType: "lost" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">🔍 Lost & Found</h1>
          <p className="text-muted-foreground">Report lost items or found belongings</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-exchange border-0">
              <Plus className="w-4 h-4 mr-2" /> New Post
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Report Lost / Found Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={form.subType} onValueChange={(v) => setForm({ ...form, subType: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lost">Lost</SelectItem>
                    <SelectItem value="found">Found</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Blue Water Bottle" />
              </div>
              <div className="space-y-2">
                <Label>Description *</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe the item..." />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Where was it lost/found?" />
              </div>
              <Button onClick={handleSubmit} className="w-full gradient-exchange border-0">Submit Post</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {["all", "lost", "found", "verified"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
              filter === f ? "gradient-exchange text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="grid sm:grid-cols-2 gap-4">
        {posts.map((post, i) => (
          <Card key={post.id} className="hover:shadow-md transition-all hover:-translate-y-0.5 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <Badge className={post.subType === "lost" ? "status-rejected" : "status-verified"}>
                  {post.subType === "lost" ? "Lost" : "Found"}
                </Badge>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  post.status === "verified" ? "status-verified" : post.status === "rejected" ? "status-rejected" : "status-unverified"
                }`}>
                  {post.status}
                </span>
              </div>
              <h3 className="font-semibold mb-1">{post.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{post.description}</p>
              {post.location && (
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {post.location}
                </p>
              )}
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3" /> {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
        {posts.length === 0 && (
          <p className="text-muted-foreground col-span-full text-center py-12">No posts found. Create one!</p>
        )}
      </div>
    </div>
  );
}
