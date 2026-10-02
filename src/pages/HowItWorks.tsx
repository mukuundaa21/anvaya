import { useState } from "react";
import { PageHeader, CtaBand } from "../components/ui/PageHeader";
import { Card, CardContent } from "../components/ui/Card";
import { ChevronDown } from "lucide-react";

const STEPS = [
  {
    num: "01",
    title: "UPLOAD",
    desc: "Sellers list inventory with SKU, quantity, condition, age, location, images and expected price.",
  },
  {
    num: "02",
    title: "REVIEW",
    desc: "Each lot is checked for completeness and listed with MOQ and bulk pricing.",
  },
  {
    num: "03",
    title: "MATCH",
    desc: "Lots are matched with buyer requirements by category, quantity, price and location.",
  },
  {
    num: "04",
    title: "NEGOTIATE",
    desc: "Buyers submit offers with quantity, price and delivery terms; sellers accept, counter or decline.",
  },
  {
    num: "05",
    title: "TRANSACT",
    desc: "Accepted offers reserve quantity and create an order with an invoice.",
  },
  {
    num: "06",
    title: "RECOVER",
    desc: "Unsold inventory can be repriced, re-listed or moved to another channel.",
  },
];

const FAQS = [
  {
    q: "Who can join?",
    a: "Any GST-registered business in India can join Anvaya as a buyer or seller. We verify all businesses before they can transact.",
  },
  {
    q: "What is MOQ?",
    a: "Minimum Order Quantity — the smallest lot a seller is willing to split for a single buyer. Each listing shows the MOQ clearly.",
  },
  {
    q: "How are businesses verified?",
    a: "You submit your GST certificate and PAN. Our ops team reviews within 24 hours and marks your profile Verified.",
  },
  {
    q: "How are offers negotiated?",
    a: "Our three-column Negotiation Room lets buyers make offers, sellers counter, and both sides accept or decline — with a 72-hour expiry on each offer round.",
  },
  {
    q: "What fees apply?",
    a: "Anvaya charges a flat 1% platform fee on successfully transacted order value. Listing is free.",
  },
  {
    q: "What happens to unsold lots?",
    a: "Sellers receive aging alerts and can reprice, re-list, or mark lots as sold offline at any time.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 bg-white">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex justify-between items-center px-6 py-5 text-left"
      >
        <span className="font-semibold text-anvaya-navy uppercase tracking-wider text-sm">{q}</span>
        <ChevronDown className={`w-5 h-5 text-anvaya-gold flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
          {a}
        </div>
      )}
    </div>
  );
}

export function HowItWorks() {
  return (
    <div>
      <PageHeader
        eyebrow="The Process"
        title="FROM SURPLUS TO RECOVERED VALUE."
        subtitle="Six steps from a stuck lot to cash in your account."
      />

      {/* Timeline */}
      <section className="bg-anvaya-ivory py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Vertical gold line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-anvaya-gold/30" />

            <div className="space-y-0">
              {STEPS.map((step, i) => (
                <div key={step.num} className="relative flex gap-8 pb-16 last:pb-0">
                  {/* Step number bubble */}
                  <div className="flex-shrink-0 w-16 h-16 bg-anvaya-navy border-2 border-anvaya-gold flex items-center justify-center z-10">
                    <span className="font-serif text-anvaya-gold text-xl font-bold">{step.num}</span>
                  </div>
                  <div className="pt-3">
                    <h3 className="font-serif text-2xl text-anvaya-navy mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-anvaya-navy py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-anvaya-gold uppercase tracking-widest text-sm font-semibold mb-3">Common Questions</p>
            <h2 className="font-serif text-4xl text-white">FREQUENTLY ASKED</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} {...faq} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="READY TO PUT INVENTORY TO WORK?"
        buttons={[
          { label: "Explore Inventory", to: "/marketplace" },
          { label: "List Your Inventory", to: "/seller/inventory", variant: "outline" },
        ]}
      />
    </div>
  );
}
