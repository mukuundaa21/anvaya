import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Label } from "../../components/ui/Label";
import { Card, CardContent } from "../../components/ui/Card";
import { Plus, Upload, Trash2, Edit } from "lucide-react";
import { z } from "zod";

export function SellerInventory() {
  const [isAdding, setIsAdding] = useState(false);
  const [images, setImages] = useState<File[]>([]);

  // Simple mock data for now
  const [inventory, setInventory] = useState([
    { id: '1', name: 'Premium Cotton Yarn (40s)', sku: 'TEX-CY40', category: 'Textiles', qty: 5000, price: 1850, status: 'active' }
  ]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      if (images.length + selected.length > 10) {
        alert("Maximum 10 images allowed.");
        return;
      }
      setImages([...images, ...selected]);
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate Supabase insert + Storage upload
    alert("Inventory Added successfully!");
    setIsAdding(false);
    setImages([]);
  };

  if (isAdding) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-serif text-2xl text-anvaya-navy">ADD NEW INVENTORY</h2>
          <Button variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
        </div>
        
        <Card>
          <CardContent className="p-8">
            <form onSubmit={handleAddSubmit} className="space-y-8">
              {/* Basic Info */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4 border-b pb-2">Basic Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Product Name</Label>
                    <Input required placeholder="e.g. Industrial Grade Xylene" />
                  </div>
                  <div className="space-y-2">
                    <Label>SKU / Reference</Label>
                    <Input required />
                  </div>
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
                    <Label>Brand (Optional)</Label>
                    <Input />
                  </div>
                </div>
              </div>

              {/* Quantities & Pricing */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4 border-b pb-2">Quantities & Pricing</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label>Total Quantity</Label>
                    <Input type="number" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Minimum Order (MOQ)</Label>
                    <Input type="number" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Lot Size (Optional)</Label>
                    <Input type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label>Asking Price (₹/unit)</Label>
                    <Input type="number" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Original Price (Optional)</Label>
                    <Input type="number" />
                  </div>
                </div>
              </div>

              {/* Condition & Specs */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4 border-b pb-2">Condition & Specs</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label>Condition</Label>
                    <Input required placeholder="e.g. New, Sealed, A-Grade" />
                  </div>
                  <div className="space-y-2">
                    <Label>Age of Stock</Label>
                    <Input required placeholder="e.g. 6 months" />
                  </div>
                  <div className="space-y-2">
                    <Label>Expiry Date (Optional)</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input required placeholder="City, State" />
                  </div>
                  <div className="space-y-2">
                    <Label>Packaging</Label>
                    <Input placeholder="e.g. 200L Drums" />
                  </div>
                </div>
              </div>

              {/* Images */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4 border-b pb-2">Images (Max 10)</h3>
                <div className="border-2 border-dashed border-gray-300 p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 font-semibold">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG or WEBP (max 5MB each)</p>
                  <input type="file" multiple accept="image/jpeg, image/png, image/webp" className="hidden" id="image-upload" onChange={handleImageUpload} />
                  <label htmlFor="image-upload" className="mt-4 inline-block bg-white border border-gray-300 px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 font-semibold uppercase tracking-wider">
                    Browse Files
                  </label>
                </div>
                {images.length > 0 && (
                  <div className="flex gap-2 mt-4 flex-wrap">
                    {images.map((img, i) => (
                      <div key={i} className="w-20 h-20 bg-gray-200 border border-gray-300 flex items-center justify-center text-[10px] text-center overflow-hidden">
                        {img.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <textarea className="flex w-full border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-anvaya-gold rounded-none min-h-[100px]" required></textarea>
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t">
                <Button type="button" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
                <Button type="submit" variant="primary">Submit Listing</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif text-3xl text-anvaya-navy uppercase tracking-widest mb-1">Inventory</h1>
          <p className="text-gray-600 text-sm">Manage your active listings and stock.</p>
        </div>
        <Button variant="primary" onClick={() => setIsAdding(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add Inventory
        </Button>
      </div>

      <div className="bg-white border border-gray-200 overflow-hidden">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="text-xs uppercase bg-gray-50 text-gray-700 border-b">
            <tr>
              <th className="px-6 py-4">Product Name</th>
              <th className="px-6 py-4">SKU</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Quantity</th>
              <th className="px-6 py-4">Price/Unit</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map(item => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold text-anvaya-navy">{item.name}</td>
                <td className="px-6 py-4">{item.sku}</td>
                <td className="px-6 py-4">{item.category}</td>
                <td className="px-6 py-4">{item.qty.toLocaleString()}</td>
                <td className="px-6 py-4">₹{item.price.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className="bg-anvaya-emerald/10 text-anvaya-emerald px-2 py-1 text-[10px] font-bold uppercase tracking-wider">
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="text-gray-400 hover:text-anvaya-navy transition-colors"><Edit className="w-4 h-4 inline" /></button>
                  <button className="text-gray-400 hover:text-anvaya-rust transition-colors"><Trash2 className="w-4 h-4 inline" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
