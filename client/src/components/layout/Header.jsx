import { Link, useLocation, useNavigate } from "react-router-dom";
import { memo, useRef, useState } from "react";
import logo from "~/assets/logo.png";
import name from "~/assets/name.png";
import { ROUTES } from "~/routes";
import { company } from "~/data/company";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  Phone,
  Mail,
  Home,
  Leaf,
  Info,
  Library,
} from "lucide-react";

const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const ref = useRef();
  const input = useRef();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleCloseMenu = (e) => {
    if (e.target === ref.current) {
      setIsMenuOpen(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(ROUTES.PRODUCTS, {
      state: input.current.value,
    });
    input.current.value = "";
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="hidden lg:block bg-green-800 text-white py-1.5 sm:py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
            <div className="flex items-center gap-4">
              <Link
                to={`tel:${company.phone}`}
                className="flex items-center gap-1.5 text-sm hover:text-green-100 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">Hotline:</span>
                <span>{company.phone}</span>
              </Link>
              <Link
                href={`mailto:${company.email}`}
                className="flex items-center gap-1.5 text-sm hover:text-green-100 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">Email:</span>
                <span>{company.email}</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to={ROUTES.LOGIN}
                className="text-sm hover:text-green-100 transition-colors"
              >
                Đăng nhập
              </Link>
              <Link
                to={ROUTES.REGISTER}
                className="text-sm hover:text-green-100 transition-colors"
              >
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to={ROUTES.ROOT} className="flex items-center">
            <img src={logo} alt="Tea Shop Logo" className="h-12 w-auto" />
            <img src={name} alt="Tea Shop Name" className="ml-2 h-4 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              to={ROUTES.ROOT}
              className={`flex items-center gap-2 text-base font-normal hover:text-green-700 transition-colors ${
                isActive(ROUTES.ROOT) ? "text-green-700" : "text-gray-700"
              }`}
            >
              <span>Trang chủ</span>
            </Link>
            <Link
              to={ROUTES.PRODUCTS}
              className={`flex items-center gap-2 text-base font-normal hover:text-green-700 transition-colors ${
                isActive(ROUTES.PRODUCTS) ? "text-green-700" : "text-gray-700"
              }`}
            >
              <span>Sản phẩm</span>
            </Link>
            <Link
              to={ROUTES.BLOG}
              className={`flex items-center gap-2 text-base font-normal hover:text-green-700 transition-colors ${
                isActive(ROUTES.BLOG) ? "text-green-700" : "text-gray-700"
              }`}
            >
              <span>Chia sẻ</span>
            </Link>
            <Link
              to={ROUTES.ABOUT}
              className={`flex items-center gap-2 text-base font-normal hover:text-green-700 transition-colors ${
                isActive(ROUTES.ABOUT) ? "text-green-700" : "text-gray-700"
              }`}
            >
              <span>Về chúng tôi</span>
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="hidden md:block relative">
              <input
                ref={input}
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
            </form>

            {/* Cart */}
            <Link to={ROUTES.CART} className="relative group">
              <ShoppingCart className="w-5 h-5 text-gray-700 group-hover:text-green-700 transition-colors" />
              <span className="absolute -top-2 -right-2 bg-green-700 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                0
              </span>
            </Link>

            {/* User */}
            <Link to={ROUTES.ACCOUNT} className="hidden md:block">
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
          <div
            className="lg:hidden flex items-end fixed inset-0 bg-black/50"
            onClick={handleCloseMenu}
            ref={ref}
          >
            <motion.div
              className="container mx-auto bg-white px-4 py-8 rounded-t-2xl"
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.32 }}
            >
              <nav className="flex flex-col space-y-4">
                <Link
                  to={ROUTES.ACCOUNT}
                  className={`flex items-center p-0.5 gap-2 text-base font-normal hover:text-green-700 transition-colors ${
                    isActive(ROUTES.ACCOUNT)
                      ? "text-green-700"
                      : "text-gray-700"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  <span>Tài khoản</span>
                </Link>
                <Link
                  to={ROUTES.ROOT}
                  className={`flex items-center p-0.5 gap-2 text-base font-normal hover:text-green-700 transition-colors ${
                    isActive(ROUTES.ROOT) ? "text-green-700" : "text-gray-700"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home className="w-4 h-4" />
                  <span>Trang chủ</span>
                </Link>
                <Link
                  to={ROUTES.PRODUCTS}
                  className={`flex items-center p-0.5 gap-2 text-base font-normal hover:text-green-700 transition-colors ${
                    isActive(ROUTES.PRODUCTS)
                      ? "text-green-700"
                      : "text-gray-700"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Leaf className="w-4 h-4" />
                  <span>Sản phẩm</span>
                </Link>
                <Link
                  to={ROUTES.BLOG}
                  className={`flex items-center p-0.5 gap-2 text-base font-normal hover:text-green-700 transition-colors ${
                    isActive(ROUTES.BLOG) ? "text-green-700" : "text-gray-700"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Library className="w-4 h-4" />
                  <span>Chia sẻ</span>
                </Link>
                <Link
                  to={ROUTES.ABOUT}
                  className={`flex items-center p-0.5 gap-2 text-base font-normal hover:text-green-700 transition-colors ${
                    isActive(ROUTES.ABOUT) ? "text-green-700" : "text-gray-700"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Info className="w-4 h-4" />
                  <span>Về chúng tôi</span>
                </Link>
              </nav>
            </motion.div>
          </div>
        )}
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
