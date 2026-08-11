'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, MapPin, User, Phone, Check, CreditCard, Truck, ShieldCheck, Loader2 } from 'lucide-react'
import { useCartStore } from '@/lib/stores/cart-store'
import { useAuthStore } from '@/lib/stores/auth-store'
import { formatToman } from '@/lib/format'
import { useToast } from '@/hooks/use-toast'

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { items, getTotal, clearCart, hydrated: cartHydrated } = useCartStore()
  const { user, isAuthenticated, hydrated: authHydrated } = useAuthStore()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState<{ orderNo: string } | null>(null)

  // Protect route: if not authenticated -> redirect to /login?redirect=/checkout
  useEffect(() => {
    if (!authHydrated) return
    if (!isAuthenticated) {
      router.replace('/login?redirect=/checkout')
    }
  }, [authHydrated, isAuthenticated, router])

  // Pre-fill form with authed user info
  useEffect(() => {
    if (user) {
      setName((prev) => prev || user.name)
      setPhone((prev) => prev || user.phone)
    }
  }, [user])

  const total = getTotal()
  const itemCount = items.reduce((s, i) => s + i.qty, 0)

  // Loading state while auth hydrates
  if (!authHydrated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-10 w-10 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Not authed — redirecting effect will fire; show fallback
  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 text-center">
        <div>
          <p className="text-muted-foreground mb-4">در حال انتقال به صفحه ورود...</p>
          <Link
            href="/login?redirect=/checkout"
            className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-bold text-black"
          >
            ورود / ثبت‌نام
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    )
  }

  // Empty cart guard
  if (cartHydrated && items.length === 0 && !done) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-2">سبد خرید خالی است</h1>
        <p className="text-muted-foreground mb-8">برای تسویه حساب ابتدا محصولی به سبد اضافه کنید.</p>
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

  // Success screen
  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-500/10">
          <Check className="h-12 w-12 text-green-400" />
        </div>
        <h1 className="text-3xl font-bold mb-2">سفارش شما ثبت شد! 🎉</h1>
        <p className="text-muted-foreground mb-2">کد پیگیری سفارش:</p>
        <p className="text-2xl font-bold text-[#D4AF37] mb-8 persian-num" dir="ltr">
          {done.orderNo}
        </p>
        <p className="text-muted-foreground mb-8">
          به‌زودی با شما تماس می‌گیریم تا روند ارسال هماهنگ شود. پرداخت در محل انجام خواهد شد.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3.5 text-sm font-bold text-black hover:bg-[#e9cc6e] transition-colors"
          >
            مشاهده در حساب کاربری
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-7 py-3.5 text-sm font-bold hover:bg-secondary transition-colors"
          >
            ادامه خرید
          </Link>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      toast({ title: 'نام تحویل‌گیرنده را وارد کنید', variant: 'destructive' })
      return
    }
    if (!/^09\d{9}$/.test(phone)) {
      toast({ title: 'شماره موبایل معتبر نیست', variant: 'destructive' })
      return
    }
    if (!address.trim() || address.trim().length < 10) {
      toast({ title: 'آدرس کامل را وارد کنید', variant: 'destructive' })
      return
    }
    if (!city.trim()) {
      toast({ title: 'شهر را وارد کنید', variant: 'destructive' })
      return
    }

    setSubmitting(true)
    try {
      const fullAddress = `${city.trim()} - ${address.trim()}${postalCode ? ` (کدپستی: ${postalCode})` : ''}${notes ? ` - یادداشت: ${notes}` : ''}`
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: name.trim(),
          userPhone: phone.trim(),
          items,
          total,
          address: fullAddress,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'خطا در ثبت سفارش')
      }
      setDone({ orderNo: data.orderNo })
      clearCart()
      toast({ title: 'سفارش با موفقیت ثبت شد! 🎉' })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      toast({
        title: 'خطا در ثبت سفارش',
        description: err instanceof Error ? err.message : 'دوباره تلاش کنید',
        variant: 'destructive',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/cart" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1">
          <ArrowRight className="h-4 w-4" />
          سبد خرید
        </Link>
        <span className="text-white/20">/</span>
        <span className="text-foreground">تسویه حساب</span>
      </div>

      <h1 className="text-3xl font-bold mb-8">تسویه حساب</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recipient */}
          <section className="rounded-2xl bg-secondary/40 border border-white/5 p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-[#D4AF37]" />
              اطلاعات تحویل‌گیرنده
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">نام و نام خانوادگی *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثلاً علی رضایی"
                  className="w-full rounded-xl bg-background border border-white/10 px-4 py-3 text-sm outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">شماره موبایل *</label>
                <div className="relative">
                  <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="tel"
                    dir="ltr"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="09xxxxxxxxx"
                    className="w-full rounded-xl bg-background border border-white/10 pr-10 pl-4 py-3 text-sm outline-none focus:border-[#D4AF37] transition-colors text-right"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Address */}
          <section className="rounded-2xl bg-secondary/40 border border-white/5 p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#D4AF37]" />
              آدرس ارسال
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">شهر *</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="مثلاً تهران"
                    className="w-full rounded-xl bg-background border border-white/10 px-4 py-3 text-sm outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">کد پستی</label>
                  <input
                    type="text"
                    dir="ltr"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="کد پستی ۱۰ رقمی"
                    className="w-full rounded-xl bg-background border border-white/10 px-4 py-3 text-sm outline-none focus:border-[#D4AF37] transition-colors text-right"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">نشانی کامل *</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  placeholder="خیابان، کوچه، پلاک و واحد"
                  className="w-full rounded-xl bg-background border border-white/10 px-4 py-3 text-sm outline-none focus:border-[#D4AF37] transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">یادداشت سفارش (اختیاری)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="مثلاً قبل از ارسال تماس بگیرید"
                  className="w-full rounded-xl bg-background border border-white/10 px-4 py-3 text-sm outline-none focus:border-[#D4AF37] transition-colors resize-none"
                />
              </div>
            </div>
          </section>

          {/* Payment method */}
          <section className="rounded-2xl bg-secondary/40 border border-white/5 p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-[#D4AF37]" />
              روش پرداخت
            </h2>
            <div className="flex items-center gap-3 rounded-xl border-2 border-[#D4AF37] bg-[#D4AF37]/5 p-4">
              <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#D4AF37]">
                <div className="h-2.5 w-2.5 rounded-full bg-[#D4AF37]" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">پرداخت در محل</p>
                <p className="text-xs text-muted-foreground">هنگام تحویل سفارش پرداخت کنید</p>
              </div>
              <Truck className="h-6 w-6 text-[#D4AF37]" />
            </div>
          </section>
        </div>

        {/* Right: summary */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl bg-secondary/40 border border-white/5 p-6 lg:sticky lg:top-28">
            <h2 className="text-lg font-bold mb-4">خلاصه سفارش</h2>

            {/* Items */}
            <div className="space-y-3 mb-4 max-h-72 overflow-y-auto pr-1">
              {items.map((item, index) => (
                <div
                  key={`${item.id}-${item.color}-${item.size}-${index}`}
                  className="flex gap-3 items-center"
                >
                  <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-secondary">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold line-clamp-1">{item.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.color} - سایز {item.size} × {item.qty.toLocaleString('fa-IR')}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-[#D4AF37] persian-num shrink-0">
                    {formatToman(item.price * item.qty)}
                  </p>
                </div>
              ))}
            </div>

            <div className="my-4 border-t border-white/10" />

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">تعداد کالا</span>
                <span className="persian-num">{itemCount.toLocaleString('fa-IR')}</span>
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
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-[#D4AF37] py-3.5 text-sm font-bold text-black hover:bg-[#e9cc6e] transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  در حال ثبت...
                </>
              ) : (
                <>
                  ثبت نهایی سفارش
                  <ArrowLeft className="h-4 w-4" />
                </>
              )}
            </button>

            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-[#D4AF37]" />
              اطلاعات شما با امنیت کامل ذخیره می‌شود
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
