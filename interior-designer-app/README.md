# Interior Designer Web Application 🏡

A complete, production-ready full-stack Interior Designer Web Application with modern UI/UX, 3D room visualization, and role-based authentication.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [User Roles](#user-roles)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)

## ✨ Features

### Core Features

#### Authentication System
- JWT-based authentication
- Google OAuth integration ready
- Password encryption with bcrypt
- Role-based access control (Client, Designer, Admin)
- Protected routes

#### Client Features
- **Dashboard**: Overview of projects, designs, and activity
- **Room Designer**: 2D drag-and-drop editor with 3D visualization (Three.js)
- **Design Templates**: Pre-built layouts (living room, bedroom, kitchen)
- **AI Design Assistant**: Upload room images for layout suggestions
- **Marketplace**: Browse and purchase furniture with filters
- **Budget Estimator**: Real-time cost calculation
- **Designer Booking**: Browse, book consultations, and chat with designers
- **Order Management**: Track orders and delivery status

#### Designer Features
- Profile creation and management
- Portfolio upload (images/videos)
- Pricing and availability settings
- Booking management
- Client chat system
- Design sharing
- Earnings dashboard
- Rating and review system

#### Admin Panel
- User management (clients/designers)
- Designer approval system
- Product and category management
- Booking and transaction monitoring
- Analytics dashboard
- Content moderation

### UI/UX Features
- Fully responsive (mobile-first design)
- Modern SaaS-style interface
- Light/Dark mode toggle
- Glassmorphism effects
- Smooth animations and transitions
- Accessible design (WCAG compliant)

## 🛠 Tech Stack

### Frontend
- **React.js 18** - UI library with functional components and hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Three.js** - 3D visualization
- **@react-three/fiber** - React renderer for Three.js
- **Zustand** - State management
- **React Query** - Server state management
- **React Router v6** - Routing
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **Socket.io-client** - Real-time communication

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Socket.io** - WebSocket server
- **Cloudinary** - Image storage
- **Stripe** - Payment processing
- **Passport.js** - OAuth authentication

## 📁 Project Structure

```
interior-designer-app/
├── backend/
│   ├── config/
│   │   ├── database.js          # MongoDB connection
│   │   └── cloudinary.js        # Cloudinary configuration
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── productController.js # Product CRUD
│   │   ├── designerController.js# Designer operations
│   │   ├── bookingController.js # Booking management
│   │   ├── roomDesignController.js# Room design operations
│   │   └── orderController.js   # Order processing
│   ├── middleware/
│   │   └── auth.js              # JWT verification & authorization
│   ├── models/
│   │   ├── User.js              # User model
│   │   ├── DesignerProfile.js   # Designer profile model
│   │   ├── Product.js           # Product model
│   │   ├── RoomDesign.js        # Room design model
│   │   ├── Booking.js           # Booking model
│   │   ├── Order.js             # Order model
│   │   └── Chat.js              # Chat model
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   ├── productRoutes.js     # Product endpoints
│   │   ├── designerRoutes.js    # Designer endpoints
│   │   ├── bookingRoutes.js     # Booking endpoints
│   │   ├── roomDesignRoutes.js  # Design endpoints
│   │   └── orderRoutes.js       # Order endpoints
│   ├── utils/
│   │   └── auth.js              # Auth utilities
│   ├── .env.example             # Environment variables template
│   ├── server.js                # Express server entry point
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── common/          # Reusable components
    │   │   │   ├── MainLayout.jsx
    │   │   │   ├── DashboardLayout.jsx
    │   │   │   ├── Navbar.jsx
    │   │   │   ├── Sidebar.jsx
    │   │   │   ├── DashboardNav.jsx
    │   │   │   └── Footer.jsx
    │   │   ├── client/          # Client-specific components
    │   │   ├── designer/        # Designer-specific components
    │   │   └── admin/           # Admin-specific components
    │   ├── contexts/
    │   │   ├── authStore.js     # Authentication state
    │   │   └── themeStore.js    # Theme state
    │   ├── pages/
    │   │   ├── auth/
    │   │   │   ├── Login.jsx
    │   │   │   └── Register.jsx
    │   │   ├── client/
    │   │   │   ├── ClientDashboard.jsx
    │   │   │   ├── RoomDesigner.jsx
    │   │   │   ├── MyDesigns.jsx
    │   │   │   ├── Cart.jsx
    │   │   │   ├── Checkout.jsx
    │   │   │   ├── MyOrders.jsx
    │   │   │   └── MyBookings.jsx
    │   │   ├── designer/
    │   │   │   ├── DesignerDashboard.jsx
    │   │   │   ├── DesignerProfile.jsx
    │   │   │   ├── DesignerBookings.jsx
    │   │   │   └── DesignerEarnings.jsx
    │   │   ├── admin/
    │   │   │   ├── AdminDashboard.jsx
    │   │   │   ├── ManageUsers.jsx
    │   │   │   ├── ManageProducts.jsx
    │   │   │   └── ManageBookings.jsx
    │   │   ├── LandingPage.jsx
    │   │   ├── Marketplace.jsx
    │   │   └── DesignerList.jsx
    │   ├── services/
    │   │   ├── api.js           # Axios instance
    │   │   └── apiService.js    # API methods
    │   ├── App.jsx              # Main app component
    │   ├── main.jsx             # Entry point
    │   └── index.css            # Global styles
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── postcss.config.js
```

## 🚀 Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd interior-designer-app
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## ⚙️ Configuration

### Backend Configuration

1. Copy `.env.example` to `.env` in the backend directory:

```bash
cd backend
cp .env.example .env
```

2. Update the `.env` file with your credentials:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/interior-designer-app
# Or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/interior-designer-app

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe (for payments)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Email (Optional - for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Session Secret
SESSION_SECRET=your_session_secret_key
```

### Frontend Configuration

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## 🏃 Running the Application

### Development Mode

1. **Start MongoDB** (if running locally):
```bash
mongod
```

2. **Start Backend Server**:
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:5000`

3. **Start Frontend Development Server** (in a new terminal):
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:3000`

4. Open your browser and navigate to `http://localhost:3000`

### Production Build

#### Backend:
```bash
cd backend
npm start
```

#### Frontend:
```bash
cd frontend
npm run build
npm run preview
```

## 👥 User Roles

### Client
- Design rooms in 2D/3D
- Browse and purchase furniture
- Book designer consultations
- Track orders and bookings

### Designer
- Create and manage profile
- Upload portfolio
- Manage bookings
- Chat with clients
- Track earnings

### Admin
- Manage all users
- Approve designers
- Manage products and categories
- Monitor transactions
- View analytics

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login user | No |
| GET | `/auth/me` | Get current user | Yes |
| PUT | `/auth/updatedetails` | Update user profile | Yes |
| PUT | `/auth/updatepassword` | Update password | Yes |

### Product Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/products` | Get all products | No |
| GET | `/products/:id` | Get single product | No |
| POST | `/products` | Create product | Admin |
| PUT | `/products/:id` | Update product | Admin |
| DELETE | `/products/:id` | Delete product | Admin |

### Designer Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/designers` | Get all designers | No |
| GET | `/designers/:id` | Get single designer | No |
| GET | `/designers/me` | Get my profile | Designer |
| POST | `/designers/profile` | Create/Update profile | Designer |
| POST | `/designers/portfolio` | Add portfolio item | Designer |
| PUT | `/designers/:id/approve` | Approve designer | Admin |

### Booking Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/bookings` | Create booking | Client |
| GET | `/bookings` | Get my bookings | Yes |
| GET | `/bookings/:id` | Get single booking | Yes |
| PUT | `/bookings/:id/status` | Update status | Designer/Admin |
| POST | `/bookings/:id/review` | Add review | Client |
| PUT | `/bookings/:id/cancel` | Cancel booking | Yes |

### Room Design Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/designs` | Create design | Yes |
| GET | `/designs` | Get my designs | Yes |
| GET | `/designs/public` | Get public designs | No |
| GET | `/designs/:id` | Get single design | Yes |
| PUT | `/designs/:id` | Update design | Yes |
| DELETE | `/designs/:id` | Delete design | Yes |
| POST | `/designs/:id/like` | Toggle like | Yes |

### Order Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/orders` | Create order | Yes |
| GET | `/orders` | Get my orders | Yes |
| GET | `/orders/all` | Get all orders | Admin |
| GET | `/orders/:id` | Get single order | Yes |
| PUT | `/orders/:id/status` | Update order status | Admin |
| PUT | `/orders/:id/payment` | Update payment status | Yes |

## 🌐 Deployment

### Backend Deployment (Heroku/Railway)

1. Create a new app on your platform
2. Set environment variables
3. Deploy the backend directory
4. Ensure MongoDB Atlas is configured

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend:
```bash
npm run build
```

2. Deploy the `dist` folder to Vercel/Netlify
3. Set environment variables in the platform

### Environment Variables for Production

Make sure to update:
- `NODE_ENV=production`
- Use production MongoDB URL
- Use production Stripe keys
- Update CORS settings
- Update FRONTEND_URL

## 🔐 Security Best Practices

- Never commit `.env` files
- Use strong JWT secrets
- Enable HTTPS in production
- Implement rate limiting (already configured)
- Use Helmet for security headers (already configured)
- Validate all user inputs
- Sanitize database queries

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in `.env`
- For Atlas, whitelist your IP address

### CORS Errors
- Verify `FRONTEND_URL` in backend `.env`
- Check CORS configuration in `server.js`

### Port Already in Use
```bash
# Find and kill the process
lsof -ti:5000 | xargs kill -9  # Backend
lsof -ti:3000 | xargs kill -9  # Frontend
```

## 📝 Additional Notes

### Creating Sample Data

You can create sample products, users, and designs through the API or using MongoDB Compass/Atlas.

### Default Admin User

Create an admin user via registration, then manually update the role in MongoDB:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## 🤝 Contributing

This is a project template. Feel free to customize and extend it for your needs.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🎨 Design Inspiration

- IKEA Planner
- Planner 5D
- Modern SaaS Dashboards

## 📧 Support

For issues and questions, please create an issue in the repository.

---

**Built with ❤️ using React, Node.js, MongoDB, and Three.js**
