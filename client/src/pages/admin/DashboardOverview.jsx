import { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Users,
  Package,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "~/routes";

const DashboardOverview = memo(() => {
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - thay thế bằng data thật từ API
  const stats = {
    revenue: {
      total: 25680000,
      percent: 12.5,
      isIncrease: true
    },
    orders: {
      total: 156,
      percent: 8.2,
      isIncrease: true
    },
    customers: {
      total: 2890,
      percent: 5.1,
      isIncrease: false
    },
    products: {
      total: 45,
      percent: 15.3,
      isIncrease: true
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  useEffect(() => {
    // Giả lập loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h2 className="text-2xl font-medium text-gray-900">
            Tổng quan
          </h2>
          <p className="text-gray-500 mt-1">
            Xem thống kê hoạt động của cửa hàng
          </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Stats cards giữ nguyên như cũ */}
          {/* ... */}
        </div>

        {/* Recent Orders & Top Products giữ nguyên như cũ */}
        {/* ... */}
      </div>
    </div>
  );
});

DashboardOverview.displayName = "DashboardOverview";

export default DashboardOverview; 