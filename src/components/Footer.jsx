import { Link } from "react-router-dom";
import {Globe2, Mail, Phone, MapPin, Send, ArrowRight, Heart} from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 font-sans border-t border-slate-800 relative overflow-hidden">
      
      {/* Background Subtle Lighting Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-teal-500/10 blur-3xl pointer-events-none"></div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1: Brand Info (2 Columns wide on LG) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 text-white font-extrabold text-xl tracking-tight">
              <div className="p-2 bg-teal-600 rounded-xl text-white">
                <Globe2 size={20} />
              </div>
              <span>Tourism<span className="text-teal-400">System</span></span>
            </Link>

            <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-sm">
              Discover amazing destinations, experience unique cultures, and create unforgettable memories with our trusted tourism management system.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2 pt-2">
              {[
                { icon: <FaFacebook size={16} />, href: "#" },
                { icon: <FaTwitter size={16} />, href: "#" },
                { icon: <FaInstagram size={16} />, href: "#" },
                { icon: <FaLinkedin size={16} />, href: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-teal-600 hover:text-white text-slate-400 flex items-center justify-center transition duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Destinations", path: "/destinations" },
                { name: "Tours", path: "/tours" },
                { name: "Contact", path: "/contact" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="hover:text-teal-400 transition-colors inline-flex items-center gap-1 group"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0 transition-all duration-300 text-teal-400" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Contact Info</h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-teal-400 flex-shrink-0 mt-0.5" />
                <span>123 Travel Avenue, Somaliland</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-teal-400 flex-shrink-0" />
                <span>+252 (0) 63 0000000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-teal-400 flex-shrink-0" />
                <span>info@tourism.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Subscription */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Newsletter</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Subscribe to get special discounts and travel updates directly to your inbox.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-md"
              >
                Subscribe <Send size={14} />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Tourism Management System. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart size={14} className="text-rose-500 fill-rose-500" /> for travelers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;