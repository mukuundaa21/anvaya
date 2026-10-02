import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, FileSearch, Bookmark, FileText, ShoppingCart, Settings, LogOut, Handshake } from "lucide-react";
import { supabase } from "../../lib/supabase";

const NAV_LINKS = [
  { name: "Overview", href: "/buyer", icon: LayoutDashboard },
  { name: "Marketplace", href: "/marketplace", icon: FileSearch }, // Links to public marketplace
  { name: "Saved Lots", href: "/buyer/saved", icon: Bookmark },
  { name: "Requirements (RFQ)", href: "/buyer/requirements", icon: FileText },
  { name: "Offers Sent", href: "/buyer/offers", icon: Handshake },
  { name: "Orders", href: "/buyer/orders", icon: ShoppingCart },
  { name: "Settings", href: "/buyer/settings", icon: Settings },
];

export function BuyerDashboardLayout() {
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <aside className="w-64 bg-anvaya-navy text-gray-300 flex flex-col flex-shrink-0">
        <div className="h-20 flex items-center px-6 border-b border-gray-800">
          <Link to="/" className="font-serif text-2xl tracking-widest text-anvaya-gold">ANVAYA</Link>
          <span className="ml-2 text-[10px] uppercase tracking-widest border border-anvaya-emerald text-anvaya-emerald px-1">Buyer</span>
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

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
