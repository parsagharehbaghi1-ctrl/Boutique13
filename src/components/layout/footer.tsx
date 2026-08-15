import Link from 'next/link'
import { Instagram, Send, MessageCircle, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 bg-[#070707]">
      {/* App-icon style hover for social links.
          On hover the container fills with the brand color/gradient and the
          icon turns white — like the real app icons. Injected as an inline
          <style> so it stays unlayered and wins the cascade over Tailwind
          utilities and the .glass class. */}
      <style dangerouslySetInnerHTML={{ __html: `.social-ig,.social-tg,.social-wa{transition:background .3s ease,color .3s ease,stroke .3s ease,box-shadow .3s ease}.social-ig:hover{background:linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5);box-shadow:0 6px 22px rgba(214,41,118,.45)}.social-tg:hover{background:#229ED9;box-shadow:0 6px 22px rgba(34,158,217,.45)}.social-wa:hover{background:#25D366;box-shadow:0 6px 22px rgba(37,211,102,.45)}.social-ig:hover svg,.social-tg:hover svg,.social-wa:hover svg{color:#fff;stroke:#fff}.social-ig:hover .social-label,.social-tg:hover .social-label,.social-wa:hover .social-label{color:#fff}` }} />
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
                className="social-ig group flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-muted-foreground hover:scale-110 transition-all"
              >
                <Instagram className="h-5 w-5 transition-colors" />
              </a>
              <a
                href="#"
                aria-label="تلگرام"
                className="social-tg group flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-muted-foreground hover:scale-110 transition-all"
              >
                <Send className="h-5 w-5 transition-colors" />
              </a>
              <a
                href="#"
                aria-label="واتساپ"
                className="social-wa group flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-muted-foreground hover:scale-110 transition-all"
              >
                <MessageCircle className="h-5 w-5 transition-colors" />
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
