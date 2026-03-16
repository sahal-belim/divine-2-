# Divine Clothing - Setup & Deployment Guide

## Project Overview

Divine Clothing is a luxury fashion e-commerce platform with:
- Customer-facing storefront (Homepage, Shop, Product Details)
- Admin dashboard for product and message management
- WhatsApp integration for order inquiries
- Contact form for customer messages
- NextAuth authentication system

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS + shadcn/ui
- **Image Uploads**: Vercel Blob (ready to implement)
- **Payment**: WhatsApp-based ordering

## Getting Started

### 1. Database Setup

The database is automatically initialized when you first run the application. The schema includes:

- **User**: Admin user with email/password authentication
- **Product**: Product catalog with name, description, price, sizes, and images
- **ContactMessage**: Customer contact form submissions

Default admin credentials:
- Email: `admin@divineclothing.com`
- Password: `admin123`

### 2. Run the Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
app/
├── page.tsx                    # Homepage with hero, featured products, about, contact
├── login/page.tsx             # Admin login page
├── shop/page.tsx              # Product catalog page
├── product/[id]/page.tsx      # Product detail page
├── api/
│   ├── auth/[...nextauth]/    # NextAuth authentication routes
│   └── contact/route.ts       # Contact form submission endpoint
├── admin/                      # Admin dashboard routes (protected)
│   ├── layout.tsx             # Admin layout with sidebar
│   ├── page.tsx               # Dashboard overview
│   ├── products/
│   │   ├── page.tsx           # Products management
│   │   └── new/page.tsx       # Add new product form
│   ├── messages/page.tsx      # Contact messages view
│   └── settings/page.tsx      # Configuration page

components/
├── header.tsx                 # Navigation header
├── footer.tsx                 # Footer with links
├── product-card.tsx           # Product display card
├── contact-form.tsx           # Contact form component
└── ui/                        # shadcn/ui components

lib/
├── auth.ts                    # NextAuth configuration
├── prisma.ts                  # Prisma client instance
├── whatsapp.ts               # WhatsApp integration utilities

prisma/
└── schema.prisma             # Database schema definition
```

## Features & Implementation

### Customer Site

1. **Homepage** (`/`)
   - Hero section with gradient background
   - Featured products grid
   - About section with key statistics
   - Contact form for inquiries

2. **Shop Page** (`/shop`)
   - Product catalog with grid layout
   - Sorting (by price, newest)
   - Category filtering (ready to implement)
   - Responsive design (1 col mobile, 2 cols tablet, 3 cols desktop)

3. **Product Details** (`/product/[id]`)
   - Product image, description, pricing
   - Size and quantity selection
   - WhatsApp order button with pre-filled message
   - Related products section

### Admin Dashboard

1. **Dashboard** (`/admin`)
   - Statistics overview
   - Quick action cards
   - Recent products list
   - Message count

2. **Products Management** (`/admin/products`)
   - View all products in table format
   - Search and filter
   - Publish/unpublish products
   - Delete products
   - Add new product form with image upload

3. **Messages** (`/admin/messages`)
   - View contact form submissions
   - Mark as read/unread
   - Reply via email
   - Message on WhatsApp
   - Delete messages

4. **Settings** (`/admin/settings`)
   - WhatsApp business number configuration
   - Contact information (email, phone, address)
   - Password management

## WhatsApp Integration

The app uses WhatsApp for order inquiries. When customers click "Order via WhatsApp":

1. A pre-formatted message is generated with:
   - Product name
   - Selected size
   - Quantity
   - Total price

2. They're redirected to WhatsApp with the message pre-filled
3. Admin receives the order inquiry in WhatsApp

### Configuring WhatsApp Number

1. Go to Admin > Settings
2. Enter your WhatsApp Business Number
3. Save settings

The default number is `+1 (555) 000-0000` - update this with your actual WhatsApp number.

## Environment Variables

Create a `.env.local` file:

```
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

For production:
- Update `NEXTAUTH_URL` to your domain
- Generate a secure `NEXTAUTH_SECRET` using `openssl rand -base64 32`

## Database Migrations

The Prisma schema is automatically synced with `npx prisma generate` and migrations.

To modify the schema:

1. Edit `prisma/schema.prisma`
2. Run: `npx prisma migrate dev --name description`
3. Restart the dev server

## Image Uploads (Ready to Implement)

The product form has an image upload field. To enable:

1. Set up Vercel Blob integration
2. Update `app/admin/products/new/page.tsx` to handle file uploads
3. Store image URLs in the database
4. Display images on product cards and detail pages

## Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Important Configuration

1. **Database**: SQLite works for development. For production, migrate to:
   - PostgreSQL (recommended)
   - MySQL
   - MongoDB

2. **Environment Variables**: Set in Vercel project settings:
   - `DATABASE_URL`
   - `NEXTAUTH_URL` (use your domain)
   - `NEXTAUTH_SECRET`

3. **WhatsApp Integration**: Update phone number in admin settings

## API Endpoints

### Contact Form
- **POST** `/api/contact`
- Body: `{ name: string, email: string, message: string }`
- Returns: Success status

### Authentication Routes
- **POST** `/api/auth/signin` - Sign in
- **POST** `/api/auth/signout` - Sign out
- **GET** `/api/auth/session` - Get current session

## Security Notes

- Admin routes are protected by middleware
- Passwords are hashed with bcrypt
- NextAuth sessions use secure HTTP-only cookies
- Input validation on all forms

## Customization Guide

### Change Brand Colors
Edit `app/globals.css` design tokens:
- `--primary`: Main brand color (currently dark green)
- `--accent`: Accent color (currently gold)
- `--background`: Light/dark mode backgrounds

### Update Contact Information
1. Edit footer in `components/footer.tsx`
2. Update admin settings page
3. Modify WhatsApp number in settings

### Add Product Categories
1. Update `prisma/schema.prisma` to add category field
2. Modify product forms to include category selection
3. Update shop page filters

### Customize WhatsApp Message Format
Edit `lib/whatsapp.ts` `formatOrderMessage()` function

## Troubleshooting

### Admin login not working
- Verify database is initialized
- Check credentials in `.env.local`
- Clear browser cookies and try again

### Images not displaying
- Add image URLs to product records
- Check Vercel Blob configuration if using image uploads
- Use placeholder gradient if no image available

### WhatsApp links not opening
- Verify WhatsApp number format includes country code
- Test link in browser console: `window.open(whatsappUrl)`
- Update phone number in admin settings

## Support & Future Enhancements

Potential features to add:
- Product categories and tags
- Customer accounts and wishlists
- Order history
- Payment gateway integration (Stripe)
- Email notifications
- Analytics dashboard
- Product reviews and ratings
- Inventory management
- Bulk product imports
