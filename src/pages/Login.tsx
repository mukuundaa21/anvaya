import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Card, CardContent } from "../components/ui/Card";
import { supabase } from "../lib/supabase";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // returnTo from sessionStorage (set by auth gate or ProtectedRoute)
  const returnTo = sessionStorage.getItem("anvaya_returnTo");
  const hasReturnTo = !!returnTo && returnTo !== "/login";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      loginSchema.parse({ email, password });
    } catch (err: any) {
      if (err.errors) {
        setError(err.errors[0].message);
        return;
      }
    }

    setLoading(true);
    try {
      const { data, error: authError } =
  await supabase.auth.signInWithPassword({ email, password });

console.log("[LOGIN] data:", data);
console.log("[LOGIN] user:", data.user);
console.log("[LOGIN] session:", data.session);
console.log("[LOGIN] access token:", !!data.session?.access_token);

if (authError) {
  setError("Invalid email or password.");
  return;
}

      if (authError) {
        setError("Invalid email or password.");
        return;
      }

      // Clear stored returnTo
      sessionStorage.removeItem("anvaya_returnTo");
      const role = data.user?.user_metadata?.role;

      if (returnTo && returnTo !== "/login") {
        navigate(returnTo, { replace: true });
      } else {
        // Role-based dashboard redirect
        const dash = role === "seller" ? "/seller" : role === "admin" ? "/admin" : "/buyer";
        navigate(dash, { replace: true });
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-anvaya-ivory py-20 px-4">
      <Card className="w-full max-w-md shadow-xl border-gray-200">
        <div className="bg-anvaya-navy p-6 text-center border-b-4 border-anvaya-gold">
          <h1 className="font-serif text-3xl text-white">LOGIN</h1>
          <p className="text-gray-300 text-sm mt-2 uppercase tracking-widest">Access the Exchange</p>
        </div>
        <CardContent className="p-8">
          {/* returnTo notice */}
          {hasReturnTo && (
            <div className="mb-6 border border-anvaya-gold bg-anvaya-gold/10 px-4 py-3 text-sm text-anvaya-navy font-semibold">
              Please log in or sign up to continue.
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-anvaya-rust/10 border border-anvaya-rust text-anvaya-rust p-3 text-sm font-semibold">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <a href="/forgot-password" className="text-xs text-anvaya-gold hover:underline">
                  Forgot?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" variant="primary" disabled={loading}>
              {loading ? "Authenticating..." : "Login"}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-anvaya-navy font-semibold hover:text-anvaya-gold uppercase tracking-wider">
              Join Anvaya
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
