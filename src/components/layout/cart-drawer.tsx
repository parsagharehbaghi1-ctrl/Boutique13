'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, Trash2, ShoppingBag, Plus, Minus } from 'lucide-react'
import { useCartStore } from '@/lib/stores/cart-store'
import { formatToman } from '@/lib/format'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, removeItem, getTotal, hydrated } = useCartStore()
  const { toast } = useToast()

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeCart])

  const total = getTotal()

  const handleRemove = (index: number, name: string) => {
    removeItem(index)
    toast({ title: 'حذف شد', description: `${name} از سبد خرید حذف شد` })
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={cn(
          'fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
      />

      {/* Drawer */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-[70] h-full w-full max-w-md bg-[#0d0d0d] border-l border-white/10 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-[#D4AF37]" />
            <h2 className="text-lg font-bold">سبد خرید</h2>
            {hydrated && items.length > 0 && (
              <span className="text-sm text-muted-foreground">({items.length} کالا)</span>
            )}
          </div>
          <button
            onClick={closeCart}
            aria-label="بستن"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary hover:bg-[#D4AF37] hover:text-black transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {!hydrated || items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-secondary mb-4">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
              <p className="text-lg font-semibold mb-1">سبد خرید شما خالی است</p>
              <p className="text-sm text-muted-foreground mb-6">
                هنوز محصولی به سبد خرید اضافه نکرده‌اید
              </p>
              <button
                onClick={closeCart}
                className="rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-bold text-black hover:bg-[#e9cc6e] transition-colors"
              >
                مشاهده محصولات
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-white/5">
              {items.map((item, index) => (
                <li key={`${item.id}-${item.color}-${item.size}-${index}`} className="p-4 flex gap-3">
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-secondary">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold leading-6 line-clamp-2">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => handleRemove(index, item.name)}
                        aria-label="حذف"
                        className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:bg-red-500/10 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.color} - سایز {item.size}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(index, -1)}
                          aria-label="کاهش"
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary hover:bg-[#D4AF37] hover:text-black transition-colors"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold persian-num">
                          {item.qty.toLocaleString('fa-IR')}
                        </span>
                        <button
                          onClick={() => updateQty(index, 1)}
                          aria-label="افزایش"
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary hover:bg-[#D4AF37] hover:text-black transition-colors"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="text-sm font-bold text-[#D4AF37] persian-num">
                        {formatToman(item.price * item.qty)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {hydrated && items.length > 0 && (
          <div className="border-t border-white/10 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">جمع کل</span>
              <span className="text-xl font-bold text-[#D4AF37] persian-num">
                {formatToman(total)}
              </span>
            </div>
            <Link
              href="/cart"
              onClick={closeCart}
              className="block w-full rounded-full bg-[#D4AF37] py-3.5 text-center text-sm font-bold text-black hover:bg-[#e9cc6e] transition-colors"
            >
              مشاهده سبد و تسویه حساب
            </Link>
          </div>
        )}
      </aside>
    </>
  )
}
