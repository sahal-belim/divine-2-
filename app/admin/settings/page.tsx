"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    whatsappNumber: "+1 (555) 000-0000",
    email: "info@divineclothing.com",
    phone: "+1 (555) 000-0000",
    address: "123 Fashion Street, New York, NY 10001",
  });

  const [saved, setSaved] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    // TODO: Save to database
    console.log("Settings saved:", settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-lg text-muted-foreground">
          Manage your store configuration
        </p>
      </div>

      {/* WhatsApp Configuration */}
      <Card className="p-6 space-y-6">
        <h2 className="text-xl font-semibold">WhatsApp Integration</h2>

        <div className="space-y-2">
          <label htmlFor="whatsappNumber" className="text-sm font-medium">
            WhatsApp Business Number
          </label>
          <Input
            id="whatsappNumber"
            name="whatsappNumber"
            placeholder="+1 (555) 000-0000"
            value={settings.whatsappNumber}
            onChange={handleInputChange}
          />
          <p className="text-xs text-muted-foreground">
            This number will receive order inquiries from customers
          </p>
        </div>
      </Card>

      {/* Contact Information */}
      <Card className="p-6 space-y-6">
        <h2 className="text-xl font-semibold">Contact Information</h2>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email Address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="info@divineclothing.com"
            value={settings.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone Number
          </label>
          <Input
            id="phone"
            name="phone"
            placeholder="+1 (555) 000-0000"
            value={settings.phone}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="address" className="text-sm font-medium">
            Physical Address
          </label>
          <Input
            id="address"
            name="address"
            placeholder="123 Fashion Street, New York, NY 10001"
            value={settings.address}
            onChange={handleInputChange}
          />
        </div>
      </Card>

      {/* Additional Settings */}
      <Card className="p-6 space-y-6">
        <h2 className="text-xl font-semibold">Security</h2>

        <div>
          <h3 className="font-semibold mb-4">Change Password</h3>
          <Button variant="outline">Change Password</Button>
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="font-semibold mb-4 text-destructive">Danger Zone</h3>
          <Button variant="destructive" disabled>
            Delete All Data
          </Button>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex gap-4">
        <Button size="lg" onClick={handleSave}>
          Save Settings
        </Button>
        {saved && <span className="text-green-600 flex items-center">✓ Saved</span>}
      </div>
    </div>
  );
}
