# 🌿 New Gangwar Nursery - Full Stack Nursery Management Website

A complete full-stack nursery management website built with React.js, Node.js, Express, and MongoDB Atlas.

## Tech Stack

### Frontend
- **React.js** (Vite) - Fast build tool & framework
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management
- **Framer Motion** - Animations
- **React Icons** - Icon library
- **React Toastify** - Notifications

### Backend
- **Node.js** + **Express.js** - Server runtime & framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Cloudinary** - Image hosting
- **Nodemailer** - Email notifications
- **Multer** - File upload handling
- **express-validator** - Input validation

## Features

- 🌱 Modern premium nursery website with glassmorphism UI
- 🌙 Dark Mode support
- 📱 Fully responsive, mobile-first design
- 🪴 Plant catalog with search, filter, sort & pagination
- 🏆 Featured, Best Seller & New Arrival badges
- 📸 Image gallery with masonry grid & lightbox
- 📞 Contact form with WhatsApp integration
- 🔐 Secure JWT admin authentication
- 📊 Admin dashboard with analytics
- ✏️ CRUD operations for plants
- 📋 Customer inquiry management
- 📧 Email notifications for new inquiries
- 🎨 Smooth animations & transitions

## Project Structure

```
nursery_website/
├── backend/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   ├── cloudinary.js      # Cloudinary config & storage
│   │   └── nodemailer.js      # Email transporter
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── plantController.js
│   │   ├── inquiryController.js
│   │   └── uploadController.js
│   ├── middleware/
│   │   └── auth.js            # JWT protection
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Plant.js
│   │   └── Inquiry.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── plants.js
│   │   ├── inquiries.js
│   │   └── upload.js
│   ├── utils/
│   │   └── categories.js
│   ├── server.js              # Entry point
│   ├── seed.js                # Database seeder
│   ├── package.json
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js       # Axios instance
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── WhatsAppButton.jsx
│   │   │   ├── PlantCard.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── Loader.jsx
│   │   ├── context/
│   │   │   ├── ThemeContext.jsx
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/
│   │   │   └── useScrollAnimation.js
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Plants.jsx
│   │   │   ├── PlantDetail.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── admin/
│   │   │       ├── Login.jsx
│   │   │       ├── Dashboard.jsx
│   │   │       ├── AddPlant.jsx
│   │   │       ├── EditPlant.jsx
│   │   │       └── Inquiries.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

## Installation Guide

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account
- Cloudinary account
- Gmail account (for Nodemailer)

### Step 1: Clone & Install Backend

```bash
cd backend
npm install
```

### Step 2: Configure Backend Environment

Create `backend/.env` file:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/nursery
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=vanshikagangwar3@gmail.com
EMAIL_PASS=your_gmail_app_password
ADMIN_EMAIL=vanshikagangwar3@gmail.com
FRONTEND_URL=http://localhost:5173
```

### Step 3: MongoDB Atlas Setup

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a database user (username + password)
3. Whitelist your IP address (or use `0.0.0.0/0` for development)
4. Get your connection string and add to `.env`

### Step 4: Cloudinary Setup

1. Create a free account at [Cloudinary](https://cloudinary.com)
2. Get your Cloud Name, API Key, and API Secret from the dashboard
3. Add them to `.env`

### Step 5: Gmail App Password (Nodemailer)

1. Enable 2-Step Verification on your Google Account
2. Generate an App Password at: https://myaccount.google.com/apppasswords
3. Use the app password as `EMAIL_PASS` in `.env`

### Step 6: Seed Database

```bash
cd backend
npm run seed
```

This creates sample plants and a default admin account:
- **Email:** vanshikagangwar3@gmail.com
- **Password:** admin123

### Step 7: Start Backend Server

```bash
npm run dev
```

Server runs on `http://localhost:5000`

### Step 8: Install & Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

### Step 9: Access the Website

- **Home:** http://localhost:5173
- **Admin Login:** http://localhost:5173/admin/login
- **Admin Dashboard:** http://localhost:5173/admin

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register admin |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get current admin |

### Plants
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/plants` | Get all plants (with pagination, search, filter, sort) |
| GET | `/api/plants/featured` | Get featured plants |
| GET | `/api/plants/bestsellers` | Get best sellers |
| GET | `/api/plants/new-arrivals` | Get new arrivals |
| GET | `/api/plants/categories` | Get all categories |
| GET | `/api/plants/:id` | Get single plant |
| POST | `/api/plants` | Create plant (admin) |
| PUT | `/api/plants/:id` | Update plant (admin) |
| DELETE | `/api/plants/:id` | Delete plant (admin) |

### Inquiries
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/inquiries` | Create inquiry |
| GET | `/api/inquiries` | Get all inquiries (admin) |
| DELETE | `/api/inquiries/:id` | Delete inquiry (admin) |

### Upload
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/upload` | Upload image (admin) |
| DELETE | `/api/upload` | Delete image (admin) |

## Deployment Guide

### Deploy Backend (Render / Railway / Vercel)

1. Push code to GitHub
2. Create a new Web Service on [Render](https://render.com)
3. Connect your GitHub repository
4. Set:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add all environment variables from `.env`
6. Deploy

### Deploy Frontend (Vercel / Netlify)

1. Push code to GitHub
2. On [Vercel](https://vercel.com), import your repository
3. Set:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add environment variable:
   - `VITE_API_URL=https://your-backend-url.com/api`
5. Deploy

### Update Vite config for production

In `frontend/vite.config.js`, update the proxy or use the environment variable:

```js
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
  },
});
```

## Business Details

- **Name:** New Gangwar Nursery
- **Tagline:** Bringing Nature Closer to Your Home
- **Address:** Vill & Post Barjhala, Kaimganj, Farrukhabad, Uttar Pradesh, India
- **Phone:** 9452437164, 9794942299, 6393753180
- **Email:** vanshikagangwar3@gmail.com

## Plant Categories

1. Indoor Plants
2. Outdoor Plants
3. Flowering Plants
4. Fruit Plants
5. Medicinal Plants
6. Decorative Plants
7. Bonsai Plants
8. Seasonal Plants
9. Shade Trees
10. Hedge Plants

## License

MIT
