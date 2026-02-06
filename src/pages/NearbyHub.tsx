import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, ExternalLink } from "lucide-react";

const PLACES = [
  { name: "Ropar Chaiwala", type: "Café", distance: "1.2 km", rating: 4.5, vibe: ["Chill", "Budget"], desc: "Best tea near campus. Popular student hangout.", image: "🍵" },
  { name: "Spice Junction", type: "Restaurant", distance: "2.0 km", rating: 4.2, vibe: ["Family", "North Indian"], desc: "Full meals at affordable prices. Known for thalis.", image: "🍛" },
  { name: "The Study Café", type: "Café", distance: "1.8 km", rating: 4.7, vibe: ["WiFi", "Quiet"], desc: "Great for group study sessions. Good coffee & snacks.", image: "☕" },
  { name: "Campus Mart", type: "Store", distance: "0.5 km", rating: 4.0, vibe: ["Essentials", "Quick"], desc: "Stationery, snacks, daily essentials near gate.", image: "🏪" },
  { name: "Burger Point", type: "Fast Food", distance: "1.5 km", rating: 4.3, vibe: ["Fast Food", "Late Night"], desc: "Late-night burgers and fries. Student favorite.", image: "🍔" },
  { name: "Fresh Juice Corner", type: "Juice Bar", distance: "1.0 km", rating: 4.1, vibe: ["Healthy", "Quick"], desc: "Fresh fruit juices and smoothies.", image: "🧃" },
  { name: "Punjab Sports", type: "Sports", distance: "3.0 km", rating: 3.9, vibe: ["Equipment", "Games"], desc: "Sports equipment and accessories.", image: "🏏" },
  { name: "Photocopy Centre", type: "Services", distance: "0.3 km", rating: 4.0, vibe: ["Print", "Quick"], desc: "Printing, photocopying, binding services.", image: "📄" },
];

export default function NearbyHub() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">📍 Nearby Hub</h1>
        <p className="text-muted-foreground">Cafes, shops, and hangouts near IIT Ropar</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {PLACES.map((place, i) => (
          <Card key={i} className="group hover:shadow-lg transition-all hover:-translate-y-1 animate-fade-in overflow-hidden" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="h-32 bg-gradient-to-br from-explorer/20 to-explorer/5 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500">
              {place.image}
            </div>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold">{place.name}</h3>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-3.5 h-3.5 text-exchange fill-exchange" />
                  <span className="font-medium">{place.rating}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{place.desc}</p>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {place.distance}
                </span>
                <span className="text-xs text-muted-foreground">• {place.type}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {place.vibe.map((v) => (
                  <Badge key={v} variant="secondary" className="text-xs">{v}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
