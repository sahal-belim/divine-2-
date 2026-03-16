import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/lib/price";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

export function ProductCard({
  id,
  name,
  description,
  price,
  imageUrl,
}: ProductCardProps) {
  return (
    <Link href={`/product/${id}`}>
      <div className="group cursor-pointer">
        {/* Image Container */}
        <div className="relative w-full aspect-square bg-muted overflow-hidden rounded-sm">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
              <span className="text-muted-foreground text-sm">No image</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="pt-4 space-y-2">
          <h3 className="font-semibold text-foreground line-clamp-2 text-sm group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {description}
          </p>

          {/* Price */}
          <div className="pt-3">
            <p className="text-base font-bold text-primary">
              {formatPrice(price)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
