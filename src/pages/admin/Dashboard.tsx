import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";
import { Shield, ShieldAlert, CheckCircle, Unlock, Users } from "lucide-react";

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"verifications" | "locked">("verifications");

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex items-center gap-3 mb-8">
        <Shield className="w-8 h-8 text-anvaya-navy" />
        <h2 className="font-serif text-3xl text-anvaya-navy uppercase tracking-widest">Admin Control Center</h2>
      </div>

      <div className="flex gap-4 mb-8 border-b border-gray-200">
        <button 
          className={`pb-4 px-4 font-semibold uppercase tracking-wider text-sm transition-colors ${activeTab === 'verifications' ? 'border-b-2 border-anvaya-navy text-anvaya-navy' : 'text-gray-500 hover:text-gray-800'}`}
          onClick={() => setActiveTab('verifications')}
        >
          Business Verifications
        </button>
        <button 
          className={`pb-4 px-4 font-semibold uppercase tracking-wider text-sm transition-colors ${activeTab === 'locked' ? 'border-b-2 border-anvaya-navy text-anvaya-navy' : 'text-gray-500 hover:text-gray-800'}`}
          onClick={() => setActiveTab('locked')}
        >
          Locked Accounts
        </button>
      </div>

      {activeTab === 'verifications' && (
        <Card>
          <CardContent className="p-0">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-4">Company Name</th>
                  <th className="p-4">GST / PAN</th>
                  <th className="p-4">Submitted Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-semibold text-gray-900">Apex Industries</td>
                  <td className="p-4">24AAACA3421K1Z3</td>
                  <td className="p-4">Oct 12, 2024</td>
                  <td className="p-4 text-right space-x-2">
                    <Button variant="primary" className="px-3 py-1 text-xs bg-anvaya-emerald hover:bg-emerald-800 text-white"><CheckCircle className="w-3 h-3 mr-1" /> Approve</Button>
                    <Button variant="ghost" className="px-3 py-1 text-xs text-anvaya-rust hover:text-red-700">Reject</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {activeTab === 'locked' && (
        <Card>
          <CardContent className="p-0">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-4">Email</th>
                  <th className="p-4">Failed Attempts</th>
                  <th className="p-4">Locked Until</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-semibold text-gray-900">purchasing@acme.com</td>
                  <td className="p-4">12</td>
                  <td className="p-4 text-anvaya-rust font-bold">14:35 (In 12 mins)</td>
                  <td className="p-4 text-right">
                    <Button variant="outline" className="px-3 py-1 text-xs"><Unlock className="w-3 h-3 mr-1" /> Unlock Now</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
