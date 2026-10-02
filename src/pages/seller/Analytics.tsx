import { Card, CardContent } from "../../components/ui/Card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const data = [
  { name: 'Jan', value: 1200000 },
  { name: 'Feb', value: 2100000 },
  { name: 'Mar', value: 1800000 },
  { name: 'Apr', value: 2400000 },
  { name: 'May', value: 2900000 },
  { name: 'Jun', value: 4200000 },
];

const categoryData = [
  { name: 'Textiles', sold: 45, active: 12 },
  { name: 'Chemicals', sold: 20, active: 30 },
  { name: 'Plastics', sold: 35, active: 15 },
];

export function SellerAnalytics() {
  return (
    <div className="max-w-6xl mx-auto py-8">
      <h2 className="font-serif text-3xl text-anvaya-navy uppercase tracking-widest mb-8">Performance Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <div className="border-b border-gray-100 p-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-anvaya-navy">Recovered Value (YTD)</h3>
          </div>
          <CardContent className="p-6 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis tickFormatter={(val) => `₹${val/100000}L`} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Tooltip formatter={(val: any) => [`₹${Number(val).toLocaleString()}`, 'Value']} />
                <Area type="monotone" dataKey="value" stroke="#C9A24B" fill="#C9A24B" fillOpacity={0.2} strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <div className="border-b border-gray-100 p-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-anvaya-navy">Inventory by Category</h3>
          </div>
          <CardContent className="p-6 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Tooltip />
                <Legend iconType="square" wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="sold" name="Sold Lots" fill="#174A3A" />
                <Bar dataKey="active" name="Active Lots" fill="#C9A24B" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
