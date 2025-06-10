import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./lib/theme-provider";
import { LanguageProvider } from "./lib/language-provider";
import { AuthProvider } from "./lib/auth-context";
import { Toaster } from "./components/ui/toaster";
import { useAuth } from "./lib/auth-context";
import { Layout } from "./components/Layout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DonorDashboard from "./pages/donor/Dashboard";
import LogFood from "./pages/donor/LogFood";
import Community from "./pages/Community";
import Settings from "./pages/donor/Settings";
import Schedule from "./pages/donor/Schedule";
import Impact from "./pages/donor/Impact";
import Matches from "./pages/donor/Matches";
import RecipientDashboard from "./pages/recipient/Dashboard";
import Search from "./pages/recipient/Search";
import RecipientSettings from "./pages/recipient/Settings";
import RecipientSchedule from "./pages/recipient/Schedule";
import RecipientImpact from "./pages/recipient/Impact";

function ProtectedRoute({ children, role }: { children: React.ReactNode; role: "donor" | "recipient" }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== role) {
    return <Navigate to={`/${user.role}/dashboard`} />;
  }

  return <Layout>{children}</Layout>;
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <LanguageProvider defaultLanguage="en" storageKey="vite-ui-language">
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/community" element={<Community />} />

              {/* Protected donor routes */}
              <Route
                path="/donor/dashboard"
                element={
                  <ProtectedRoute role="donor">
                    <DonorDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/donor/log-food"
                element={
                  <ProtectedRoute role="donor">
                    <LogFood />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/donor/settings"
                element={
                  <ProtectedRoute role="donor">
                    <Settings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/donor/schedule"
                element={
                  <ProtectedRoute role="donor">
                    <Schedule />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/donor/impact"
                element={
                  <ProtectedRoute role="donor">
                    <Impact />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/donor/matches"
                element={
                  <ProtectedRoute role="donor">
                    <Matches />
                  </ProtectedRoute>
                }
              />

              {/* Protected recipient routes */}
              <Route
                path="/recipient/dashboard"
                element={
                  <ProtectedRoute role="recipient">
                    <RecipientDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/recipient/search"
                element={
                  <ProtectedRoute role="recipient">
                    <Search />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/recipient/settings"
                element={
                  <ProtectedRoute role="recipient">
                    <RecipientSettings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/recipient/schedule"
                element={
                  <ProtectedRoute role="recipient">
                    <RecipientSchedule />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/recipient/impact"
                element={
                  <ProtectedRoute role="recipient">
                    <RecipientImpact />
                  </ProtectedRoute>
                }
              />

              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
