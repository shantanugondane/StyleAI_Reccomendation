import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUserFromClerk } from '@/lib/clerk-auth'
import { wardrobeItemSchema } from '@/lib/validations'

// PUT /api/wardrobe/[id] - Update wardrobe item
export async function PUT(request, { params }) {
  try {
    const user = await getCurrentUserFromClerk()

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const { id } = params
    const body = await request.json()
    const validatedData = wardrobeItemSchema.partial().parse(body)

    // Check if item exists and belongs to user
    const existingItem = await prisma.wardrobeItem.findUnique({
      where: { id },
    })

    if (!existingItem) {
      return NextResponse.json(
        { error: 'Wardrobe item not found' },
        { status: 404 }
      )
    }

    if (existingItem.userId !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    const item = await prisma.wardrobeItem.update({
      where: { id },
      data: validatedData,
    })

    return NextResponse.json({ item })
  } catch (error) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Update wardrobe item error:', error)
    return NextResponse.json(
      { error: 'Failed to update wardrobe item' },
      { status: 500 }
    )
  }
}

// DELETE /api/wardrobe/[id] - Delete wardrobe item
export async function DELETE(request, { params }) {
  try {
    const user = await getCurrentUserFromClerk()

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const { id } = params

    // Check if item exists and belongs to user
    const existingItem = await prisma.wardrobeItem.findUnique({
      where: { id },
    })

    if (!existingItem) {
      return NextResponse.json(
        { error: 'Wardrobe item not found' },
        { status: 404 }
      )
    }

    if (existingItem.userId !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    await prisma.wardrobeItem.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Item deleted successfully' })
  } catch (error) {
    console.error('Delete wardrobe item error:', error)
    return NextResponse.json(
      { error: 'Failed to delete wardrobe item' },
      { status: 500 }
    )
  }
}
