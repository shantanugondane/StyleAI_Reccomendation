# StyleAI - AI-Powered Clothes Recommendation Website

A full-stack personal AI stylist that helps users create perfect outfits from their virtual wardrobe.

## 🚀 Features

- **Landing Page** - Beautiful marketing page with feature overview
- **User Authentication** - Secure JWT-based authentication with httpOnly cookies
- **Virtual Wardrobe** - Upload and manage clothing items with image storage
- **AI Recommendations** - Rule-based outfit suggestions from user's wardrobe
- **Database Persistence** - PostgreSQL database with Prisma ORM
- **Responsive Design** - Works perfectly on all devices

## 🛠️ Tech Stack

### Frontend

- **Next.js 14** - React framework with Pages Router
- **Styled Components** - CSS-in-JS for styling
- **React Context** - State management for authentication

### Backend

- **Next.js API Routes** - Serverless API endpoints
- **PostgreSQL** - Relational database
- **Prisma ORM** - Database toolkit and ORM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Zod** - Schema validation
- **Cloudinary** - Image storage (with local fallback)

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database running locally or remote
- (Optional) Cloudinary account for image storage

### Step 1: Clone and Install

```bash
git clone <repository-url>
cd WardrobeProject
npm install
```

### Step 2: Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/wardrobe_db?schema=public"

# JWT Secret (generate a strong random string)
JWT_SECRET="your-super-secret-jwt-key-change-in-production"

# Cloudinary (optional - if not provided, images will be stored locally in /public/uploads)
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

# Node Environment
NODE_ENV="development"
```

**Important:**

- Replace `DATABASE_URL` with your PostgreSQL connection string
- Generate a strong random string for `JWT_SECRET` (you can use: `openssl rand -base64 32`)
- If you don't have Cloudinary, leave those fields empty - images will be stored locally

### Step 3: Database Setup

```bash
# Generate Prisma Client
npm run db:generate

# Run database migrations
npm run db:migrate

# (Optional) Open Prisma Studio to view data
npm run db:studio
```

### Step 4: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Application Flow

1. **Landing Page** - Marketing page with feature overview
2. **Sign Up** - Create account with email, password, gender, and style preferences
3. **Login** - Authenticate with email and password
4. **Dashboard** - Overview of wardrobe stats and quick actions
5. **Wardrobe** - Upload clothing photos, categorize, and manage items
6. **Recommendations** - Get personalized outfit suggestions based on your wardrobe

## 📱 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Wardrobe

- `GET /api/wardrobe` - Get all wardrobe items (authenticated)
- `POST /api/wardrobe` - Create new wardrobe item (authenticated)
- `PUT /api/wardrobe/[id]` - Update wardrobe item (authenticated)
- `DELETE /api/wardrobe/[id]` - Delete wardrobe item (authenticated)

### Upload

- `POST /api/upload` - Upload image file (authenticated)

### Recommendations

- `POST /api/recommendations` - Generate outfit recommendations (authenticated)

## 🗄️ Database Schema

### User Model

- `id` (UUID)
- `name`, `email` (unique), `passwordHash`
- `gender`, `height`, `weight`, `bodyType`, `skinTone`, `hairColor`
- `stylePreferences` (JSON array)
- `createdAt`, `updatedAt`

### WardrobeItem Model

- `id` (UUID)
- `userId` (foreign key)
- `name`, `category`, `color`, `season`, `occasion`
- `imageUrl`, `notes`
- `createdAt`, `updatedAt`

## 🔒 Security Features

- Password hashing with bcrypt
- JWT tokens stored in httpOnly cookies
- Input validation with Zod
- Authorization checks (users can only access their own data)
- SQL injection protection via Prisma
- XSS protection via Next.js

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Database Setup for Production

Use a managed PostgreSQL service:

- **Vercel Postgres** (recommended for Vercel deployments)
- **Supabase**
- **Neon**
- **Railway**

Update `DATABASE_URL` in your production environment.

### Image Storage

For production, use Cloudinary:

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Get your credentials
3. Add to environment variables

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:generate` - Generate Prisma Client
- `npm run db:migrate` - Run database migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Prisma Studio

## 🔧 Development Notes

- All API routes are in `app/api/`
- Frontend pages are in `pages/`
- Authentication context is in `contexts/AuthContext.js`
- Database models are in `prisma/schema.prisma`
- Utility functions are in `lib/`

## 📄 License

This project is for demonstration purposes.

## 🤝 Contributing

This is a client project. For questions or issues, please contact the development team.
