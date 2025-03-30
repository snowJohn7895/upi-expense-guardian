
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import AddTransaction from "./pages/AddTransaction";
import Analytics from "./pages/Analytics";
import Wallets from "./pages/Wallets";
import Budgets from "./pages/Budgets";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";

const queryClient = new QueryClient();

const App = () => {
  // Replace hard-coded values with state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);

  // For development/testing purposes, you can uncomment these lines
  // to simulate different auth states
  useEffect(() => {
    // Uncomment to test specific flows:
    // setIsAuthenticated(true);
    // setIsOnboarded(true);
    
    // Check localStorage for auth state
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedOnboarding = localStorage.getItem('isOnboarded');
    
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
    
    if (storedOnboarding === 'true') {
      setIsOnboarded(true);
    }
  }, []);

  // Mock auth functions for development
  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', 'false');
  };

  const completeOnboarding = () => {
    setIsOnboarded(true);
    localStorage.setItem('isOnboarded', 'true');
  };

  // Authenticated route component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isAuthenticated) {
      return <Navigate to="/auth" replace />;
    }
    
    if (isAuthenticated && !isOnboarded) {
      return <Navigate to="/onboarding" replace />;
    }
    
    return <>{children}</>;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/auth" element={
              isAuthenticated ? <Navigate to="/" replace /> : <Auth onLogin={handleLogin} />
            } />
            <Route path="/onboarding" element={
              !isAuthenticated ? <Navigate to="/auth" replace /> : 
              isOnboarded ? <Navigate to="/" replace /> : <Onboarding onComplete={completeOnboarding} />
            } />
            
            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout onLogout={handleLogout} />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="transactions/add" element={<AddTransaction />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="wallets" element={<Wallets />} />
              <Route path="budgets" element={<Budgets />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
