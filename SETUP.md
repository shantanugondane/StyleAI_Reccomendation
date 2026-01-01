# Quick Setup Guide

## Step 1: Create .env File

Create a `.env` file in the root directory with the following content:

```env
# Database - Replace with your PostgreSQL connection string
DATABASE_URL="postgresql://username:password@localhost:5432/wardrobe_db?schema=public"

# JWT Secret - Generate a random string (you can use: openssl rand -base64 32)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Cloudinary (Optional - leave empty to use local file storage)
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

# Node Environment
NODE_ENV="development"
```

## Step 2: Set Up PostgreSQL Database

### Option A: Local PostgreSQL

1. Install PostgreSQL if not already installed
2. Create a database:
   ```sql
   CREATE DATABASE wardrobe_db;
   ```
3. Update DATABASE_URL in .env with your credentials

### Option B: Use a Free Cloud Database (Recommended for Quick Start)

- **Supabase**: https://supabase.com (Free tier available)
- **Neon**: https://neon.tech (Free tier available)
- **Railway**: https://railway.app (Free tier available)

Copy the connection string they provide and paste it as DATABASE_URL in your .env file.

## Step 3: Generate Prisma Client

```bash
npm run db:generate
```

## Step 4: Run Database Migrations

```bash
npm run db:migrate
```

This will create all the tables in your database.

## Step 5: Start Development Server

```bash
npm run dev
```

## Troubleshooting

### If you get "EPERM" error on Windows:

- Close any running Node processes
- Try running the command again
- If it persists, restart your terminal/IDE

### If you get database connection errors:

- Verify your DATABASE_URL is correct
- Make sure PostgreSQL is running (if using local)
- Check that the database exists
- Verify username/password are correct

### If Prisma Client generation fails:

- Delete `node_modules/.prisma` folder
- Run `npm run db:generate` again
