
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
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/subregions" element={<SubRegionsPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          
          {/* Placeholder routes for sidebar navigation */}
          <Route path="/dashboard" element={<Navigate to="/customers" />} />
          <Route path="/trips" element={<Navigate to="/customers" />} />
          <Route path="/returnables" element={<Navigate to="/customers" />} />
          <Route path="/orders" element={<Navigate to="/customers" />} />
          <Route path="/routing" element={<Navigate to="/customers" />} />
          <Route path="/fleet" element={<Navigate to="/customers" />} />
          <Route path="/alerts" element={<Navigate to="/customers" />} />
          <Route path="/kpis" element={<Navigate to="/customers" />} />
          <Route path="/sales" element={<Navigate to="/customers" />} />
          <Route path="/settings" element={<Navigate to="/customers" />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
