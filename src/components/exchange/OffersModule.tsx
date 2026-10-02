import { Button } from "../ui/Button";
import { Card, CardContent } from "../ui/Card";
import { Clock, CheckCircle, XCircle, ArrowRightLeft } from "lucide-react";

export function OffersModule() {
  // Mock state for demonstration of the three-column UI
  const offerStatus = "countered"; // pending, countered, accepted, rejected, expired

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-serif text-3xl text-anvaya-navy uppercase tracking-widest">Negotiation Room</h2>
          <p className="text-sm text-gray-500 mt-1">Lot: Premium Cotton Yarn (40s) • SKU: TEX-CY40</p>
        </div>
        <div className="flex items-center gap-2 bg-anvaya-rust/10 text-anvaya-rust px-3 py-1 font-bold text-xs uppercase tracking-wider">
          <Clock className="w-4 h-4" /> Expires in 48h 12m
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Column 1: Seller's Original Asking */}
        <Card className="border-t-4 border-t-gray-300 opacity-70">
          <CardContent className="p-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-6 text-center">Original Listing</h3>
            <div className="space-y-4 text-center">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Quantity</p>
                <p className="text-xl font-semibold">5,000 units</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Price / Unit</p>
                <p className="text-2xl font-bold text-anvaya-navy">₹1,850</p>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Total Value</p>
                <p className="text-lg font-semibold">₹92,50,000</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Column 2: Buyer's Initial Offer */}
        <Card className="border-t-4 border-t-anvaya-emerald opacity-70">
          <CardContent className="p-6">
            <h3 className="text-xs font-semibold text-anvaya-emerald uppercase tracking-widest mb-6 text-center">Buyer Offer</h3>
            <div className="space-y-4 text-center">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Quantity</p>
                <p className="text-xl font-semibold">3,000 units</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Price / Unit</p>
                <p className="text-2xl font-bold text-anvaya-navy">₹1,700</p>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Total Value</p>
                <p className="text-lg font-semibold">₹51,00,000</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Column 3: Active Counter Offer */}
        <Card className="border-t-4 border-t-anvaya-gold shadow-xl transform scale-105 z-10">
          <CardContent className="p-6">
            <h3 className="text-xs font-semibold text-anvaya-gold uppercase tracking-widest mb-6 text-center">Seller Counter</h3>
            <div className="space-y-4 text-center">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Quantity</p>
                <p className="text-xl font-semibold">3,000 units</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Price / Unit</p>
                <p className="text-3xl font-bold text-anvaya-navy">₹1,775</p>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Total Value</p>
                <p className="text-xl font-bold">₹53,25,000</p>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <Button variant="primary" className="w-full bg-anvaya-emerald text-white hover:bg-emerald-800">
                <CheckCircle className="w-4 h-4 mr-2" /> Accept & Reserve
              </Button>
              <Button variant="outline" className="w-full">
                <ArrowRightLeft className="w-4 h-4 mr-2" /> Counter Offer
              </Button>
              <Button variant="ghost" className="w-full text-anvaya-rust hover:text-red-700 decoration-red-700">
                <XCircle className="w-4 h-4 mr-2" /> Decline
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
