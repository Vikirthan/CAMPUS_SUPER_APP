import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Star, MapPin, IndianRupee, Send } from "lucide-react";
import { toast } from "sonner";

const FOOD_ITEMS = [
  { name: "Momos", shop: "Momo Point", location: "Near Main Gate", price: "₹40-80", rating: 4.6, distance: "0.8 km", emoji: "🥟" },
  { name: "Burger", shop: "Burger Point", location: "Rupnagar Market", price: "₹80-150", rating: 4.3, distance: "1.5 km", emoji: "🍔" },
  { name: "Tea & Pakoda", shop: "Ropar Chaiwala", location: "Near Campus", price: "₹20-40", rating: 4.5, distance: "1.2 km", emoji: "🍵" },
  { name: "Thali", shop: "Spice Junction", location: "Main Road", price: "₹100-180", rating: 4.2, distance: "2.0 km", emoji: "🍛" },
  { name: "Pizza", shop: "Pizza Hub", location: "Rupnagar", price: "₹150-350", rating: 4.1, distance: "2.5 km", emoji: "🍕" },
  { name: "Coffee", shop: "The Study Café", location: "Near IT Park", price: "₹50-120", rating: 4.7, distance: "1.8 km", emoji: "☕" },
  { name: "Maggi", shop: "Night Canteen", location: "Hostel Area", price: "₹30-50", rating: 4.0, distance: "0.2 km", emoji: "🍜" },
  { name: "Lassi", shop: "Punjab Dairy", location: "Main Road", price: "₹30-60", rating: 4.4, distance: "1.0 km", emoji: "🥛" },
  { name: "Chole Bhature", shop: "Sharma Ji", location: "Rupnagar", price: "₹60-100", rating: 4.5, distance: "2.2 km", emoji: "🫓" },
  { name: "Ice Cream", shop: "Cream Bell Parlour", location: "Market", price: "₹40-120", rating: 4.0, distance: "1.6 km", emoji: "🍦" },
];

export default function FoodSearch() {
  const [search, setSearch] = useState("");
  const [enquiryItem, setEnquiryItem] = useState<typeof FOOD_ITEMS[0] | null>(null);
  const [form, setForm] = useState({ name: "", regNo: "", mobile: "", email: "", message: "" });

  const filtered = FOOD_ITEMS.filter(
    (f) => f.name.toLowerCase().includes(search.toLowerCase()) || f.shop.toLowerCase().includes(search.toLowerCase())
  );

  const handleEnquiry = () => {
    if (!form.name || !form.email) { toast.error("Fill in required fields"); return; }
    toast.success("Enquiry sent! Details forwarded to the vendor.");
    setEnquiryItem(null);
    setForm({ name: "", regNo: "", mobile: "", email: "", message: "" });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">🍕 Food Search</h1>
        <p className="text-muted-foreground">Find your favorite food near campus</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search food items or shops..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 h-12" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item, i) => (
          <Card key={i} className="group hover:shadow-lg transition-all hover:-translate-y-1 animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <span className="text-4xl group-hover:scale-125 transition-transform">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.shop}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{item.distance}</span>
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 text-exchange fill-exchange" />{item.rating}</span>
                    <span className="font-medium text-foreground">{item.price}</span>
                  </div>
                </div>
              </div>
              <Button size="sm" variant="outline" className="w-full mt-3 text-xs" onClick={() => setEnquiryItem(item)}>
                <Send className="w-3 h-3 mr-1" /> Enquire
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!enquiryItem} onOpenChange={(o) => !o && setEnquiryItem(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Enquiry – {enquiryItem?.name} at {enquiryItem?.shop}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Name *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div className="space-y-2"><Label>Reg No</Label><Input value={form.regNo} onChange={(e) => setForm({ ...form, regNo: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Mobile</Label><Input value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} /></div>
              <div className="space-y-2"><Label>Email *</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            </div>
            <Button onClick={handleEnquiry} className="w-full gradient-explorer border-0">Send Enquiry</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
