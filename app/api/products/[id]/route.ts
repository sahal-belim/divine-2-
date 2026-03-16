import { NextRequest, NextResponse } from 'next/server';

// Reference to server storage (same as in products/route.ts)
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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const product = serverProducts.find(p => p.id === id);

    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const productIndex = serverProducts.findIndex(p => p.id === id);

    if (productIndex === -1) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    serverProducts[productIndex] = { ...serverProducts[productIndex], ...body };

    return NextResponse.json({ success: true, data: serverProducts[productIndex] });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const originalLength = serverProducts.length;
    serverProducts = serverProducts.filter(p => p.id !== id);

    if (serverProducts.length === originalLength) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete product' }, { status: 500 });
  }
}
