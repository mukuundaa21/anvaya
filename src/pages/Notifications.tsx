import { Card, CardContent } from "../components/ui/Card";
import { Bell, Handshake, CheckCircle } from "lucide-react";

export function NotificationsCenter() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="font-serif text-3xl text-anvaya-navy uppercase tracking-widest mb-8 flex items-center">
        <Bell className="w-8 h-8 mr-3" /> Notifications
      </h2>

      <div className="space-y-4">
        <Card className="border-l-4 border-l-anvaya-gold">
          <CardContent className="p-4 flex gap-4 items-start bg-gray-50/50">
            <div className="bg-anvaya-gold/20 p-2 text-anvaya-gold rounded-full">
              <Handshake className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">New Counter Offer Received</p>
              <p className="text-sm text-gray-600">Global Textiles Ltd has countered your offer on Premium Cotton Yarn (40s).</p>
              <p className="text-xs text-gray-400 mt-2">12 minutes ago</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-anvaya-emerald">
          <CardContent className="p-4 flex gap-4 items-start">
            <div className="bg-anvaya-emerald/20 p-2 text-anvaya-emerald rounded-full">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Order Confirmed</p>
              <p className="text-sm text-gray-600">Your order ORD-8892-A has been confirmed and is processing.</p>
              <p className="text-xs text-gray-400 mt-2">1 day ago</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
