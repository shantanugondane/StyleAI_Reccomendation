# Clerk Authentication Setup

## Step 1: Create Clerk Account

1. Go to https://clerk.com
2. Sign up for a free account
3. Create a new application

## Step 2: Get Your API Keys

1. In your Clerk dashboard, go to **API Keys**
2. Copy these values:
   - **Publishable Key** (starts with `pk_test_` or `pk_live_`)
   - **Secret Key** (starts with `sk_test_` or `sk_live_`)

## Step 3: Update .env File

Add these to your `.env` file:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Your existing database connection
DATABASE_URL="postgresql://postgres.uubtmaqgtawfszaxnvjh:Shantanu%4012348169@aws-1-ap-south-1.pooler.supabase.com:6543/postgres"

# JWT Secret (not needed for Clerk, but keep it for now)
JWT_SECRET="swlZXoC+IJnJOS2Q2+x41iddpLhg+KPZg5Yyd8AVFMQ="

NODE_ENV="development"
```

## Step 4: Configure Clerk

In your Clerk dashboard:

1. Go to **Paths** settings
2. Set:
   - Sign-in path: `/login`
   - Sign-up path: `/signup`
   - After sign-in redirect: `/dashboard`
   - After sign-up redirect: `/dashboard`

## Step 5: Run Database Migration

```bash
npm run db:migrate
```

Or if that's stuck, use:

```bash
npm run db:push
```

## Step 6: Start Development Server

```bash
npm run dev
```

## That's It! 🎉

Your app now uses Clerk for authentication. Users can:

- Sign up with email/password
- Sign in
- All authentication is handled by Clerk
- No need to manage passwords, JWT tokens, or auth cookies manually!

## Benefits of Clerk

✅ **No password management** - Clerk handles everything  
✅ **Built-in UI components** - Beautiful sign-in/sign-up forms  
✅ **Social logins** - Easy to add Google, GitHub, etc. later  
✅ **Email verification** - Automatic  
✅ **Password reset** - Built-in  
✅ **Session management** - Automatic  
✅ **Security** - Enterprise-grade security out of the box
