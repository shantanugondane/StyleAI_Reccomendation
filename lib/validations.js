import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  gender: z.string().optional(),
  stylePreferences: z.array(z.string()).optional().default([]),
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const wardrobeItemSchema = z.object({
  name: z.string().optional(),
  category: z.enum(['Tops', 'Bottoms', 'Dresses', 'Shoes', 'Accessories']),
  color: z.string().optional(),
  season: z.string().optional(),
  occasion: z.string().optional(),
  notes: z.string().optional(),
  imageUrl: z.string().url('Invalid image URL').optional(),
})

export const recommendationSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required'),
  occasion: z.string().optional(),
  season: z.string().optional(),
})
