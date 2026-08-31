import { FiSun, FiMoon } from 'react-icons/fi';
import useThemeStore from '../../contexts/themeStore';
import useAuthStore from '../../contexts/authStore';

const DashboardNav = () => {
  const { theme, toggleTheme } = useThemeStore();
  const { user } = useAuthStore();

  return (
    <div className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-40">
      <div className="flex items-center justify-between h-full px-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white capitalize">
            {user?.role} Dashboard
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            {theme === 'light' ? (
              <FiMoon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <FiSun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>

          <div className="flex items-center space-x-3">
            <img
              src={user?.avatar || 'https://via.placeholder.com/40'}
              alt={user?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
