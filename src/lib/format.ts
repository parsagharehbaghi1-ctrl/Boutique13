// Utility helpers for Boutique13

/** Format a number as Persian Toman currency, e.g. 1490000 -> "۱,۴۹۰,۰۰۰ تومان" */
export function formatToman(amount: number): string {
  return `${amount.toLocaleString('fa-IR')} تومان`
}

/** Format a number with Persian digits and separators only */
export function toPersianNum(value: number | string): string {
  return Number(value).toLocaleString('fa-IR')
}

/** Normalize Persian text for search (ي→ی, ك→ک, lowercase, trim) */
export function normalizePersian(text: string): string {
  return text
    .replace(/ي/g, 'ی')
    .replace(/ك/g, 'ک')
    .toLowerCase()
    .trim()
}

/** Category labels mapping */
export const CATEGORY_LABELS: Record<string, string> = {
  all: 'همه',
  tshirt: 'تیشرت',
  pants: 'شلوار',
  shorts: 'شلوارک',
  shoes: 'کفش',
  accessories: 'اکسسوری',
}

export const CATEGORIES = [
  { id: 'all', label: 'همه' },
  { id: 'tshirt', label: 'تیشرت' },
  { id: 'pants', label: 'شلوار' },
  { id: 'shorts', label: 'شلوارک' },
  { id: 'shoes', label: 'کفش' },
  { id: 'accessories', label: 'اکسسوری' },
]
