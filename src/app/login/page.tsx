'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Phone, Lock, User, Eye, EyeOff, ArrowLeft, Check, ShieldCheck } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

type Mode = 'login' | 'register' | 'otp' | 'success'

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [mode, setMode] = useState<Mode>('login')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [otp, setOtp] = useState(['', '', '', '', ''])
  const [resendTimer, setResendTimer] = useState(119)
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  // Resend timer
  useEffect(() => {
    if (mode !== 'otp') return
    setResendTimer(119)
    const interval = setInterval(() => {
      setResendTimer((t) => (t > 0 ? t - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [mode])

  const validatePhone = (p: string) => /^09\d{9}$/.test(p)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (mode === 'login' || mode === 'register') {
      if (!validatePhone(phone)) {
        toast({ title: 'شماره موبایل نامعتبر است', variant: 'destructive' })
        return
      }
      if (password.length < 8) {
        toast({ title: 'رمز عبور حداقل ۸ کاراکتر', variant: 'destructive' })
        return
      }
      if (mode === 'register' && !name.trim()) {
        toast({ title: 'نام را وارد کنید', variant: 'destructive' })
        return
      }
      setMode('otp')
      toast({ title: 'کد تأیید ارسال شد', description: `کد به شماره ${phone} پیامک شد` })
    }
  }

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    if (value && index < 4) {
      otpRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKey = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  const verifyOtp = () => {
    if (otp.some((d) => !d)) {
      toast({ title: 'کد را کامل وارد کنید', variant: 'destructive' })
      return
    }
    setMode('success')
    toast({ title: 'ورود موفقیت‌آمیز بود! 🎉' })
  }

  const formatTimer = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m.toLocaleString('fa-IR')}:${sec.toString().padStart(2, '0').replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[+d])}`
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] grid lg:grid-cols-2">
      {/* Visual panel - desktop only */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-transparent border-l border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, #D4AF37 0%, transparent 50%)' }} />
        <div className="relative">
          <Link href="/" className="flex items-center gap-2 mb-12">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-[#D4AF37] text-[#D4AF37] font-bold text-xl">B</div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold">Boutique</span>
              <span className="text-2xl font-bold text-[#D4AF37]">13</span>
            </div>
          </Link>
          <p className="text-sm text-[#D4AF37] tracking-widest mb-4">PRIVATE ACCESS · ۰۱۳</p>
          <h2 className="text-4xl font-bold leading-tight mb-4">
            یک حساب،
            <br />
            یک اندازه‌ی درست.
          </h2>
          <p className="text-muted-foreground leading-8 max-w-md">
            سایزها، سفارش‌ها و علاقه‌مندی‌های شما همیشه همراه‌تان می‌ماند. کافیه
            یک‌بار وارد بشید.
          </p>
        </div>
        <div className="relative flex items-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="h-5 w-5 text-[#D4AF37]" />
          کمتر از ۲ دقیقه زمان می‌برد
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link href="/" className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-[#D4AF37] text-[#D4AF37] font-bold text-xl">B</div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold">Boutique</span>
              <span className="text-2xl font-bold text-[#D4AF37]">13</span>
            </div>
          </Link>

          {/* Login / Register */}
          {(mode === 'login' || mode === 'register') && (
            <div>
              <div className="flex rounded-full border border-white/10 p-1 mb-8">
                <button
                  onClick={() => setMode('login')}
                  className={cn(
                    'flex-1 rounded-full py-2.5 text-sm font-semibold transition-all',
                    mode === 'login' ? 'bg-[#D4AF37] text-black' : 'text-muted-foreground'
                  )}
                >
                  ورود
                </button>
                <button
                  onClick={() => setMode('register')}
                  className={cn(
                    'flex-1 rounded-full py-2.5 text-sm font-semibold transition-all',
                    mode === 'register' ? 'bg-[#D4AF37] text-black' : 'text-muted-foreground'
                  )}
                >
                  ثبت‌نام
                </button>
              </div>

              <h1 className="text-3xl font-bold mb-2">
                {mode === 'login' ? 'ورود به حساب' : 'ساخت حساب جدید'}
              </h1>
              <p className="text-muted-foreground mb-8">
                {mode === 'login'
                  ? 'خوش آمدید! وارد شوید تا ادامه دهید.'
                  : 'به خانواده بوتیک ۱۳ بپیوندید.'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'register' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">نام و نام خانوادگی</label>
                    <div className="relative">
                      <User className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="مثلاً علی رضایی"
                        className="w-full rounded-xl bg-secondary border border-white/10 pr-11 pl-4 py-3.5 text-sm outline-none focus:border-[#D4AF37] transition-colors"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">شماره موبایل</label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type="tel"
                      dir="ltr"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="09xxxxxxxxx"
                      className="w-full rounded-xl bg-secondary border border-white/10 pr-11 pl-4 py-3.5 text-sm outline-none focus:border-[#D4AF37] transition-colors text-right"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">رمز عبور</label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="حداقل ۸ کاراکتر"
                      className="w-full rounded-xl bg-secondary border border-white/10 pr-11 pl-11 py-3.5 text-sm outline-none focus:border-[#D4AF37] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label="نمایش رمز"
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {mode === 'login' && (
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-white/20 bg-secondary" />
                      <span className="text-muted-foreground">مرا به خاطر بسپار</span>
                    </label>
                    <button type="button" className="text-[#D4AF37] hover:underline">
                      فراموشی رمز؟
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full rounded-full bg-[#D4AF37] py-3.5 text-sm font-bold text-black hover:bg-[#e9cc6e] transition-colors flex items-center justify-center gap-2"
                >
                  {mode === 'login' ? 'ورود به حساب' : 'دریافت کد تأیید'}
                  <ArrowLeft className="h-4 w-4" />
                </button>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-6">
                با ورود، قوانین و حریم خصوصی بوتیک ۱۳ را می‌پذیرید.
              </p>
            </div>
          )}

          {/* OTP */}
          {mode === 'otp' && (
            <div>
              <button
                onClick={() => setMode('login')}
                className="text-sm text-muted-foreground hover:text-[#D4AF37] mb-6 flex items-center gap-1"
              >
                <ArrowLeft className="h-4 w-4 rotate-180" />
                ویرایش شماره
              </button>
              <h1 className="text-3xl font-bold mb-2">تأیید کد</h1>
              <p className="text-muted-foreground mb-8">
                کد ۵ رقمی به شماره <span dir="ltr" className="text-foreground font-semibold">{phone}</span> پیامک شد.
              </p>

              <div className="flex gap-3 justify-center mb-8" dir="ltr">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { otpRefs.current[i] = el }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKey(i, e)}
                    className="h-14 w-14 rounded-xl bg-secondary border-2 border-white/10 text-center text-xl font-bold outline-none focus:border-[#D4AF37] transition-colors"
                  />
                ))}
              </div>

              <button
                onClick={verifyOtp}
                className="w-full rounded-full bg-[#D4AF37] py-3.5 text-sm font-bold text-black hover:bg-[#e9cc6e] transition-colors mb-4"
              >
                تأیید و ورود
              </button>

              <div className="text-center text-sm">
                {resendTimer > 0 ? (
                  <p className="text-muted-foreground">
                    ارسال مجدد کد تا <span className="persian-num">{formatTimer(resendTimer)}</span>
                  </p>
                ) : (
                  <button
                    onClick={() => {
                      setResendTimer(119)
                      toast({ title: 'کد جدید ارسال شد' })
                    }}
                    className="text-[#D4AF37] hover:underline"
                  >
                    ارسال مجدد کد
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Success */}
          {mode === 'success' && (
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-500/10">
                <Check className="h-12 w-12 text-green-400" />
              </div>
              <h1 className="text-3xl font-bold mb-2">ورود موفقیت‌آمیز بود!</h1>
              <p className="text-muted-foreground mb-8">
                خوش آمدید به بوتیک ۱۳. حساب شما با موفقیت تأیید شد.
              </p>
              <button
                onClick={() => router.push('/dashboard')}
                className="w-full rounded-full bg-[#D4AF37] py-3.5 text-sm font-bold text-black hover:bg-[#e9cc6e] transition-colors flex items-center justify-center gap-2"
              >
                ورود به حساب کاربری
                <ArrowLeft className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
