import { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Eye, Download } from "lucide-react";

const DashboardOrders = memo(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      customer: "Nguyễn Văn A",
      date: "2024-03-26",
      total: 580000,
      status: "completed",
      items: 3
    },
    // Thêm mock data khác
  ]);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "processing":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Hoàn thành";
      case "processing":
        return "Đang xử lý";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-medium text-gray-900">Đơn hàng</h2>
            <p className="text-gray-500 mt-1">Quản lý đơn hàng</p>
          </div>
          <motion.button
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="w-5 h-5" />
            Xuất Excel
          </motion.button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm kiếm đơn hàng..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-green-500"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50">
                <Filter className="w-5 h-5" />
                Lọc
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Mã đơn</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Khách hàng</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Ngày đặt</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Tổng tiền</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Trạng thái</th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <motion.tr 
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.01)" }}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 text-gray-900">{order.customer}</td>
                    <td className="px-6 py-4 text-gray-500">{order.date}</td>
                    <td className="px-6 py-4 text-gray-900">
                      {new Intl.NumberFormat("vi-VN").format(order.total)}đ
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-sm rounded-full ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end">
                        <motion.button
                          className="p-2 text-gray-500 hover:text-green-600 rounded-lg hover:bg-green-50"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Eye className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
});

DashboardOrders.displayName = "DashboardOrders";

export default DashboardOrders; 