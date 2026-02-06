import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Megaphone, Calendar, CloudSun, AlertTriangle, Clock } from "lucide-react";

const ANNOUNCEMENTS = [
  { title: "Mid-Semester Examinations Schedule Released", category: "Academic", date: "Feb 6, 2026", urgent: true },
  { title: "Annual Tech Fest 'Zeitgeist' — Registrations Open!", category: "Events", date: "Feb 10, 2026" },
  { title: "Library Extended Hours During Exam Week", category: "Academic", date: "Feb 5, 2026" },
  { title: "New Gym Equipment Installed at Sports Complex", category: "Campus Life", date: "Feb 4, 2026" },
  { title: "Guest Lecture: AI in Healthcare by Dr. Srinivas", category: "Events", date: "Feb 8, 2026" },
];

const EVENTS_COUNTDOWN = [
  { name: "Zeitgeist 2026", date: new Date("2026-03-15"), emoji: "🎉" },
  { name: "Mid-Sem Exams", date: new Date("2026-02-20"), emoji: "📝" },
  { name: "Holi Celebration", date: new Date("2026-03-04"), emoji: "🎨" },
];

function getDaysUntil(date: Date) {
  const diff = date.getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export default function CampusFeed() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">📢 Campus Feed</h1>
        <p className="text-muted-foreground">Announcements, events, and campus updates</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-pulse" /> Announcements
          </h2>
          {ANNOUNCEMENTS.map((item, i) => (
            <Card key={i} className="hover:shadow-md transition-all hover:-translate-y-0.5" style={{ animationDelay: `${i * 80}ms` }}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {item.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.urgent && (
                      <Badge variant="destructive" className="text-xs">
                        <AlertTriangle className="w-3 h-3 mr-1" /> Urgent
                      </Badge>
                    )}
                    <Badge className={`text-xs ${
                      item.category === "Academic" ? "pillar-academic" :
                      item.category === "Events" ? "pillar-exchange" : "pillar-explorer"
                    }`}>
                      {item.category}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Weather Widget */}
          <Card>
            <CardContent className="p-5">
              <h3 className="font-semibold flex items-center gap-2 mb-3">
                <CloudSun className="w-5 h-5 text-exchange" /> Weather
              </h3>
              <div className="text-center">
                <p className="text-4xl font-bold">22°C</p>
                <p className="text-muted-foreground text-sm mt-1">Partly Cloudy • Rupnagar</p>
                <p className="text-xs text-muted-foreground mt-2">H: 26° L: 14° • Humidity: 65%</p>
              </div>
            </CardContent>
          </Card>

          {/* Event Countdown */}
          <Card>
            <CardContent className="p-5">
              <h3 className="font-semibold flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-academic" /> Upcoming Events
              </h3>
              <div className="space-y-3">
                {EVENTS_COUNTDOWN.map((event, i) => {
                  const days = getDaysUntil(event.date);
                  return (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{event.emoji}</span>
                        <span className="text-sm font-medium">{event.name}</span>
                      </div>
                      <span className="text-xs font-semibold text-primary">{days}d</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Emergency */}
          <Card className="border-destructive/30 bg-destructive/5">
            <CardContent className="p-5">
              <h3 className="font-semibold flex items-center gap-2 text-destructive mb-2">
                <AlertTriangle className="w-5 h-5" /> Emergency
              </h3>
              <p className="text-sm text-muted-foreground">Security: <span className="font-medium text-foreground">01881-231234</span></p>
              <p className="text-sm text-muted-foreground">Medical: <span className="font-medium text-foreground">01881-231111</span></p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
