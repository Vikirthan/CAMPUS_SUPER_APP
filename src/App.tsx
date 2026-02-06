import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { DataProvider } from "@/contexts/DataContext";
import AppLayout from "@/components/layout/AppLayout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import MessMenu from "@/pages/MessMenu";
import MailSummarizer from "@/pages/MailSummarizer";
import CampusFeed from "@/pages/CampusFeed";
import LostFound from "@/pages/LostFound";
import Marketplace from "@/pages/Marketplace";
import CabPool from "@/pages/CabPool";
import SkillExchange from "@/pages/SkillExchange";
import NearbyHub from "@/pages/NearbyHub";
import FoodSearch from "@/pages/FoodSearch";
import Timetable from "@/pages/Timetable";
import StudyAssistant from "@/pages/StudyAssistant";
import Clubs from "@/pages/Clubs";
import AdminPortal from "@/pages/AdminPortal";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

function AuthRedirect() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <DataProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<AuthRedirect />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/mess-menu" element={<MessMenu />} />
                <Route path="/mail-summarizer" element={<MailSummarizer />} />
                <Route path="/campus-feed" element={<CampusFeed />} />
                <Route path="/lost-found" element={<LostFound />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/cab-pool" element={<CabPool />} />
                <Route path="/skills" element={<SkillExchange />} />
                <Route path="/nearby" element={<NearbyHub />} />
                <Route path="/food-search" element={<FoodSearch />} />
                <Route path="/timetable" element={<Timetable />} />
                <Route path="/study-assistant" element={<StudyAssistant />} />
                <Route path="/clubs" element={<Clubs />} />
                <Route path="/admin" element={<AdminRoute><AdminPortal /></AdminRoute>} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
