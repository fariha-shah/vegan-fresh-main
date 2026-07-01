//Wajeeha Home page,setup
import { Link } from 'react-router-dom';
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiYoutube,
  FiPhone,
  FiMail,
} from 'react-icons/fi';
import logo from '../../assets/images/logo.png';
import footerBg from '../../assets/images/footer.png';

const QUICK_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Products', path: '/products' },
  { name: 'Contact Us', path: '/contact' },
  { name: 'Blog', path: '/blog' },
];

const LUXURY_ITEMS = [
  'Organic Honey',
  'Premium Herbs',
  'Exotic Fruits',
  'Cold Pressed Oils',
];

const SOCIAL_LINKS = [
  { icon: FiFacebook, url: 'https://facebook.com', label: 'Facebook' },
  { icon: FiTwitter, url: 'https://twitter.com', label: 'Twitter' },
  { icon: FiInstagram, url: 'https://instagram.com', label: 'Instagram' },
  { icon: FiYoutube, url: 'https://youtube.com', label: 'YouTube' },
];

const Footer = () => {
  return (
    <footer
      className="relative overflow-hidden "
      style={{
        backgroundImage: `url(${footerBg})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#dff2ec',
      }}
    >
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-8 pt-14 pb-48">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Column 1 — Logo + description */}
          <div className="md:col-span-2">
            <img
              src={logo}
              alt="Vegan Fresh"
              className="w-32 mb-5 object-contain"
            />
            <p className="text-[#244124] text-[13px] leading-relaxed max-w-[280px]">
              Fresh organic vegetables and healthy groceries at affordable
              prices. Browse farm-fresh fruits, greens, and daily essentials all
              in one place. Bring natural taste and healthy living to your home
              with every order. Discover quality products picked fresh from
              trusted local farms.
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h3 className="text-[#84bc24] text-[15px] font-bold mb-5">
              Quick Link
            </h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-[#2c492d] text-[13px] hover:text-[#84bc24] transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact Us */}
          <div>
            <h3 className="text-[#84bc24] text-[15px] font-bold mb-5">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#244124] text-[13px]">
                <FiPhone size={14} className="text-[#7db72d] shrink-0" />
                +974 3038 5685
              </div>
              <div className="flex items-center gap-2 text-[#244124] text-[13px]">
                <FiMail size={14} className="text-[#7db72d] shrink-0" />
                info@veganfresh.com
              </div>
            </div>
          </div>

          {/* Column 4 — Luxury Items + Follow Us */}
          <div>
            <h3 className="text-[#84bc24] text-[15px] font-bold mb-5">
              Luxury Items
            </h3>
            <ul className="space-y-3">
              {LUXURY_ITEMS.map((item) => (
                <li key={item} className="text-[#244124] text-[13px]">
                  {item}
                </li>
              ))}
            </ul>

            {/* Follow Us */}
            <div className="mt-8">
              <h3 className="text-[#84bc24] text-[15px] font-bold mb-4">
                Follow Us
              </h3>
              <div className="flex gap-2.5">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full bg-[#2d6b1d] text-white flex items-center justify-center hover:scale-110 hover:bg-[#1e4d14] transition-all duration-300"
                  >
                    <social.icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-1 text-right">
          <p className="text-[#244124] text-[10px] font-semibold">
            Copyright © {new Date().getFullYear()} Vegan Fresh. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
