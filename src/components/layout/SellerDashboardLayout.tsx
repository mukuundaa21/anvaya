import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, FileText, Handshake, ShoppingCart, BarChart, Settings, LogOut } from "lucide-react";
import { supabase } from "../../lib/supabase";

const NAV_LINKS = [
  { name: "Dashboard", href: "/seller", icon: LayoutDashboard },
  { name: "Inventory", href: "/seller/inventory", icon: Package },
  { name: "Buyer Matches", href: "/seller/matches", icon: Handshake },
  { name: "Offers", href: "/seller/offers", icon: FileText },
  { name: "Orders", href: "/seller/orders", icon: ShoppingCart },
  { name: "Analytics", href: "/seller/analytics", icon: BarChart },
  { name: "Settings", href: "/seller/settings", icon: Settings },
];

export function SellerDashboardLayout() {
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Navy Sidebar */}
      <aside className="w-64 bg-anvaya-navy text-gray-300 flex flex-col flex-shrink-0">
        <div className="h-20 flex items-center px-6 border-b border-gray-800">
          <Link to="/" className="font-serif text-2xl tracking-widest text-anvaya-gold">ANVAYA</Link>
          <span className="ml-2 text-[10px] uppercase tracking-widest border border-anvaya-gold text-anvaya-gold px-1">Seller</span>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          {NAV_LINKS.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-3 text-sm font-semibold uppercase tracking-wider transition-colors ${
                  isActive ? "bg-white/10 text-white border-l-2 border-anvaya-gold" : "hover:bg-white/5 hover:text-white border-l-2 border-transparent"
                }`}
              >
                <item.icon className={`w-4 h-4 ${isActive ? 'text-anvaya-gold' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-3 w-full text-sm font-semibold uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
