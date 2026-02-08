/**
 * Razorpay Payment Integration
 * FREE to integrate - Only pay transaction fees when you earn
 * Perfect for Pro subscriptions and one-time payments
 */

interface RazorpayOrder {
  id: string
  amount: number
  currency: string
  receipt: string
}

interface PaymentVerification {
  orderId: string
  paymentId: string
  signature: string
}

/**
 * Create Razorpay order (server-side only)
 */
export async function createRazorpayOrder(
  amount: number,
  currency: 'INR' | 'USD' = 'INR',
  receipt: string
): Promise<RazorpayOrder | null> {
  // This should be called from a server-side API route
  if (typeof window !== 'undefined') {
    throw new Error('This function must be called server-side only')
  }

  const Razorpay = require('razorpay')
  
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.error('Razorpay not configured')
    return null
  }

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  })

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency,
      receipt,
    })

    return order
  } catch (error) {
    console.error('Razorpay order creation error:', error)
    return null
  }
}

/**
 * Verify Razorpay payment signature (server-side only)
 */
export function verifyRazorpaySignature(verification: PaymentVerification): boolean {
  if (typeof window !== 'undefined') {
    throw new Error('This function must be called server-side only')
  }

  const crypto = require('crypto')
  
  if (!process.env.RAZORPAY_KEY_SECRET) {
    console.error('Razorpay secret not configured')
    return false
  }

  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${verification.orderId}|${verification.paymentId}`)
    .digest('hex')

  return generatedSignature === verification.signature
}

/**
 * Get Razorpay key for client-side (public key only)
 */
export function getRazorpayKey(): string {
  return process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || ''
}

/**
 * Subscription plans
 */
export const SUBSCRIPTION_PLANS = {
  monthly: {
    name: 'Pro Monthly',
    amount: 299, // INR
    currency: 'INR',
    duration: '1 month',
    features: [
      'All Interview Prep problems',
      'AI-powered code debugging',
      'Unlimited problem generation',
      'Priority support',
      'Custom profile themes',
      'Ad-free experience',
    ],
  },
  yearly: {
    name: 'Pro Yearly',
    amount: 2999, // INR (save ~17%)
    currency: 'INR',
    duration: '1 year',
    features: [
      'All Monthly Pro features',
      'Save 17% vs monthly',
      'Early access to new features',
      'Exclusive Pro badge',
      'Premium profile themes',
    ],
  },
}

/**
 * Generate UPI QR code (completely free alternative)
 */
export function generateUPILink(
  amount: number,
  merchantUPI: string,
  merchantName: string,
  transactionNote: string
): string {
  return `upi://pay?pa=${merchantUPI}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`
}

/**
 * UPI QR code for direct payments (zero fees)
 */
export function getUPIPaymentInfo() {
  return {
    upi: 'merchant@upi', // Replace with actual UPI ID
    qrCodeUrl: '/api/payment/upi-qr', // API route to generate QR code
    instructions: [
      'Open any UPI app (Google Pay, PhonePe, Paytm, etc.)',
      'Scan the QR code',
      'Enter the amount',
      'Complete the payment',
      'Send screenshot to support for manual verification',
    ],
  }
}
