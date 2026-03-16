"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Admin code for registration (in production, use proper validation)
  const VALID_ADMIN_CODE = "DIVINE2024";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate admin code
      if (adminCode !== VALID_ADMIN_CODE) {
        setError("Invalid admin code. Contact the system administrator.");
        setLoading(false);
        return;
      }

      // Validate passwords match
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
      }

      // Validate password strength
      if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        setLoading(false);
        return;
      }

      // Store admin account (in production, use a database)
      const admins = JSON.parse(localStorage.getItem("admins") || "[]");
      
      // Check if email already exists
      if (admins.some((admin: any) => admin.email === email)) {
        setError("This email is already registered as an admin.");
        setLoading(false);
        return;
      }

      // Add new admin
      admins.push({
        email,
        password, // In production, hash this!
        createdAt: new Date().toISOString()
      });

      localStorage.setItem("admins", JSON.stringify(admins));
      
      // Auto-login after signup
      localStorage.setItem("admin_token", "demo-token-" + Date.now());
      router.push("/admin");
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-128px)] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <div className="p-8 space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Admin Sign Up</h1>
            <p className="text-sm text-muted-foreground">
              Create a new admin account for Divine Clothing
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@divineclothing.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="adminCode" className="text-sm font-medium">
                Admin Code
              </label>
              <Input
                id="adminCode"
                name="adminCode"
                type="password"
                placeholder="Enter admin code"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Contact your system administrator for the admin code
              </p>
            </div>

            {error && <div className="text-sm text-destructive">{error}</div>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          <div className="space-y-3 text-sm text-center">
            <p>Already have an admin account?</p>
            <Link
              href="/login"
              className="block text-primary hover:underline font-medium"
            >
              Sign In Here
            </Link>
          </div>

          <Link
            href="/"
            className="block text-center text-sm text-muted-foreground hover:text-primary hover:underline"
          >
            Back to Home
          </Link>
        </div>
      </Card>
    </div>
  );
}
