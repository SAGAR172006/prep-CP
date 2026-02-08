/**
 * Resend Email Service Integration
 * FREE TIER: 3,000 emails/month, 100 emails/day
 * Perfect for transactional emails and notifications
 */

import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@prep-cp.com'

if (!resend) {
  console.warn('Resend not configured. Email functionality will be disabled.')
}

interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

/**
 * Send email using Resend
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  if (!resend) {
    console.warn('Email not sent - Resend not configured')
    return false
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    })
    return true
  } catch (error) {
    console.error('Email send error:', error)
    return false
  }
}

/**
 * Send welcome email to new users
 */
export async function sendWelcomeEmail(userEmail: string, userName: string): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Prep CP! 🚀</h1>
          </div>
          <div class="content">
            <h2>Hey ${userName}!</h2>
            <p>We're excited to have you join our coding community!</p>
            <p>Get started with these features:</p>
            <ul>
              <li>🎯 Solve coding problems across multiple languages</li>
              <li>🏆 Compete in leagues and earn points</li>
              <li>🔥 Maintain daily streaks</li>
              <li>🤖 Get AI-powered help with debugging</li>
              <li>👥 Connect with other coders</li>
            </ul>
            <a href="${process.env.NEXTAUTH_URL}/dashboard" class="button">Start Coding Now</a>
            <p>Happy coding! 💻</p>
          </div>
          <div class="footer">
            <p>© 2024 Prep CP. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail({
    to: userEmail,
    subject: 'Welcome to Prep CP! 🎉',
    html,
    text: `Hey ${userName}! Welcome to Prep CP. Start your coding journey at ${process.env.NEXTAUTH_URL}/dashboard`,
  })
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(
  userEmail: string,
  resetToken: string
): Promise<boolean> {
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`
  
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 10px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="content">
            <h2>Password Reset Request</h2>
            <p>You requested to reset your password. Click the button below to proceed:</p>
            <a href="${resetUrl}" class="button">Reset Password</a>
            <div class="warning">
              <strong>⚠️ Security Notice:</strong>
              <p>This link will expire in 1 hour. If you didn't request this, please ignore this email.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail({
    to: userEmail,
    subject: 'Reset Your Password - Prep CP',
    html,
    text: `Reset your password: ${resetUrl}`,
  })
}

/**
 * Send notification email
 */
export async function sendNotificationEmail(
  userEmail: string,
  title: string,
  message: string
): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="content">
            <h2>${title}</h2>
            <p>${message}</p>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail({
    to: userEmail,
    subject: title,
    html,
    text: message,
  })
}
