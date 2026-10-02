import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader, CtaBand } from "../components/ui/PageHeader";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { useAuth } from "../lib/AuthContext";
import {
  Package, ShieldCheck, Handshake, FileText, Bookmark, FileStack,
  Users2, Truck, Store, Building2, Briefcase, ShoppingBag
} from "lucide-react";

const BENEFITS = [
  { icon: Package, title: "Bulk Lots With Clear MOQ", desc: "Every listing shows exact quantity, MOQ, unit price and condition upfront." },
  { icon: ShieldCheck, title: "Verified Sellers", desc: "All sellers are GST-verified and reviewed by our ops team before listing." },
  { icon: Handshake, title: "Make Offers & Negotiate", desc: "Submit offers, counter and accept — all in our three-column Negotiation Room." },
  { icon: FileText, title: "Post Requirements (RFQ)", desc: "Tell us what you need and we match you to sellers automatically." },
  { icon: Bookmark, title: "Save & Track Lots", desc: "Save lots for later and get alerts when pricing or quantity changes." },
  { icon: FileStack, title: "Order History & Invoices", desc: "Every completed order generates a printable commercial invoice." },
];

const WHO_BUYS = [
  { icon: Store, label: "Resellers" },
  { icon: Truck, label: "Distributors" },
  { icon: ShoppingBag, label: "Retailers" },
  { icon: Users2, label: "Wholesalers" },
  { icon: Building2, label: "SMEs" },
  { icon: Briefcase, label: "Institutional Buyers" },
  { icon: FileText, label: "Procurement Teams" },
];

const START_STEPS = [
  { n: "01", t: "Create Account", d: "Register as a buyer in minutes." },
  { n: "02", t: "Browse or Post a Requirement", d: "Search lots or tell us what you need." },
  { n: "03", t: "Make an Offer", d: "Negotiate quantity and price directly." },
  { n: "04", t: "Receive Order", d: "Order confirmed, invoice generated." },
];

function MiniRFQ() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      sessionStorage.setItem("anvaya_returnTo", "/buyer/requirements");
      navigate("/login");
      return;
    }
    navigate("/buyer/requirements");
  };

  return (
    <div className="bg-white border border-gray-200 p-8 max-w-2xl mx-auto">
      <h3 className="font-serif text-2xl text-anvaya-navy mb-6 uppercase tracking-widest">Tell Us What You Need.</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label>Product / Keyword</Label>
            <Input placeholder="e.g. Copper Wire Scrap" required />
          </div>
          <div className="space-y-1">
            <Label>Quantity</Label>
            <Input type="number" placeholder="units / kg" required />
          </div>
          <div className="space-y-1">
            <Label>Target Price (₹/unit max)</Label>
            <Input type="number" required />
          </div>
          <div className="space-y-1">
            <Label>Preferred Location</Label>
            <Input placeholder="e.g. Maharashtra" />
          </div>
        </div>
        <div className="space-y-1">
          <Label>Delivery Deadline</Label>
          <Input type="date" required />
        </div>
        <Button type="submit" variant="primary" className="w-full mt-2">Submit Requirement</Button>
      </form>
    </div>
  );
}

export function ForBuyers() {
  return (
    <div>
      <PageHeader
        eyebrow="For Buyers"
        title="FIND INVENTORY AT SCALE."
        subtitle="Source bulk lots from verified businesses at recovery prices."
      />

      {/* Benefits */}
      <section className="bg-anvaya-ivory py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-anvaya-gold uppercase tracking-widest text-sm font-semibold mb-3">Why Anvaya</p>
            <h2 className="font-serif text-4xl text-anvaya-navy">BUYER ADVANTAGES</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="hover:border-anvaya-gold transition-colors duration-200">
                <CardContent className="p-8">
                  <div className="w-10 h-10 bg-anvaya-navy flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-anvaya-gold" />
                  </div>
                  <h3 className="font-semibold text-anvaya-navy uppercase tracking-wider mb-2">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mini RFQ */}
      <section className="bg-anvaya-navy py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-anvaya-gold uppercase tracking-widest text-sm font-semibold mb-3">Submit a Requirement</p>
            <h2 className="font-serif text-4xl text-white">POST YOUR RFQ.</h2>
          </div>
          <MiniRFQ />
        </div>
      </section>

      {/* Who Buys */}
      <section className="bg-anvaya-ivory py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-anvaya-gold uppercase tracking-widest text-sm font-semibold mb-3">Our Community</p>
            <h2 className="font-serif text-4xl text-anvaya-navy">WHO BUYS ON ANVAYA</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {WHO_BUYS.map(({ icon: Icon, label }) => (
              <div key={label} className="border border-gray-200 bg-white p-6 text-center hover:border-anvaya-gold transition-colors">
                <Icon className="w-8 h-8 text-anvaya-navy mx-auto mb-3" />
                <p className="text-xs font-semibold text-anvaya-navy uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-step row */}
      <section className="bg-anvaya-navy py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl text-anvaya-gold">START BUYING IN 4 STEPS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {START_STEPS.map((s, i) => (
              <div key={s.n} className="relative border border-gray-700 p-8 text-center">
                {i < START_STEPS.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-px bg-anvaya-gold z-10" />
                )}
                <p className="font-serif text-4xl text-anvaya-gold mb-4">{s.n}</p>
                <h3 className="font-semibold text-white uppercase tracking-wider mb-2 text-sm">{s.t}</h3>
                <p className="text-xs text-gray-400">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="START SOURCING TODAY."
        buttons={[
          { label: "Explore Inventory", to: "/marketplace" },
          { label: "Submit a Requirement", to: "/buyer/requirements", variant: "outline" },
        ]}
      />
    </div>
  );
}
