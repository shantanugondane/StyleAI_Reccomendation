import { NextResponse } from 'next/server'
import { getCurrentUserFromClerk } from '@/lib/clerk-auth'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

// Force dynamic rendering - this route should not be statically analyzed
export const dynamic = 'force-dynamic'

export async function POST(request) {
  try {
    const user = await getCurrentUserFromClerk()

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file')

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Check if Cloudinary is configured
    if (process.env.CLOUDINARY_CLOUD_NAME) {
      // Use Cloudinary
      const cloudinary = require('cloudinary').v2
      
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      })

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: 'wardrobe',
            resource_type: 'image',
          },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          }
        ).end(buffer)
      })

      return NextResponse.json({ 
        imageUrl: result.secure_url,
        publicId: result.public_id 
      })
    } else {
      // Fallback to local storage
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const uploadsDir = join(process.cwd(), 'public', 'uploads')
      
      if (!existsSync(uploadsDir)) {
        await mkdir(uploadsDir, { recursive: true })
      }

      const filename = `${Date.now()}-${file.name}`
      const filepath = join(uploadsDir, filename)

      await writeFile(filepath, buffer)

      const imageUrl = `/uploads/${filename}`
      return NextResponse.json({ imageUrl })
    }
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    )
  }
}
