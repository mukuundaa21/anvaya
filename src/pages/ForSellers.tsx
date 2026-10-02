import { PageHeader, CtaBand } from "../components/ui/PageHeader";
import { Card, CardContent } from "../components/ui/Card";
import {
  TrendingUp, Settings, Handshake, BarChart2, AlertCircle, LayoutDashboard,
  Package, XCircle, Layers, Archive, Repeat, RotateCcw
} from "lucide-react";

const BENEFITS = [
  { icon: TrendingUp, title: "Reach Verified Bulk Buyers", desc: "Get your lots in front of thousands of qualified, pre-verified buyers instantly." },
  { icon: Settings, title: "Set Your Own MOQ & Lot Size", desc: "Full control over minimum order quantities and how lots are split." },
  { icon: Handshake, title: "Receive & Negotiate Offers", desc: "Accept, counter or decline every offer in your Negotiation Room." },
  { icon: BarChart2, title: "Track Orders & Recovered Value", desc: "Live dashboard shows recovered capital, active lots and pending orders." },
  { icon: AlertCircle, title: "Inventory Aging Alerts", desc: "Automated alerts when lots are at risk so you can act before they're dead stock." },
  { icon: LayoutDashboard, title: "Clear Seller Dashboard", desc: "One place to manage listings, offers, orders and analytics." },
];

const LOT_TYPES = [
  { icon: Layers, label: "Overproduction" },
  { icon: XCircle, label: "Cancelled Orders" },
  { icon: BarChart2, label: "Slow-Moving Stock" },
  { icon: Archive, label: "Discontinued Items" },
  { icon: Repeat, label: "Seasonal Stock" },
  { icon: RotateCcw, label: "Returns & Open-Box" },
];

const MOCK_METRICS = [
  { label: "Total Inventory", val: "₹4.2Cr", sub: "Across 18 lots" },
  { label: "At Risk (>90 days)", val: "₹68L", sub: "3 lots aging", color: "text-anvaya-rust" },
  { label: "Active Lots", val: "14", sub: "Listed & visible" },
  { label: "Matched Buyers", val: "31", sub: "This month" },
  { label: "Recovered Value", val: "₹1.9Cr", sub: "YTD", color: "text-anvaya-emerald" },
];

const START_STEPS = [
  { n: "01", t: "Create Account", d: "Register your business in minutes." },
  { n: "02", t: "Get Verified", d: "Submit GST & PAN for 24h verification." },
  { n: "03", t: "Add Inventory", d: "Upload lots with photos and pricing." },
  { n: "04", t: "Receive Offers", d: "Buyers find you and start negotiating." },
];

export function ForSellers() {
  return (
    <div>
      <PageHeader
        eyebrow="For Sellers"
        title="HAVE INVENTORY THAT ISN'T MOVING?"
        subtitle="Turn warehouse-bound stock into active opportunities."
      />

      {/* Benefits */}
      <section className="bg-anvaya-ivory py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-anvaya-gold uppercase tracking-widest text-sm font-semibold mb-3">Why Anvaya</p>
            <h2 className="font-serif text-4xl text-anvaya-navy">SELLER ADVANTAGES</h2>
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

      {/* What You Can List */}
      <section className="bg-anvaya-navy py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-anvaya-gold uppercase tracking-widest text-sm font-semibold mb-3">Inventory Types</p>
            <h2 className="font-serif text-4xl text-white">WHAT YOU CAN LIST</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {LOT_TYPES.map(({ icon: Icon, label }) => (
              <div key={label} className="border border-gray-700 p-6 text-center hover:border-anvaya-gold transition-colors">
                <Icon className="w-8 h-8 text-anvaya-gold mx-auto mb-3" />
                <p className="text-sm font-semibold text-white uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="bg-anvaya-ivory py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-anvaya-gold uppercase tracking-widest text-sm font-semibold mb-3">Seller Dashboard</p>
            <h2 className="font-serif text-4xl text-anvaya-navy">YOUR CONTROL CENTRE</h2>
          </div>
          <div className="bg-anvaya-navy p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-800 pb-4">
              <span className="font-serif text-xl text-anvaya-gold">ANVAYA</span>
              <span className="text-[10px] border border-gray-600 text-gray-400 px-1 uppercase tracking-widest">Seller</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {MOCK_METRICS.map((m) => (
                <div key={m.label} className="bg-white/5 border border-gray-700 p-4">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">{m.label}</p>
                  <p className={`text-2xl font-serif font-bold ${m.color ?? "text-white"}`}>{m.val}</p>
                  <p className="text-[10px] text-gray-500 mt-1">{m.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4-step row */}
      <section className="bg-anvaya-navy py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl text-anvaya-gold">START SELLING IN 4 STEPS</h2>
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
        title="LIST YOUR FIRST LOT TODAY."
        buttons={[
          { label: "List Your Inventory", to: "/seller/inventory" },
          { label: "How It Works", to: "/how-it-works", variant: "outline" },
        ]}
      />
    </div>
  );
}
