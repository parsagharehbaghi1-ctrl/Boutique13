import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

interface OrderItemPayload {
  id: string
  name: string
  price: number
  qty: number
  color?: string
  size?: string
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userName, userPhone, items, total, address } = body ?? {}

    if (!userName || typeof userName !== 'string' || !userName.trim()) {
      return NextResponse.json({ error: 'نام تحویل‌گیرنده الزامی است' }, { status: 400 })
    }
    if (!userPhone || typeof userPhone !== 'string' || !/^09\d{9}$/.test(userPhone)) {
      return NextResponse.json({ error: 'شماره موبایل معتبر نیست' }, { status: 400 })
    }
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'سبد خرید خالی است' }, { status: 400 })
    }
    if (!address || typeof address !== 'string' || !address.trim()) {
      return NextResponse.json({ error: 'آدرس الزامی است' }, { status: 400 })
    }

    const computedTotal = items.reduce(
      (sum: number, i: OrderItemPayload) => sum + Number(i.price) * Number(i.qty),
      0
    )
    const finalTotal = Number(total) || computedTotal

    const orderNo = `B13-${Date.now().toString().slice(-8)}`

    const order = await db.order.create({
      data: {
        orderNo,
        userName: userName.trim(),
        userPhone: userPhone.trim(),
        total: finalTotal,
        status: 'processing',
        items: JSON.stringify(items),
        address: address.trim(),
      },
    })

    return NextResponse.json({ success: true, orderNo: order.orderNo, orderId: order.id })
  } catch (err) {
    console.error('Order creation failed:', err)
    return NextResponse.json({ error: 'خطا در ثبت سفارش' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const orders = await db.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    })
    return NextResponse.json({ orders })
  } catch (err) {
    console.error('Fetch orders failed:', err)
    return NextResponse.json({ error: 'خطا در دریافت سفارش‌ها' }, { status: 500 })
  }
}
