import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import DashboardNav from './DashboardNav';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardNav />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 ml-0 lg:ml-64 mt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
