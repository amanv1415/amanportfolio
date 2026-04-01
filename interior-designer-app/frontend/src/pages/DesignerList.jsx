const DesignerList = () => {
  return (
    <div className="page-container">
      <h1 className="text-3xl font-bold mb-6">Find Expert Designers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="card">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              <div className="ml-4">
                <h3 className="font-semibold text-lg">Designer {item}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">⭐ 4.8 (120 reviews)</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Specializing in modern interior design</p>
            <button className="btn-primary w-full">View Profile</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignerList;
