import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { supabase } from "./supabase";
import type { User, Session } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  role: "buyer" | "seller" | "admin" | null;
  loading: boolean;
}

const AuthContext = createContext<AuthState>({
  user: null,
  role: null,
  loading: true,
});

function updateAuthState(
  session: Session | null,
  setUser: (user: User | null) => void,
  setRole: (
    role: "buyer" | "seller" | "admin" | null
  ) => void
) {
  const user = session?.user ?? null;

  setUser(user);

  if (user) {
    const metadataRole = user.user_metadata?.role;

    setRole(
      metadataRole === "seller" ||
      metadataRole === "admin" ||
      metadataRole === "buyer"
        ? metadataRole
        : "buyer"
    );
  } else {
    setRole(null);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<
    "buyer" | "seller" | "admin" | null
  >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (!mounted) return;

      if (error) {
        console.error("[AUTH] Failed to restore session:", error);
        updateAuthState(null, setUser, setRole);
      } else {
        updateAuthState(session, setUser, setRole);
      }

      setLoading(false);
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;

      updateAuthState(session, setUser, setRole);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);