'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Phone, Lock, User, Eye, EyeOff, ArrowLeft, Check, ShieldCheck } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useAuthStore } from '@/lib/stores/auth-store'
import { cn } from '@/lib/utils'

type Mode = 'login' | 'register' | 'otp' | 'success'

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTarget = searchParams.get('redirect') || '/dashboard'
  const { toast } = useToast()
  const login = useAuthStore((s) => s.login)
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
        toast({ title: '\u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06cc\u0644 \u0646\u0627\u0645\u0639\u062a\u0628\u0631 \u0627\u0633\u062a', variant: 'destructive' })
        return
      }
      if (password.length < 8) {
        toast({ title: '\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062d\u062f\u0627\u0642\u0644 \u06f8 \u06a9\u0627\u0631\u0627\u06a9\u062a\u0631', variant: 'destructive' })
        return
      }
      if (mode === 'register' && !name.trim()) {
        toast({ title: '\u0646\u0627\u0645 \u0631\u0627 \u0648\u0627\u0631\u062f \u06a9\u0646\u06cc\u062f', variant: 'destructive' })
        return
      }
      setMode('otp')
      toast({ title: '\u06a9\u062f \u062a\u0623\u06cc\u06cc\u062f \u0627\u0631\u0633\u0627\u0644 \u0634\u062f', description: `\u06a9\u062f \u0628\u0647 \u0634\u0645\u0627\u0631\u0647 ${phone} \u067e\u06cc\u0627\u0645\u06a9 \u0634\u062f` })
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
      toast({ title: '\u06a9\u062f \u0631\u0627 \u06a9\u0627\u0645\u0644 \u0648\u0627\u0631\u062f \u06a9\u0646\u06cc\u062f', variant: 'destructive' })
      return
    }
    // Persist authed user to the auth store
    login({
      name: name.trim() || '\u06a9\u0627\u0631\u0628\u0631 \u0628\u0648\u062a\u06cc\u06a9 \u06f1\u06f3',
      phone,
    })
    setMode('success')
    toast({ title: '\u0648\u0631\u0648\u062f \u0645\u0648\u0641\u0642\u06cc\u062a\u200c\u0622\u0645\u06cc\u0632 \u0628\u0648\u062f! \ud83c\udf89' })
  }

  const formatTimer = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m.toLocaleString('fa-IR')}:${sec.toString().padStart(2, '0').replace(/\d/g, (d) => '\u06f0\u06f1\u06f2\u06f3\u06f4\u06f5\u06f6\u06f7\u06f8\u06f9'[+d])}`
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
          <p className="text-sm text-[#D4AF37] tracking-widest mb-4">PRIVATE ACCESS \u00b7 \u06f0\u06f1\u06f3</p>
          <h2 className="text-4xl font-bold leading-tight mb-4">
            \u06cc\u06a9 \u062d\u0633\u0627\u0628\u060c
            <br />
            \u06cc\u06a9 \u0627\u0646\u062f\u0627\u0632\u0647\u200c\u06cc \u062f\u0631\u0633\u062a.
          </h2>
          <p className="text-muted-foreground leading-8 max-w-md">
            \u0633\u0627\u06cc\u0632\u0647\u0627\u060c \u0633\u0641\u0627\u0631\u0634\u200c\u0647\u0627 \u0648 \u0639\u0644\u0627\u0642\u0647\u200c\u0645\u0646\u062f\u06cc\u200c\u0647\u0627\u06cc \u0634\u0645\u0627 \u0647\u0645\u06cc\u0634\u0647 \u0647\u0645\u0631\u0627\u0647\u200c\u062a\u0627\u0646 \u0645\u06cc\u200c\u0645\u0627\u0646\u062f. \u06a9\u0627\u0641\u06cc\u0647
            \u06cc\u06a9\u200c\u0628\u0627\u0631 \u0648\u0627\u0631\u062f \u0628\u0634\u06cc\u062f.
          </p>
        </div>
        <div className="relative flex items-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="h-5 w-5 text-[#D4AF37]" />
          \u06a9\u0645\u062a\u0631 \u0627\u0632 \u06f2 \u062f\u0642\u06cc\u0642\u0647 \u0632\u0645\u0627\u0646 \u0645\u06cc\u200c\u0628\u0631\u062f
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
                  \u0648\u0631\u0648\u062f
                </button>
                <button
                  onClick={() => setMode('register')}
                  className={cn(
                    'flex-1 rounded-full py-2.5 text-sm font-semibold transition-all',
                    mode === 'register' ? 'bg-[#D4AF37] text-black' : 'text-muted-foreground'
                  )}
                >
                  \u062b\u0628\u062a\u200c\u0646\u0627\u0645
                </button>
              </div>

              <h1 className="text-3xl font-bold mb-2">
                {mode === 'login' ? '\u0648\u0631\u0648\u062f \u0628\u0647 \u062d\u0633\u0627\u0628' : '\u0633\u0627\u062e\u062a \u062d\u0633\u0627\u0628 \u062c\u062f\u06cc\u062f'}
              </h1>
              <p className="text-muted-foreground mb-8">
                {mode === 'login'
                  ? '\u062e\u0648\u0634 \u0622\u0645\u062f\u06cc\u062f! \u0648\u0627\u0631\u062f \u0634\u0648\u06cc\u062f \u062a\u0627 \u0627\u062f\u0627\u0645\u0647 \u062f\u0647\u06cc\u062f.'
                  : '\u0628\u0647 \u062e\u0627\u0646\u0648\u0627\u062f\u0647 \u0628\u0648\u062a\u06cc\u06a9 \u06f1\u06f3 \u0628\u067e\u06cc\u0648\u0646\u062f\u06cc\u062f.'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'register' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645 \u062e\u0627\u0646\u0648\u0627\u062f\u06af\u06cc</label>
                    <div className="relative">
                      <User className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="\u0645\u062b\u0644\u0627\u064b \u0639\u0644\u06cc \u0631\u0636\u0627\u06cc\u06cc"
                        className="w-full rounded-xl bg-secondary border border-white/10 pr-11 pl-4 py-3.5 text-sm outline-none focus:border-[#D4AF37] transition-colors"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">\u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06cc\u0644</label>
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
                  <label className="block text-sm font-medium mb-2">\u0631\u0645\u0632 \u0639\u0628\u0648\u0631</label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="\u062d\u062f\u0627\u0642\u0644 \u06f8 \u06a9\u0627\u0631\u0627\u06a9\u062a\u0631"
                      className="w-full rounded-xl bg-secondary border border-white/10 pr-11 pl-11 py-3.5 text-sm outline-none focus:border-[#D4AF37] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label="\u0646\u0645\u0627\u06cc\u0634 \u0631\u0645\u0632"
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
                      <span className="text-muted-foreground">\u0645\u0631\u0627 \u0628\u0647 \u062e\u0627\u0637\u0631 \u0628\u0633\u067e\u0627\u0631</span>
                    </label>
                    <button type="button" className="text-[#D4AF37] hover:underline">
                      \u0641\u0631\u0627\u0645\u0648\u0634\u06cc \u0631\u0645\u0632\u061f
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full rounded-full bg-[#D4AF37] py-3.5 text-sm font-bold text-black hover:bg-[#e9cc6e] transition-colors flex items-center justify-center gap-2"
                >
                  {mode === 'login' ? '\u0648\u0631\u0648\u062f \u0628\u0647 \u062d\u0633\u0627\u0628' : '\u062f\u0631\u06cc\u0627\u0641\u062a \u06a9\u062f \u062a\u0623\u06cc\u06cc\u062f'}
                  <ArrowLeft className="h-4 w-4" />
                </button>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-6">
                \u0628\u0627 \u0648\u0631\u0648\u062f\u060c \u0642\u0648\u0627\u0646\u06cc\u0646 \u0648 \u062d\u0631\u06cc\u0645 \u062e\u0635\u0648\u0635\u06cc \u0628\u0648\u062a\u06cc\u06a9 \u06f1\u06f3 \u0631\u0627 \u0645\u06cc\u200c\u067e\u0630\u06cc\u0631\u06cc\u062f.
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
                \u0648\u06cc\u0631\u0627\u06cc\u0634 \u0634\u0645\u0627\u0631\u0647
              </button>
              <h1 className="text-3xl font-bold mb-2">\u062a\u0623\u06cc\u06cc\u062f \u06a9\u062f</h1>
              <p className="text-muted-foreground mb-8">
                \u06a9\u062f \u06f5 \u0631\u0642\u0645\u06cc \u0628\u0647 \u0634\u0645\u0627\u0631\u0647 <span dir="ltr" className="text-foreground font-semibold">{phone}</span> \u067e\u06cc\u0627\u0645\u06a9 \u0634\u062f.
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
                \u062a\u0623\u06cc\u06cc\u062f \u0648 \u0648\u0631\u0648\u062f
              </button>

              <div className="text-center text-sm">
                {resendTimer > 0 ? (
                  <p className="text-muted-foreground">
                    \u0627\u0631\u0633\u0627\u0644 \u0645\u062c\u062f\u062f \u06a9\u062f \u062a\u0627 <span className="persian-num">{formatTimer(resendTimer)}</span>
                  </p>
                ) : (
                  <button
                    onClick={() => {
                      setResendTimer(119)
                      toast({ title: '\u06a9\u062f \u062c\u062f\u06cc\u062f \u0627\u0631\u0633\u0627\u0644 \u0634\u062f' })
                    }}
                    className="text-[#D4AF37] hover:underline"
                  >
                    \u0627\u0631\u0633\u0627\u0644 \u0645\u062c\u062f\u062f \u06a9\u062f
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
              <h1 className="text-3xl font-bold mb-2">\u0648\u0631\u0648\u062f \u0645\u0648\u0641\u0642\u06cc\u062a\u200c\u0622\u0645\u06cc\u0632 \u0628\u0648\u062f!</h1>
              <p className="text-muted-foreground mb-8">
                \u062e\u0648\u0634 \u0622\u0645\u062f\u06cc\u062f \u0628\u0647 \u0628\u0648\u062a\u06cc\u06a9 \u06f1\u06f3. \u062d\u0633\u0627\u0628 \u0634\u0645\u0627 \u0628\u0627 \u0645\u0648\u0641\u0642\u06cc\u062a \u062a\u0623\u06cc\u06cc\u062f \u0634\u062f.
              </p>
              <button
                onClick={() => router.push(redirectTarget)}
                className="w-full rounded-full bg-[#D4AF37] py-3.5 text-sm font-bold text-black hover:bg-[#e9cc6e] transition-colors flex items-center justify-center gap-2"
              >
                {redirectTarget === '/checkout' ? '\u0627\u062f\u0627\u0645\u0647 \u062a\u0633\u0648\u06cc\u0647 \u062d\u0633\u0627\u0628' : '\u0648\u0631\u0648\u062f \u0628\u0647 \u062d\u0633\u0627\u0628 \u06a9\u0627\u0631\u0628\u0631\u06cc'}
                <ArrowLeft className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><div className="h-10 w-10 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" /></div>}>
      <LoginContent />
    </Suspense>
  )
}
