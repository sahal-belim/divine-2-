"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { generateWhatsAppOrderUrl } from "@/lib/whatsapp";
import { formatPrice } from "@/lib/price";
import Link from "next/link";

interface ProductDetailsPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  // Sample product data
  const product = {
    id: params.id,
    name: "Silk Evening Gown",
    price: 299.99,
    description: "Luxurious silk gown with intricate embroidery",
    fullDescription:
      "Experience elegance with our signature silk evening gown. Crafted from premium Italian silk and adorned with delicate hand-embroidery, this timeless piece is designed for those who appreciate the finer details. Perfect for special occasions, this gown combines comfort with sophistication.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Emerald"],
    material: "100% Silk",
    care: "Dry clean only",
    inStock: true,
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    // Generate WhatsApp message URL using utility
    const whatsappUrl = generateWhatsAppOrderUrl({
      productName: product.name,
      size: selectedSize,
      quantity,
      price: product.price,
      productId: product.id,
    });

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto">
        {/* Back Link */}
        <Link href="/shop" className="text-primary hover:underline mb-8 inline-block">
          ← Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-muted rounded-lg aspect-square">
            <div className="text-center">
              <div className="text-6xl mb-4">👗</div>
              <p className="text-muted-foreground">Product image placeholder</p>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-2xl font-semibold text-primary">
                {formatPrice(product.price)}
              </p>
            </div>

            <p className="text-lg text-muted-foreground">
              {product.fullDescription}
            </p>

            {/* Product Info */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Material</p>
                <p className="font-semibold">{product.material}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Care</p>
                <p className="font-semibold">{product.care}</p>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-4">
              {/* Size Selection */}
              <div>
                <label className="text-sm font-medium block mb-2">
                  Select Size
                </label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity */}
              <div>
                <label className="text-sm font-medium block mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    −
                  </Button>
                  <span className="w-12 text-center font-semibold">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Total */}
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  Total Price
                </p>
                <p className="text-2xl font-bold text-primary">
                  {formatPrice(product.price * quantity)}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-8 border-t border-border">
              <Button
                size="lg"
                className="w-full"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                Order via WhatsApp
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                Add to Wishlist
              </Button>
            </div>

            {/* Stock Status */}
            {product.inStock && (
              <div className="text-sm text-green-600">✓ In Stock</div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20 pt-12 border-t border-border">
          <h2 className="text-3xl font-bold mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-4">
                <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-4xl">👗</span>
                </div>
                <h3 className="font-semibold mb-2">Related Product {i}</h3>
                <p className="text-primary font-semibold">{formatPrice(199.99)}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
