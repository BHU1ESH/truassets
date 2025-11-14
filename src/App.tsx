import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { PropertyProvider } from "@/contexts/PropertyContext";
import { ComparisonProvider } from "@/contexts/ComparisonContext";
import { UserManagementProvider } from "@/contexts/UserManagementContext";
import { LeadProvider } from "@/contexts/LeadContext";
import { BlogProvider } from "@/contexts/BlogContext";
import { RoiProvider } from "@/contexts/RoiContext";
import Index from "./pages/Index";
import UserLogin from "./pages/UserLogin";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import RoiCalculatorPage from "./pages/RoiCalculatorPage";
import ServicesPage from "./pages/ServicesPage";
import NotFound from "./pages/NotFound";
import ComparisonTray from "@/components/ComparisonTray";

const queryClient = new QueryClient();

const App = () => {
  console.log('App component rendering...');
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <PropertyProvider>
            <ComparisonProvider>
              <UserManagementProvider>
              <LeadProvider>
                <BlogProvider>
                  <RoiProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<UserLogin />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/roi-calculator" element={<RoiCalculatorPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                  <ComparisonTray />
              </BrowserRouter>
                  </RoiProvider>
                </BlogProvider>
              </LeadProvider>
              </UserManagementProvider>
            </ComparisonProvider>
          </PropertyProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
