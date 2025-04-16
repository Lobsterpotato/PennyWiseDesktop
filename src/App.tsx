
// Main App component that sets up the application structure
// Technologies used:
// - React Router for navigation
// - React Query for data fetching and caching
// - Shadcn UI components for the UI library (based on Radix UI)
// - Multiple toast providers for notifications

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AddExpense from "./pages/AddExpense";
import Reports from "./pages/Reports";
import Accountants from "./pages/Accountants";
import NotFound from "./pages/NotFound";

// Create a new React Query client for data fetching
const queryClient = new QueryClient();

const App = () => (
  // Set up React Query for data fetching and state management
  <QueryClientProvider client={queryClient}>
    {/* TooltipProvider for tooltip functionality */}
    <TooltipProvider>
      {/* Toaster components for showing notifications */}
      <Toaster />
      <Sonner />
      {/* BrowserRouter sets up client-side routing */}
      <BrowserRouter>
        <Routes>
          {/* Main application routes */}
          <Route path="/" element={<Index />} />
          <Route path="/add" element={<AddExpense />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/accountants" element={<Accountants />} />
          {/* Catch-all route for 404 errors */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
