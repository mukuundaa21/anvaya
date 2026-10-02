import { Button } from "./Button";
import { Card } from "./Card";
import { CheckCircle, MapPin, Package, Clock } from "lucide-react";
import { cn } from "../../lib/utils";

interface LotCardProps {
  id: string;
  name: string;
  isVerified: boolean;
  availableQty: number;
  moq: number;
  pricePerUnit: number;
  location: string;
  condition: string;
  isAging?: boolean;
}

export function LotCard({ id, name, isVerified, availableQty, moq, pricePerUnit, location, condition, isAging }: LotCardProps) {
  return (
    <Card className="hover:border-anvaya-gold transition-colors duration-300 flex flex-col">
      <div className="p-5 flex-grow border-b border-gray-100">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-serif text-xl text-anvaya-navy line-clamp-2">{name}</h3>
          {isAging && (
            <span className="bg-anvaya-rust text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest flex-shrink-0">
              Aging
            </span>
          )}
        </div>
        
        {isVerified && (
          <div className="flex items-center text-anvaya-emerald text-xs font-bold uppercase tracking-wider mb-4">
            <CheckCircle className="w-3 h-3 mr-1" /> Verified Seller
          </div>
        )}

        <div className="grid grid-cols-2 gap-y-4 mb-2">
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Available</p>
            <p className="font-semibold text-gray-900">{availableQty.toLocaleString()} units</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Min. Order</p>
            <p className="font-semibold text-gray-900">{moq.toLocaleString()} units</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Asking Price</p>
          <div className="flex items-baseline gap-2">
            <p className="font-bold text-2xl text-anvaya-navy">₹{pricePerUnit.toLocaleString()}</p>
            <p className="text-xs text-gray-500">/ unit</p>
          </div>
          <p className="text-[10px] text-anvaya-gold uppercase tracking-widest font-semibold mt-1">Bulk Negotiable</p>
        </div>

        <div className="flex flex-wrap gap-2 mt-4 text-xs text-gray-600">
          <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 border border-gray-200">
            <MapPin className="w-3 h-3" /> {location}
          </span>
          <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 border border-gray-200 uppercase text-[10px] tracking-wider">
            {condition}
          </span>
        </div>
      </div>
      
      <div className="bg-gray-50 p-3 grid grid-cols-2 gap-2">
        <Button variant="outline" className="w-full text-xs px-2 py-2">View Lot</Button>
        <Button variant="primary" className="w-full text-xs px-2 py-2">Make Offer</Button>
      </div>
    </Card>
  );
}
