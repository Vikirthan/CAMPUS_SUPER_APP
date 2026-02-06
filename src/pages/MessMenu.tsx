import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Star, Leaf, Drumstick } from "lucide-react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const today = new Date().getDay();
const todayIndex = today === 0 ? 6 : today - 1;

const MENU_DATA: Record<string, Record<string, { name: string; veg: boolean; popular?: boolean }[]>> = {
  Monday: {
    Breakfast: [
      { name: "Aloo Paratha", veg: true, popular: true }, { name: "Curd & Pickle", veg: true },
      { name: "Bread & Butter", veg: true }, { name: "Tea / Coffee", veg: true },
    ],
    Lunch: [
      { name: "Dal Tadka", veg: true }, { name: "Paneer Butter Masala", veg: true, popular: true },
      { name: "Chicken Curry", veg: false }, { name: "Rice & Roti", veg: true },
    ],
    Snacks: [
      { name: "Samosa", veg: true, popular: true }, { name: "Tea", veg: true },
    ],
    Dinner: [
      { name: "Mix Veg", veg: true }, { name: "Egg Curry", veg: false },
      { name: "Dal Fry", veg: true }, { name: "Rice & Roti", veg: true },
    ],
  },
  Tuesday: {
    Breakfast: [
      { name: "Poha", veg: true, popular: true }, { name: "Boiled Eggs", veg: false },
      { name: "Toast & Jam", veg: true }, { name: "Milk / Tea", veg: true },
    ],
    Lunch: [
      { name: "Rajma", veg: true, popular: true }, { name: "Aloo Gobi", veg: true },
      { name: "Fish Curry", veg: false }, { name: "Rice & Roti", veg: true },
    ],
    Snacks: [{ name: "Bread Pakoda", veg: true }, { name: "Coffee", veg: true }],
    Dinner: [
      { name: "Shahi Paneer", veg: true, popular: true }, { name: "Chicken Biryani", veg: false, popular: true },
      { name: "Raita", veg: true }, { name: "Rice & Roti", veg: true },
    ],
  },
};

// Fill remaining days with Tuesday's menu as placeholder
DAYS.forEach((day) => {
  if (!MENU_DATA[day]) MENU_DATA[day] = MENU_DATA["Tuesday"];
});

export default function MessMenu() {
  const [vegOnly, setVegOnly] = useState(false);
  const [selectedDay, setSelectedDay] = useState(DAYS[todayIndex]);

  const meals = MENU_DATA[selectedDay] || {};

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">🍽️ Mess Menu</h1>
          <p className="text-muted-foreground">Today's meals and weekly schedule</p>
        </div>
        <button
          onClick={() => setVegOnly(!vegOnly)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            vegOnly ? "bg-explorer/15 text-explorer" : "bg-secondary text-muted-foreground"
          }`}
        >
          <Leaf className="w-4 h-4" />
          {vegOnly ? "Veg Only" : "All Items"}
        </button>
      </div>

      {/* Day Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {DAYS.map((day, i) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              selectedDay === day
                ? "gradient-pulse text-primary-foreground shadow-md"
                : i === todayIndex
                ? "bg-pulse/10 text-pulse"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            {day.slice(0, 3)} {i === todayIndex && "•"}
          </button>
        ))}
      </div>

      {/* Meals */}
      <Tabs defaultValue="Breakfast">
        <TabsList className="w-full justify-start">
          {["Breakfast", "Lunch", "Snacks", "Dinner"].map((meal) => (
            <TabsTrigger key={meal} value={meal} className="flex-1">
              {meal}
            </TabsTrigger>
          ))}
        </TabsList>
        {["Breakfast", "Lunch", "Snacks", "Dinner"].map((meal) => (
          <TabsContent key={meal} value={meal}>
            <div className="grid gap-3 sm:grid-cols-2">
              {(meals[meal] || [])
                .filter((item) => !vegOnly || item.veg)
                .map((item) => (
                  <Card key={item.name} className="hover:shadow-md transition-all hover:-translate-y-0.5">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full border-2 ${item.veg ? "border-explorer" : "border-destructive"}`}>
                          <div className={`w-1.5 h-1.5 rounded-full m-[1px] ${item.veg ? "bg-explorer" : "bg-destructive"}`} />
                        </div>
                        <span className="font-medium text-sm">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.popular && (
                          <Badge variant="secondary" className="text-xs pillar-exchange">
                            <Star className="w-3 h-3 mr-1" /> Popular
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
