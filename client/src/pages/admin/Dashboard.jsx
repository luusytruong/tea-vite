import { memo } from "react";
import { motion } from "framer-motion";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  Users,
  ShoppingBag,
  Package,
  ClipboardList,
  Settings,
  LogOut,
} from "lucide-react";
import { ROUTES } from "~/routes";

const Dashboard = memo(() => {
  const location = useLocation();
  const currentPath = location.pathname;

  const sidebarLinks = [
    { 
      icon: BarChart3, 
      label: "Tổng quan", 
      path: ROUTES.DASHBOARD 
    },
    { 
      icon: ShoppingBag, 
      label: "Đơn hàng", 
      path: ROUTES.DASHBOARD_ORDERS 
    },
    { 
      icon: Package, 
      label: "Sản phẩm", 
      path: ROUTES.DASHBOARD_PRODUCTS 
    },
    { 
      icon: Users, 
      label: "Khách hàng", 
      path: ROUTES.DASHBOARD_CUSTOMERS 
    },
    { 
      icon: ClipboardList, 
      label: "Blog", 
      path: ROUTES.DASHBOARD_BLOG 
    },
    { 
      icon: Settings, 
      label: "Cài đặt", 
      path: ROUTES.DASHBOARD_SETTINGS 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200">
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h1 className="text-xl font-medium text-gray-900">
              Chè Thái Admin
            </h1>
          </div>

          <nav className="flex-1 px-4">
            {sidebarLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left mb-2 transition-all ${
                  currentPath === link.path
                    ? "bg-green-50 text-green-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <link.icon className="w-5 h-5" />
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <motion.button
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-red-600 hover:bg-red-50"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut className="w-5 h-5" />
              <span>Đăng xuất</span>
            </motion.button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
});

Dashboard.displayName = "Dashboard";

export default Dashboard; 