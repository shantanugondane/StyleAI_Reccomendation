import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUserFromClerk } from '@/lib/clerk-auth'
import { recommendationSchema } from '@/lib/validations'

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

    const body = await request.json()
    const { prompt, occasion, season } = recommendationSchema.parse(body)

    // Get user's wardrobe items
    const wardrobeItems = await prisma.wardrobeItem.findMany({
      where: { userId: user.id },
    })

    if (wardrobeItems.length < 2) {
      return NextResponse.json(
        { error: 'Not enough items in wardrobe. Add at least 2 items.' },
        { status: 400 }
      )
    }

    // Simple rule-based outfit generation
    const generateOutfit = (index) => {
      const tops = wardrobeItems.filter(item => item.category === 'Tops')
      const bottoms = wardrobeItems.filter(item => item.category === 'Bottoms')
      const dresses = wardrobeItems.filter(item => item.category === 'Dresses')
      const shoes = wardrobeItems.filter(item => item.category === 'Shoes')
      const accessories = wardrobeItems.filter(item => item.category === 'Accessories')

      // Filter by season/occasion if provided
      const filterByCriteria = (items) => {
        let filtered = items
        if (season) {
          filtered = filtered.filter(item => !item.season || item.season === season)
        }
        if (occasion) {
          filtered = filtered.filter(item => !item.occasion || item.occasion === occasion)
        }
        return filtered.length > 0 ? filtered : items
      }

      const filteredTops = filterByCriteria(tops)
      const filteredBottoms = filterByCriteria(bottoms)
      const filteredDresses = filterByCriteria(dresses)
      const filteredShoes = filterByCriteria(shoes)
      const filteredAccessories = filterByCriteria(accessories)

      // Generate outfit combination
      const outfitItems = []
      let title = ''
      let description = ''

      if (dresses.length > 0 && index === 0) {
        // First outfit: Use a dress if available
        const dress = filteredDresses[index % filteredDresses.length]
        outfitItems.push(dress.name || 'Dress')
        title = 'Elegant Dress Look'
        description = 'A sophisticated dress ensemble perfect for any occasion.'
      } else {
        // Other outfits: Top + Bottom combination
        if (filteredTops.length > 0 && filteredBottoms.length > 0) {
          const top = filteredTops[index % filteredTops.length]
          const bottom = filteredBottoms[index % filteredBottoms.length]
          outfitItems.push(top.name || 'Top', bottom.name || 'Bottom')
          
          if (index === 0) {
            title = 'Professional Elegance'
            description = 'Perfect for your office meeting. This combination exudes confidence and professionalism.'
          } else if (index === 1) {
            title = 'Smart Casual'
            description = 'A versatile look that transitions well from office to after-work drinks.'
          } else {
            title = 'Modern Minimalist'
            description = 'Clean lines and neutral tones create a sophisticated appearance.'
          }
        } else {
          // Fallback if no tops/bottoms
          const item = wardrobeItems[index % wardrobeItems.length]
          outfitItems.push(item.name || item.category)
          title = 'Stylish Look'
          description = 'A curated outfit from your wardrobe.'
        }
      }

      // Add shoes if available
      if (filteredShoes.length > 0) {
        const shoe = filteredShoes[index % filteredShoes.length]
        outfitItems.push(shoe.name || 'Shoes')
      }

      // Add accessory if available
      if (filteredAccessories.length > 0 && index === 0) {
        const accessory = filteredAccessories[0]
        outfitItems.push(accessory.name || 'Accessory')
      }

      return {
        id: index + 1,
        title,
        rating: 4.5 + (Math.random() * 0.5), // 4.5 to 5.0
        description,
        items: outfitItems,
        featured: index === 0,
      }
    }

    // Generate 3 outfit recommendations
    const recommendations = [
      generateOutfit(0),
      generateOutfit(1),
      generateOutfit(2),
    ]

    return NextResponse.json({ recommendations })
  } catch (error) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Recommendations error:', error)
    return NextResponse.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 }
    )
  }
}
