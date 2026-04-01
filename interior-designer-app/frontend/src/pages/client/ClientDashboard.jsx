const ClientDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome Back!</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">My Designs</h3>
          <p className="text-3xl font-bold text-primary-600">12</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Bookings</h3>
          <p className="text-3xl font-bold text-primary-600">3</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Orders</h3>
          <p className="text-3xl font-bold text-primary-600">5</p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <p className="text-gray-600 dark:text-gray-400">Your recent designs and bookings will appear here.</p>
      </div>
    </div>
  );
};

export default ClientDashboard;
