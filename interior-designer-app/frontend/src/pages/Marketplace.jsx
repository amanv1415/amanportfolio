const Marketplace = () => {
  return (
    <div className="page-container">
      <h1 className="text-3xl font-bold mb-6">Furniture Marketplace</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={item} className="card hover:shadow-xl transition-shadow">
            <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-lg mb-4"></div>
            <h3 className="font-semibold text-lg">Product {item}</h3>
            <p className="text-gray-600 dark:text-gray-400">$299.00</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
