import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiGrid, FiShoppingBag, FiUsers, FiTrendingUp } from 'react-icons/fi';

const LandingPage = () => {
  const features = [
    {
      icon: FiGrid,
      title: '3D Room Designer',
      description: 'Design your space in 2D/3D with our intuitive drag-and-drop tool',
    },
    {
      icon: FiUsers,
      title: 'Expert Designers',
      description: 'Connect with professional interior designers for consultations',
    },
    {
      icon: FiShoppingBag,
      title: 'Furniture Marketplace',
      description: 'Shop from curated furniture collections for your design',
    },
    {
      icon: FiTrendingUp,
      title: 'Budget Tracking',
      description: 'Keep track of costs and stay within your budget',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Design Your
                <span className="text-primary-600"> Dream Space</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Transform your home with our powerful 3D room designer and connect with expert interior designers.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register" className="btn-primary text-lg px-8 py-4">
                  Get Started Free
                </Link>
                <Link to="/marketplace" className="btn-secondary text-lg px-8 py-4">
                  Explore Marketplace
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl shadow-2xl h-96 flex items-center justify-center">
                <span className="text-white text-6xl">🏡</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Professional tools to bring your interior design vision to life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of homeowners and designers creating beautiful spaces
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-primary-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition text-lg"
          >
            Start Designing Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
