import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import './index.css';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AuthProvider } from './lib/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Public pages
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { ForgotPassword, ResetPassword } from './pages/AuthFlow';
import { Marketplace } from './pages/Marketplace';
import { LotDetail } from './pages/LotDetail';
import { HowItWorks } from './pages/HowItWorks';
import { ForSellers } from './pages/ForSellers';
import { ForBuyers } from './pages/ForBuyers';
import { PremiumExchange } from './pages/Premium';
import { StaticPage, AboutContent, TermsContent } from './pages/static/StaticPages';

// Seller dashboard
import { SellerDashboardLayout } from './components/layout/SellerDashboardLayout';
import { SellerDashboardHome } from './pages/seller/Dashboard';
import { SellerInventory } from './pages/seller/Inventory';
import { SellerAnalytics } from './pages/seller/Analytics';
import { SettingsProfile } from './pages/Settings';
import { NotificationsCenter } from './pages/Notifications';

// Buyer dashboard
import { BuyerDashboardLayout } from './components/layout/BuyerDashboardLayout';
import { BuyerDashboardHome } from './pages/buyer/Dashboard';
import { RFQSystem } from './pages/buyer/RFQ';

// Shared exchange modules
import { OffersModule } from './components/exchange/OffersModule';
import { OrdersModule } from './components/exchange/OrdersModule';

// Admin
import { AdminDashboard } from './pages/admin/Dashboard';

// Layout wrapper for public pages
function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-anvaya-ivory">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* ─── Public Routes (with Navbar + Footer) ─── */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            {/* Auth-gated info pages — accessible publicly but links gate to /login */}
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/lot/:id" element={<LotDetail />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/for-sellers" element={<ForSellers />} />
            <Route path="/for-buyers" element={<ForBuyers />} />
            <Route path="/premium" element={<PremiumExchange />} />
            <Route path="/about" element={<StaticPage title="About Us" content={AboutContent} />} />
            <Route path="/terms" element={<StaticPage title="Terms of Service" content={TermsContent} />} />
          </Route>

          {/* ─── Protected Seller Routes ─── */}
          <Route element={<ProtectedRoute allowedRoles={['seller', 'admin']} />}>
            <Route path="/seller" element={<SellerDashboardLayout />}>
              <Route index element={<SellerDashboardHome />} />
              <Route path="inventory" element={<SellerInventory />} />
              <Route path="inventory/new" element={<SellerInventory />} />
              <Route path="matches" element={<div className="p-8 text-gray-600">Matches coming soon.</div>} />
              <Route path="offers" element={<OffersModule />} />
              <Route path="orders" element={<OrdersModule />} />
              <Route path="analytics" element={<SellerAnalytics />} />
              <Route path="settings" element={<SettingsProfile />} />
              <Route path="notifications" element={<NotificationsCenter />} />
            </Route>
          </Route>

          {/* ─── Protected Buyer Routes ─── */}
          <Route element={<ProtectedRoute allowedRoles={['buyer', 'admin']} />}>
            <Route path="/buyer" element={<BuyerDashboardLayout />}>
              <Route index element={<BuyerDashboardHome />} />
              <Route path="saved" element={<div className="p-8 text-gray-600">Saved lots coming soon.</div>} />
              <Route path="requirements" element={<RFQSystem />} />
              <Route path="offers" element={<OffersModule />} />
              <Route path="orders" element={<OrdersModule />} />
              <Route path="settings" element={<SettingsProfile />} />
              <Route path="notifications" element={<NotificationsCenter />} />
            </Route>
          </Route>

          {/* ─── Protected Admin Routes ─── */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route
              path="/admin"
              element={
                <div className="min-h-screen flex flex-col font-sans bg-gray-50">
                  <Navbar />
                  <main className="flex-grow px-4">
                    <AdminDashboard />
                  </main>
                </div>
              }
            />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
