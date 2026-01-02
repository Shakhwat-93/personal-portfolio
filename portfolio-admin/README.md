# Portfolio Admin Panel - Setup Guide

## Overview
This is a Next.js application that converts your static HTML portfolio into a dynamic, database-driven site with a powerful admin panel. The public website maintains 100% visual parity with the original design.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd portfolio-admin
npm install
```

### 2. Set Up Supabase Database

1. **Create a Supabase Account**
   - Go to [https://supabase.com](https://supabase.com)
   - Create a new project

2. **Run the Database Schema**
   - Open the SQL Editor in your Supabase dashboard
   - Copy the entire content from `supabase-schema.sql`
   - Paste and run it in the SQL Editor
   -This will create all tables and populate them with your existing portfolio data

3. **Get Your Credentials**
   - Go to Project Settings → API
   - Copy:
     - Project URL
     - `anon` public key
     - `service_role` secret key (keep this secure!)

### 3. Configure Environment Variables

1. Copy `ENV_TEMPLATE.txt` to `.env.local`:
   ```bash
   cp ENV_TEMPLATE.txt .env.local
   ```

2. Edit `.env.local` and fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   
   JWT_SECRET=create-a-random-secret-key-here
   
   ADMIN_EMAIL=your-email@example.com
   ADMIN_PASSWORD=your-secure-password
   ```

### 4. Create Initial Admin User

Run this SQL in your Supabase SQL Editor (replace with your email and password):

```sql
-- First, enable the pgcrypto extension
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Then create your admin user (replace with your email and password)
INSERT INTO users (email, password_hash, role)
VALUES (
  'admin@yourportfolio.com',
  crypt('your-password', gen_salt('bf')),
  'admin'
);
```

### 5. Copy Images and Assets

Copy all images from your original portfolio to the new `public` folder:

```bash
# From the portfolio-admin directory
cp ../*.jpg public/
cp ../*.png public/
cp ../*.svg public/
cp ../*.pdf public/
```

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) - your portfolio should look identical to the original!

### 7. Access Admin Panel

Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login) and log in with your admin credentials.

---

## 📁 Project Structure

```
portfolio-admin/
├── app/
│   ├── page.tsx                 # Main portfolio page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles (from original CSS)
│   ├── admin/
│   │   ├── layout.tsx          # Admin protected layout
│   │   ├── page.tsx            # Admin dashboard home
│   │   ├── login/page.tsx      # Admin login
│   │   ├── hero/page.tsx       # Edit hero section
│   │   ├── projects/page.tsx   # Manage projects
│   │   └── ...                 # Other admin pages
│   └── api/
│       ├── auth/               # Authentication endpoints
│       ├── hero/               # Hero CRUD endpoints
│       └── ...                 # Other API routes
├── components/
│   ├── Navbar.tsx              # Navigation component
│   ├── Hero.tsx                # Hero section
│   ├── Projects.tsx            # Projects section
│   └── ...                     # Other components
├── lib/
│   ├── supabase.ts             # Supabase client & types
│   ├── auth.ts                 # Authentication utilities
│   └── db.ts                   # Database utilities
├── public/                     # Static assets (images, PDFs)
├── supabase-schema.sql         # Database schema
└── ENV_TEMPLATE.txt            # Environment variables template
```

---

## 🛠 Development Workflow

### Making Changes to Content

1. **Via Admin Panel** (Recommended)
   - Log in to `/admin/login`
   - Navigate to the section you want to edit
   - Make changes and save
   - Changes appear instantly on the public site

2. **Directly in Database**
   - Open Supabase dashboard
   - Go to Table Editor
   - Edit content directly
   - Refresh your site to see changes

### Adding New Images

1. Upload via admin panel's media manager
2. Or manually add to `public/` folder
3. Reference in database as `/imagename.jpg`

---

## 🔐 Security Notes

- **Never commit `.env.local`** to version control
- Keep `SUPABASE_SERVICE_ROLE_KEY` secret
- Use strong passwords for admin accounts
- Enable RLS (Row Level Security) in Supabase for production
- Consider adding rate limiting to auth endpoints

---

## 🎨 Customization

### Modifying Styles
- Edit `app/globals.css` for global styles
- Edit individual components for component-specific styles
- All Tailwind classes from the original are preserved

### Adding New Sections
1. Create database table in Supabase
2. Add TypeScript type in `lib/supabase.ts`
3. Create component in `components/`
4. Create admin page in `app/admin/`
5. Add to main page in `app/page.tsx`

---

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to add all variables from `.env.local` to your Vercel project settings.

---

##  ✅ Checklist

- [ ] Supabase project created
- [ ] Database schema executed
- [ ] Environment variables configured
- [ ] Admin user created
- [ ] Images copied to public folder
- [ ] Dev server running successfully
- [ ] Public site looks identical to original
- [ ] Admin login working
- [ ] Can edit content from admin panel
- [ ] Changes reflect on public site

---

## 🐛 Troubleshooting

### "Supabase client error"
- Check that all environment variables are set correctly
- Verify Supabase URL and keys are correct
- Make sure `.env.local` is in the root of portfolio-admin folder

### "Cannot read properties of null"
- Make sure database schema has been run
- Check that default data was inserted
- Verify tables exist in Supabase Table Editor

### "Auth failed"
- Verify admin user exists in `users` table
- Check password was hashed correctly with bcrypt
- Ensure JWT_SECRET is set in `.env.local`

### Styles not matching
- Check that all classes from original HTML are preserved
- Verify `globals.css` was copied correctly
- Check browser console for CSS errors

---

## 📚 Next Steps

1. **Complete All Components**: Finish implementing all portfolio sections
2. **Complete Admin Pages**: Build all CRUD interfaces
3. **Add Image Upload**: Implement file upload functionality
4. **Testing**: Thoroughly test all features
5. **Deploy**: Push to production on Vercel

---

**Happy coding! Your portfolio is now dynamic and easily manageable! 🎉**
