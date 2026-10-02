import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Card, CardContent } from "../components/ui/Card";

export function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex-grow flex items-center justify-center bg-anvaya-ivory py-20 px-4 min-h-screen">
      <Card className="w-full max-w-md shadow-xl border-gray-200">
        <div className="bg-anvaya-navy p-6 text-center border-b-4 border-anvaya-gold">
          <h1 className="font-serif text-3xl text-white">RECOVER ACCOUNT</h1>
        </div>
        <CardContent className="p-8">
          {submitted ? (
            <div className="text-center space-y-4">
              <p className="text-gray-600">If an account exists for that email, we have sent password reset instructions.</p>
              <Button variant="outline" className="w-full" onClick={() => window.location.href = '/login'}>Return to Login</Button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input type="email" required placeholder="you@company.com" />
              </div>
              <Button type="submit" className="w-full" variant="primary">Send Reset Link</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function ResetPassword() {
  return (
    <div className="flex-grow flex items-center justify-center bg-anvaya-ivory py-20 px-4 min-h-screen">
      <Card className="w-full max-w-md shadow-xl border-gray-200">
        <div className="bg-anvaya-navy p-6 text-center border-b-4 border-anvaya-gold">
          <h1 className="font-serif text-3xl text-white">SET NEW PASSWORD</h1>
        </div>
        <CardContent className="p-8">
          <form className="space-y-6">
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input type="password" required />
            </div>
            <div className="space-y-2">
              <Label>Confirm Password</Label>
              <Input type="password" required />
            </div>
            <Button type="submit" className="w-full" variant="primary">Update Password</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
