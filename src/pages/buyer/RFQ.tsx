import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Label } from "../../components/ui/Label";
import { Card, CardContent } from "../../components/ui/Card";

export function RFQSystem() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center space-y-6">
        <div className="w-16 h-16 bg-anvaya-emerald/10 text-anvaya-emerald rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h2 className="font-serif text-3xl text-anvaya-navy uppercase tracking-widest">Requirement Posted</h2>
        <p className="text-gray-600">Our rule-based engine is scanning the marketplace. You will be notified instantly when a seller matches your exact parameters.</p>
        <Button variant="primary" onClick={() => setSubmitted(false)}>Submit Another Request</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-8">
        <h2 className="font-serif text-3xl text-anvaya-navy uppercase tracking-widest mb-2">TELL US WHAT YOU NEED.</h2>
        <p className="text-gray-600 text-sm">Post a Request for Quotation (RFQ). We automatically match you with verified sellers.</p>
      </div>

      <Card>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Product Name / Keyword</Label>
              <Input required placeholder="e.g. Copper Wire Scrap" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Category</Label>
                <select className="flex h-12 w-full border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-anvaya-gold rounded-none">
                  <option>Textiles</option>
                  <option>Chemicals</option>
                  <option>Metals</option>
                  <option>Plastics</option>
                  <option>Packaging</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Target Quantity</Label>
                <Input type="number" required placeholder="units/kg" />
              </div>
              <div className="space-y-2">
                <Label>Target Price (Max ₹/unit)</Label>
                <Input type="number" required />
              </div>
              <div className="space-y-2">
                <Label>Preferred Location (Optional)</Label>
                <Input placeholder="e.g. Maharashtra" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Delivery Deadline</Label>
              <Input type="date" required />
            </div>

            <div className="space-y-2">
              <Label>Additional Specifications</Label>
              <textarea className="flex w-full border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-anvaya-gold rounded-none min-h-[100px]" placeholder="Specific grade, packaging requirements..."></textarea>
            </div>

            <Button type="submit" variant="primary" className="w-full py-4 text-lg mt-4">Submit Requirement</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
