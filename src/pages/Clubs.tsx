import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Users, UserPlus, Calendar, Send } from "lucide-react";
import { toast } from "sonner";

const CLUBS = [
  { name: "Robotics Club", emoji: "🤖", members: 45, desc: "Build robots, compete in national competitions. Weekly workshops on Arduino and ROS.", activities: ["Robocon", "Workshops", "Hackathons"], color: "pillar-academic" },
  { name: "Coding Club", emoji: "💻", members: 120, desc: "Competitive programming, open source, and development. Regular contests and mentorship.", activities: ["CP Contests", "Open Source", "Dev Sprints"], color: "pillar-pulse" },
  { name: "Photography Club", emoji: "📸", members: 35, desc: "Capture campus life and beyond. Photo walks, exhibitions, and workshops.", activities: ["Photo Walks", "Exhibitions", "Workshops"], color: "pillar-explorer" },
  { name: "Music Club", emoji: "🎵", members: 60, desc: "Jam sessions, performances at campus events, and music production.", activities: ["Jam Sessions", "Open Mic", "Band Night"], color: "pillar-exchange" },
  { name: "Entrepreneurship Cell", emoji: "🚀", members: 80, desc: "Startup talks, pitch competitions, and mentorship from industry leaders.", activities: ["Pitch Nights", "Startup Weekend", "Speaker Series"], color: "pillar-clubs" },
  { name: "Literary Society", emoji: "📚", members: 40, desc: "Debates, creative writing, poetry slams, and book discussions.", activities: ["Debates", "Poetry Slam", "Book Club"], color: "pillar-academic" },
  { name: "Sports Council", emoji: "🏅", members: 150, desc: "Inter-IIT sports, intramural leagues, and fitness programs.", activities: ["Cricket", "Football", "Badminton", "Athletics"], color: "pillar-explorer" },
  { name: "NSS", emoji: "🤝", members: 90, desc: "Community service, blood donation drives, and social awareness campaigns.", activities: ["Blood Drives", "Teaching", "Cleanliness"], color: "pillar-clubs" },
];

export default function Clubs() {
  const [joinClub, setJoinClub] = useState<typeof CLUBS[0] | null>(null);
  const [form, setForm] = useState({ name: "", regNo: "", email: "", mobile: "", interest: "" });

  const handleJoin = () => {
    if (!form.name || !form.regNo || !form.email) { toast.error("Fill in required fields"); return; }
    toast.success(`Request to join ${joinClub?.name} sent! Admin will review your application.`);
    setJoinClub(null);
    setForm({ name: "", regNo: "", email: "", mobile: "", interest: "" });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">🏛️ Clubs & Community</h1>
        <p className="text-muted-foreground">Explore campus clubs and student organizations</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CLUBS.map((club, i) => (
          <Card key={i} className="group hover:shadow-lg transition-all hover:-translate-y-1 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
            <CardContent className="p-6">
              <div className="text-4xl mb-3 group-hover:scale-125 transition-transform inline-block">{club.emoji}</div>
              <h3 className="text-lg font-semibold mb-1">{club.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{club.desc}</p>
              <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                <Users className="w-3 h-3" /> {club.members} members
              </div>
              <div className="flex flex-wrap gap-1 mb-4">
                {club.activities.map((a) => (
                  <Badge key={a} variant="secondary" className="text-xs">{a}</Badge>
                ))}
              </div>
              <Button variant="outline" className="w-full" onClick={() => setJoinClub(club)}>
                <UserPlus className="w-4 h-4 mr-2" /> Join Club
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!joinClub} onOpenChange={(o) => !o && setJoinClub(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Join {joinClub?.name} {joinClub?.emoji}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Name *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div className="space-y-2"><Label>Registration No *</Label><Input value={form.regNo} onChange={(e) => setForm({ ...form, regNo: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Email *</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
              <div className="space-y-2"><Label>Mobile</Label><Input value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} /></div>
            </div>
            <div className="space-y-2"><Label>Why do you want to join?</Label><Textarea value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })} placeholder="Tell us about your interest..." /></div>
            <Button onClick={handleJoin} className="w-full gradient-clubs border-0"><Send className="w-4 h-4 mr-2" /> Submit Application</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
