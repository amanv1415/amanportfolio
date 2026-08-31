const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-primary-600">1,234</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Designers</h3>
          <p className="text-3xl font-bold text-primary-600">89</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Products</h3>
          <p className="text-3xl font-bold text-primary-600">456</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Revenue</h3>
          <p className="text-3xl font-bold text-primary-600">$45,678</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
