import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Compass, ArrowRight, AlertCircle } from "lucide-react";
import heroCampus from "@/assets/hero-campus.jpg";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }
    const success = login(username, password);
    if (success) {
      navigate("/dashboard");
    } else {
      setError("Invalid credentials. Try Student01/123456 or Admin01/123456");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left - Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src={heroCampus} alt="IIT Ropar Campus" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-primary/50" />
        <div className="relative z-10 flex flex-col justify-between p-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 backdrop-blur flex items-center justify-center">
              <Compass className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary-foreground">Nexus</h1>
              <p className="text-sm text-primary-foreground/70">Campus Super App</p>
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-extrabold text-primary-foreground leading-tight mb-4">
              Your Unified<br />Campus Ecosystem
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-md">
              Everything you need — mess menus, marketplace, cab pools, academics, and more — in one beautiful app.
            </p>
            <div className="flex gap-3 mt-8">
              {["Mess Menu", "Marketplace", "Cab Pool", "AI Assistant"].map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary-foreground/15 text-primary-foreground backdrop-blur">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <p className="text-primary-foreground/50 text-sm">IIT Ropar — Indian Institute of Technology</p>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Compass className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">Nexus</h1>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-foreground">Welcome back</h2>
            <p className="text-muted-foreground mt-2">Sign in to access your campus dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
              />
            </div>
            <Button type="submit" className="w-full h-12 text-base gradient-primary border-0">
              Sign In <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="p-4 rounded-xl bg-secondary">
            <p className="text-sm font-medium text-foreground mb-2">Demo Credentials</p>
            <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
              <div>
                <p className="font-medium text-foreground">Student</p>
                <p>Student01 / 123456</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Admin</p>
                <p>Admin01 / 123456</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
