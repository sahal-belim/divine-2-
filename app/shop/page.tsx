"use client";

import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ShopPage() {
  const [sortBy, setSortBy] = useState("newest");

  // Sample products
  const products = [
    {
      id: "1",
      name: "Silk Evening Gown",
      description: "Luxurious silk gown with intricate embroidery",
      price: 299.99,
    },
    {
      id: "2",
      name: "Cashmere Sweater",
      description: "Premium cashmere sweater in neutral tones",
      price: 179.99,
    },
    {
      id: "3",
      name: "Linen Blouse",
      description: "Breathable linen blouse perfect for summer",
      price: 89.99,
    },
    {
      id: "4",
      name: "Wool Trousers",
      description: "Tailored wool trousers with perfect fit",
      price: 149.99,
    },
    {
      id: "5",
      name: "Cotton Dress",
      description: "Elegant cotton dress with classic design",
      price: 119.99,
    },
    {
      id: "6",
      name: "Silk Scarf",
      description: "Luxury silk scarf in vibrant colors",
      price: 59.99,
    },
  ];

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Shop Our Collection</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Browse our curated selection of luxury clothing pieces
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 p-6 bg-muted/30 rounded-lg">
          <div className="flex gap-2">
            <Button variant="outline">All</Button>
            <Button variant="ghost">Dresses</Button>
            <Button variant="ghost">Tops</Button>
            <Button variant="ghost">Bottoms</Button>
            <Button variant="ghost">Accessories</Button>
          </div>

          <div className="w-full md:w-48">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center">
          <Button variant="outline" size="lg">
            Load More Products
          </Button>
        </div>
      </div>
    </div>
  );
}
