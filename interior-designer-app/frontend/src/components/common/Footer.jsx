const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">InteriorDesign</h3>
            <p className="text-sm">
              Professional interior design platform connecting clients with expert designers.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/marketplace" className="hover:text-primary-400">Marketplace</a></li>
              <li><a href="/designers" className="hover:text-primary-400">Find Designers</a></li>
              <li><a href="/about" className="hover:text-primary-400">About Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/help" className="hover:text-primary-400">Help Center</a></li>
              <li><a href="/contact" className="hover:text-primary-400">Contact</a></li>
              <li><a href="/faq" className="hover:text-primary-400">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/privacy" className="hover:text-primary-400">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-primary-400">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 InteriorDesign. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
