# Quick Start Guide - Interior Designer Web App

## 🚀 Get Started in 5 Minutes

### Prerequisites Check
```bash
node --version  # Should be v16 or higher
npm --version   # Should be 8 or higher
mongod --version # MongoDB should be installed
```

### Installation Steps

#### 1. Install Dependencies

**Backend:**
```bash
cd interior-designer-app/backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

#### 2. Setup Environment

**Backend (.env):**
```bash
cd backend
cp .env.example .env
```

Edit `.env` with these minimum required values:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/interior-designer-app
JWT_SECRET=your_secret_key_change_this
FRONTEND_URL=http://localhost:3000
SESSION_SECRET=another_secret_key
```

**Frontend (.env):**
```bash
cd ../frontend
echo "VITE_API_URL=http://localhost:5000/api" > .env
```

#### 3. Start MongoDB

```bash
# On Mac:
brew services start mongodb-community

# On Linux:
sudo systemctl start mongod

# On Windows:
# MongoDB should start automatically as a service
```

#### 4. Run the Application

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd interior-designer-app/backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd interior-designer-app/frontend
npm run dev
```

#### 5. Access the Application

Open your browser and go to: **http://localhost:3000**

## 🎯 Test the Application

### Create Your First User

1. Click "Sign Up" in the navigation
2. Fill in the registration form:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
   - Role: Client
3. Click "Sign Up"

You'll be automatically logged in and redirected to the Client Dashboard!

### Test Different Roles

Create three accounts with different roles:
- **Client**: test-client@example.com (can design rooms, shop)
- **Designer**: test-designer@example.com (can manage bookings, portfolio)
- **Admin**: test-admin@example.com (full access to manage everything)

For the admin account, after registration, update the role manually in MongoDB:
```bash
mongosh interior-designer-app
db.users.updateOne(
  { email: "test-admin@example.com" },
  { $set: { role: "admin" } }
)
```

## 🔧 Common Issues & Solutions

### Issue: Port Already in Use
```bash
# Kill the process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use a different port in .env
PORT=5001
```

### Issue: MongoDB Connection Error
```bash
# Check if MongoDB is running
mongosh

# If not running, start it:
brew services start mongodb-community  # Mac
sudo systemctl start mongod           # Linux
```

### Issue: CORS Errors
- Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL
- Clear browser cache and restart both servers

## 📁 Project Structure Quick Reference

```
interior-designer-app/
├── backend/          # Node.js + Express API
│   ├── models/      # MongoDB schemas
│   ├── controllers/ # Business logic
│   ├── routes/      # API endpoints
│   └── server.js    # Entry point
│
└── frontend/        # React + Vite app
    ├── src/
    │   ├── pages/   # Route components
    │   ├── components/ # Reusable UI
    │   ├── contexts/ # State management
    │   └── services/ # API calls
    └── index.html
```

## 🎨 Main Features to Explore

### For Clients:
- 📐 Room Designer (placeholder for 3D features)
- 🛒 Marketplace browsing
- 📅 Book designer consultations
- 📦 Track orders

### For Designers:
- 👤 Create professional profile
- 📸 Upload portfolio
- 💰 Track earnings
- 📅 Manage bookings

### For Admins:
- 👥 User management
- ✅ Approve designers
- 📦 Manage products
- 📊 View analytics

## 🌐 Next Steps

1. **Add Sample Data**: Create products, designs through the admin panel
2. **Configure External Services**: Set up Cloudinary, Stripe for full functionality
3. **Customize**: Modify colors, add features based on your needs
4. **Deploy**: Follow the deployment guide in main README.md

## 📚 Additional Resources

- [Full Documentation](./README.md)
- [API Reference](./README.md#api-documentation)
- [Deployment Guide](./README.md#deployment)

## 🆘 Need Help?

- Check the main [README.md](./README.md) for detailed documentation
- Review [Troubleshooting section](./README.md#troubleshooting)
- Create an issue in the repository

---

**Happy Building! 🎉**
