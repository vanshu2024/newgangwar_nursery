import { Link } from 'react-router-dom';
import { BsFlower1, BsInstagram, BsFacebook, BsYoutube, BsTelephone, BsEnvelope, BsGeoAlt } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 border-t border-gray-100 dark:border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <BsFlower1 className="text-2xl text-primary-600" />
              <span className="text-lg font-bold">
                <span className="gradient-text">New Gangwar</span>{' '}
                <span className="text-gray-700 dark:text-gray-300">Nursery</span>
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
              Bringing Nature Closer to Your Home. Premium quality plants and gardening solutions since 2020.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300">
                <BsInstagram />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300">
                <BsFacebook />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300">
                <BsYoutube />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/plants', label: 'Our Plants' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/contact', label: 'Contact Us' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Plant Categories</h3>
            <ul className="space-y-3">
              {['Indoor Plants', 'Outdoor Plants', 'Flowering Plants', 'Medicinal Plants', 'Bonsai Plants'].map((cat) => (
                <li key={cat}>
                  <Link to={`/plants?category=${encodeURIComponent(cat)}`} className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors duration-300">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <BsGeoAlt className="text-primary-600 mt-1 shrink-0" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  Vill & Post Barjhala, Kaimganj,<br />Farrukhabad, Uttar Pradesh
                </span>
              </li>
              <li>
                <a href="tel:9452437164" className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                  <BsTelephone className="text-primary-600 shrink-0" />
                  9452437164
                </a>
              </li>
              <li>
                <a href="mailto:vanshikagangwar3@gmail.com" className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                  <BsEnvelope className="text-primary-600 shrink-0" />
                  vanshikagangwar3@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 dark:text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} New Gangwar Nursery. All rights reserved.
            </p>
            <p className="text-gray-400 dark:text-gray-600 text-xs">
              Bringing Nature Closer to Your Home
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
