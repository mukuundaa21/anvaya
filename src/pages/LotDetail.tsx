import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { ArrowLeft, CheckCircle, MapPin, Package, Calendar } from "lucide-react";

export function LotDetail() {
  const { id } = useParams();
  const [lot, setLot] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLot() {
      // Mocked for UI purposes until real DB data exists
      setLot({
        id: id,
        name: "Premium Cotton Yarn (40s)",
        category: "Textiles",
        sku: "TEX-CY40",
        quantity_available: 5000,
        moq: 1000,
        asking_price: 1850,
        location: "Surat, GJ",
        condition: "New, A-Grade",
        description: "High quality 40s combed cotton yarn suitable for knitting and weaving. Surplus from cancelled export order. Properly warehoused and packaged in standard cartons.",
        isVerified: true,
        sellerName: "Global Textiles Ltd",
        sellerMemberSince: "2024",
      });
      setLoading(false);
    }
    fetchLot();
  }, [id]);

  if (loading) return <div className="p-20 text-center font-serif text-2xl text-anvaya-navy">Loading Lot...</div>;
  if (!lot) return <div className="p-20 text-center">Lot not found</div>;

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Metrics Band */}
      <div className="bg-anvaya-navy text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/marketplace" className="inline-flex items-center text-anvaya-gold text-sm font-semibold uppercase tracking-widest hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Inventory
          </Link>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Available Quantity</p>
              <p className="text-2xl font-bold">{lot.quantity_available.toLocaleString()} <span className="text-sm font-normal">units</span></p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Minimum Order</p>
              <p className="text-2xl font-bold">{lot.moq.toLocaleString()} <span className="text-sm font-normal">units</span></p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Asking Price</p>
              <p className="text-2xl font-bold text-anvaya-gold">₹{lot.asking_price.toLocaleString()} <span className="text-sm font-normal text-white">/ unit</span></p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Location</p>
              <p className="text-xl font-semibold flex items-center"><MapPin className="w-4 h-4 mr-1 text-anvaya-gold" /> {lot.location}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex gap-2 mb-3">
                <span className="bg-gray-200 text-gray-800 text-xs font-bold px-2 py-1 uppercase tracking-wider">{lot.category}</span>
                <span className="bg-gray-200 text-gray-800 text-xs font-bold px-2 py-1 uppercase tracking-wider">SKU: {lot.sku}</span>
              </div>
              <h1 className="font-serif text-4xl text-anvaya-navy mb-4">{lot.name}</h1>
              <p className="text-gray-600 leading-relaxed text-lg">{lot.description}</p>
            </div>

            {/* Image Gallery Placeholder */}
            <div>
              <h3 className="font-serif text-2xl text-anvaya-navy mb-4 border-b border-gray-200 pb-2">Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="aspect-square bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-400">Image 1</div>
                <div className="aspect-square bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-400">Image 2</div>
                <div className="aspect-square bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-400">Image 3</div>
              </div>
            </div>

            {/* Details Table */}
            <div>
              <h3 className="font-serif text-2xl text-anvaya-navy mb-4 border-b border-gray-200 pb-2">Specifications</h3>
              <table className="w-full text-left text-sm border-collapse">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 font-semibold text-gray-900 w-1/3">Condition</td>
                    <td className="py-3 text-gray-600">{lot.condition}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 font-semibold text-gray-900">Packaging</td>
                    <td className="py-3 text-gray-600">Standard Cartons</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 font-semibold text-gray-900">Age of Stock</td>
                    <td className="py-3 text-gray-600">6 Months</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar / Action Panel */}
          <div className="space-y-6">
            <Card className="border-t-4 border-t-anvaya-gold shadow-lg sticky top-24">
              <CardContent className="p-8">
                {/* Seller Block */}
                <div className="mb-8 text-center border-b border-gray-100 pb-6">
                  {lot.isVerified && (
                    <div className="inline-flex items-center text-anvaya-emerald text-sm font-bold uppercase tracking-wider mb-2">
                      <CheckCircle className="w-4 h-4 mr-1" /> Verified Business
                    </div>
                  )}
                  <h3 className="font-serif text-xl text-anvaya-navy">{lot.sellerName}</h3>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Member since {lot.sellerMemberSince}</p>
                </div>
                
                {/* Actions */}
                <div className="space-y-4">
                  <Button variant="primary" className="w-full text-lg py-4">Make Offer</Button>
                  <Button variant="secondary" className="w-full text-lg py-4">Request Quote</Button>
                </div>
                <p className="text-xs text-center text-gray-500 mt-4">
                  Offers must be between {lot.moq.toLocaleString()} and {lot.quantity_available.toLocaleString()} units.
                </p>
              </CardContent>
            </Card>
          </div>
          
        </div>
      </div>
    </div>
  );
}
