import { Toaster } from "https://esm.sh/gh/BHU1ESH/truassets@main/src/components/ui/toaster.tsx";
import { Toaster as Sonner } from "https://esm.sh/gh/BHU1ESH/truassets@main/src/components/ui/sonner.tsx";
import { TooltipProvider } from "https://esm.sh/gh/BHU1ESH/truassets@main/src/components/ui/tooltip.tsx";

import { QueryClient, QueryClientProvider } from "https://esm.sh/@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "https://esm.sh/react-router-dom";

import { AuthProvider } from "https://esm.sh/gh/BHU1ESH/truassets@main/src/contexts/AuthContext.tsx";
import { PropertyProvider } from "https://esm.sh/gh/BHU1ESH/truassets@main/src/contexts/PropertyContext.tsx";
import { ComparisonProvider } from "https://esm.sh/gh/BHU1ESH/truassets@main/src/contexts/ComparisonContext.tsx";
import { UserManagementProvider } from "https://esm.sh/gh/BHU1ESH/truassets@main/src/contexts/UserManagementContext.tsx";
import { LeadProvider } from "https://esm.sh/gh/BHU1ESH/truassets@main/src/contexts/LeadContext.tsx";
import { BlogProvider } from "https://esm.sh/gh/BHU1ESH/truassets@main/src/contexts/BlogContext.tsx";
import { RoiProvider } from "https://esm.sh/gh/BHU1ESH/truassets@main/src/contexts/RoiContext.tsx";

import Index from "https://esm.sh/gh/BHU1ESH/truassets@main/src/pages/Index.tsx";
import UserLogin from "https://esm.sh/gh/BHU1ESH/truassets@main/src/pages/UserLogin.tsx";
import AdminLogin from "https://esm.sh/gh/BHU1ESH/truassets@main/src/pages/AdminLogin.tsx";
import AdminDashboard from "https://esm.sh/gh/BHU1ESH/truassets@main/src/pages/AdminDashboard.tsx";
import RoiCalculatorPage from "https://esm.sh/gh/BHU1ESH/truassets@main/src/pages/RoiCalculatorPage.tsx";
import ServicesPage from "https://esm.sh/gh/BHU1ESH/truassets@main/src/pages/ServicesPage.tsx";
import NotFound from "https://esm.sh/gh/BHU1ESH/truassets@main/src/pages/NotFound.tsx";

import ComparisonTray from "https://esm.sh/gh/BHU1ESH/truassets@main/src/components/ComparisonTray.tsx";


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
