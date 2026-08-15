'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Instagram, Send, MessageCircle, MapPin, Phone, Clock, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function ContactPage() {
  const { toast } = useToast()
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone || !form.message) {
      toast({ title: 'تمام فیلدها را پر کنید', variant: 'destructive' })
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSubmitted(true)
        setForm({ name: '', email: '', phone: '', message: '' })
        toast({ title: 'پیام شما ارسال شد ✓' })
        setTimeout(() => setSubmitted(false), 3000)
      } else {
        toast({ title: 'ارسال ناموفق بود', variant: 'destructive' })
      }
    } catch {
      toast({ title: 'خطا در ارسال', variant: 'destructive' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[320px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero-bg.jpg"
          alt="تماس با بوتیک ۱۳"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative text-center px-4">
          <p className="text-sm text-[#D4AF37] tracking-widest mb-3">GET IN TOUCH</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3">تماس با بوتیک ۱۳</h1>
          <p className="text-white/70 max-w-xl mx-auto">
            ما همیشه آماده شنیدن نظرات، پیشنهادات و سوالات شما هستیم
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Form + logo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary">
            <Image
              src="/images/logo.jpg"
              alt="Boutique13"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="glass rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold mb-6">ارسال پیام</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">نام و نام خانوادگی</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="نام شما"
                  className="w-full rounded-xl bg-secondary border border-white/10 px-4 py-3 text-sm outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">ایمیل</label>
                <input
                  type="email"
                  dir="ltr"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="email@example.com"
                  className="w-full rounded-xl bg-secondary border border-white/10 px-4 py-3 text-sm outline-none focus:border-[#D4AF37] transition-colors text-right"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">شماره تماس</label>
                <input
                  type="tel"
                  dir="ltr"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="09xxxxxxxxx"
                  className="w-full rounded-xl bg-secondary border border-white/10 px-4 py-3 text-sm outline-none focus:border-[#D4AF37] transition-colors text-right"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">پیام شما</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="پیام خود را بنویسید..."
                  rows={4}
                  className="w-full rounded-xl bg-secondary border border-white/10 px-4 py-3 text-sm outline-none focus:border-[#D4AF37] transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitting || submitted}
                className={`w-full rounded-full py-3.5 text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  submitted
                    ? 'bg-green-500 text-white'
                    : 'bg-[#D4AF37] text-black hover:bg-[#e9cc6e]'
                }`}
              >
                {submitted ? (
                  <>
                    <Check className="h-5 w-5" />
                    پیام ارسال شد
                  </>
                ) : submitting ? (
                  'در حال ارسال...'
                ) : (
                  'ارسال پیام'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Contact info card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          <div className="glass rounded-2xl p-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37]">
              <Phone className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-1">شماره تماس</h3>
            <p className="text-sm text-muted-foreground" dir="ltr">09918698146</p>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37]">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-1">ساعات پاسخگویی</h3>
            <p className="text-sm text-muted-foreground">شنبه تا جمعه</p>
            <p className="text-sm text-muted-foreground persian-num">۱۰:۳۰ تا ۲۱:۳۰</p>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37]">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-1">آدرس فروشگاه</h3>
            <p className="text-sm text-muted-foreground">تهران، خیابان ولیعصر</p>
          </div>
        </div>

        {/* Map card */}
        <div className="glass rounded-2xl p-8 text-center mb-16">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37] animate-float">
            <MapPin className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold mb-2">Find Boutique13</h3>
          <p className="text-muted-foreground mb-6">
            انتخاب کنید با کدام برنامه می‌خواهید مسیر را مشاهده کنید
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://nshn.ir/sbLxYN2AqgS3"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#009944] px-6 py-3 text-sm font-bold text-white hover:opacity-90 transition-opacity"
            >
              نشان
            </a>
            <a
              href="https://maps.app.goo.gl/6o4KGBAhxxFJVhzB8"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gradient-to-r from-[#4285F4] via-[#34A853] to-[#FBBC05] px-6 py-3 text-sm font-bold text-white hover:opacity-90 transition-opacity"
            >
              گوگل مپ
            </a>
          </div>
        </div>

        {/* Social */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-8">ما را دنبال کنید</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#"
              aria-label="اینستاگرام"
              className="social-ig group glass rounded-2xl w-28 h-28 flex flex-col items-center justify-center gap-2 hover:scale-105 transition-all"
            >
              <Instagram className="h-7 w-7 text-[#D4AF37] transition-colors" />
              <span className="social-label text-xs">اینستاگرام</span>
            </a>
            <a
              href="#"
              aria-label="تلگرام"
              className="social-tg group glass rounded-2xl w-28 h-28 flex flex-col items-center justify-center gap-2 hover:scale-105 transition-all"
            >
              <Send className="h-7 w-7 text-[#D4AF37] transition-colors" />
              <span className="social-label text-xs">تلگرام</span>
            </a>
            <a
              href="#"
              aria-label="واتساپ"
              className="social-wa group glass rounded-2xl w-28 h-28 flex flex-col items-center justify-center gap-2 hover:scale-105 transition-all"
            >
              <MessageCircle className="h-7 w-7 text-[#D4AF37] transition-colors" />
              <span className="social-label text-xs">واتساپ</span>
            </a>
            <a
              href="#"
              aria-label="روبیكا"
              className="group glass rounded-2xl w-28 h-28 flex flex-col items-center justify-center gap-2 hover:border-[#074a75]/40 hover:bg-[#074a75]/10 hover:scale-105 transition-all overflow-hidden"
            >
              <Image
                src="/images/rubika.jpg"
                alt="Rubika"
                width={28}
                height={28}
                className="rounded group-hover:opacity-80 h-7 w-7 object-contain"
              />
              <span className="text-xs">روبیكا</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
