import { auth, currentUser } from '@clerk/nextjs'
import { prisma } from './prisma'

export async function getCurrentUserFromClerk() {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return null
    }

    // Get user from Clerk
    const clerkUser = await currentUser()
    
    if (!clerkUser) {
      return null
    }

    // Check if user exists in our database, if not create them
    let user = await prisma.user.findUnique({
      where: { email: clerkUser.emailAddresses[0]?.emailAddress },
      select: {
        id: true,
        name: true,
        email: true,
        gender: true,
        height: true,
        weight: true,
        bodyType: true,
        skinTone: true,
        hairColor: true,
        stylePreferences: true,
        createdAt: true,
      },
    })

    // If user doesn't exist in our DB, create them
    if (!user) {
      user = await prisma.user.create({
        data: {
          id: userId,
          name: clerkUser.firstName || clerkUser.fullName || 'User',
          email: clerkUser.emailAddresses[0]?.emailAddress || '',
          passwordHash: '', // Clerk handles password, we don't need it
          stylePreferences: [],
        },
        select: {
          id: true,
          name: true,
          email: true,
          gender: true,
          height: true,
          weight: true,
          bodyType: true,
          skinTone: true,
          hairColor: true,
          stylePreferences: true,
          createdAt: true,
        },
      })
    }

    return user
  } catch (error) {
    console.error('Error getting user from Clerk:', error)
    return null
  }
}

export async function requireAuth() {
  const { userId } = await auth()
  
  if (!userId) {
    throw new Error('Unauthorized')
  }

  return userId
}
