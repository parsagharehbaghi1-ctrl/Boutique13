'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react'
import { useCartStore } from '@/lib/stores/cart-store'
import { useAuthStore } from '@/lib/stores/auth-store'
import { formatToman } from '@/lib/format'
import { useToast } from '@/hooks/use-toast'

export default function CartPage() {
  const router = useRouter()
  const { items, updateQty, removeItem, getTotal, clearCart, hydrated } = useCartStore()
  const { isAuthenticated, hydrated: authHydrated } = useAuthStore()
  const { toast } = useToast()

  const total = getTotal()

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
          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-2">سبد خرید شما خالی است</h1>
        <p className="text-muted-foreground mb-8">
          هنوز محصولی به سبد خرید اضافه نکرده‌اید. کالکشن ما را کاوش کنید!
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3.5 text-sm font-bold text-black hover:bg-[#e9cc6e] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          شروع خرید
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">سبد خرید</h1>
        <button
          onClick={() => {
            clearCart()
            toast({ title: 'سبد خرید خالی شد' })
          }}
          className="text-sm text-muted-foreground hover:text-red-400 transition-colors"
        >
          خالی کردن سبد
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, index) => (
            <div
              key={`${item.id}-${item.color}-${item.size}-${index}`}
              className="flex gap-4 rounded-2xl bg-secondary/40 border border-white/5 p-4"
            >
              <Link
                href={`/product/${item.slug}`}
                className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-secondary"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <Link
                    href={`/product/${item.slug}`}
                    className="font-semibold leading-7 line-clamp-1 hover:text-[#D4AF37] transition-colors"
                  >
                    {item.name}
                  </Link>
                  <button
                    onClick={() => {
                      removeItem(index)
                      toast({ title: 'حذف شد', description: item.name })
                    }}
                    aria-label="حذف"
                    className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-red-500/10 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {item.color} - سایز {item.size}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(index, -1)}
                      aria-label="کاهش"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary hover:bg-[#D4AF37] hover:text-black transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-semibold persian-num">
                      {item.qty.toLocaleString('fa-IR')}
                    </span>
                    <button
                      onClick={() => updateQty(index, 1)}
                      aria-label="افزایش"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary hover:bg-[#D4AF37] hover:text-black transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="font-bold text-[#D4AF37] persian-num">
                    {formatToman(item.price * item.qty)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[#D4AF37] transition-colors mt-2"
          >
            <ArrowLeft className="h-4 w-4" />
            ادامه خرید
          </Link>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl bg-secondary/40 border border-white/5 p-6 lg:sticky lg:top-28">
            <h2 className="text-lg font-bold mb-4">خلاصه سفارش</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">تعداد کالا</span>
                <span className="persian-num">
                  {items.reduce((s, i) => s + i.qty, 0).toLocaleString('fa-IR')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">جمع کالاها</span>
                <span className="persian-num">{formatToman(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">هزینه ارسال</span>
                <span className="text-green-400">رایگان</span>
              </div>
            </div>
            <div className="my-4 border-t border-white/10" />
            <div className="flex justify-between items-center mb-6">
              <span className="font-semibold">مبلغ قابل پرداخت</span>
              <span className="text-xl font-bold text-[#D4AF37] persian-num">
                {formatToman(total)}
              </span>
            </div>
            <button
              onClick={() => {
                // Auth gate: if not logged in -> go to login/signup, then back to checkout
                if (!authHydrated) {
                  // wait for auth to hydrate to avoid wrong redirect
                  toast({ title: 'کمی صبر کنید...' })
                  return
                }
                if (!isAuthenticated) {
                  toast({
                    title: 'برای ادامه باید وارد شوید',
                    description: 'به صفحه ورود منتقل می‌شوید',
                  })
                  router.push('/login?redirect=/checkout')
                  return
                }
                // Authed -> go straight to checkout
                router.push('/checkout')
              }}
              className="w-full rounded-full bg-[#D4AF37] py-3.5 text-sm font-bold text-black hover:bg-[#e9cc6e] transition-colors"
            >
              تسویه حساب
            </button>
            {!isAuthenticated && authHydrated && (
              <p className="text-xs text-muted-foreground text-center mt-3">
                برای تسویه حساب ابتدا وارد حساب کاربری خود شوید
              </p>
            )}
            {isAuthenticated && authHydrated && (
              <p className="text-xs text-muted-foreground text-center mt-3">
                پرداخت در محل امکان‌پذیر است
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
