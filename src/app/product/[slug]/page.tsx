'use client'

import { useEffect, useState, useRef, use } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag, Star, Check, ChevronLeft, Truck, ShieldCheck, RefreshCw } from 'lucide-react'
import { useCartStore } from '@/lib/stores/cart-store'
import { useWishlistStore } from '@/lib/stores/wishlist-store'
import { flyToCart } from '@/lib/fly-to-cart'
import { formatToman, CATEGORY_LABELS } from '@/lib/format'
import type { ParsedProduct } from '@/app/api/products/route'
import { useToast } from '@/hooks/use-toast'
import { ProductCard } from '@/components/shop/product-card'
import { cn } from '@/lib/utils'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default function ProductPage({ params }: PageProps) {
  const { slug } = use(params)
  const router = useRouter()
  const [product, setProduct] = useState<ParsedProduct | null>(null)
  const [related, setRelated] = useState<ParsedProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [zoomOrigin, setZoomOrigin] = useState<{ x: number; y: number } | null>(null)
  const [adding, setAdding] = useState(false)
  const [added, setAdded] = useState(false)
  const galleryRef = useRef<HTMLDivElement | null>(null)

  const addItemSilent = useCartStore((s) => s.addItemSilent)
  const openCart = useCartStore((s) => s.openCart)
  const toggleWish = useWishlistStore((s) => s.toggle)
  const hasWish = useWishlistStore((s) => (product ? s.has(product.id) : false))
  const { toast } = useToast()

  useEffect(() => {
    setLoading(true)
    fetch(`/api/products/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error('not found')
        return r.json()
      })
      .then((data) => {
        setProduct(data)
        setSelectedColor(data.colors[0]?.name || null)
        setSelectedSize(null)
        setSelectedImage(0)
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false))

    // fetch related
    fetch('/api/products')
      .then((r) => r.json())
      .then((data: ParsedProduct[]) => {
        setRelated(data.filter((p) => p.slug !== slug).slice(0, 4))
      })
      .catch(console.error)
  }, [slug])

  const handleAddToCart = async () => {
    if (!product) return
    if (!selectedColor) {
      toast({ title: '\u0631\u0646\u06af \u0631\u0627 \u0627\u0646\u062a\u062e\u0627\u0628 \u06a9\u0646\u06cc\u062f', variant: 'destructive' })
      return
    }
    if (!selectedSize) {
      toast({ title: '\u0633\u0627\u06cc\u0632 \u0631\u0627 \u0627\u0646\u062a\u062e\u0627\u0628 \u06a9\u0646\u06cc\u062f', variant: 'destructive' })
      return
    }
    if (adding) return

    setAdding(true)

    // Add to cart silently (without opening drawer yet)
    addItemSilent({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: selectedColor,
      size: selectedSize,
      slug: product.slug,
    })

    // Fly-to-cart animation: launch the gallery image toward the cart icon
    await flyToCart(product.images[selectedImage], galleryRef.current)

    // Open cart drawer after animation completes
    openCart()
    setAdding(false)
    setAdded(true)
    toast({ title: '\u0628\u0647 \u0633\u0628\u062f \u062e\u0631\u06cc\u062f \u0627\u0636\u0627\u0641\u0647 \u0634\u062f', description: product.name })
    setTimeout(() => setAdded(false), 1600)
  }

  const handleWish = () => {
    if (!product) return
    const addedNow = toggleWish({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      slug: product.slug,
    })
    toast({
      title: addedNow ? '\u0628\u0647 \u0639\u0644\u0627\u0642\u0647\u200c\u0645\u0646\u062f\u06cc \u0627\u0636\u0627\u0641\u0647 \u0634\u062f' : '\u0627\u0632 \u0639\u0644\u0627\u0642\u0647\u200c\u0645\u0646\u062f\u06cc \u062d\u0630\u0641 \u0634\u062f',
      description: product.name,
    })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomOrigin({ x, y })
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-10 w-10 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="text-6xl mb-4">\ud83d\ude15</div>
        <h1 className="text-2xl font-bold mb-2">\u0645\u062d\u0635\u0648\u0644 \u067e\u06cc\u062f\u0627 \u0646\u0634\u062f</h1>
        <p className="text-muted-foreground mb-6">\u0645\u062d\u0635\u0648\u0644 \u0645\u0648\u0631\u062f \u0646\u0638\u0631 \u0634\u0645\u0627 \u0648\u062c\u0648\u062f \u0646\u062f\u0627\u0631\u062f</p>
        <Link
          href="/shop"
          className="rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-bold text-black hover:bg-[#e9cc6e] transition-colors"
        >
          \u0628\u0627\u0632\u06af\u0634\u062a \u0628\u0647 \u0641\u0631\u0648\u0634\u06af\u0627\u0647
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-[#D4AF37]">\u062e\u0627\u0646\u0647</Link>
        <ChevronLeft className="h-4 w-4" />
        <Link href="/shop" className="hover:text-[#D4AF37]">\u0641\u0631\u0648\u0634\u06af\u0627\u0647</Link>
        <ChevronLeft className="h-4 w-4" />
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Gallery */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div
            ref={galleryRef}
            className="relative aspect-square overflow-hidden rounded-2xl bg-secondary cursor-zoom-in"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setZoomOrigin(null)}
          >
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              priority
              className="object-cover transition-transform duration-200"
              style={zoomOrigin ? { transform: 'scale(1.6)', transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%` } : undefined}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {product.images.length > 1 && (
            <div className="mt-4 flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    'relative h-24 w-20 overflow-hidden rounded-xl border-2 transition-all',
                    selectedImage === i ? 'border-[#D4AF37]' : 'border-transparent hover:border-white/20'
                  )}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <p className="text-sm text-[#D4AF37] tracking-widest mb-2">{product.brand}</p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-3">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-4 w-4',
                    i < Math.floor(product.rating) ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-muted-foreground'
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground persian-num">
              ({product.reviewCount.toLocaleString('fa-IR')} \u0646\u0638\u0631)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-[#D4AF37] persian-num">
              {formatToman(product.price)}
            </span>
            {product.oldPrice && product.oldPrice > product.price && (
              <span className="text-lg text-muted-foreground line-through persian-num">
                {formatToman(product.oldPrice)}
              </span>
            )}
          </div>

          <p className="text-muted-foreground leading-8 mb-8">{product.description}</p>

          {/* Sizes */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">\u0627\u0646\u062a\u062e\u0627\u0628 \u0633\u0627\u06cc\u0632</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    'h-12 min-w-12 px-4 rounded-xl border-2 text-sm font-bold transition-all',
                    selectedSize === size
                      ? 'bg-[#D4AF37] border-[#D4AF37] text-black scale-105'
                      : 'bg-transparent border-white/10 text-foreground hover:border-[#D4AF37]'
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="mb-8">
            <h3 className="font-semibold mb-3">\u0631\u0646\u06af</h3>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  aria-label={color.name}
                  className={cn(
                    'flex items-center gap-2 rounded-full border-2 px-3 py-2 transition-all',
                    selectedColor === color.name
                      ? 'border-[#D4AF37] scale-105'
                      : 'border-white/10 hover:border-white/30'
                  )}
                >
                  <span
                    className="h-7 w-7 rounded-full border border-white/20"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-sm">{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={adding}
              className={cn(
                'flex-1 h-14 rounded-full font-bold transition-all flex items-center justify-center gap-2',
                added
                  ? 'bg-green-500 text-white'
                  : adding
                    ? 'bg-[#D4AF37]/60 text-black/60 cursor-wait'
                    : 'bg-[#D4AF37] text-black hover:bg-[#e9cc6e] hover:-translate-y-0.5'
              )}
            >
              {added ? (
                <>
                  <Check className="h-5 w-5" />
                  \u0627\u0641\u0632\u0648\u062f\u0647 \u0634\u062f
                </>
              ) : adding ? (
                <>
                  <ShoppingBag className="h-5 w-5 animate-pulse" />
                  \u062f\u0631 \u062d\u0627\u0644 \u0627\u0641\u0632\u0648\u062f\u0646...
                </>
              ) : (
                <>
                  <ShoppingBag className="h-5 w-5" />
                  \u0627\u0641\u0632\u0648\u062f\u0646 \u0628\u0647 \u0633\u0628\u062f \u062e\u0631\u06cc\u062f
                </>
              )}
            </button>
            <button
              onClick={handleWish}
              aria-label="\u0627\u0641\u0632\u0648\u062f\u0646 \u0628\u0647 \u0639\u0644\u0627\u0642\u0647\u200c\u0645\u0646\u062f\u06cc"
              className={cn(
                'h-14 w-14 shrink-0 rounded-full border-2 flex items-center justify-center transition-all',
                hasWish
                  ? 'bg-red-500 border-red-500 text-white animate-heart-beat'
                  : 'bg-transparent border-white/10 hover:border-[#D4AF37]'
              )}
            >
              <Heart className={cn('h-6 w-6', hasWish && 'fill-current')} />
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/5">
            <div className="flex flex-col items-center text-center gap-1">
              <Truck className="h-6 w-6 text-[#D4AF37]" />
              <span className="text-xs text-muted-foreground">\u0627\u0631\u0633\u0627\u0644 \u0633\u0631\u06cc\u0639</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <ShieldCheck className="h-6 w-6 text-[#D4AF37]" />
              <span className="text-xs text-muted-foreground">\u0636\u0645\u0627\u0646\u062a \u0627\u0635\u0627\u0644\u062a</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <RefreshCw className="h-6 w-6 text-[#D4AF37]" />
              <span className="text-xs text-muted-foreground">\u0628\u0627\u0632\u06af\u0634\u062a \u06f7 \u0631\u0648\u0632\u0647</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-bold mb-8">\u0645\u062d\u0635\u0648\u0644\u0627\u062a \u0645\u0631\u062a\u0628\u0637</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
