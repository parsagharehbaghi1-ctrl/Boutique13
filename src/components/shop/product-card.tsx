'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { useWishlistStore } from '@/lib/stores/wishlist-store'
import { useCartStore } from '@/lib/stores/cart-store'
import { formatToman, CATEGORY_LABELS } from '@/lib/format'
import type { ParsedProduct } from '@/app/api/products/route'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: ParsedProduct
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const toggleWish = useWishlistStore((s) => s.toggle)
  const hasWish = useWishlistStore((s) => s.has(product.id))
  const addItem = useCartStore((s) => s.addItem)
  const { toast } = useToast()

  const hasMultipleImages = product.images.length > 1
  const currentImage = hovered && hasMultipleImages ? product.images[1] : product.images[0]

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: product.colors[0]?.name || 'مشکی',
      size: product.sizes[0] || 'M',
      slug: product.slug,
    })
    toast({ title: 'به سبد خرید اضافه شد', description: product.name })
  }

  const handleWish = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const added = toggleWish({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      slug: product.slug,
    })
    toast({
      title: added ? 'به علاقه‌مندی اضافه شد' : 'از علاقه‌مندی حذف شد',
      description: product.name,
    })
  }

  return (
    <Link
      href={`/product/${product.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group block animate-fade-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-secondary/40 border border-white/5 transition-all duration-500 group-hover:border-[#D4AF37]/40 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] shine-on-hover">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
          <Image
            src={currentImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Discount badge */}
          {product.oldPrice && product.oldPrice > product.price && (
            <span className="absolute top-3 right-3 rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white">
              {Math.round((1 - product.price / product.oldPrice) * 100)}٪ تخفیف
            </span>
          )}

          {/* Wishlist button */}
          <button
            onClick={handleWish}
            aria-label="افزودن به علاقه‌مندی"
            className={cn(
              'absolute top-3 left-3 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition-all',
              hasWish
                ? 'bg-red-500 text-white animate-heart-beat'
                : 'bg-black/40 text-white hover:bg-[#D4AF37] hover:text-black'
            )}
          >
            <Heart className={cn('h-5 w-5', hasWish && 'fill-current')} />
          </button>

          {/* Quick add button - slides up on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleQuickAdd}
              className="w-full rounded-full bg-[#D4AF37] py-3 text-sm font-bold text-black hover:bg-[#e9cc6e] transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="h-4 w-4" />
              افزودن به سبد
            </button>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 px-1">
        <p className="text-xs text-muted-foreground mb-1">
          {CATEGORY_LABELS[product.category] || product.category}
        </p>
        <h3 className="font-semibold leading-7 line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-lg font-bold text-[#D4AF37] persian-num">
            {formatToman(product.price)}
          </span>
          {product.oldPrice && product.oldPrice > product.price && (
            <span className="text-sm text-muted-foreground line-through persian-num">
              {formatToman(product.oldPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
