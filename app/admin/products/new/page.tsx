"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NewProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    sizes: [] as string[],
    published: false,
    image: "" as string,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSizeToggle = (size: string) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handlePublishToggle = () => {
    setFormData((prev) => ({ ...prev, published: !prev.published }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setFormData((prev) => ({ ...prev, image: base64 }));
        setImagePreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          sizes: formData.sizes,
          image: formData.image,
          published: formData.published,
        }),
      });

      if (response.ok) {
        router.push("/admin/products");
      } else {
        console.error("Failed to create product");
      }
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Create New Product</h1>
        <p className="text-lg text-muted-foreground">
          Add a new product to your catalog
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Basic Information</h2>

          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Product Name
            </label>
            <Input
              id="name"
              name="name"
              placeholder="e.g., Silk Evening Gown"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your product..."
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="price" className="text-sm font-medium">
              Price (USD)
            </label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>
        </Card>

        {/* Sizes */}
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Available Sizes</h2>
          <div className="grid grid-cols-3 gap-3">
            {sizes.map((size) => (
              <div key={size} className="flex items-center space-x-2">
                <Checkbox
                  id={size}
                  checked={formData.sizes.includes(size)}
                  onCheckedChange={() => handleSizeToggle(size)}
                />
                <label htmlFor={size} className="text-sm cursor-pointer">
                  {size}
                </label>
              </div>
            ))}
          </div>
        </Card>

        {/* Image Upload */}
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Product Image</h2>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            {imagePreview ? (
              <div className="space-y-4">
                <div className="relative w-32 h-32 mx-auto">
                  <Image
                    src={imagePreview}
                    alt="Product preview"
                    fill
                    className="object-contain"
                  />
                </div>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  Change Image
                </Button>
              </div>
            ) : (
              <>
                <p className="text-muted-foreground mb-4">
                  Drag and drop your image here, or click to select
                </p>
                <Button 
                  variant="outline" 
                  type="button"
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  Choose Image
                </Button>
              </>
            )}
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              id="image-upload"
              onChange={handleImageChange}
            />
          </div>
        </Card>

        {/* Publishing */}
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Publishing</h2>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="published"
              checked={formData.published}
              onCheckedChange={handlePublishToggle}
            />
            <label htmlFor="published" className="text-sm cursor-pointer">
              Publish this product immediately
            </label>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button type="submit" size="lg" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Product"}
          </Button>
          <Link href="/admin/products">
            <Button variant="outline" size="lg">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
