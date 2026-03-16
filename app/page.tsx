import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { ContactForm } from "@/components/contact-form";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  // Sample products for display
  const featuredProducts = [
    {
      id: "1",
      name: "Silk Evening Gown",
      description: "Luxurious silk with intricate embroidery",
      price: 299.99,
    },
    {
      id: "2",
      name: "Cashmere Sweater",
      description: "Premium cashmere in neutral tones",
      price: 179.99,
    },
    {
      id: "3",
      name: "Linen Blouse",
      description: "Breathable linen perfect for summer",
      price: 89.99,
    },
    {
      id: "4",
      name: "Wool Trousers",
      description: "Tailored wool with perfect fit",
      price: 149.99,
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section with Storefront Image */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/divine-storefront.jpg"
          alt="Divine Clothing Storefront"
          fill
          className="object-cover"
          priority
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 container mx-auto px-4 text-center flex flex-col items-center justify-center h-full">
          <h1 style={{ fontFamily: 'var(--font-playfair)' }} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 text-white text-pretty">
            Divine Clothing
          </h1>
          <p className="text-base md:text-2xl lg:text-3xl text-white max-w-3xl mx-auto mb-8 text-pretty font-light">
            Premium fashion crafted to elevate your style with confidence and class.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/shop">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold">
                Shop Now
              </Button>
            </Link>
            <Link href="#about">
              <Button size="lg" variant="outline" className="text-white border-2 border-white hover:bg-white hover:text-primary font-semibold transition-all">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Collection</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our handpicked selection of luxury pieces
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/shop">
              <Button variant="outline" size="lg">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-5xl font-bold text-center mb-16">About Divine Clothing</h2>
          
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* Left: Store Images */}
            <div className="w-full md:w-1/2 flex-shrink-0">
              <Image
                src="/divine-collage.jpg"
                alt="Divine Clothing Store"
                width={500}
                height={400}
                className="rounded-lg shadow-lg object-cover w-full h-auto"
              />
            </div>

            {/* Right: Text Content */}
            <div className="w-full md:w-1/2 space-y-6">
              <p className="text-lg text-foreground leading-relaxed">
                We believe that fashion should be a reflection of your authentic self. Each piece in our collection is carefully curated and designed to embody elegance, comfort, and sustainability.
              </p>
              <p className="text-lg text-foreground leading-relaxed">
                Our commitment to quality means every stitch, every fabric, and every detail is chosen with intention. We work with premium materials and ethical manufacturing practices.
              </p>
              <p className="text-lg text-foreground leading-relaxed">
                At Divine Clothing, style meets sophistication. Our brand is built on the belief that fashion should feel as premium as it looks. With carefully curated collections of shirts, T-shirts, jeans, and essentials, we focus on delivering quality craftsmanship, modern fits, and timeless design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-lg text-muted-foreground">
              Have questions? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">WhatsApp</h3>
                <p className="text-muted-foreground">
                  +91 9722220098
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Visit Us</h3>
                <p className="text-muted-foreground">
                  Shelarsha Chock
                  <br />
                  Near Dr. Lakhani Hospital
                  <br />
                  Bhavnagar
                </p>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
