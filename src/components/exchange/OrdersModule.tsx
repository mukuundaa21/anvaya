import { useState } from "react";
import { Button } from "../ui/Button";
import { Card, CardContent } from "../ui/Card";
import { Printer, MapPin, Package, CheckCircle } from "lucide-react";

export function OrdersModule() {
  const [view, setView] = useState<"list" | "detail">("list");

  if (view === "detail") {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" onClick={() => setView("list")}>← Back to Orders</Button>
          <Button variant="outline" onClick={() => window.print()}><Printer className="w-4 h-4 mr-2" /> Print Invoice</Button>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm p-12 print:shadow-none print:border-none">
          {/* Invoice Header */}
          <div className="flex justify-between items-start border-b border-gray-200 pb-8 mb-8">
            <div>
              <h1 className="font-serif text-4xl text-anvaya-navy tracking-widest mb-2">ANVAYA</h1>
              <p className="text-xs text-gray-500 uppercase tracking-widest">Commercial Invoice</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">Order #ORD-8892-A</p>
              <p className="text-sm text-gray-500 mt-1">Date: {new Date().toLocaleDateString()}</p>
              <div className="mt-2 inline-flex items-center text-anvaya-emerald text-xs font-bold uppercase tracking-wider bg-anvaya-emerald/10 px-2 py-1">
                <CheckCircle className="w-3 h-3 mr-1" /> Confirmed
              </div>
            </div>
          </div>

          {/* Addresses */}
          <div className="grid grid-cols-2 gap-12 mb-12">
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Seller (From)</p>
              <p className="font-bold text-gray-900">Global Textiles Ltd</p>
              <p className="text-sm text-gray-600 mt-1">GST: 27AADCG8501L1ZV</p>
              <p className="text-sm text-gray-600">Surat, Gujarat, India</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Buyer (Bill To)</p>
              <p className="font-bold text-gray-900">Acme Manufacturing</p>
              <p className="text-sm text-gray-600 mt-1">GST: 24AAACA3421K1Z3</p>
              <p className="text-sm text-gray-600">Pune, Maharashtra, India</p>
            </div>
          </div>

          {/* Line Items */}
          <table className="w-full text-left text-sm mb-12">
            <thead className="bg-gray-50 text-gray-700 uppercase text-xs border-y border-gray-200">
              <tr>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4 text-right">Qty</th>
                <th className="py-3 px-4 text-right">Price/Unit</th>
                <th className="py-3 px-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-4 px-4">
                  <p className="font-bold text-gray-900">Premium Cotton Yarn (40s)</p>
                  <p className="text-xs text-gray-500 mt-1">SKU: TEX-CY40</p>
                </td>
                <td className="py-4 px-4 text-right">3,000</td>
                <td className="py-4 px-4 text-right">₹1,775.00</td>
                <td className="py-4 px-4 text-right font-bold">₹53,25,000.00</td>
              </tr>
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-64 space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>₹53,25,000.00</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 border-b border-gray-200 pb-3">
                <span>Platform Fee (1%)</span>
                <span>₹53,250.00</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-anvaya-navy pt-2">
                <span>Total</span>
                <span>₹53,78,250.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-serif text-3xl text-anvaya-navy uppercase tracking-widest">Order History</h2>
      </div>

      <div className="bg-white border border-gray-200 overflow-hidden">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="text-xs uppercase bg-gray-50 text-gray-700 border-b">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-bold text-gray-900">ORD-8892-A</td>
              <td className="px-6 py-4">{new Date().toLocaleDateString()}</td>
              <td className="px-6 py-4">Premium Cotton Yarn (40s)</td>
              <td className="px-6 py-4 font-bold">₹53,25,000</td>
              <td className="px-6 py-4">
                <span className="bg-anvaya-emerald/10 text-anvaya-emerald px-2 py-1 text-[10px] font-bold uppercase tracking-wider">
                  Confirmed
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <Button variant="outline" className="px-3 py-1 text-xs" onClick={() => setView("detail")}>View Invoice</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
