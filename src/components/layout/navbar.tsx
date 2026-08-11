'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Search, Heart, ShoppingBag, Menu, X, User as UserIcon, LogOut } from 'lucide-react'
import { useCartStore } from '@/lib/stores/cart-store'
import { useWishlistStore } from '@/lib/stores/wishlist-store'
import { useSearchStore } from '@/lib/stores/search-store'
import { useAuthStore } from '@/lib/stores/auth-store'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'خانه' },
  { href: '/shop', label: 'مردانه' },
  { href: '/shop?category=tshirt', label: 'تیشرت' },
  { href: '/shop?category=shoes', label: 'کفش' },
  { href: '/shop?category=accessories', label: 'اکسسوری' },
  { href: '/contact', label: 'تماس با ما' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const cartCount = useCartStore((s) => s.getCount())
  const wishCount = useWishlistStore((s) => s.items.length)
  const openCart = useCartStore((s) => s.openCart)
  const openSearch = useSearchStore((s) => s.openSearch)
  const cartHydrated = useCartStore((s) => s.hydrated)
  const wishHydrated = useWishlistStore((s) => s.hydrated)
  const { user, isAuthenticated, hydrated: authHydrated, logout } = useAuthStore()
  const { toast } = useToast()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setUserMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-background/85 backdrop-blur-xl border-b border-white/5 py-2'
            : 'bg-background/40 backdrop-blur-md py-4'
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#D4AF37] text-[#D4AF37] font-bold text-lg transition-transform group-hover:rotate-[-8deg] group-hover:bg-[#D4AF37] group-hover:text-black">
                B
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold tracking-tight">Boutique</span>
                <span className="text-xl font-bold text-[#D4AF37]">13</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <ul className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive =
                  link.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(link.href.split('?')[0]) && link.href !== '/'
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        'relative text-sm font-medium transition-colors hover:text-[#D4AF37]',
                        isActive ? 'text-[#D4AF37]' : 'text-foreground/80'
                      )}
                    >
                      {link.label}
                      <span
                        className={cn(
                          'absolute -bottom-1.5 right-0 h-0.5 bg-[#D4AF37] transition-all duration-300',
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        )}
                      />
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Action icons */}
            <div className="flex items-center gap-2">
              <button
                onClick={openSearch}
                aria-label="جستجو"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary hover:bg-[#D4AF37] hover:text-black transition-all hover:-translate-y-0.5"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Account / Auth */}
              {authHydrated && isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen((v) => !v)}
                    aria-label="حساب کاربری"
                    className="relative flex h-11 w-11 items-center justify-center rounded-full bg-secondary hover:bg-[#D4AF37] hover:text-black transition-all hover:-translate-y-0.5"
                  >
                    <UserIcon className="h-5 w-5" />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute left-0 mt-2 w-56 rounded-xl bg-background border border-white/10 shadow-xl p-2 z-50 animate-fade-up">
                      <div className="px-3 py-2 border-b border-white/5 mb-1">
                        <p className="text-sm font-semibold line-clamp-1">{user?.name}</p>
                        {user?.phone && (
                          <p className="text-xs text-muted-foreground" dir="ltr">{user.phone}</p>
                        )}
                      </div>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-secondary transition-colors"
                      >
                        <UserIcon className="h-4 w-4" />
                        داشبورد
                      </Link>
                      <button
                        onClick={() => {
                          logout()
                          setUserMenuOpen(false)
                          toast({ title: 'از حساب خارج شدید' })
                          router.push('/')
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        خروج از حساب
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  aria-label="ورود / ثبت‌نام"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary hover:bg-[#D4AF37] hover:text-black transition-all hover:-translate-y-0.5"
                >
                  <UserIcon className="h-5 w-5" />
                </Link>
              )}

              <Link
                href="/wishlist"
                aria-label="علاقه‌مندی‌ها"
                className="relative flex h-11 w-11 items-center justify-center rounded-full bg-secondary hover:bg-[#D4AF37] hover:text-black transition-all hover:-translate-y-0.5"
              >
                <Heart className="h-5 w-5" />
                {wishHydrated && wishCount > 0 && (
                  <span className="absolute -top-1 -left-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#D4AF37] px-1 text-xs font-bold text-black">
                    {wishCount}
                  </span>
                )}
              </Link>

              <button
                onClick={openCart}
                aria-label="سبد خرید"
                className="relative flex h-11 w-11 items-center justify-center rounded-full bg-secondary hover:bg-[#D4AF37] hover:text-black transition-all hover:-translate-y-0.5"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartHydrated && cartCount > 0 && (
                  <span
                    key={cartCount}
                    className="absolute -top-1 -left-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#D4AF37] px-1 text-xs font-bold text-black animate-cart-bounce"
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="منو"
                className="lg:hidden flex h-11 w-11 items-center justify-center rounded-full bg-secondary hover:bg-[#D4AF37] hover:text-black transition-all"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-background/98 backdrop-blur-xl pt-24 px-6">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link, i) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-4 text-2xl font-semibold border-b border-white/5 hover:text-[#D4AF37] transition-colors animate-fade-up"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/dashboard"
                className="block py-4 text-2xl font-semibold border-b border-white/5 hover:text-[#D4AF37] transition-colors animate-fade-up"
                style={{ animationDelay: `${navLinks.length * 50}ms` }}
              >
                {authHydrated && isAuthenticated ? 'حساب کاربری' : 'ورود / ثبت‌نام'}
              </Link>
            </li>
            {authHydrated && isAuthenticated && (
              <li>
                <button
                  onClick={() => {
                    logout()
                    router.push('/')
                  }}
                  className="block w-full text-right py-4 text-2xl font-semibold hover:text-red-400 transition-colors animate-fade-up"
                  style={{ animationDelay: `${(navLinks.length + 1) * 50}ms` }}
                >
                  خروج از حساب
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  )
}
