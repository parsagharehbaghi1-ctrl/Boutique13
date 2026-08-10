import { db } from '@/lib/db'
import { parseProduct } from '../route'
import { NextResponse } from 'next/server'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const product = await db.product.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(parseProduct(product))
  } catch (error) {
    console.error('Failed to fetch product:', error)
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}
