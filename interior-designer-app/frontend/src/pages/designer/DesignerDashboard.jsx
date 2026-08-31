const DesignerDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Designer Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Total Bookings</h3>
          <p className="text-3xl font-bold text-primary-600">24</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Total Earnings</h3>
          <p className="text-3xl font-bold text-primary-600">$12,450</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Rating</h3>
          <p className="text-3xl font-bold text-primary-600">4.8 ⭐</p>
        </div>
      </div>
    </div>
  );
};

export default DesignerDashboard;
