const MyDesigns = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Designs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="card">
            <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-lg mb-4"></div>
            <h3 className="font-semibold">Living Room Design {item}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Updated 2 days ago</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyDesigns;
