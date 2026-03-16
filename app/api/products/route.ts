import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for server (will be reset on redeploy)
let serverProducts: any[] = [];

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sizes: string[];
  image?: string;
  published: boolean;
  createdAt: string;
}

export async function GET() {
  try {
    return NextResponse.json({ success: true, data: serverProducts });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price, sizes, image, published } = body;

    if (!name || !description || !price) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name,
      description,
      price: parseFloat(price),
      sizes: sizes || [],
      image: image || undefined,
      published: published || false,
      createdAt: new Date().toISOString(),
    };

    serverProducts.push(newProduct);

    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
