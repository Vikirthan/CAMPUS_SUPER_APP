import React, { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Car, MapPin, Calendar, Clock, Users, Send } from "lucide-react";
import { toast } from "sonner";

export default function CabPool() {
  const { getPostsByType, addPost } = useData();
  const { user } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [joinDialog, setJoinDialog] = useState<string | null>(null);
  const [form, setForm] = useState({ route: "", date: "", time: "", seats: "3" });
  const [joinForm, setJoinForm] = useState({ name: "", regNo: "", mobile: "", email: "", message: "" });

  const posts = getPostsByType("cab-pool");

  const handleCreate = () => {
    if (!form.route || !form.date || !form.time) {
      toast.error("Fill in all required fields");
      return;
    }
    addPost({
      type: "cab-pool",
      title: form.route,
      description: `${form.date} at ${form.time} • ${form.seats} seats`,
      route: form.route,
      date: form.date,
      time: form.time,
      seats: Number(form.seats),
      createdBy: user?.username || "unknown",
      contactInfo: { name: user?.displayName || "", regNo: "", mobile: "", email: "" },
    });
    toast.success("Cab pool posted! Pending admin verification.");
    setDialogOpen(false);
    setForm({ route: "", date: "", time: "", seats: "3" });
  };

  const handleJoin = () => {
    if (!joinForm.name || !joinForm.regNo || !joinForm.mobile || !joinForm.email) {
      toast.error("Fill in all required fields");
      return;
    }
    toast.success("Request sent! The organizer will be notified via email.");
    setJoinDialog(null);
    setJoinForm({ name: "", regNo: "", mobile: "", email: "", message: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">🚕 Cab Pool</h1>
          <p className="text-muted-foreground">Share rides and split fares with fellow students</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild><Button className="gradient-exchange border-0"><Plus className="w-4 h-4 mr-2" /> Create Ride</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create Cab Pool</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2"><Label>Route *</Label><Input value={form.route} onChange={(e) => setForm({ ...form, route: e.target.value })} placeholder="e.g. Chandigarh → IIT Ropar" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Date *</Label><Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></div>
                <div className="space-y-2"><Label>Time *</Label><Input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} /></div>
              </div>
              <div className="space-y-2"><Label>Available Seats</Label><Input type="number" value={form.seats} onChange={(e) => setForm({ ...form, seats: e.target.value })} min="1" max="6" /></div>
              <Button onClick={handleCreate} className="w-full gradient-exchange border-0">Post Ride</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {posts.map((post, i) => (
          <Card key={post.id} className="hover:shadow-md transition-all hover:-translate-y-0.5 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
            <CardContent className="p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Car className="w-5 h-5 text-exchange" />
                  <h3 className="font-semibold">{post.route || post.title}</h3>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${post.status === "verified" ? "status-verified" : "status-unverified"}`}>{post.status}</span>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                {post.date && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>}
                {post.time && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.time}</span>}
                {post.seats && <span className="flex items-center gap-1"><Users className="w-3 h-3" />{post.seats} seats</span>}
              </div>
              {post.status === "verified" && (
                <Dialog open={joinDialog === post.id} onOpenChange={(o) => setJoinDialog(o ? post.id : null)}>
                  <DialogTrigger asChild><Button size="sm" variant="outline" className="w-full"><Send className="w-3 h-3 mr-2" /> Request to Join</Button></DialogTrigger>
                  <DialogContent>
                    <DialogHeader><DialogTitle>Join Cab Pool</DialogTitle></DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2"><Label>Name *</Label><Input value={joinForm.name} onChange={(e) => setJoinForm({ ...joinForm, name: e.target.value })} /></div>
                      <div className="space-y-2"><Label>Registration No *</Label><Input value={joinForm.regNo} onChange={(e) => setJoinForm({ ...joinForm, regNo: e.target.value })} /></div>
                      <div className="space-y-2"><Label>Mobile *</Label><Input value={joinForm.mobile} onChange={(e) => setJoinForm({ ...joinForm, mobile: e.target.value })} /></div>
                      <div className="space-y-2"><Label>Email *</Label><Input type="email" value={joinForm.email} onChange={(e) => setJoinForm({ ...joinForm, email: e.target.value })} /></div>
                      <Button onClick={handleJoin} className="w-full gradient-exchange border-0">Send Request</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </CardContent>
          </Card>
        ))}
        {posts.length === 0 && <p className="text-muted-foreground col-span-full text-center py-12">No cab pools posted yet.</p>}
      </div>
    </div>
  );
}
