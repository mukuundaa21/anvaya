import { Card, CardContent } from "../../components/ui/Card";
import { Bookmark, FileText, Handshake, ShoppingCart } from "lucide-react";

export function BuyerDashboardHome() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-anvaya-navy uppercase tracking-widest mb-1">Buyer Overview</h1>
        <p className="text-gray-600 text-sm">Monitor your procurement activity and offers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-l-4 border-l-anvaya-navy">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Requirements</p>
              <FileText className="w-5 h-5 text-gray-400" />
            </div>
            <h3 className="text-3xl font-serif text-gray-900 font-bold mb-1">3</h3>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Matched: 12 lots</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-anvaya-gold">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Saved Lots</p>
              <Bookmark className="w-5 h-5 text-gray-400" />
            </div>
            <h3 className="text-3xl font-serif text-gray-900 font-bold mb-1">8</h3>
            <p className="text-xs text-anvaya-emerald font-semibold uppercase tracking-wider">3 price drops</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-anvaya-emerald">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Offers</p>
              <Handshake className="w-5 h-5 text-gray-400" />
            </div>
            <h3 className="text-3xl font-serif text-gray-900 font-bold mb-1">2</h3>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Pending seller response</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-anvaya-rust">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Orders processing</p>
              <ShoppingCart className="w-5 h-5 text-gray-400" />
            </div>
            <h3 className="text-3xl font-serif text-gray-900 font-bold mb-1">1</h3>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Expected delivery soon</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
