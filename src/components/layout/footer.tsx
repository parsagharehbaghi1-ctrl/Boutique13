import Link from 'next/link'
import { Instagram, Send, MessageCircle, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 bg-[#070707]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#D4AF37] text-[#D4AF37] font-bold text-lg">
                B
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold">Boutique</span>
                <span className="text-xl font-bold text-[#D4AF37]">13</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md leading-7">
              بوتیک ۱۳، فروشگاه پوشاک لوکس و دست‌ساز. کیفیت پارچه، الگوی اختصاصی،
              تولید محدود. ما به کیفیت و اصالت اهمیت می‌دهیم.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                aria-label="اینستاگرام"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary hover:bg-[#D4AF37] hover:text-black transition-all"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="تلگرام"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary hover:bg-[#D4AF37] hover:text-black transition-all"
              >
                <Send className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="واتساپ"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary hover:bg-[#D4AF37] hover:text-black transition-all"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold mb-4 text-[#D4AF37]">دسترسی سریع</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/shop" className="hover:text-[#D4AF37] transition-colors">
                  فروشگاه
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-[#D4AF37] transition-colors">
                  علاقه‌مندی‌ها
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-[#D4AF37] transition-colors">
                  سبد خرید
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#D4AF37] transition-colors">
                  حساب کاربری
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-[#D4AF37]">تماس با ما</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#D4AF37] shrink-0" />
                <span>تهران، خیابان ولیعصر</span>
              </li>
              <li dir="ltr" className="flex items-center gap-2 justify-end">
                <span>09918698146</span>
                <span className="text-[#D4AF37]">📞</span>
              </li>
              <li className="text-xs">شنبه تا جمعه - ۱۰:۳۰ تا ۲۱:۳۰</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© ۱۴۰۴ بوتیک ۱۳ — تمامی حقوق محفوظ است.</p>
          <p className="flex items-center gap-2">
            <span>دست‌ساز، بی‌زمان</span>
            <span className="text-[#D4AF37]">•</span>
            <span>No. ۱۳</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
