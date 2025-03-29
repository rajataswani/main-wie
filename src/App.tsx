
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import LearnMore from "./pages/LearnMore";
import JoinUs from "./pages/JoinUs";
import EventDetails from "./pages/EventDetails";
import AwardDetails from "./pages/AwardDetails";
import BlackNavbar from "./components/BlackNavbar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <div className="relative">
          <BlackNavbar />
          {/* <Navbar /> */}
        </div>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="/join-us" element={<JoinUs />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/award/:id" element={<AwardDetails />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
