import { Leaf, Mail, Phone, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const socialLinks = [
  { label: 'Facebook', color: '#1877F2' },
  { label: 'Instagram', color: '#E1306C' },
  { label: 'Twitter', color: '#1DA1F2' },
  { label: 'YouTube', color: '#FF0000' },
];

const Footer = () => {
  return (
    <footer className="bg-text-dark text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary rounded-full p-1.5">
                <Leaf className="text-white w-4 h-4" />
              </div>
              <span className="font-heading font-bold text-lg text-white">
                vegan
              </span>
            </div>
            <p className="font-body text-gray-400 text-sm leading-relaxed">
              Fresh organic vegetables and healthy groceries at affordable
              prices. Straight from local farms to your kitchen.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Products', 'Contact Us', 'Courses'].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to="/"
                      className="font-body text-gray-400 hover:text-primary-light 
                    text-sm transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-primary-light" />
                +914 2030 5681
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-primary-light" />
                info@veganfresh.com
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">
              Follow Us
            </h4>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <button
                  key={s.label}
                  title={s.label}
                  className="bg-gray-700 hover:bg-primary w-8 h-8 rounded-full 
                  flex items-center justify-center transition-colors duration-200"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-white" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="font-body text-gray-500 text-sm">
            © 2026 Vegan Fresh. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
