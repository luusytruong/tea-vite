import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Package,
  Truck,
  ShoppingBag,
  CheckCircle,
  AlertCircle,
  Clock,
  Search,
  ChevronRight,
  Filter,
  Calendar,
  CreditCard,
  ArrowRight,
  Eye,
} from "lucide-react";
import { useAuth } from "~/context/AuthContext";
import { useToast } from "~/context/ToastContext";
import { ROUTES } from "~/routes";
import Loading from "~/components/common/Loading";

const OrdersList = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Các trạng thái đơn hàng
  const statuses = {
    pending: {
      label: "Chờ xác nhận",
      icon: Clock,
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
    },
    processing: {
      label: "Đang chuẩn bị",
      icon: Package,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    shipped: {
      label: "Đang giao hàng",
      icon: Truck,
      color: "text-indigo-500",
      bgColor: "bg-indigo-100",
    },
    delivered: {
      label: "Đã giao hàng",
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    cancelled: {
      label: "Đã hủy",
      icon: AlertCircle,
      color: "text-red-500",
      bgColor: "bg-red-100",
    },
  };

  // Lấy danh sách đơn hàng (giả lập)
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        // Giả lập API call
        setTimeout(() => {
          // Dữ liệu mẫu
          const mockOrders = [
            {
              id: 1,
              slug: "ORD-1001",
              user_id: user?.id || 1,
              total_price: 850000,
              payment_method: "COD",
              status: "delivered",
              address:
                "123 Đường Nguyễn Văn A, Phường 1, Quận 1, TP Hồ Chí Minh",
              note: "Gọi trước khi giao hàng",
              created_at: "2024-04-10 09:30:00",
              updated_at: "2024-04-11 14:20:00",
              items: [
                {
                  id: 1,
                  product_id: 1,
                  name: "Trà Shan Tuyết Cổ Thụ",
                  image:
                    "https://teaholic.vn/cdn/shop/products/7b8f2baa00f45d68f8d5_77eecfca-5c2c-4d45-8e5c-10cb2f8a1c25_1024x1024.webp",
                  price: 350000,
                  quantity: 2,
                },
                {
                  id: 2,
                  product_id: 2,
                  name: "Trà Oolong Sữa",
                  image:
                    "https://teaholic.vn/cdn/shop/products/suaoolong_1000x.webp",
                  price: 150000,
                  quantity: 1,
                },
              ],
            },
            {
              id: 2,
              slug: "ORD-1002",
              user_id: user?.id || 1,
              total_price: 450000,
              payment_method: "Banking",
              status: "shipped",
              address: "456 Đường Lê Lợi, Phường 2, Quận 3, TP Hồ Chí Minh",
              note: "",
              created_at: "2024-04-15 10:30:00",
              updated_at: "2024-04-16 09:20:00",
              items: [
                {
                  id: 3,
                  product_id: 3,
                  name: "Trà Xanh Thái Nguyên",
                  image:
                    "https://teaholic.vn/cdn/shop/products/nhavarua-dactridinhho-1_1000x.webp",
                  price: 250000,
                  quantity: 1,
                },
                {
                  id: 4,
                  product_id: 4,
                  name: "Trà Hồng Đài Loan",
                  image:
                    "https://teaholic.vn/cdn/shop/products/hong_tra_moc_Darjeeling_6c0f2fa9-0dba-4115-a3a6-9b9a106143a6_1000x.webp",
                  price: 200000,
                  quantity: 1,
                },
              ],
            },
            {
              id: 3,
              slug: "ORD-1003",
              user_id: user?.id || 1,
              total_price: 350000,
              payment_method: "COD",
              status: "pending",
              address:
                "789 Đường Trần Hưng Đạo, Phường 3, Quận 2, TP Hồ Chí Minh",
              note: "Giao hàng giờ hành chính",
              created_at: "2024-04-18 14:30:00",
              updated_at: "2024-04-18 14:30:00",
              items: [
                {
                  id: 5,
                  product_id: 5,
                  name: "Bạch Trà",
                  image:
                    "https://teaholic.vn/cdn/shop/products/hongcha-8_1000x.webp",
                  price: 350000,
                  quantity: 1,
                },
              ],
            },
            {
              id: 4,
              slug: "ORD-1004",
              user_id: user?.id || 1,
              total_price: 180000,
              payment_method: "Banking",
              status: "processing",
              address:
                "101 Đường Võ Văn Ngân, Phường 4, Quận Thủ Đức, TP Hồ Chí Minh",
              note: "",
              created_at: "2024-04-17 11:30:00",
              updated_at: "2024-04-17 13:20:00",
              items: [
                {
                  id: 6,
                  product_id: 6,
                  name: "Trà Lài",
                  image:
                    "https://teaholic.vn/cdn/shop/products/BACHTRA-DonTrangNguyen-nguyen-1_1000x.webp",
                  price: 180000,
                  quantity: 1,
                },
              ],
            },
            {
              id: 5,
              slug: "ORD-1005",
              user_id: user?.id || 1,
              total_price: 450000,
              payment_method: "COD",
              status: "cancelled",
              address: "202 Đường Nguyễn Huệ, Phường 5, Quận 1, TP Hồ Chí Minh",
              note: "",
              created_at: "2024-03-20 09:15:00",
              updated_at: "2024-03-20 15:30:00",
              items: [
                {
                  id: 7,
                  product_id: 3,
                  name: "Trà Xanh Thái Nguyên",
                  image:
                    "https://teaholic.vn/cdn/shop/products/nhavarua-dactridinhho-1_1000x.webp",
                  price: 250000,
                  quantity: 1,
                },
                {
                  id: 8,
                  product_id: 1,
                  name: "Trà Shan Tuyết Cổ Thụ",
                  image:
                    "https://teaholic.vn/cdn/shop/products/7b8f2baa00f45d68f8d5_77eecfca-5c2c-4d45-8e5c-10cb2f8a1c25_1024x1024.webp",
                  price: 200000,
                  quantity: 1,
                },
              ],
            },
          ];

          setOrders(mockOrders);
          setFilteredOrders(mockOrders);
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        showToast({
          type: "error",
          title: "Lỗi",
          message: "Không thể tải danh sách đơn hàng",
        });
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Lọc đơn hàng theo trạng thái và từ khóa
  useEffect(() => {
    let result = [...orders];

    // Lọc theo trạng thái
    if (selectedFilter !== "all") {
      result = result.filter((order) => order.status === selectedFilter);
    }

    // Lọc theo từ khóa
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      result = result.filter(
        (order) =>
          order.slug.toLowerCase().includes(lowercasedTerm) ||
          order.items.some((item) =>
            item.name.toLowerCase().includes(lowercasedTerm)
          )
      );
    }

    setFilteredOrders(result);
  }, [selectedFilter, searchTerm, orders]);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle filter selection
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  // Render status badge
  const renderStatusBadge = (status) => {
    const statusInfo = statuses[status];
    const StatusIcon = statusInfo.icon;

    return (
      <div className={`flex items-center gap-1.5 ${statusInfo.color}`}>
        <StatusIcon size={16} />
        <span>{statusInfo.label}</span>
      </div>
    );
  };

  if (isLoading) {
    return <Loading text="Đang tải danh sách đơn hàng..." />;
  }

  if (1) {
    return (
      <div className="p-4 text-green-700">Hệ thống đang phát triển...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Tiêu đề trang */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Đơn hàng của tôi
          </h1>
          <p className="text-gray-600">
            Quản lý và theo dõi tất cả đơn hàng của bạn
          </p>
        </div>

        {/* Thanh tìm kiếm và lọc */}
        <motion.div
          className="bg-white rounded-xl shadow-sm p-4 mb-8 flex flex-col md:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Tìm kiếm */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm đơn hàng..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-green-500"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {/* Thanh lọc */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleFilterChange("all")}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                selectedFilter === "all"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Tất cả
            </button>
            {Object.entries(statuses).map(([key, { label, icon: Icon }]) => (
              <button
                key={key}
                onClick={() => handleFilterChange(key)}
                className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 ${
                  selectedFilter === key
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Danh sách đơn hàng */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <motion.div
              className="bg-white rounded-xl shadow-sm p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ShoppingBag size={64} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                Không tìm thấy đơn hàng nào
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm
                  ? "Không tìm thấy đơn hàng nào khớp với tìm kiếm của bạn"
                  : selectedFilter !== "all"
                  ? `Bạn chưa có đơn hàng nào ở trạng thái "${statuses[selectedFilter].label}"`
                  : "Bạn chưa có đơn hàng nào"}
              </p>
              <Link
                to={ROUTES.PRODUCTS}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <ShoppingBag size={16} />
                Mua sắm ngay
              </Link>
            </motion.div>
          ) : (
            <AnimatePresence>
              {filteredOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {/* Header đơn hàng */}
                  <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-gray-900">
                          Đơn hàng {order.slug}
                        </h3>
                        {renderStatusBadge(order.status)}
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-y-1 gap-x-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{formatDate(order.created_at)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CreditCard size={14} />
                          <span>
                            {order.payment_method === "COD"
                              ? "Thanh toán khi nhận hàng (COD)"
                              : order.payment_method}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Link
                      to={`${ROUTES.ORDER_TRACKING}/${order.slug}`}
                      className="inline-flex items-center gap-1 text-green-600 hover:text-green-700 font-medium text-sm"
                    >
                      <Eye size={16} />
                      Xem chi tiết
                      <ChevronRight size={16} />
                    </Link>
                  </div>

                  {/* Danh sách sản phẩm trong đơn */}
                  <div className="divide-y divide-gray-100">
                    {order.items.slice(0, 2).map((item) => (
                      <div
                        key={item.id}
                        className="p-4 md:p-6 flex items-center"
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <Link
                            to={`${ROUTES.PRODUCTS}/${item.slug}`}
                            className="font-medium text-gray-900 hover:text-green-600"
                          >
                            {item.name}
                          </Link>
                          <p className="text-gray-500 text-sm mt-1">
                            SL: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            {new Intl.NumberFormat("vi-VN").format(
                              item.price * item.quantity
                            )}
                            đ
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* Hiển thị nếu có nhiều hơn 2 sản phẩm */}
                    {order.items.length > 2 && (
                      <div className="p-4 md:p-6 text-center text-sm text-gray-500">
                        <span>và {order.items.length - 2} sản phẩm khác</span>
                      </div>
                    )}
                  </div>

                  {/* Footer đơn hàng */}
                  <div className="p-4 md:p-6 bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <span className="text-gray-500 text-sm">Tổng tiền:</span>
                      <span className="ml-2 text-lg font-bold text-green-600">
                        {new Intl.NumberFormat("vi-VN").format(
                          order.total_price
                        )}
                        đ
                      </span>
                    </div>

                    <div className="flex gap-3 w-full sm:w-auto">
                      <Link
                        to={`${ROUTES.ORDER_TRACKING}/${order.slug}`}
                        className="flex-1 sm:flex-initial px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 flex justify-center items-center gap-2"
                      >
                        <Truck size={16} />
                        Theo dõi
                      </Link>

                      {order.status === "delivered" && (
                        <button className="flex-1 sm:flex-initial px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex justify-center items-center gap-2">
                          <ShoppingBag size={16} />
                          Mua lại
                        </button>
                      )}

                      {(order.status === "pending" ||
                        order.status === "processing") && (
                        <button className="flex-1 sm:flex-initial px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 flex justify-center items-center gap-2">
                          <AlertCircle size={16} />
                          Hủy
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersList;
