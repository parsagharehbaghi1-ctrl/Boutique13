'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, X, Loader2 } from 'lucide-react'
import { useSearchStore } from '@/lib/stores/search-store'
import { formatToman, normalizePersian } from '@/lib/format'
import type { ParsedProduct } from '@/app/api/products/route'
import { cn } from '@/lib/utils'

const popularTags = ['تیشرت', 'شلوار', 'کفش', 'اکسسوری']

export function SearchOverlay() {
  const { isOpen, closeSearch } = useSearchStore()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<ParsedProduct[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 250)
    } else {
      setQuery('')
      setResults([])
    }
  }, [isOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeSearch])

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setLoading(false)
      return
    }
    setLoading(true)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`
        )
        if (res.ok) {
          const data = await res.json()
          setResults(data)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }, 200)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query])

  const highlight = (text: string) => {
    const q = normalizePersian(query)
    if (!q) return text
    const normalized = normalizePersian(text)
    const idx = normalized.indexOf(q)
    if (idx === -1) return text
    return (
      <>
        {text.slice(0, idx)}
        <mark className="bg-[#D4AF37]/20 text-[#D4AF37] rounded px-0.5">
          {text.slice(idx, idx + q.length)}
        </mark>
        {text.slice(idx + q.length)}
      </>
    )
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-[80] transition-all duration-300',
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
      )}
    >
      {/* Backdrop */}
      <div
        onClick={closeSearch}
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Search container */}
      <div
        className={cn(
          'relative mx-auto mt-20 max-w-2xl px-4 transition-all duration-500',
          isOpen ? 'translate-y-0 scale-100' : '-translate-y-8 scale-95'
        )}
      >
        <div className="rounded-2xl bg-[#141414] border border-white/10 shadow-2xl overflow-hidden">
          {/* Input row */}
          <div className="flex items-center gap-3 p-4 border-b border-white/10">
            <Search className="h-5 w-5 text-[#D4AF37] shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="جستجوی محصول..."
              className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground"
            />
            {loading && <Loader2 className="h-5 w-5 animate-spin text-[#D4AF37]" />}
            <button
              onClick={closeSearch}
              aria-label="بستن"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary hover:bg-[#D4AF37] hover:text-black transition-all"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Results / Popular */}
          <div className="max-h-[60vh] overflow-y-auto">
            {!query.trim() ? (
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-3">محبوب‌ترین جستجوها</p>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="rounded-full bg-secondary border border-white/10 px-4 py-2 text-sm hover:bg-[#D4AF37] hover:text-black hover:-translate-y-0.5 transition-all"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            ) : !loading && results.length === 0 ? (
              <div className="p-10 text-center">
                <div className="text-5xl mb-3">😕</div>
                <h3 className="text-lg font-semibold mb-1">محصولی پیدا نشد</h3>
                <p className="text-sm text-muted-foreground">دوباره امتحان کنید</p>
              </div>
            ) : (
              <ul className="divide-y divide-white/5">
                {results.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/product/${p.slug}`}
                      onClick={closeSearch}
                      className="flex gap-4 p-4 hover:bg-secondary/50 transition-colors"
                    >
                      <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-secondary">
                        <Image
                          src={p.images[0]}
                          alt={p.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm leading-6 line-clamp-1">
                          {highlight(p.name)}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {p.category}
                        </p>
                        <p className="text-sm font-bold text-[#D4AF37] mt-1 persian-num">
                          {formatToman(p.price)}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
