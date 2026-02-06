import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface NexusPost {
  id: string;
  type: "lost-found" | "marketplace" | "cab-pool" | "skill" | "club" | "food";
  status: "unverified" | "verified" | "rejected";
  title: string;
  description: string;
  category?: string;
  subType?: string; // e.g. "lost" | "found" for lost-found
  image?: string;
  price?: number;
  location?: string;
  date?: string;
  time?: string;
  seats?: number;
  route?: string;
  skillOffered?: string;
  skillWanted?: string;
  contactInfo?: {
    name: string;
    regNo: string;
    mobile: string;
    email: string;
  };
  createdAt: string;
  createdBy: string;
}

interface DataContextType {
  posts: NexusPost[];
  addPost: (post: Omit<NexusPost, "id" | "createdAt" | "status">) => void;
  updatePostStatus: (id: string, status: "verified" | "rejected") => void;
  getPostsByType: (type: NexusPost["type"]) => NexusPost[];
  getPostsByStatus: (status: NexusPost["status"]) => NexusPost[];
  stats: { pending: number; approved: number; rejected: number; total: number };
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const INITIAL_POSTS: NexusPost[] = [
  {
    id: "1", type: "lost-found", status: "verified", title: "Lost Blue Water Bottle",
    description: "Lost near the library entrance yesterday evening. Has IIT Ropar sticker.",
    subType: "lost", location: "Central Library", createdAt: "2026-02-05T10:00:00Z", createdBy: "Student01",
  },
  {
    id: "2", type: "marketplace", status: "unverified", title: "TI-84 Calculator for Sale",
    description: "Barely used, perfect for engineering math courses. Original box included.",
    price: 2500, category: "Electronics", createdAt: "2026-02-04T14:00:00Z", createdBy: "Student01",
  },
  {
    id: "3", type: "cab-pool", status: "verified", title: "Chandigarh → IIT Ropar",
    description: "Looking for co-passengers, splitting fare equally.",
    route: "Chandigarh → Rupnagar → IIT Ropar", date: "2026-02-10", time: "08:00 AM",
    seats: 3, createdAt: "2026-02-05T09:00:00Z", createdBy: "Student01",
    contactInfo: { name: "Arjun", regNo: "2023CSB1001", mobile: "9876543210", email: "arjun@iitrpr.ac.in" },
  },
  {
    id: "4", type: "skill", status: "verified", title: "Python ↔ Guitar",
    description: "Can teach Python/DSA, want to learn guitar.",
    skillOffered: "Python Programming", skillWanted: "Guitar", createdAt: "2026-02-03T16:00:00Z", createdBy: "Student01",
  },
  {
    id: "5", type: "lost-found", status: "unverified", title: "Found AirPods Pro",
    description: "Found near Kameng Hostel parking. Claim with proof.",
    subType: "found", location: "Kameng Hostel", createdAt: "2026-02-05T12:00:00Z", createdBy: "Student01",
  },
];

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<NexusPost[]>(() => {
    const stored = localStorage.getItem("nexus_posts");
    return stored ? JSON.parse(stored) : INITIAL_POSTS;
  });

  useEffect(() => {
    localStorage.setItem("nexus_posts", JSON.stringify(posts));
  }, [posts]);

  const addPost = (post: Omit<NexusPost, "id" | "createdAt" | "status">) => {
    const newPost: NexusPost = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: "unverified",
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  const updatePostStatus = (id: string, status: "verified" | "rejected") => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  };

  const getPostsByType = (type: NexusPost["type"]) => posts.filter((p) => p.type === type);
  const getPostsByStatus = (status: NexusPost["status"]) => posts.filter((p) => p.status === status);

  const stats = {
    pending: posts.filter((p) => p.status === "unverified").length,
    approved: posts.filter((p) => p.status === "verified").length,
    rejected: posts.filter((p) => p.status === "rejected").length,
    total: posts.length,
  };

  return (
    <DataContext.Provider value={{ posts, addPost, updatePostStatus, getPostsByType, getPostsByStatus, stats }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
};
