import { db } from '@/lib/db'
import { parseProduct } from '../products/route'
import { normalizePersian } from '@/lib/format'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const q = normalizePersian(searchParams.get('q') || '')

    if (!q) {
      return NextResponse.json([])
    }

    const products = await db.product.findMany()
    const parsed = products.map(parseProduct)

    const results = parsed.filter((p) => {
      const haystack = normalizePersian(
        `${p.name} ${p.category} ${p.description} ${p.colors.map((c) => c.name).join(' ')} ${p.sizes.join(' ')}`
      )
      return haystack.includes(q)
    })

    return NextResponse.json(results)
  } catch (error) {
    console.error('Search failed:', error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}
