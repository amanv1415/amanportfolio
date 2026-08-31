import { Link, useLocation } from 'react-router-dom';
import {
  FiHome, FiGrid, FiPackage, FiCalendar, FiShoppingBag,
  FiUsers, FiSettings, FiDollarSign, FiUser
} from 'react-icons/fi';
import useAuthStore from '../../contexts/authStore';

const Sidebar = () => {
  const { user } = useAuthStore();
  const location = useLocation();

  const getMenuItems = () => {
    if (user?.role === 'client') {
      return [
        { name: 'Dashboard', path: '/client', icon: FiHome },
        { name: 'Room Designer', path: '/client/designer', icon: FiGrid },
        { name: 'My Designs', path: '/client/designs', icon: FiPackage },
        { name: 'Bookings', path: '/client/bookings', icon: FiCalendar },
        { name: 'Orders', path: '/client/orders', icon: FiShoppingBag },
      ];
    } else if (user?.role === 'designer') {
      return [
        { name: 'Dashboard', path: '/designer', icon: FiHome },
        { name: 'Profile', path: '/designer/profile', icon: FiUser },
        { name: 'Bookings', path: '/designer/bookings', icon: FiCalendar },
        { name: 'Earnings', path: '/designer/earnings', icon: FiDollarSign },
      ];
    } else if (user?.role === 'admin') {
      return [
        { name: 'Dashboard', path: '/admin', icon: FiHome },
        { name: 'Users', path: '/admin/users', icon: FiUsers },
        { name: 'Products', path: '/admin/products', icon: FiPackage },
        { name: 'Bookings', path: '/admin/bookings', icon: FiCalendar },
      ];
    }
    return [];
  };

  const menuItems = getMenuItems();

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden lg:block overflow-y-auto">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
