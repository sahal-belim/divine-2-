"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b-4 border-accent">
      <div className="px-4">
        <div className="container mx-auto">
          <nav className="h-20 flex items-center justify-between gap-6">
            {/* Left Side - Logo (Height 56px) */}
            <Link href="/" className="flex-shrink-0 h-14 flex items-center">
              <Image
                src="/divine-logo.png"
                alt="Divine Clothing Logo"
                width={120}
                height={48}
                style={{ width: 'auto', height: '100%' }}
                className="object-contain"
                loading="eager"
              />
            </Link>

            {/* Center Navigation */}
            <div className="flex items-center gap-6 md:gap-10 flex-1 justify-center">
              <Link
                href="/"
                className="text-sm md:text-base font-semibold text-foreground hover:text-primary transition-colors whitespace-nowrap"
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="text-sm md:text-base font-semibold text-foreground hover:text-primary transition-colors whitespace-nowrap"
              >
                Collection
              </Link>
              <Link
                href="/shop"
                className="text-sm md:text-base font-semibold text-foreground hover:text-primary transition-colors whitespace-nowrap"
              >
                Shop
              </Link>
              <Link
                href="/#contact"
                className="text-sm md:text-base font-semibold text-foreground hover:text-primary transition-colors whitespace-nowrap"
              >
                Contact
              </Link>
            </div>

            {/* Right Side - Sign In and WhatsApp */}
            <div className="flex items-center gap-3 md:gap-6 flex-shrink-0">
              <Link href="/login">
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Sign In
                </Button>
              </Link>

              {/* WhatsApp Icon */}
              <a
                href="https://chat.whatsapp.com/LhG9gNXYdbwHSQJwUYtcRB"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-secondary transition-colors"
                title="Join our WhatsApp Community"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-1.65 0-3.273.652-4.462 1.82-1.19 1.17-1.846 2.788-1.846 4.448 0 1.67.656 3.289 1.846 4.458 1.19 1.17 2.812 1.82 4.462 1.82h.004c1.65 0 3.273-.652 4.462-1.82 1.19-1.169 1.846-2.788 1.846-4.458 0-1.67-.656-3.278-1.846-4.448-1.189-1.17-2.812-1.82-4.462-1.82M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0" />
                </svg>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
