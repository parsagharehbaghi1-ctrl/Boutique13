'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { ProductCard } from '@/components/shop/product-card'
import { CATEGORIES } from '@/lib/format'
import type { ParsedProduct } from '@/app/api/products/route'
import { cn } from '@/lib/utils'

const sortOptions = [
  { id: 'newest', label: 'جدیدترین' },
  { id: 'price-asc', label: 'ارزان‌ترین' },
  { id: 'price-desc', label: 'گران‌ترین' },
  { id: 'rating', label: 'محبوب‌ترین' },
]

function ShopContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') || 'all'

  const [products, setProducts] = useState<ParsedProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState(initialCategory)
  const [sort, setSort] = useState('newest')

  useEffect(() => {
    setCategory(searchParams.get('category') || 'all')
  }, [searchParams])

  useEffect(() => {
    setLoading(true)
    fetch('/api/products')
      .then((r) => r.json())
      .then((data: ParsedProduct[]) => {
        let filtered = data
        if (category !== 'all') {
          filtered = filtered.filter((p) => p.category === category)
        }
        // sort
        switch (sort) {
          case 'price-asc':
            filtered = [...filtered].sort((a, b) => a.price - b.price)
            break
          case 'price-desc':
            filtered = [...filtered].sort((a, b) => b.price - a.price)
            break
          case 'rating':
            filtered = [...filtered].sort((a, b) => b.rating - a.rating)
            break
          default:
            break
        }
        setProducts(filtered)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [category, sort])

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/men-hero.jpg"
          alt="کالکشن مردانه"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative text-center px-4">
          <p className="text-sm text-[#D4AF37] mb-3 tracking-widest">BOUTIQUE13 COLLECTION</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3">کالکشن مردانه</h1>
          <p className="text-white/70 max-w-xl mx-auto">
            تیشرت، شلوار، کفش و اکسسوری — دست‌ساز و بی‌زمان
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={cn(
                  'rounded-full px-5 py-2 text-sm font-medium border transition-all',
                  category === c.id
                    ? 'bg-[#D4AF37] border-[#D4AF37] text-black'
                    : 'bg-transparent border-white/10 text-muted-foreground hover:border-[#D4AF37] hover:text-white'
                )}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">مرتب‌سازی:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-full bg-secondary border border-white/10 px-4 py-2 text-sm outline-none focus:border-[#D4AF37] cursor-pointer"
            >
              {sortOptions.map((o) => (
                <option key={o.id} value={o.id} className="bg-[#141414]">
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          {loading ? 'در حال بارگذاری...' : `${products.length} محصول`}
        </p>

        {/* Products grid */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i}>
                <div className="aspect-[3/4] rounded-2xl bg-secondary/40 animate-pulse" />
                <div className="h-4 bg-secondary/40 rounded mt-3 animate-pulse" />
                <div className="h-4 w-2/3 bg-secondary/40 rounded mt-2 animate-pulse" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center">
            <div className="text-5xl mb-4">😕</div>
            <h3 className="text-xl font-semibold mb-2">محصولی پیدا نشد</h3>
            <p className="text-muted-foreground">در این دسته فعلاً محصولی وجود ندارد</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><div className="h-10 w-10 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" /></div>}>
      <ShopContent />
    </Suspense>
  )
}
