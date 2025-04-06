import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Package,
  Truck,
  CheckCircle,
  AlertCircle,
  Clock,
  Home,
  MapPin,
  CreditCard,
  Clipboard,
} from "lucide-react";
import { useAuth } from "~/context/AuthContext";
import { useToast } from "~/context/ToastContext";
import { ROUTES } from "~/routes";
import Loading from "~/components/common/Loading";

const OrderTracking = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState(null);

  // Các trạng thái đơn hàng
  const statuses = [
    {
      key: "pending",
      label: "Chờ xác nhận",
      icon: Clock,
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
    },
    {
      key: "processing",
      label: "Đang chuẩn bị",
      icon: Package,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      key: "shipped",
      label: "Đang giao hàng",
      icon: Truck,
      color: "text-indigo-500",
      bgColor: "bg-indigo-100",
    },
    {
      key: "delivered",
      label: "Đã giao hàng",
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      key: "cancelled",
      label: "Đã hủy",
      icon: AlertCircle,
      color: "text-red-500",
      bgColor: "bg-red-100",
    },
  ];

  // Giả lập lấy dữ liệu đơn hàng
  useEffect(() => {
    const fetchOrder = async () => {
      setIsLoading(true);
      try {
        // Giả lập API call
        setTimeout(() => {
          // Dữ liệu mẫu
          const mockOrder = {
            id: id,
            slug: `ORD-${id}`,
            user_id: user?.id || 1,
            total_price: 850000,
            payment_method: "COD",
            status: "shipped", // pending, processing, shipped, delivered, cancelled
            address: "123 Đường Nguyễn Văn A, Phường 1, Quận 1, TP Hồ Chí Minh",
            note: "Gọi trước khi giao hàng",
            created_at: "2024-04-15 09:30:00",
            updated_at: "2024-04-16 14:20:00",
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
            timeline: [
              {
                status: "pending",
                date: "2024-04-15 09:30:00",
                note: "Đơn hàng đã được tạo",
              },
              {
                status: "processing",
                date: "2024-04-15 10:15:00",
                note: "Đơn hàng đang được chuẩn bị",
              },
              {
                status: "shipped",
                date: "2024-04-16 14:20:00",
                note: "Đơn hàng đang được giao đến bạn",
              },
            ],
          };

          setOrder(mockOrder);
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        showToast({
          type: "error",
          title: "Lỗi",
          message: "Không thể tải thông tin đơn hàng",
        });
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  // Tìm index của trạng thái hiện tại
  const getCurrentStatusIndex = () => {
    if (!order) return -1;
    return statuses.findIndex((status) => status.key === order.status);
  };

  const currentStatusIndex = getCurrentStatusIndex();

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

  if (isLoading) {
    return <Loading text="Đang tải thông tin đơn hàng..." />;
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <AlertCircle size={64} className="text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Không tìm thấy đơn hàng
          </h1>
          <p className="text-gray-600 mb-8">
            Đơn hàng bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <Link
            to={ROUTES.ROOT}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 inline-flex items-center"
          >
            <Home size={18} className="mr-2" /> Quay về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  if (1) {
    return <div className="p-4 text-green-700">Hệ thống đang phát triển...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Tiêu đề trang */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Theo dõi đơn hàng
          </h1>
          <p className="text-gray-600">
            Mã đơn hàng: <span className="font-semibold">{order.slug}</span> |
            Ngày đặt:{" "}
            <span className="font-semibold">
              {formatDate(order.created_at)}
            </span>
          </p>
        </div>

        {/* Thanh trạng thái đơn hàng */}
        <motion.div
          className="bg-white rounded-xl shadow-sm p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Trạng thái đơn hàng
          </h2>

          <div className="relative">
            {/* Line connecting steps */}
            <div className="absolute left-[19px] top-0 bottom-0 w-1 bg-gray-200 z-0"></div>

            {statuses.map((status, index) => {
              const isActive = index <= currentStatusIndex;
              const isCurrent = index === currentStatusIndex;
              const StatusIcon = status.icon;

              // Find timeline entry for this status if exists
              const timelineEntry = order.timeline.find(
                (entry) => entry.status === status.key
              );

              return (
                <div key={status.key} className="relative z-10 mb-6 last:mb-0">
                  <div className="flex items-start">
                    <div
                      className={`rounded-full p-2 mr-4 ${
                        isActive ? status.bgColor : "bg-gray-100"
                      }`}
                    >
                      <StatusIcon
                        size={22}
                        className={isActive ? status.color : "text-gray-400"}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3
                          className={`font-medium ${
                            isActive ? "text-gray-900" : "text-gray-500"
                          }`}
                        >
                          {status.label}
                          {isCurrent && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Hiện tại
                            </span>
                          )}
                        </h3>
                        {timelineEntry && (
                          <span className="text-sm text-gray-500">
                            {formatDate(timelineEntry.date)}
                          </span>
                        )}
                      </div>
                      {timelineEntry && (
                        <p className="text-sm text-gray-600 mt-1">
                          {timelineEntry.note}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Thông tin đơn hàng */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Thông tin chi tiết */}
          <motion.div
            className="md:col-span-2 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {/* Danh sách sản phẩm */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800">
                  Chi tiết đơn hàng
                </h2>
              </div>

              <div className="divide-y divide-gray-100">
                {order.items.map((item) => (
                  <div key={item.id} className="p-6 flex items-center">
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
                      <p className="text-gray-500 text-sm mt-1">
                        {new Intl.NumberFormat("vi-VN").format(item.price)}đ /
                        cái
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-gray-50">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span className="font-medium">
                    {new Intl.NumberFormat("vi-VN").format(order.total_price)}đ
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  <span className="font-medium">0đ</span>
                </div>
                <div className="flex justify-between py-2 border-t border-gray-200 mt-2 pt-2">
                  <span className="text-gray-800 font-medium">Tổng cộng:</span>
                  <span className="text-lg text-green-600 font-bold">
                    {new Intl.NumberFormat("vi-VN").format(order.total_price)}đ
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Thông tin giao hàng và thanh toán */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {/* Thông tin giao hàng */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center text-gray-800 mb-4">
                <MapPin size={20} className="text-green-600 mr-2" />
                <h3 className="font-semibold">Địa chỉ giao hàng</h3>
              </div>
              <p className="text-gray-700">{order.address}</p>
              {order.note && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Ghi chú:</span> {order.note}
                  </p>
                </div>
              )}
            </div>

            {/* Thông tin thanh toán */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center text-gray-800 mb-4">
                <CreditCard size={20} className="text-green-600 mr-2" />
                <h3 className="font-semibold">Phương thức thanh toán</h3>
              </div>
              <p className="text-gray-700">
                {order.payment_method === "COD"
                  ? "Thanh toán khi nhận hàng (COD)"
                  : order.payment_method}
              </p>
            </div>

            {/* Các nút hành động */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <Link
                to={ROUTES.ORDER_LIST}
                className="flex items-center justify-center w-full py-3 px-4 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 mb-3"
              >
                <Clipboard size={18} className="mr-2" />
                Xem tất cả đơn hàng
              </Link>

              {(order.status === "pending" ||
                order.status === "processing") && (
                <button className="flex items-center justify-center w-full py-3 px-4 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                  <AlertCircle size={18} className="mr-2" />
                  Hủy đơn hàng
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
