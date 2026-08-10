import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'تمام فیلدها الزامی هستند' },
        { status: 400 }
      )
    }

    await db.contactMessage.create({
      data: { name, email, phone, message },
    })

    return NextResponse.json({ success: true, message: 'پیام شما با موفقیت ارسال شد' })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'ارسال پیام ناموفق بود' }, { status: 500 })
  }
}
