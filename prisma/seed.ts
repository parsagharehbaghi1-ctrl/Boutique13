import { db } from '../src/lib/db'

async function seed() {
  console.log('🌱 Seeding Boutique13 database...')

  // Clear existing
  await db.product.deleteMany()
  await db.contactMessage.deleteMany()
  await db.order.deleteMany()

  const products = [
    {
      name: 'تیشرت اورسایز مشکی Premium',
      slug: 'black-oversized-tshirt-premium',
      price: 1490000,
      oldPrice: 1890000,
      category: 'tshirt',
      description: 'تیشرت اورسایز تهیه شده از پنبه ۱۰۰٪ با دوخت Premium مناسب استفاده روزمره. طراحی مدرن و کیفیت بالا که در هر استایلی خودنمایی می‌کند.',
      images: JSON.stringify(['/images/products/tshirt-2.jpg', '/images/products/tshirt-1.jpg', '/images/products/tshirt-3.jpg']),
      sizes: JSON.stringify(['S', 'M', 'L', 'XL', 'XXL']),
      colors: JSON.stringify([
        { name: 'مشکی', hex: '#0f0f0f' },
        { name: 'سفید', hex: '#ffffff' },
        { name: 'آبی', hex: '#1e6eff' },
      ]),
      brand: 'Boutique13',
      rating: 5,
      reviewCount: 24,
      isFeatured: true,
      inStock: true,
    },
    {
      name: 'تیشرت سفید مینیمال',
      slug: 'white-minimal-tshirt',
      price: 1290000,
      category: 'tshirt',
      description: 'تیشرت سفید مینیمال با طراحی ساده و مناسب استفاده روزمره. پارچه نرم و تنفس‌پذیر که راحتی بی‌نظیری را به شما هدیه می‌دهد.',
      images: JSON.stringify(['/images/products/white-tshirt.jpg', '/images/products/tshirt-1.jpg']),
      sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
      colors: JSON.stringify([
        { name: 'سفید', hex: '#ffffff' },
        { name: 'مشکی', hex: '#0f0f0f' },
      ]),
      brand: 'Boutique13',
      rating: 4.5,
      reviewCount: 18,
      isFeatured: true,
      inStock: true,
    },
    {
      name: 'شلوار بگ مردانه',
      slug: 'mens-baggy-pants',
      price: 2190000,
      oldPrice: 2590000,
      category: 'pants',
      description: 'شلوار بگ مردانه با فرم آزاد و مناسب استایل روزمره. دوخت محکم و پارچه باکیفیت که ماندگاری بالایی دارد.',
      images: JSON.stringify(['/images/products/baggy-pants.jpg', '/images/products/pants-jeans.jpg']),
      sizes: JSON.stringify(['30', '32', '34', '36']),
      colors: JSON.stringify([
        { name: 'مشکی', hex: '#0f0f0f' },
        { name: 'طوسی', hex: '#6b7280' },
        { name: 'کرم', hex: '#e5d9c3' },
      ]),
      brand: 'Boutique13',
      rating: 4.5,
      reviewCount: 12,
      isFeatured: true,
      inStock: true,
    },
    {
      name: 'شلوارک اسپرت',
      slug: 'sport-shorts',
      price: 990000,
      category: 'shorts',
      description: 'شلوارک اسپرت مناسب استایل راحت و استفاده روزمره. پارچه سبک و خنک که برای فصول گرم ایده‌آل است.',
      images: JSON.stringify(['/images/products/sport-shorts.jpg']),
      sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
      colors: JSON.stringify([
        { name: 'مشکی', hex: '#0f0f0f' },
        { name: 'سرمه‌ای', hex: '#1e3a5f' },
      ]),
      brand: 'Boutique13',
      rating: 4,
      reviewCount: 8,
      isFeatured: false,
      inStock: true,
    },
    {
      name: 'کتانی سفید',
      slug: 'white-sneakers',
      price: 3490000,
      oldPrice: 3990000,
      category: 'shoes',
      description: 'کتانی سفید با طراحی مینیمال و مناسب استایل روزمره. زیره ضدلغزش و رویه چرم باکیفیت که راحتی و دوام را تضمین می‌کند.',
      images: JSON.stringify(['/images/products/white-sneakers.jpg', '/images/products/shoes-sport.jpg']),
      sizes: JSON.stringify(['40', '41', '42', '43', '44']),
      colors: JSON.stringify([
        { name: 'سفید', hex: '#ffffff' },
        { name: 'مشکی', hex: '#0f0f0f' },
      ]),
      brand: 'Boutique13',
      rating: 5,
      reviewCount: 31,
      isFeatured: true,
      inStock: true,
    },
    {
      name: 'شلوار جین مردانه',
      slug: 'mens-jeans',
      price: 2750000,
      category: 'pants',
      description: 'شلوار جین مردانه با پارچه دنیم باکیفیت و برش مدرن. مناسب برای استایل کژوال و نیمه‌رسمی.',
      images: JSON.stringify(['/images/products/pants-jeans.jpg']),
      sizes: JSON.stringify(['30', '32', '34', '36']),
      colors: JSON.stringify([
        { name: 'آبی تیره', hex: '#1e3a5f' },
        { name: 'مشکی', hex: '#0f0f0f' },
      ]),
      brand: 'Boutique13',
      rating: 4.5,
      reviewCount: 15,
      isFeatured: true,
      inStock: true,
    },
    {
      name: 'کفش اسپرت مشکی',
      slug: 'black-sport-shoes',
      price: 4200000,
      category: 'shoes',
      description: 'کفش اسپرت مشکی با طراحی مدرن و زیره فنری. مناسب برای ورزش و استایل روزمره.',
      images: JSON.stringify(['/images/products/shoes-sport.jpg']),
      sizes: JSON.stringify(['40', '41', '42', '43', '44']),
      colors: JSON.stringify([
        { name: 'مشکی', hex: '#0f0f0f' },
      ]),
      brand: 'Boutique13',
      rating: 5,
      reviewCount: 22,
      isFeatured: true,
      inStock: true,
    },
    {
      name: 'تیشرت مشکی بیسیک',
      slug: 'black-basic-tshirt',
      price: 890000,
      category: 'tshirt',
      description: 'تیشرت مشکی بیسیک با طراحی ساده و کلاسیک. مناسب برای استایل‌های مختلف و استفاده روزمره.',
      images: JSON.stringify(['/images/products/tshirt1.jpg', '/images/products/tshirt-3.jpg']),
      sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
      colors: JSON.stringify([
        { name: 'مشکی', hex: '#0f0f0f' },
      ]),
      brand: 'Boutique13',
      rating: 4,
      reviewCount: 9,
      isFeatured: false,
      inStock: true,
    },
  ]

  for (const product of products) {
    await db.product.create({ data: product })
  }

  console.log(`✅ Seeded ${products.length} products`)
  console.log('🎉 Seed complete!')
}

seed()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
