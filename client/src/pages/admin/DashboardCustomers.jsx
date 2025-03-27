import { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Mail, Phone } from "lucide-react";
import Avatar from "~/components/common/Avatar";
import InputField from "~/components/common/InputField";

const DashboardCustomers = memo(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@gmail.com",
      phone: "0123456789",
      orders: 5,
      totalSpent: 2500000,
      lastOrder: "2024-03-20",
      avatar: null // Có thể null hoặc URL hình ảnh
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@gmail.com",
      phone: "0987654321",
      orders: 3,
      totalSpent: 1800000,
      lastOrder: "2024-03-15",
      avatar: "/images/avatars/avatar-2.jpg"
    },
    // Thêm mock data khác
  ]);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Thêm logic tìm kiếm
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-medium text-gray-900">Khách hàng</h2>
          <p className="text-gray-500 mt-1">Quản lý thông tin khách hàng</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <InputField
                  placeholder="Tìm kiếm khách hàng..."
                  value={searchTerm}
                  onChange={handleSearch}
                  icon={Search}
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
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Khách hàng</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Liên hệ</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Đơn hàng</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Tổng chi tiêu</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Đơn gần nhất</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {customers.map((customer) => (
                  <motion.tr 
                    key={customer.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.01)" }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={customer.avatar}
                          name={customer.name}
                          size={40}
                          className="flex-shrink-0"
                        />
                        <div className="font-medium text-gray-900">{customer.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Mail className="w-4 h-4" />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <Phone className="w-4 h-4" />
                          {customer.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-900">{customer.orders}</span>
                        {customer.orders > 5 && (
                          <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                            VIP
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {new Intl.NumberFormat("vi-VN").format(customer.totalSpent)}đ
                    </td>
                    <td className="px-6 py-4 text-gray-500">{customer.lastOrder}</td>
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

DashboardCustomers.displayName = "DashboardCustomers";

export default DashboardCustomers; 