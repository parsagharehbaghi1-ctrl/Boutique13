'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Sparkles, Truck, ShieldCheck, RefreshCw } from 'lucide-react'
import { ProductCard } from '@/components/shop/product-card'
import type { ParsedProduct } from '@/app/api/products/route'

const marqueeItems = [
  'کیفیت پارچه',
  'الگوی اختصاصی',
  'تولید محدود',
  'بوتیک ۱۳',
  'دست‌ساز',
  'بی‌زمان',
]

const homeCategories = [
  { name: 'مردانه', image: '/images/men.jpg', href: '/shop', desc: 'کالکشن مردانه' },
  { name: 'زنانه', image: '/images/woman.png', href: '/shop?category=accessories', desc: 'به‌زودی' },
  { name: 'اکسسوری', image: '/images/accesories.jpg', href: '/shop?category=accessories', desc: 'اکسسوری لوکس' },
  { name: 'کفش', image: '/images/products/shoes-sport.jpg', href: '/shop?category=shoes', desc: 'کفش و کتانی' },
]

const features = [
  { icon: Truck, title: 'ارسال سریع', desc: 'تا ۲۴ ساعت در تهران' },
  { icon: ShieldCheck, title: 'ضمانت اصالت', desc: 'کیفیت تضمین‌شده' },
  { icon: RefreshCw, title: 'بازگشت کالا', desc: 'تا ۷ روز' },
  { icon: Sparkles, title: 'تولید محدود', desc: 'منحصر به فرد' },
]

export default function HomePage() {
  const [featured, setFeatured] = useState<ParsedProduct[]>([])

  useEffect(() => {
    fetch('/api/products?featured=true')
      .then((r) => r.json())
      .then(setFeatured)
      .catch(console.error)
  }, [])

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/men-hero.jpg"
            alt="Boutique13"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 mb-6 animate-fade-up">
              <span className="h-2 w-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="text-sm text-[#D4AF37]">کالکشن جدید پاییز ۱۴۰۴</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.15] mb-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
              لوکس، دست‌ساز،
              <br />
              <span className="gold-text">بی‌زمان.</span>
            </h1>
            <p className="text-lg text-white/70 leading-8 mb-8 max-w-xl animate-fade-up" style={{ animationDelay: '200ms' }}>
              بوتیک ۱۳، جایی که کیفیت پارچه و الگوی اختصاصی به هم می‌رسند. هر قطعه با
              تولید محدود و وسواس فراوان برای شما ساخته می‌شود.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '300ms' }}>
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-7 py-4 text-sm font-bold text-black hover:bg-[#e9cc6e] transition-all hover:-translate-y-0.5"
              >
                مشاهده کالکشن
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-7 py-4 text-sm font-bold hover:bg-white/10 transition-all"
              >
                تماس با ما
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="border-y border-white/5 bg-secondary/30 py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className={`mx-6 text-sm font-semibold tracking-wide ${
                i % 4 === 3 ? 'text-[#D4AF37]' : 'text-muted-foreground'
              }`}
            >
              {item}
              <span className="mr-6 text-[#D4AF37]">•</span>
            </span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="glass rounded-2xl p-5 flex items-center gap-3 animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] shrink-0">
                <f.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{f.title}</h3>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm text-[#D4AF37] mb-2">دسته‌بندی‌ها</p>
            <h2 className="text-3xl sm:text-4xl font-bold">کاوش کالکشن‌ها</h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-[#D4AF37] transition-colors"
          >
            مشاهده همه
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {homeCategories.map((cat, i) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/5 animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 right-0 left-0 p-5">
                <p className="text-xs text-[#D4AF37] mb-1">{cat.desc}</p>
                <h3 className="text-2xl font-bold mb-2">{cat.name}</h3>
                <span className="inline-flex items-center gap-1 text-sm text-white/80 group-hover:text-[#D4AF37] transition-colors">
                  مشاهده
                  <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm text-[#D4AF37] mb-2">منتخب بوتیک</p>
            <h2 className="text-3xl sm:text-4xl font-bold">محصولات ویژه</h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-[#D4AF37] transition-colors"
          >
            همه محصولات
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        {featured.length === 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-2xl bg-secondary/40 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.slice(0, 4).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Brand story / CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative overflow-hidden rounded-3xl border border-[#D4AF37]/20 bg-gradient-to-l from-[#D4AF37]/10 via-secondary/30 to-transparent p-8 sm:p-12">
          <div className="max-w-2xl">
            <p className="text-sm text-[#D4AF37] mb-3">داستان بوتیک ۱۳</p>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
              هر قطعه، یک روایت از <span className="gold-text">وسواس و کیفیت</span>
            </h2>
            <p className="text-muted-foreground leading-8 mb-6">
              ما در بوتیک ۱۳ باور داریم که لباس فقط یک پوشش نیست، بلکه بیان هویت و
              سلیقه شماست. به همین دلیل هر قطعه با دقت وسواس‌گونه‌ای تولید می‌شود و
              در تیراژ محدود عرضه می‌گردد تا منحصر به فرد بماند.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3.5 text-sm font-bold text-black hover:bg-[#e9cc6e] transition-all hover:-translate-y-0.5"
            >
              کاوش کالکشن
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
