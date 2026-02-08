/**
 * Cloudinary Integration - Free File Storage
 * FREE TIER: 25GB storage, 25GB bandwidth/month
 * Perfect for user avatars, profile banners, and problem images
 */

interface CloudinaryUploadResult {
  secure_url: string
  public_id: string
  format: string
  width: number
  height: number
  bytes: number
}

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET

/**
 * Upload image to Cloudinary
 */
export async function uploadImage(
  file: File,
  folder: 'avatars' | 'banners' | 'problems' = 'avatars'
): Promise<CloudinaryUploadResult> {
  if (!CLOUDINARY_CLOUD_NAME) {
    throw new Error('Cloudinary not configured')
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'prep-cp') // Create this preset in Cloudinary dashboard
  formData.append('folder', folder)

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    )

    if (!response.ok) {
      throw new Error('Upload failed')
    }

    return await response.json()
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    throw error
  }
}

/**
 * Delete image from Cloudinary
 */
export async function deleteImage(publicId: string): Promise<boolean> {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error('Cloudinary not fully configured')
  }

  try {
    const timestamp = Math.round(new Date().getTime() / 1000)
    const signature = await generateSignature(publicId, timestamp)

    const formData = new FormData()
    formData.append('public_id', publicId)
    formData.append('signature', signature)
    formData.append('api_key', CLOUDINARY_API_KEY)
    formData.append('timestamp', timestamp.toString())

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/destroy`,
      {
        method: 'POST',
        body: formData,
      }
    )

    const result = await response.json()
    return result.result === 'ok'
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    return false
  }
}

/**
 * Generate Cloudinary signature for secure operations
 */
async function generateSignature(publicId: string, timestamp: number): Promise<string> {
  const crypto = require('crypto')
  const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`
  return crypto.createHash('sha1').update(stringToSign).digest('hex')
}

/**
 * Get optimized image URL
 */
export function getOptimizedImageUrl(
  publicId: string,
  options: {
    width?: number
    height?: number
    quality?: number
    format?: 'auto' | 'webp' | 'avif'
    crop?: 'fill' | 'fit' | 'scale'
  } = {}
): string {
  if (!CLOUDINARY_CLOUD_NAME) {
    return ''
  }

  const {
    width = 300,
    height,
    quality = 80,
    format = 'auto',
    crop = 'fill',
  } = options

  const transformations = [
    `w_${width}`,
    height ? `h_${height}` : null,
    `q_${quality}`,
    `f_${format}`,
    `c_${crop}`,
  ].filter(Boolean).join(',')

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformations}/${publicId}`
}

/**
 * Validate image file
 */
export function validateImageFile(file: File): {
  valid: boolean
  error?: string
} {
  const maxSize = 5 * 1024 * 1024 // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.',
    }
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File too large. Maximum size is 5MB.',
    }
  }

  return { valid: true }
}
