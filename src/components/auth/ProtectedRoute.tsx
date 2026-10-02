import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../lib/AuthContext";

interface ProtectedRouteProps {
  allowedRoles?: ("buyer" | "seller" | "admin")[];
}

// Skeleton shown while session loads — navy, no flash
function NavySkeleton() {
  return (
    <div className="min-h-screen bg-anvaya-navy flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <span className="font-serif text-3xl tracking-widest text-anvaya-gold animate-pulse">ANVAYA</span>
        <div className="w-48 h-1 bg-gray-800 overflow-hidden">
          <div className="h-full bg-anvaya-gold/40 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      // Save intended destination so login can redirect back
      sessionStorage.setItem("anvaya_returnTo", location.pathname + location.search);
    }
  }, [loading, user, location]);

  if (loading) return <NavySkeleton />;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    // Role mismatch — send to their own dashboard
    const dash = role === "seller" ? "/seller" : role === "admin" ? "/admin" : "/buyer";
    return <Navigate to={dash} replace />;
  }

  return <Outlet />;
}

// Used for public pages that require auth before entry (navbar links, hero CTAs)
export function AuthGate({ children, to }: { children: React.ReactNode; to: string }) {
  const { user, loading } = useAuth();

  if (loading) return <>{children}</>;

  if (!user) {
    return (
      <span
        className="cursor-pointer"
        onClick={() => {
          sessionStorage.setItem("anvaya_returnTo", to);
          window.location.href = "/login";
        }}
      >
        {children}
      </span>
    );
  }

  return <>{children}</>;
}
