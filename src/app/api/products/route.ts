import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export interface ParsedProduct {
  id: string
  name: string
  slug: string
  price: number
  oldPrice: number | null
  category: string
  description: string
  images: string[]
  sizes: string[]
  colors: { name: string; hex: string }[]
  brand: string
  rating: number
  reviewCount: number
  isFeatured: boolean
  inStock: boolean
}

export function parseProduct(p: {
  id: string
  name: string
  slug: string
  price: number
  oldPrice: number | null
  category: string
  description: string
  images: string
  sizes: string
  colors: string
  brand: string
  rating: number
  reviewCount: number
  isFeatured: boolean
  inStock: boolean
}): ParsedProduct {
  return {
    ...p,
    images: JSON.parse(p.images),
    sizes: JSON.parse(p.sizes),
    colors: JSON.parse(p.colors),
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')

    const where: { category?: string; isFeatured?: boolean } = {}
    if (category && category !== 'all') where.category = category
    if (featured === 'true') where.isFeatured = true

    const products = await db.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(products.map(parseProduct))
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}
