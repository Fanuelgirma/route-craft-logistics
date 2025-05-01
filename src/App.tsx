
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CustomersPage from "./pages/CustomersPage";
import SubRegionsPage from "./pages/SubRegionsPage";
import MapPage from "./pages/MapPage";
import NotificationsPage from "./pages/NotificationsPage";
import KPIsPage from "./pages/KPIsPage";
import AlertsPage from "./pages/AlertsPage";
import LiveMapPage from "./pages/LiveMapPage";
import TripsPage from "./pages/TripsPage";
import TripDetailPage from "./pages/TripDetailPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Main sections */}
          <Route path="/trips" element={<TripsPage />} />
          <Route path="/trips/:tripId" element={<TripDetailPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/subregions" element={<SubRegionsPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/kpis" element={<KPIsPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/livemap" element={<LiveMapPage />} />
          
          {/* Placeholder routes for sidebar navigation */}
          <Route path="/dashboard" element={<Navigate to="/trips" />} />
          <Route path="/returnables" element={<Navigate to="/trips" />} />
          <Route path="/orders" element={<Navigate to="/trips" />} />
          <Route path="/routing" element={<Navigate to="/trips" />} />
          <Route path="/fleet" element={<Navigate to="/trips" />} />
          <Route path="/sales" element={<Navigate to="/trips" />} />
          <Route path="/settings" element={<Navigate to="/trips" />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
