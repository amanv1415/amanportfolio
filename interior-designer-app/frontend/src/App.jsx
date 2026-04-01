import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './contexts/authStore';
import useThemeStore from './contexts/themeStore';

// Layouts
import MainLayout from './components/common/MainLayout';
import DashboardLayout from './components/common/DashboardLayout';

// Public Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Marketplace from './pages/Marketplace';
import DesignerList from './pages/DesignerList';

// Client Pages
import ClientDashboard from './pages/client/ClientDashboard';
import RoomDesigner from './pages/client/RoomDesigner';
import MyDesigns from './pages/client/MyDesigns';
import Cart from './pages/client/Cart';
import Checkout from './pages/client/Checkout';
import MyOrders from './pages/client/MyOrders';
import MyBookings from './pages/client/MyBookings';

// Designer Pages
import DesignerDashboard from './pages/designer/DesignerDashboard';
import DesignerProfile from './pages/designer/DesignerProfile';
import DesignerBookings from './pages/designer/DesignerBookings';
import DesignerEarnings from './pages/designer/DesignerEarnings';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageProducts from './pages/admin/ManageProducts';
import ManageBookings from './pages/admin/ManageBookings';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    // Initialize theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/designers" element={<DesignerList />} />
      </Route>

      {/* Client Routes */}
      <Route
        path="/client"
        element={
          <ProtectedRoute allowedRoles={['client']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ClientDashboard />} />
        <Route path="designer" element={<RoomDesigner />} />
        <Route path="designs" element={<MyDesigns />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="orders" element={<MyOrders />} />
        <Route path="bookings" element={<MyBookings />} />
      </Route>

      {/* Designer Routes */}
      <Route
        path="/designer"
        element={
          <ProtectedRoute allowedRoles={['designer']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DesignerDashboard />} />
        <Route path="profile" element={<DesignerProfile />} />
        <Route path="bookings" element={<DesignerBookings />} />
        <Route path="earnings" element={<DesignerEarnings />} />
      </Route>

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="products" element={<ManageProducts />} />
        <Route path="bookings" element={<ManageBookings />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
