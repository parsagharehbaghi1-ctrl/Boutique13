'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react'
import { useWishlistStore } from '@/lib/stores/wishlist-store'
import { useCartStore } from '@/lib/stores/cart-store'
import { formatToman } from '@/lib/format'
import { useToast } from '@/hooks/use-toast'

export default function WishlistPage() {
  const { items, remove, hydrated } = useWishlistStore()
  const addItem = useCartStore((s) => s.addItem)
  const { toast } = useToast()

  if (!hydrated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-10 w-10 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-secondary">
          <Heart className="h-12 w-12 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-2">علاقه‌مندی‌های شما خالی است</h1>
        <p className="text-muted-foreground mb-8">
          محصولاتی که دوست دارید را به اینجا اضافه کنید تا بعداً راحت‌تر پیداشان کنید
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3.5 text-sm font-bold text-black hover:bg-[#e9cc6e] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          کاوش محصولات
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">علاقه‌مندی‌ها</h1>
        <span className="text-sm text-muted-foreground persian-num">
          {items.length.toLocaleString('fa-IR')} مورد
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="group rounded-2xl bg-secondary/40 border border-white/5 overflow-hidden"
          >
            <Link
              href={`/product/${item.slug}`}
              className="relative aspect-[3/4] block overflow-hidden bg-secondary"
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </Link>
            <div className="p-4">
              <Link
                href={`/product/${item.slug}`}
                className="font-semibold leading-7 line-clamp-1 hover:text-[#D4AF37] transition-colors"
              >
                {item.name}
              </Link>
              <p className="text-lg font-bold text-[#D4AF37] mt-1 persian-num">
                {formatToman(item.price)}
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => {
                    addItem({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      image: item.image,
                      color: 'مشکی',
                      size: 'M',
                      slug: item.slug,
                    })
                    toast({ title: 'به سبد خرید اضافه شد', description: item.name })
                  }}
                  className="flex-1 rounded-full bg-[#D4AF37] py-2.5 text-sm font-bold text-black hover:bg-[#e9cc6e] transition-colors flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="h-4 w-4" />
                  افزودن به سبد
                </button>
                <button
                  onClick={() => {
                    remove(item.id)
                    toast({ title: 'از علاقه‌مندی حذف شد', description: item.name })
                  }}
                  aria-label="حذف"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:bg-red-500/10 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
