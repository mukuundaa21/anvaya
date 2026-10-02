import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, LayoutGrid, List } from "lucide-react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { LotCard } from "../components/ui/LotCard";
import { supabase } from "../lib/supabase";

export function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  
  const [lots, setLots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    category: [] as string[],
    verifiedOnly: false,
  });

  useEffect(() => {
    async function fetchLots() {
      setLoading(true);
      setError("");
      try {
        let query = supabase.from("inventory_lots").select("*, profiles!inner(role), companies!inner(verification_status)").eq("status", "active");
        
        if (searchTerm) {
          query = query.ilike("name", `%${searchTerm}%`);
        }

        if (filters.category.length > 0) {
          query = query.in("category", filters.category);
        }
        
        const { data, error } = await query;
        if (error) throw error;
        
        // Map the Supabase data to our LotCard format
        let mappedLots = data.map(lot => ({
          id: lot.id,
          name: lot.name,
          isVerified: lot.companies?.verification_status === 'verified',
          availableQty: lot.quantity_available,
          moq: lot.moq,
          pricePerUnit: lot.asking_price,
          location: lot.location,
          condition: lot.condition,
          isAging: lot.age && parseInt(lot.age) > 90, // mock rule
        }));

        if (filters.verifiedOnly) {
          mappedLots = mappedLots.filter(l => l.isVerified);
        }

        setLots(mappedLots);
      } catch (err: any) {
        // Fallback to empty if table doesn't exist yet
        console.error("Supabase fetch error, fallback to empty:", err);
        setLots([]);
      } finally {
        setLoading(false);
      }
    }
    fetchLots();
  }, [searchTerm, filters]);

  const toggleCategory = (cat: string) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category.includes(cat)
        ? prev.category.filter(c => c !== cat)
        : [...prev.category, cat]
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 border-b border-gray-200 pb-8">
        <div>
          <h1 className="font-serif text-4xl text-anvaya-navy mb-2">MARKETPLACE</h1>
          <p className="text-gray-600">Browse verified surplus inventory listings.</p>
        </div>
        <div className="w-full md:w-1/3 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input 
            className="pl-10" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white border border-gray-200 p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-6 font-semibold uppercase tracking-wider text-anvaya-navy border-b pb-2">
              <Filter className="w-4 h-4" /> Filters
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-semibold uppercase text-gray-500 mb-3">Category</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  {['Textiles', 'Chemicals', 'Metals', 'Plastics', 'Packaging'].map(cat => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="accent-anvaya-gold" 
                        checked={filters.category.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                      /> 
                      {cat}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase text-gray-500 mb-3">Verified Only</h4>
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="accent-anvaya-gold" 
                    checked={filters.verifiedOnly}
                    onChange={(e) => setFilters(prev => ({...prev, verifiedOnly: e.target.checked}))}
                  /> 
                  Show Verified Sellers
                </label>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-8 text-xs"
              onClick={() => setFilters({ category: [], verifiedOnly: false })}
            >
              Reset Filters
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">
              {loading ? "Loading..." : `Showing ${lots.length} results`}
            </p>
            <div className="flex gap-2">
              <button 
                onClick={() => setViewMode("grid")}
                className={`p-2 border ${viewMode === 'grid' ? 'bg-anvaya-navy text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode("table")}
                className={`p-2 border ${viewMode === 'table' ? 'bg-anvaya-navy text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading inventory from Supabase...</div>
          ) : lots.length === 0 ? (
            <div className="p-12 text-center text-gray-500 bg-white border border-gray-200">
              No lots found matching your criteria.
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {lots.map(lot => (
                <Link to={`/lot/${lot.id}`} key={lot.id}>
                  <LotCard {...lot} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="text-xs uppercase bg-gray-50 text-gray-700 border-b">
                  <tr>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Available</th>
                    <th className="px-6 py-4">MOQ</th>
                    <th className="px-6 py-4">Price/Unit</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {lots.map(lot => (
                    <tr key={lot.id} className="border-b hover:bg-gray-50 cursor-pointer">
                      <td className="px-6 py-4 font-semibold text-anvaya-navy">
                        {lot.name}
                        {lot.isVerified && <span className="ml-2 inline-block w-2 h-2 rounded-full bg-anvaya-emerald" title="Verified" />}
                      </td>
                      <td className="px-6 py-4">{lot.availableQty.toLocaleString()}</td>
                      <td className="px-6 py-4">{lot.moq.toLocaleString()}</td>
                      <td className="px-6 py-4 font-bold text-anvaya-navy">₹{lot.pricePerUnit.toLocaleString()}</td>
                      <td className="px-6 py-4">{lot.location}</td>
                      <td className="px-6 py-4 text-right">
                        <Link to={`/lot/${lot.id}`}>
                          <Button variant="outline" className="px-3 py-1 text-xs">View</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
