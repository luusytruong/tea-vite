import { Link, useLocation } from "react-router-dom";
import { memo, useState } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  Phone,
  Mail,
  ChevronDown,
  Home,
  Leaf,
  Info,
  PhoneCall,
} from "lucide-react";
import logo from "~/assets/logo.png";
import name from "~/assets/name.png";

/**
 * Header component chứa navigation
 * @returns {JSX.Element} Header component
 */
const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-green-800 text-white py-1.5 sm:py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
            <div className="flex items-center gap-4">
              <a
                href="tel:+84912345678"
                className="flex items-center gap-1.5 text-sm hover:text-green-100 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">Hotline:</span>
                <span>0912 345 678</span>
              </a>
              <a
                href="mailto:contact@teashop.com"
                className="flex items-center gap-1.5 text-sm hover:text-green-100 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">Email:</span>
                <span>contact@teashop.com</span>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-sm hover:text-green-100 transition-colors"
              >
                Đăng nhập
              </a>
              <a
                href="#"
                className="text-sm hover:text-green-100 transition-colors"
              >
                Đăng ký
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Tea Shop Logo" className="h-12 w-auto" />
            <img src={name} alt="Tea Shop Name" className="ml-2 h-6 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className={`flex items-center gap-2 text-base font-normal hover:text-green-700 transition-colors ${
                isActive("/") ? "text-green-700" : "text-gray-700"
              }`}
            >
              <span>Trang chủ</span>
            </Link>
            <Link
              to="/products"
              className={`flex items-center gap-2 text-base font-normal hover:text-green-700 transition-colors ${
                isActive("/products") ? "text-green-700" : "text-gray-700"
              }`}
            >
              <span>Sản phẩm</span>
            </Link>
            <Link
              to="/about"
              className={`flex items-center gap-2 text-base font-normal hover:text-green-700 transition-colors ${
                isActive("/about") ? "text-green-700" : "text-gray-700"
              }`}
            >
              <span>Về chúng tôi</span>
            </Link>
            <Link
              to="/contact"
              className={`flex items-center gap-2 text-base font-normal hover:text-green-700 transition-colors ${
                isActive("/contact") ? "text-green-700" : "text-gray-700"
              }`}
            >
              <span>Liên hệ</span>
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:block relative">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-700 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative group">
              <ShoppingCart className="w-5 h-5 text-gray-700 group-hover:text-green-700 transition-colors" />
              <span className="absolute -top-2 -right-2 bg-green-700 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                0
              </span>
            </Link>

            {/* User */}
            <Link to="/account" className="hidden md:block">
              <User className="w-5 h-5 text-gray-700 hover:text-green-700 transition-colors" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-green-700 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`flex items-center gap-2 text-base font-normal hover:text-green-700 transition-colors ${
                  isActive("/") ? "text-green-700" : "text-gray-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="w-4 h-4" />
                <span>Trang chủ</span>
              </Link>
              <Link
                to="/products"
                className={`flex items-center gap-2 text-base font-normal hover:text-green-700 transition-colors ${
                  isActive("/products") ? "text-green-700" : "text-gray-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Leaf className="w-4 h-4" />
                <span>Sản phẩm</span>
              </Link>
              <Link
                to="/about"
                className={`flex items-center gap-2 text-base font-normal hover:text-green-700 transition-colors ${
                  isActive("/about") ? "text-green-700" : "text-gray-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Info className="w-4 h-4" />
                <span>Về chúng tôi</span>
              </Link>
              <Link
                to="/contact"
                className={`flex items-center gap-2 text-base font-normal hover:text-green-700 transition-colors ${
                  isActive("/contact") ? "text-green-700" : "text-gray-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <PhoneCall className="w-4 h-4" />
                <span>Liên hệ</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
