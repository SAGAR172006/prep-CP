import { NextRequest, NextResponse } from 'next/server'
import { createRazorpayOrder } from '@/lib/payment'

/**
 * Create Razorpay Order API
 * Free to integrate - Only pay transaction fees when you earn
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { plan, userId } = body

    if (!plan || !userId) {
      return NextResponse.json(
        { error: 'Plan and userId are required' },
        { status: 400 }
      )
    }

    // Validate plan
    const validPlans = ['monthly', 'yearly']
    if (!validPlans.includes(plan)) {
      return NextResponse.json(
        { error: 'Invalid plan' },
        { status: 400 }
      )
    }

    // Get plan details
    const { SUBSCRIPTION_PLANS } = await import('@/lib/payment')
    const planDetails = SUBSCRIPTION_PLANS[plan as keyof typeof SUBSCRIPTION_PLANS]

    // Create Razorpay order
    const order = await createRazorpayOrder(
      planDetails.amount,
      planDetails.currency as 'INR' | 'USD',
      `sub_${userId}_${Date.now()}`
    )

    if (!order) {
      return NextResponse.json(
        { error: 'Failed to create payment order' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      plan: planDetails,
    })
  } catch (error) {
    console.error('Payment order creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create payment order' },
      { status: 500 }
    )
  }
}
