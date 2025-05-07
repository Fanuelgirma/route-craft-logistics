
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
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
import FleetPage from "./pages/FleetPage";
import VehicleDetailPage from "./pages/fleet/VehicleDetailPage";
import DriverDetailPage from "./pages/fleet/DriverDetailPage";
import OrdersPage from "./pages/OrdersPage";
import RoutingPage from "./pages/RoutingPage";
import RouteBuilderPage from "./pages/RouteBuilderPage";
import FuelHistoryPage from "./pages/FuelHistoryPage";
import ReturnablesPage from "./pages/ReturnablesPage";

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trips" element={<TripsPage />} />
          <Route path="/trips/:tripId" element={<TripDetailPage />} />
          <Route path="/returnables" element={<ReturnablesPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/customers/sub-regions" element={<SubRegionsPage />} />
          <Route path="/customers/map" element={<MapPage />} />
          <Route path="/customers/notifications" element={<NotificationsPage />} />
          <Route path="/kpis" element={<KPIsPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/livemap" element={<LiveMapPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/products" element={<OrdersPage />} />
          <Route path="/routing" element={<RoutingPage />} />
          <Route path="/routing/builder/:batchId" element={<RouteBuilderPage />} />
          
          {/* Fuel & Energy section */}
          <Route path="/fuel/history" element={<FuelHistoryPage />} />
          
          {/* Fleet section */}
          <Route path="/fleet" element={<FleetPage />} />
          <Route path="/fleet/vehicles/:vehicleId" element={<VehicleDetailPage />} />
          <Route path="/fleet/drivers/:driverId" element={<DriverDetailPage />} />
          
          {/* Placeholder routes for sidebar navigation */}
          <Route path="/sales" element={<Navigate to="/trips" />} />
          <Route path="/settings" element={<Navigate to="/trips" />} />
          <Route path="/fuel" element={<Navigate to="/fuel/history" />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
