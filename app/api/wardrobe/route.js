import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUserFromClerk } from '@/lib/clerk-auth'
import { wardrobeItemSchema } from '@/lib/validations'

// GET /api/wardrobe - Get all wardrobe items for current user
export async function GET() {
  try {
    const user = await getCurrentUserFromClerk()

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const items = await prisma.wardrobeItem.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ items })
  } catch (error) {
    console.error('Get wardrobe error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch wardrobe items' },
      { status: 500 }
    )
  }
}

// POST /api/wardrobe - Create new wardrobe item
export async function POST(request) {
  try {
    const user = await getCurrentUserFromClerk()

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = wardrobeItemSchema.parse(body)

    const item = await prisma.wardrobeItem.create({
      data: {
        userId: user.id,
        name: validatedData.name || null,
        category: validatedData.category,
        color: validatedData.color || null,
        season: validatedData.season || null,
        occasion: validatedData.occasion || null,
        imageUrl: validatedData.imageUrl || '',
        notes: validatedData.notes || null,
      },
    })

    return NextResponse.json({ item }, { status: 201 })
  } catch (error) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Create wardrobe item error:', error)
    return NextResponse.json(
      { error: 'Failed to create wardrobe item' },
      { status: 500 }
    )
  }
}
