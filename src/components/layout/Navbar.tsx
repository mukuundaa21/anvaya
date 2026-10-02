import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { User, Bell, ChevronDown, LogOut, LayoutDashboard, Settings } from "lucide-react";
import { Button } from "../ui/Button";
import { useAuth } from "../../lib/AuthContext";
import { supabase } from "../../lib/supabase";

const NAV_LINKS = [
  { label: "Marketplace", to: "/marketplace" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "For Sellers", to: "/for-sellers" },
  { label: "For Buyers", to: "/for-buyers" },
  { label: "Premium", to: "/premium", gold: true },
];

function AuthGateLink({
  to,
  children,
  className,
  isActive,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
}) {
  const { user, loading } = useAuth();
  const baseClass = `inline-flex items-center px-1 pt-1 text-sm font-medium uppercase tracking-wider transition-colors relative
    ${isActive ? "text-anvaya-gold border-b-2 border-anvaya-gold" : "text-gray-300 hover:text-anvaya-gold border-b-2 border-transparent"} ${className ?? ""}`;

  if (!loading && user) {
    return (
      <Link to={to} className={baseClass}>
        {children}
      </Link>
    );
  }

  // Logged out — intercept and redirect to /login with returnTo
  return (
    <button
      type="button"
      className={baseClass}
      onClick={() => {
        sessionStorage.setItem("anvaya_returnTo", to);
        window.location.href = "/login";
      }}
    >
      {children}
    </button>
  );
}

function AccountMenu() {
  const { user, role } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const displayName =
    user?.user_metadata?.company_name ||
    user?.user_metadata?.first_name ||
    user?.email?.split("@")[0] ||
    "Account";

  const dashboard =
    role === "seller" ? "/seller" : role === "admin" ? "/admin" : "/buyer";

  const settingsPath = role === "seller" ? "/seller/settings" : "/buyer/settings";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div ref={ref} className="relative flex items-center gap-2">
      {/* Notification bell */}
      <Link
        to={role === "seller" ? "/seller/notifications" : "/buyer/notifications"}
        className="relative p-2 text-gray-300 hover:text-anvaya-gold transition-colors"
        title="Notifications"
      >
        <Bell className="w-5 h-5" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-anvaya-rust rounded-full" />
      </Link>

      {/* Account button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 border border-gray-700 hover:border-anvaya-gold px-3 py-2 text-sm font-semibold uppercase tracking-wider text-gray-200 hover:text-anvaya-gold transition-colors"
      >
        <User className="w-4 h-4" />
        <span className="hidden sm:inline max-w-[120px] truncate">{displayName}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-anvaya-navy border border-gray-700 shadow-2xl z-50">
          <div className="border-b border-gray-800 px-4 py-3">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Signed in as</p>
            <p className="text-sm text-white font-semibold truncate mt-1">{user?.email}</p>
          </div>
          <nav className="py-1">
            <button
              onClick={() => { navigate(dashboard); setOpen(false); }}
              className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white uppercase tracking-wider font-semibold"
            >
              <LayoutDashboard className="w-4 h-4" /> My Dashboard
            </button>
            <button
              onClick={() => { navigate(settingsPath); setOpen(false); }}
              className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white uppercase tracking-wider font-semibold"
            >
              <Settings className="w-4 h-4" /> Settings
            </button>
            <div className="border-t border-gray-800 mt-1 pt-1">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm text-anvaya-rust hover:bg-white/5 hover:text-red-400 uppercase tracking-wider font-semibold"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const { user, loading } = useAuth();
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-anvaya-navy text-anvaya-ivory border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo — always left, always goes to "/" */}
          <div className="flex items-center gap-10">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-serif text-3xl tracking-widest text-anvaya-gold">ANVAYA</span>
            </Link>
            <div className="hidden md:flex md:items-center md:space-x-6">
              {NAV_LINKS.map((link) => (
                <AuthGateLink
                  key={link.to}
                  to={link.to}
                  isActive={location.pathname === link.to}
                  className={link.gold ? "!text-anvaya-gold hover:!text-white" : ""}
                >
                  {link.label}
                </AuthGateLink>
              ))}
            </div>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              // Skeleton to avoid flash
              <div className="w-32 h-8 bg-gray-800 animate-pulse" />
            ) : user ? (
              <AccountMenu />
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-semibold uppercase tracking-wider text-gray-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link to="/signup">
                  <Button variant="primary">Join Anvaya</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
