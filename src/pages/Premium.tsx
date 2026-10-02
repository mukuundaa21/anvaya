import { useState, useEffect } from "react";
import { PageHeader, CtaBand } from "../components/ui/PageHeader";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { useAuth } from "../lib/AuthContext";
import { supabase } from "../lib/supabase";
import {
  Star, ShieldCheck, Search, Lock, Eye, MessageSquare, Users, ClipboardCheck,
  CheckCircle, Clock
} from "lucide-react";

const FEATURES = [
  { icon: Star, title: "Curated Listings", desc: "Every lot is hand-reviewed before it appears on Premium." },
  { icon: ShieldCheck, title: "Verified Sellers", desc: "Only verified businesses with a clean transaction history may list." },
  { icon: ClipboardCheck, title: "Product Verification", desc: "Third-party product verification documents required for every lot." },
  { icon: ShieldCheck, title: "Authentication", desc: "Authenticity certificates are validated by our compliance team." },
  { icon: Search, title: "Condition Verification", desc: "Independent inspection reports accompany all Premium lots." },
  { icon: Eye, title: "Controlled Visibility", desc: "Lots are visible only to approved Premium buyers." },
  { icon: Lock, title: "Private Offers", desc: "Offers and counter-offers are strictly confidential between parties." },
  { icon: Users, title: "Premium Buyers", desc: "Access a network of institutional, high-volume buyers." },
];

const CRITERIA = [
  "Lot value above ₹25 lakh",
  "GST-verified business with clean profile",
  "Product authenticity or certification documents",
  "At least one completed transaction on Anvaya",
  "Admin approval required",
];

type AccessStatus = "none" | "pending" | "approved" | "loading";

export function PremiumExchange() {
  const { user, loading: authLoading } = useAuth();
  const [accessStatus, setAccessStatus] = useState<AccessStatus>("loading");
  const [lots, setLots] = useState<any[]>([]);
  const [lotsLoading, setLotsLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    async function fetchData() {
      // Fetch premium lots
      const { data: lotData } = await supabase
        .from("inventory_lots")
        .select("*")
        .eq("is_premium", true)
        .limit(6);
      setLots(lotData ?? []);
      setLotsLoading(false);

      if (user) {
        // Check premium access status
        const { data: req } = await supabase
          .from("premium_access_requests")
          .select("status")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (!req) setAccessStatus("none");
        else if (req.status === "approved") setAccessStatus("approved");
        else setAccessStatus("pending");
      } else {
        setAccessStatus("none");
      }
    }
    if (!authLoading) fetchData();
  }, [user, authLoading]);

  const requestAccess = async () => {
    if (!user) {
      sessionStorage.setItem("anvaya_returnTo", "/premium");
      window.location.href = "/login";
      return;
    }
    setRequesting(true);
    await supabase.from("premium_access_requests").insert({
      user_id: user.id,
      status: "pending",
    });
    setAccessStatus("pending");
    setRequesting(false);
  };

  return (
    <div className="bg-[#040A12] text-anvaya-ivory min-h-screen">
      {/* Header */}
      <section className="bg-anvaya-navy py-20 px-4 border-b border-anvaya-gold/20">
        <div className="max-w-5xl mx-auto text-center">
          <Star className="w-14 h-14 text-anvaya-gold mx-auto mb-6" />
          <p className="text-anvaya-gold uppercase tracking-widest text-sm font-semibold mb-4">The Premium Exchange</p>
          <h1 className="font-serif text-5xl md:text-7xl text-white leading-tight mb-6">
            THE PREMIUM EXCHANGE.
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A controlled marketplace for high-value, rare and specialized inventory.
          </p>
        </div>
      </section>

      {/* Feature cards */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-anvaya-gold uppercase tracking-widest text-sm font-semibold mb-3">Why Premium</p>
            <h2 className="font-serif text-4xl text-white">WHAT SETS IT APART</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="border border-anvaya-gold/30 bg-white/5 p-6 hover:border-anvaya-gold transition-colors">
                <Icon className="w-8 h-8 text-anvaya-gold mb-4" />
                <h3 className="font-semibold text-white uppercase tracking-wider text-sm mb-2">{title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Premium Lots Grid */}
      <section className="py-12 px-4 border-t border-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-anvaya-gold uppercase tracking-widest text-sm font-semibold mb-3">Available Now</p>
            <h2 className="font-serif text-4xl text-white">PREMIUM LOTS</h2>
          </div>
          {lotsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border border-gray-800 bg-white/5 h-48 animate-pulse" />
              ))}
            </div>
          ) : lots.length === 0 ? (
            <div className="text-center py-20 border border-anvaya-gold/20">
              <Star className="w-10 h-10 text-anvaya-gold/40 mx-auto mb-4" />
              <p className="text-gray-500 uppercase tracking-wider font-semibold">No premium lots available yet.</p>
              <p className="text-gray-600 text-sm mt-2">Check back soon or apply to list a premium lot.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lots.map((lot) => (
                <div key={lot.id} className="border border-anvaya-gold/40 bg-white/5 p-6 hover:border-anvaya-gold transition-colors">
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-3 h-3 text-anvaya-gold" />
                    <span className="text-[10px] text-anvaya-gold uppercase tracking-widest font-bold">Premium Verified</span>
                  </div>
                  <h3 className="font-serif text-xl text-white mb-2">{lot.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">{lot.category}</p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider">Price / Unit</p>
                      <p className="text-xl font-bold text-anvaya-gold">₹{Number(lot.price_per_unit).toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider">MOQ</p>
                      <p className="font-semibold text-white">{lot.moq?.toLocaleString()} units</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Access Panel */}
      <section className="py-24 px-4 border-t border-gray-900">
        <div className="max-w-3xl mx-auto">
          <div className="border border-anvaya-gold/40 bg-anvaya-navy p-10 text-center">
            {accessStatus === "loading" ? (
              <div className="animate-pulse text-gray-600 uppercase tracking-wider">Checking access...</div>
            ) : accessStatus === "approved" ? (
              <>
                <CheckCircle className="w-14 h-14 text-anvaya-emerald mx-auto mb-6" />
                <h2 className="font-serif text-3xl text-anvaya-gold mb-3">PREMIUM ACCESS GRANTED</h2>
                <p className="text-gray-300">You have full access to all Premium lots and private offers.</p>
              </>
            ) : accessStatus === "pending" ? (
              <>
                <Clock className="w-14 h-14 text-anvaya-gold mx-auto mb-6" />
                <h2 className="font-serif text-3xl text-white mb-3">REQUEST UNDER REVIEW</h2>
                <p className="text-gray-400">Our team will review your Premium access request within 48 hours.</p>
              </>
            ) : (
              <>
                <Lock className="w-14 h-14 text-anvaya-gold/50 mx-auto mb-6" />
                <h2 className="font-serif text-3xl text-white mb-3">PREMIUM ACCESS IS BY APPROVAL</h2>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Access is restricted to verified businesses meeting eligibility criteria.
                </p>
                <Button variant="primary" onClick={requestAccess} disabled={requesting}>
                  {requesting ? "Submitting..." : "Request Premium Access"}
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="py-16 px-4 border-t border-gray-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl text-anvaya-gold mb-8 text-center">ELIGIBILITY CRITERIA</h2>
          <ul className="space-y-3">
            {CRITERIA.map((c) => (
              <li key={c} className="flex items-start gap-3 text-gray-300">
                <Star className="w-4 h-4 text-anvaya-gold flex-shrink-0 mt-1" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
