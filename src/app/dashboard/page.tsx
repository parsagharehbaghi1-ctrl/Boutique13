'use client'

import Link from 'next/link'
import { Package, MapPin, Heart, User, LogOut, ShoppingBag, Truck, Clock } from 'lucide-react'
import { useWishlistStore } from '@/lib/stores/wishlist-store'
import { useCartStore } from '@/lib/stores/cart-store'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const sampleOrders = [
  {
    id: '۱۰۴۲۸',
    date: '۱۴ مرداد ۱۴۰۴',
    status: 'shipped',
    statusLabel: 'ارسال شده',
    progress: ['done', 'done', 'current', 'pending'],
    steps: ['ثبت سفارش', 'آماده‌سازی', 'ارسال', 'تحویل'],
    itemCount: 3,
    items: 'کاپشن جین، شلوار چینو، تیشرت بیسیک',
    total: 4280000,
  },
  {
    id: '۱۰۳۹۱',
    date: '۸ مرداد ۱۴۰۴',
    status: 'delivered',
    statusLabel: 'تحویل شده',
    progress: ['done', 'done', 'done', 'done'],
    steps: ['ثبت سفارش', 'آماده‌سازی', 'ارسال', 'تحویل'],
    itemCount: 1,
    items: 'کفش کتانی سفید',
    total: 1150000,
  },
  {
    id: '۱۰۴۵۰',
    date: 'امروز',
    status: 'processing',
    statusLabel: 'در حال پردازش',
    progress: ['current', 'pending', 'pending', 'pending'],
    steps: ['ثبت سفارش', 'آماده‌سازی', 'ارسال', 'تحویل'],
    itemCount: 2,
    items: 'تیشرت اورسایز، شلوار بگ',
    total: 3900000,
  },
]

const addresses = [
  { tag: 'پیش‌فرض', text: 'تهران، خیابان ولیعصر، بالاتر از پارک وی، پلاک ۱۲، واحد ۳', isDefault: true },
  { tag: 'محل کار', text: 'تهران، سعادت‌آباد، خیابان علامه، برج نگین، طبقه ۵', isDefault: false },
]

const navItems = [
  { id: 'overview', label: 'نمای کلی', icon: User },
  { id: 'orders', label: 'سفارش‌ها', icon: Package },
  { id: 'addresses', label: 'آدرس‌ها', icon: MapPin },
  { id: 'wishlist', label: 'علاقه‌مندی‌ها', icon: Heart },
  { id: 'account', label: 'اطلاعات حساب', icon: ShoppingBag },
]

const stampStyles: Record<string, string> = {
  shipped: 'bg-[#454e37]/30 text-[#9ca87f] border-[#5f6a4c]',
  delivered: 'bg-[#5f6a4c]/20 text-[#9ca87f] border-[#5f6a4c]',
  processing: 'bg-[#b8863f]/20 text-[#d4af37] border-[#b8863f]',
}

const stepDotStyles: Record<string, string> = {
  done: 'bg-[#D4AF37] border-[#D4AF37]',
  current: 'bg-[#D4AF37] border-[#D4AF37] ring-4 ring-[#D4AF37]/20',
  pending: 'bg-transparent border-white/20',
}

function formatToman(n: number) {
  return `${n.toLocaleString('fa-IR')} تومان`
}

export default function DashboardPage() {
  const [active, setActive] = useState('overview')
  const wishCount = useWishlistStore((s) => s.items.length)
  const cartCount = useCartStore((s) => s.getCount())

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl bg-secondary/40 border border-white/5 p-6">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#D4AF37] text-[#D4AF37] font-bold">B</div>
              <div className="flex items-baseline gap-1">
                <span className="font-bold">Boutique</span>
                <span className="font-bold text-[#D4AF37]">13</span>
              </div>
            </Link>

            <div className="flex items-center gap-3 pb-6 mb-4 border-b border-white/5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D4AF37] text-black font-bold">
                ع.ر
              </div>
              <div className="min-w-0">
                <p className="font-semibold truncate">علی رضایی</p>
                <p className="text-xs text-muted-foreground" dir="ltr">09123456789</p>
              </div>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all',
                    active === item.id
                      ? 'bg-[#D4AF37] text-black'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              ))}
            </nav>

            <Link
              href="/login"
              className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5 px-4 py-2.5 text-sm text-muted-foreground hover:text-red-400 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              خروج از حساب
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <div className="min-w-0">
          {active === 'overview' && (
            <div className="space-y-6">
              <div>
                <p className="text-sm text-[#D4AF37] mb-1">نمای کلی</p>
                <h1 className="text-3xl font-bold mb-1">سلام، علی 👋</h1>
                <p className="text-muted-foreground">این خلاصه‌ی وضعیت حساب و سفارش‌های اخیر شماست</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-secondary/40 border border-white/5 p-5">
                  <Package className="h-6 w-6 text-[#D4AF37] mb-3" />
                  <p className="text-2xl font-bold persian-num">۷</p>
                  <p className="text-sm text-muted-foreground">سفارش تا امروز</p>
                </div>
                <div className="rounded-2xl bg-secondary/40 border border-white/5 p-5">
                  <Truck className="h-6 w-6 text-[#D4AF37] mb-3" />
                  <p className="text-2xl font-bold persian-num">۲</p>
                  <p className="text-sm text-muted-foreground">در مسیر ارسال</p>
                </div>
                <div className="rounded-2xl bg-secondary/40 border border-white/5 p-5">
                  <Heart className="h-6 w-6 text-[#D4AF37] mb-3" />
                  <p className="text-2xl font-bold persian-num">{wishCount.toLocaleString('fa-IR')}</p>
                  <p className="text-sm text-muted-foreground">مورد علاقه‌مندی</p>
                </div>
              </div>

              {/* Recent orders */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-xl font-bold">سفارش‌های اخیر</h2>
                  <div className="flex-1 h-px bg-white/5" />
                </div>
                <div className="space-y-4">
                  {sampleOrders.map((order) => (
                    <div key={order.id} className="rounded-2xl bg-secondary/40 border border-white/5 p-5">
                      <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-semibold">سفارش #{order.id}</span>
                            <span className={cn('rounded-full border px-2.5 py-0.5 text-xs font-semibold -rotate-2', stampStyles[order.status])}>
                              {order.statusLabel}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-[#D4AF37] persian-num">{formatToman(order.total)}</p>
                        </div>
                      </div>

                      {/* Stitch track */}
                      <div className="flex items-center mb-3">
                        {order.steps.map((step, i) => (
                          <div key={step} className="flex items-center flex-1 last:flex-none">
                            <div className="flex flex-col items-center">
                              <div className={cn('h-3 w-3 rounded-full border-2 transition-all', stepDotStyles[order.progress[i]])} />
                              <span className="text-[10px] text-muted-foreground mt-1.5 whitespace-nowrap">{step}</span>
                            </div>
                            {i < order.steps.length - 1 && (
                              <div className={cn(
                                'flex-1 h-0.5 mx-1 mb-5 border-t border-dashed',
                                order.progress[i] === 'done' ? 'border-[#D4AF37]' : 'border-white/15'
                              )} />
                            )}
                          </div>
                        ))}
                      </div>

                      <p className="text-sm text-muted-foreground">
                        {order.itemCount.toLocaleString('fa-IR')} قلم — {order.items}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Addresses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-secondary/40 border border-white/5 p-5">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#D4AF37]" />
                    آدرس‌ها
                  </h3>
                  <div className="space-y-3">
                    {addresses.map((addr, i) => (
                      <div key={i} className="text-sm">
                        <span className={cn(
                          'inline-block rounded-full px-2 py-0.5 text-xs mb-1',
                          addr.isDefault ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'bg-secondary text-muted-foreground'
                        )}>
                          {addr.tag}
                        </span>
                        <p className="text-muted-foreground leading-6">{addr.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-secondary/40 border border-white/5 p-5">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Heart className="h-4 w-4 text-[#D4AF37]" />
                    علاقه‌مندی‌ها
                  </h3>
                  {wishCount === 0 ? (
                    <p className="text-sm text-muted-foreground">هنوز موردی اضافه نکرده‌اید</p>
                  ) : (
                    <Link href="/wishlist" className="text-sm text-[#D4AF37] hover:underline">
                      مشاهده {wishCount.toLocaleString('fa-IR')} مورد →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}

          {active === 'orders' && (
            <div className="space-y-4">
              <h1 className="text-3xl font-bold mb-2">سفارش‌های من</h1>
              <p className="text-muted-foreground mb-6">همه سفارش‌های شما در یکجا</p>
              {sampleOrders.map((order) => (
                <div key={order.id} className="rounded-2xl bg-secondary/40 border border-white/5 p-5">
                  <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-semibold">سفارش #{order.id}</span>
                        <span className={cn('rounded-full border px-2.5 py-0.5 text-xs font-semibold -rotate-2', stampStyles[order.status])}>
                          {order.statusLabel}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                    </div>
                    <p className="font-bold text-[#D4AF37] persian-num">{formatToman(order.total)}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {order.itemCount.toLocaleString('fa-IR')} قلم — {order.items}
                  </p>
                </div>
              ))}
            </div>
          )}

          {active === 'addresses' && (
            <div className="space-y-4">
              <h1 className="text-3xl font-bold mb-2">آدرس‌های من</h1>
              <p className="text-muted-foreground mb-6">آدرس‌های ذخیره شده شما</p>
              {addresses.map((addr, i) => (
                <div key={i} className="rounded-2xl bg-secondary/40 border border-white/5 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className={cn(
                        'inline-block rounded-full px-2 py-0.5 text-xs mb-2',
                        addr.isDefault ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'bg-secondary text-muted-foreground'
                      )}>
                        {addr.tag}
                      </span>
                      <p className="text-muted-foreground leading-7">{addr.text}</p>
                    </div>
                    <button className="text-sm text-[#D4AF37] hover:underline shrink-0">ویرایش</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {active === 'wishlist' && (
            <div>
              <h1 className="text-3xl font-bold mb-2">علاقه‌مندی‌ها</h1>
              <p className="text-muted-foreground mb-6">محصولاتی که پسندیده‌اید</p>
              {wishCount === 0 ? (
                <div className="rounded-2xl bg-secondary/40 border border-white/5 p-10 text-center">
                  <Heart className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground mb-4">هنوز محصولی اضافه نکرده‌اید</p>
                  <Link href="/shop" className="text-[#D4AF37] hover:underline">کاوش محصولات →</Link>
                </div>
              ) : (
                <Link href="/wishlist" className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-bold text-black hover:bg-[#e9cc6e] transition-colors">
                  مشاهده {wishCount.toLocaleString('fa-IR')} مورد علاقه‌مندی
                </Link>
              )}
            </div>
          )}

          {active === 'account' && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold mb-2">اطلاعات حساب</h1>
              <p className="text-muted-foreground mb-6">اطلاعات شخصی شما</p>
              <div className="rounded-2xl bg-secondary/40 border border-white/5 p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#D4AF37] text-black font-bold text-xl">ع.ر</div>
                  <div>
                    <p className="font-semibold text-lg">علی رضایی</p>
                    <p className="text-sm text-muted-foreground" dir="ltr">09123456789</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">تاریخ عضویت</p>
                    <p className="text-sm">۱ تیر ۱۴۰۴</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">تعداد سفارش‌ها</p>
                    <p className="text-sm persian-num">۷ سفارش</p>
                  </div>
                </div>
                <button className="text-sm text-[#D4AF37] hover:underline">ویرایش اطلاعات →</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
