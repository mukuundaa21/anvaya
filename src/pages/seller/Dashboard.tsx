import { Card, CardContent } from "../../components/ui/Card";
import { Package, Handshake, IndianRupee, AlertTriangle } from "lucide-react";

export function SellerDashboardHome() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-anvaya-navy uppercase tracking-widest mb-1">Seller Dashboard</h1>
        <p className="text-gray-600 text-sm">Overview of your inventory and exchange activity.</p>
      </div>

      {/* Metrics Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-l-4 border-l-anvaya-navy">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Inventory Value</p>
              <IndianRupee className="w-5 h-5 text-gray-400" />
            </div>
            <h3 className="text-3xl font-serif text-gray-900 font-bold mb-1">₹4.2Cr</h3>
            <p className="text-xs text-anvaya-emerald font-semibold uppercase tracking-wider">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-anvaya-rust">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">At-Risk Inventory</p>
              <AlertTriangle className="w-5 h-5 text-gray-400" />
            </div>
            <h3 className="text-3xl font-serif text-gray-900 font-bold mb-1">2 Lots</h3>
            <p className="text-xs text-anvaya-rust font-semibold uppercase tracking-wider">Aged &gt; 90 Days</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-anvaya-gold">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Lots</p>
              <Package className="w-5 h-5 text-gray-400" />
            </div>
            <h3 className="text-3xl font-serif text-gray-900 font-bold mb-1">14</h3>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Total listings</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-anvaya-emerald">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Offers Received</p>
              <Handshake className="w-5 h-5 text-gray-400" />
            </div>
            <h3 className="text-3xl font-serif text-gray-900 font-bold mb-1">5</h3>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">3 pending review</p>
          </CardContent>
        </Card>
      </div>

      {/* Placeholders for upcoming sections (e.g. Recent Matches, Alerts) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <div className="border-b border-gray-100 p-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-anvaya-navy">Recent Buyer Matches</h3>
          </div>
          <CardContent className="p-0">
            <div className="p-8 text-center text-gray-500 text-sm">
              No recent matches. Update your inventory to attract buyers.
            </div>
          </CardContent>
        </Card>

        <Card>
          <div className="border-b border-gray-100 p-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-anvaya-navy">Recent Offers</h3>
          </div>
          <CardContent className="p-0">
            <div className="p-8 text-center text-gray-500 text-sm">
              No active offers at the moment.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
