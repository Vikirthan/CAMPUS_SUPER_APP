import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Clock, BookOpen } from "lucide-react";
import { toast } from "sonner";

interface ClassEntry {
  id: string;
  subject: string;
  time: string;
  room: string;
  day: string;
  type: "lecture" | "lab" | "tutorial";
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const COLORS: Record<string, string> = {
  lecture: "border-l-4 border-l-academic",
  lab: "border-l-4 border-l-explorer",
  tutorial: "border-l-4 border-l-pulse",
};

const INITIAL_CLASSES: ClassEntry[] = [
  { id: "1", subject: "Data Structures & Algorithms", time: "09:00 - 10:00", room: "LH-1", day: "Monday", type: "lecture" },
  { id: "2", subject: "Linear Algebra", time: "10:00 - 11:00", room: "LH-2", day: "Monday", type: "lecture" },
  { id: "3", subject: "Operating Systems Lab", time: "14:00 - 16:00", room: "CL-1", day: "Tuesday", type: "lab" },
  { id: "4", subject: "DSA Tutorial", time: "11:00 - 12:00", room: "TR-3", day: "Wednesday", type: "tutorial" },
  { id: "5", subject: "Operating Systems", time: "09:00 - 10:00", room: "LH-3", day: "Thursday", type: "lecture" },
  { id: "6", subject: "Linear Algebra Tutorial", time: "14:00 - 15:00", room: "TR-1", day: "Friday", type: "tutorial" },
];

export default function Timetable() {
  const [classes, setClasses] = useState<ClassEntry[]>(() => {
    const stored = localStorage.getItem("nexus_timetable");
    return stored ? JSON.parse(stored) : INITIAL_CLASSES;
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ subject: "", time: "", room: "", day: "Monday", type: "lecture" });

  const save = (newClasses: ClassEntry[]) => {
    setClasses(newClasses);
    localStorage.setItem("nexus_timetable", JSON.stringify(newClasses));
  };

  const handleAdd = () => {
    if (!form.subject || !form.time || !form.room) { toast.error("Fill in all fields"); return; }
    const newClass: ClassEntry = { ...form, id: Date.now().toString(), type: form.type as "lecture" | "lab" | "tutorial" };
    save([...classes, newClass]);
    toast.success("Class added!");
    setDialogOpen(false);
    setForm({ subject: "", time: "", room: "", day: "Monday", type: "lecture" });
  };

  const handleDelete = (id: string) => {
    save(classes.filter((c) => c.id !== id));
    toast.success("Class removed");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">📅 Timetable</h1>
          <p className="text-muted-foreground">Manage your weekly class schedule</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild><Button className="gradient-academic border-0"><Plus className="w-4 h-4 mr-2" /> Add Class</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add Class</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2"><Label>Subject *</Label><Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Time *</Label><Input value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} placeholder="09:00 - 10:00" /></div>
                <div className="space-y-2"><Label>Room *</Label><Input value={form.room} onChange={(e) => setForm({ ...form, room: e.target.value })} placeholder="LH-1" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Day</Label>
                  <Select value={form.day} onValueChange={(v) => setForm({ ...form, day: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{DAYS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent></Select>
                </div>
                <div className="space-y-2"><Label>Type</Label>
                  <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}><SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="lecture">Lecture</SelectItem><SelectItem value="lab">Lab</SelectItem><SelectItem value="tutorial">Tutorial</SelectItem></SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleAdd} className="w-full gradient-academic border-0">Add Class</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Legend */}
      <div className="flex gap-4 text-xs">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-academic" /> Lecture</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-explorer" /> Lab</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-pulse" /> Tutorial</span>
      </div>

      <Tabs defaultValue={DAYS[0]}>
        <TabsList className="w-full justify-start overflow-x-auto">
          {DAYS.map((day) => <TabsTrigger key={day} value={day}>{day.slice(0, 3)}</TabsTrigger>)}
        </TabsList>
        {DAYS.map((day) => (
          <TabsContent key={day} value={day}>
            <div className="space-y-3">
              {classes.filter((c) => c.day === day).sort((a, b) => a.time.localeCompare(b.time)).map((cls, i) => (
                <Card key={cls.id} className={`${COLORS[cls.type]} hover:shadow-md transition-all animate-fade-in`} style={{ animationDelay: `${i * 50}ms` }}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">{cls.subject}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{cls.time}</span>
                        <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{cls.room}</span>
                        <span className="capitalize">{cls.type}</span>
                      </div>
                    </div>
                    <Button size="icon" variant="ghost" onClick={() => handleDelete(cls.id)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
              {classes.filter((c) => c.day === day).length === 0 && (
                <p className="text-center text-muted-foreground py-8">No classes on {day}</p>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
