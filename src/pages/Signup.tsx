import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Card, CardContent } from "../components/ui/Card";
import { supabase } from "../lib/supabase";

const signupSchema = z.object({
  role: z.enum(["buyer", "seller"]),
  companyName: z.string().min(2, "Company Name is required"),
  gstNumber: z.string().optional(),
  contactPerson: z.string().min(2, "Contact Person is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters").regex(/[A-Z]/, "Must contain uppercase").regex(/[a-z]/, "Must contain lowercase").regex(/[0-9]/, "Must contain number"),
});

export function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: "buyer",
    companyName: "",
    gstNumber: "",
    contactPerson: "",
    phone: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      signupSchema.parse(formData);
    } catch (err: any) {
      if (err.errors) {
        setError(err.errors[0].message);
        return;
      }
    }

    setLoading(true);
    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            role: formData.role,
            first_name: formData.contactPerson.split(' ')[0],
            last_name: formData.contactPerson.split(' ').slice(1).join(' ') || '',
            phone: formData.phone,
          }
        }
      });

      if (authError) throw authError;

      // Redirect using returnTo or role dashboard
      const returnTo = sessionStorage.getItem("anvaya_returnTo");
      sessionStorage.removeItem("anvaya_returnTo");
      const role = formData.role;
      const dash = role === "seller" ? "/seller" : "/buyer";
      navigate(returnTo && returnTo !== "/login" ? returnTo : dash, { replace: true });
    } catch (err: any) {
      setError(err.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-anvaya-ivory py-12 px-4">
      <Card className="w-full max-w-2xl shadow-xl border-gray-200">
        <div className="bg-anvaya-navy p-6 text-center border-b-4 border-anvaya-gold">
          <h1 className="font-serif text-3xl text-white">JOIN ANVAYA</h1>
          <p className="text-gray-300 text-sm mt-2 uppercase tracking-widest">Create Your Exchange Account</p>
        </div>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-anvaya-rust/10 border border-anvaya-rust text-anvaya-rust p-3 text-sm font-semibold">
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <Label>Account Type</Label>
                <div className="flex gap-4">
                  <label className={`flex-1 border p-4 cursor-pointer text-center font-semibold uppercase tracking-wider text-sm transition-colors ${formData.role === 'buyer' ? 'border-anvaya-gold bg-anvaya-gold/10 text-anvaya-navy' : 'border-gray-300 hover:border-gray-400'}`}>
                    <input type="radio" name="role" value="buyer" checked={formData.role === 'buyer'} onChange={handleChange} className="hidden" />
                    I want to Buy
                  </label>
                  <label className={`flex-1 border p-4 cursor-pointer text-center font-semibold uppercase tracking-wider text-sm transition-colors ${formData.role === 'seller' ? 'border-anvaya-gold bg-anvaya-gold/10 text-anvaya-navy' : 'border-gray-300 hover:border-gray-400'}`}>
                    <input type="radio" name="role" value="seller" checked={formData.role === 'seller'} onChange={handleChange} className="hidden" />
                    I want to Sell
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gstNumber">GST Number (Optional)</Label>
                <Input id="gstNumber" name="gstNumber" value={formData.gstNumber} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person</Label>
                <Input id="contactPerson" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
                <p className="text-xs text-gray-500 mt-1">Min 8 chars, 1 uppercase, 1 lowercase, 1 number</p>
              </div>
            </div>

            <Button type="submit" className="w-full mt-6" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account? <a href="/login" className="text-anvaya-navy font-semibold hover:text-anvaya-gold uppercase tracking-wider">Login Here</a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
