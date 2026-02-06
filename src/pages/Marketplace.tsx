import React, { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Tag, Clock, Heart } from "lucide-react";
import { toast } from "sonner";

const CATEGORIES = ["Electronics", "Books", "Clothing", "Furniture", "Sports", "Other"];

export default function Marketplace() {
  const { getPostsByType, addPost } = useData();
  const { user } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [catFilter, setCatFilter] = useState("all");
  const [form, setForm] = useState({ title: "", description: "", price: "", category: "Electronics" });

  const posts = getPostsByType("marketplace").filter(
    (p) => catFilter === "all" || p.category === catFilter
  );

  const handleSubmit = () => {
    if (!form.title || !form.description || !form.price) {
      toast.error("Please fill in all required fields");
      return;
    }
    addPost({
      type: "marketplace",
      title: form.title,
      description: form.description,
      price: Number(form.price),
      category: form.category,
      createdBy: user?.username || "unknown",
    });
    toast.success("Listing created! Pending admin verification.");
    setDialogOpen(false);
    setForm({ title: "", description: "", price: "", category: "Electronics" });
  };

  const handleInterested = (post: any) => {
    toast.success(`Interest registered for "${post.title}". The seller will be notified via email.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">🛒 Marketplace</h1>
          <p className="text-muted-foreground">Buy & sell within the campus community</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-exchange border-0"><Plus className="w-4 h-4 mr-2" /> Sell Item</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>List an Item for Sale</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2"><Label>Title *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Product name" /></div>
              <div className="space-y-2"><Label>Description *</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe your item..." /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Price (₹) *</Label><Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="0" /></div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleSubmit} className="w-full gradient-exchange border-0">List Item</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {["all", ...CATEGORIES].map((c) => (
          <button key={c} onClick={() => setCatFilter(c)} className={`px-4 py-2 rounded-full text-sm font-medium capitalize whitespace-nowrap transition-all ${catFilter === c ? "gradient-exchange text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post, i) => (
          <Card key={post.id} className="hover:shadow-lg transition-all hover:-translate-y-1 animate-fade-in overflow-hidden" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="h-40 bg-gradient-to-br from-exchange/20 to-exchange/5 flex items-center justify-center">
              <Tag className="w-12 h-12 text-exchange/40" />
            </div>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-2">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${post.status === "verified" ? "status-verified" : post.status === "rejected" ? "status-rejected" : "status-unverified"}`}>{post.status}</span>
                <span className="text-xs text-muted-foreground">{post.category}</span>
              </div>
              <h3 className="font-semibold mb-1">{post.title}</h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{post.description}</p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-exchange">₹{post.price}</p>
                {post.status === "verified" && (
                  <Button size="sm" variant="outline" onClick={() => handleInterested(post)} className="text-xs">
                    <Heart className="w-3 h-3 mr-1" /> Interested
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {posts.length === 0 && <p className="text-muted-foreground col-span-full text-center py-12">No listings found.</p>}
      </div>
    </div>
  );
}
