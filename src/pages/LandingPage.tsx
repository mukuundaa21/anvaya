import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Package, TrendingUp, ShieldCheck } from "lucide-react";
import { useAuth } from "../lib/AuthContext";

function HeroCTA({ label, to, variant, className }: {
  label: string; to: string; variant?: "primary" | "outline"; className?: string;
}) {
  const { user, role } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!user) {
      sessionStorage.setItem("anvaya_returnTo", to);
      navigate("/login");
      return;
    }
    // Special case: buyers clicking "List Your Inventory"
    if (to === "/seller/inventory/new" && role === "buyer") {
      alert("Listing inventory requires a seller account. Please create or switch to a seller account.");
      return;
    }
    navigate(to);
  };

  return (
    <Button variant={variant ?? "primary"} className={className} withArrow onClick={handleClick}>
      {label}
    </Button>
  );
}

function HeroOfferBtn() {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <Button
      variant="secondary"
      className="px-4 py-2 text-xs"
      onClick={() => {
        if (!user) {
          sessionStorage.setItem("anvaya_returnTo", "/marketplace");
          navigate("/login");
          return;
        }
        navigate("/marketplace");
      }}
    >
      Make Offer
    </Button>
  );
}

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="bg-anvaya-navy text-anvaya-ivory pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-anvaya-gold uppercase tracking-widest text-sm font-semibold mb-4">
                The Inventory Recovery Exchange
              </p>
              <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-8">
                TURN SURPLUS INVENTORY INTO WORKING CAPITAL.
              </h1>
              <div className="flex flex-col sm:flex-row gap-4">
                <HeroCTA label="Explore Inventory" to="/marketplace" variant="primary" />
                <HeroCTA
                  label="List Your Inventory"
                  to="/seller/inventory/new"
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-anvaya-navy"
                />
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-anvaya-gold opacity-10 transform translate-x-4 translate-y-4" />
              <div className="bg-white border border-gray-200 p-6 relative z-10 text-gray-900 shadow-2xl">
                <div className="flex justify-between items-start mb-6 border-b pb-4">
                  <div>
                    <span className="bg-anvaya-emerald/10 text-anvaya-emerald text-xs font-bold px-2 py-1 uppercase tracking-wider flex items-center gap-1 mb-2 w-fit">
                      <ShieldCheck className="w-3 h-3" /> Verified Lot
                    </span>
                    <h3 className="font-serif text-2xl text-anvaya-navy">Premium Cotton Yarn (40s)</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 uppercase tracking-wider">Asking Price</p>
                    <p className="text-xl font-bold text-anvaya-navy">
                      ₹1,850 <span className="text-sm font-normal">/ unit</span>
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Available</p>
                    <p className="font-semibold text-lg">5,000 units</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">MOQ</p>
                    <p className="font-semibold text-lg">1,000 units</p>
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-200 p-4 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-anvaya-navy font-semibold text-sm uppercase tracking-wider">
                    <TrendingUp className="w-4 h-4 text-anvaya-rust" /> 23 Verified Buyers Interest
                  </div>
                  <HeroOfferBtn />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-anvaya-gold text-anvaya-navy py-12 border-y border-anvaya-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: "₹124Cr+", label: "Inventory Listed" },
              { val: "4,200+", label: "Verified Businesses" },
              { val: "₹85Cr+", label: "Capital Recovered" },
              { val: "12", label: "Major Categories" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-4xl font-serif font-bold mb-2">{s.val}</p>
                <p className="text-sm uppercase tracking-wider font-semibold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="bg-anvaya-ivory py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-anvaya-navy mb-4">
              INVENTORY DOESN'T LOSE VALUE OVERNIGHT.
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The problem isn't always the inventory. The problem is finding its next market.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Overproduction", "Cancelled Orders", "Slow-Moving Stock", "Discontinued/Seasonal"].map((prob) => (
              <Card key={prob} className="bg-white hover:border-anvaya-gold transition-colors duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-12 h-12 mx-auto bg-anvaya-ivory border border-gray-200 flex items-center justify-center mb-6">
                    <Package className="w-6 h-6 text-anvaya-rust" />
                  </div>
                  <h3 className="font-semibold text-lg text-anvaya-navy uppercase tracking-wider mb-2">{prob}</h3>
                  <p className="text-sm text-gray-600">Capital tied up in warehouses instead of fueling growth.</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-anvaya-navy text-white py-24 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-serif text-anvaya-gold mb-8">
            WHAT'S SITTING IN YOUR WAREHOUSE?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join Anvaya today and connect with thousands of verified buyers looking for bulk inventory.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <HeroCTA label="Explore Inventory" to="/marketplace" />
            <HeroCTA
              label="Join Anvaya"
              to="/signup"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-anvaya-navy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
