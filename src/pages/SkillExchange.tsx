import React, { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, ArrowLeftRight, Repeat } from "lucide-react";
import { toast } from "sonner";

export default function SkillExchange() {
  const { getPostsByType, addPost } = useData();
  const { user } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ skillOffered: "", skillWanted: "", description: "" });

  const posts = getPostsByType("skill");

  const handleSubmit = () => {
    if (!form.skillOffered || !form.skillWanted) {
      toast.error("Please fill in required fields");
      return;
    }
    addPost({
      type: "skill",
      title: `${form.skillOffered} ↔ ${form.skillWanted}`,
      description: form.description || `Offering ${form.skillOffered}, looking for ${form.skillWanted}`,
      skillOffered: form.skillOffered,
      skillWanted: form.skillWanted,
      createdBy: user?.username || "unknown",
    });
    toast.success("Skill exchange posted! Pending admin verification.");
    setDialogOpen(false);
    setForm({ skillOffered: "", skillWanted: "", description: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">🔄 Skill Exchange</h1>
          <p className="text-muted-foreground">Share your skills and learn from peers</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild><Button className="gradient-exchange border-0"><Plus className="w-4 h-4 mr-2" /> Post Skill</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create Skill Exchange</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2"><Label>Skill You Offer *</Label><Input value={form.skillOffered} onChange={(e) => setForm({ ...form, skillOffered: e.target.value })} placeholder="e.g. Python Programming" /></div>
              <div className="space-y-2"><Label>Skill You Want *</Label><Input value={form.skillWanted} onChange={(e) => setForm({ ...form, skillWanted: e.target.value })} placeholder="e.g. Guitar" /></div>
              <div className="space-y-2"><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Additional details..." /></div>
              <Button onClick={handleSubmit} className="w-full gradient-exchange border-0">Post Exchange</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post, i) => (
          <Card key={post.id} className="hover:shadow-md transition-all hover:-translate-y-0.5 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
            <CardContent className="p-5">
              <div className="flex justify-between mb-3">
                <Repeat className="w-5 h-5 text-exchange" />
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${post.status === "verified" ? "status-verified" : "status-unverified"}`}>{post.status}</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1.5 rounded-lg bg-explorer/10 text-explorer text-sm font-medium">{post.skillOffered}</span>
                <ArrowLeftRight className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="px-3 py-1.5 rounded-lg bg-academic/10 text-academic text-sm font-medium">{post.skillWanted}</span>
              </div>
              <p className="text-sm text-muted-foreground">{post.description}</p>
            </CardContent>
          </Card>
        ))}
        {posts.length === 0 && <p className="text-muted-foreground col-span-full text-center py-12">No skill exchanges posted yet.</p>}
      </div>
    </div>
  );
}
