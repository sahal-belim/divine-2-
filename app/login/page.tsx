"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const DEMO_EMAIL = "admin@divineclothing.com";
const DEMO_PASSWORD = "admin123";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Simple validation - in production use proper auth
      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        // Store token in localStorage (for demo only)
        localStorage.setItem("admin_token", "demo-token-" + Date.now());
        router.push("/admin");
      } else {
        setError("Invalid credentials. Try admin@divineclothing.com / admin123");
      }
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
            <h1 className="text-2xl font-bold">Admin Sign In</h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to access the admin panel
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

            {error && <div className="text-sm text-destructive">{error}</div>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="space-y-3">
            <div className="space-y-2 text-sm text-center text-muted-foreground">
              <p>Demo Credentials:</p>
              <p className="font-mono text-xs">admin@divineclothing.com</p>
              <p className="font-mono text-xs">admin123</p>
            </div>

            <div className="text-center text-sm">
              <p className="text-muted-foreground mb-2">Don't have an admin account?</p>
              <Link
                href="/signup"
                className="text-primary hover:underline font-medium"
              >
                Create Admin Account
              </Link>
            </div>
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
