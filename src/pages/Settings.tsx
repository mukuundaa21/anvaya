import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Card, CardContent } from "../components/ui/Card";
import { ShieldAlert, CheckCircle, Upload } from "lucide-react";

export function SettingsProfile() {
  const [verificationStatus, setVerificationStatus] = useState<"not submitted" | "under review" | "verified" | "rejected">("under review");

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="font-serif text-3xl text-anvaya-navy uppercase tracking-widest mb-8">Account Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Verification & Profile */}
        <div className="md:col-span-1 space-y-6">
          <Card className={`border-t-4 ${verificationStatus === 'verified' ? 'border-t-anvaya-emerald' : verificationStatus === 'under review' ? 'border-t-anvaya-gold' : 'border-t-anvaya-rust'}`}>
            <CardContent className="p-6 text-center">
              {verificationStatus === 'verified' ? (
                <>
                  <CheckCircle className="w-12 h-12 text-anvaya-emerald mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 uppercase tracking-widest">Verified Business</h3>
                  <p className="text-xs text-gray-500 mt-2">Your GST and PAN details have been verified by Anvaya admins.</p>
                </>
              ) : verificationStatus === 'under review' ? (
                <>
                  <ShieldAlert className="w-12 h-12 text-anvaya-gold mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 uppercase tracking-widest">Under Review</h3>
                  <p className="text-xs text-gray-500 mt-2">Your documents are being reviewed. This usually takes 24 hours.</p>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-12 h-12 text-anvaya-rust mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 uppercase tracking-widest">Not Verified</h3>
                  <p className="text-xs text-gray-500 mt-2">Please submit your GST and PAN documents to participate in the exchange.</p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Forms */}
        <div className="md:col-span-2 space-y-8">
          <Card>
            <div className="border-b border-gray-100 p-4">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-anvaya-navy">Company Details</h3>
            </div>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input defaultValue="Global Textiles Ltd" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>GST Number</Label>
                  <Input defaultValue="27AADCG8501L1ZV" />
                </div>
                <div className="space-y-2">
                  <Label>PAN Number</Label>
                  <Input defaultValue="AADCG8501L" />
                </div>
              </div>
              <div className="pt-2">
                <Button variant="secondary" className="text-xs">Upload Verification Documents</Button>
              </div>
              <div className="pt-4 flex justify-end">
                <Button variant="primary">Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <div className="border-b border-gray-100 p-4">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-anvaya-navy">Security</h3>
            </div>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <Label>Confirm New Password</Label>
                <Input type="password" />
              </div>
              <div className="pt-4 flex justify-end">
                <Button variant="outline">Update Password</Button>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
