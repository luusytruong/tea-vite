import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation, Navigate } from "react-router-dom";
import { ROUTES } from "~/routes";
import { Check, ChevronRight, Package, Clock } from "lucide-react";

const OrderSuccess = () => {
  const location = useLocation();

  // Nếu không có state (người dùng truy cập trực tiếp), chuyển về trang chủ
  if (!location.state) {
    return <Navigate to={ROUTES.ROOT} replace />;
  }

  const { slug, orderDetails } = location.state;
  console.log(location.state);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-tr from-green-50 via-white to-green-50 py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="bg-white rounded-2xl shadow-sm p-8 text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <Check className="text-green-600" size={32} />
          </motion.div>

          <h1 className="text-2xl font-medium text-gray-800 mb-3">
            Đặt hàng thành công!
          </h1>
          <p className="text-gray-600 mb-6">
            Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ với bạn trong thời gian
            sớm nhất.
          </p>

          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="text-left space-y-4">
              <div>
                <p className="text-sm text-gray-600">Mã đơn hàng:</p>
                <p className="font-medium text-gray-800">{slug}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Thời gian đặt hàng:</p>
                <p className="font-medium text-gray-800">
                  {new Date(orderDetails.order_date).toLocaleString("vi-VN")}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Người nhận:</p>
                <p className="font-medium text-gray-800">
                  {orderDetails.full_name}
                </p>
                <p className="text-gray-600">{orderDetails.phone}</p>
                {orderDetails.email && (
                  <p className="text-gray-600">{orderDetails.email}</p>
                )}
              </div>

              <div>
                <p className="text-sm text-gray-600">Địa chỉ giao hàng:</p>
                <p className="font-medium text-gray-800">
                  {orderDetails.address}, {orderDetails.ward},{" "}
                  {orderDetails.district}, {orderDetails.city}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Phương thức thanh toán:</p>
                <p className="font-medium text-gray-800">
                  {orderDetails.payment_method === "cod"
                    ? "Thanh toán khi nhận hàng"
                    : "Chuyển khoản ngân hàng"}
                </p>
              </div>

              {orderDetails.note && (
                <div>
                  <p className="text-sm text-gray-600">Ghi chú:</p>
                  <p className="font-medium text-gray-800">
                    {orderDetails.note}
                  </p>
                </div>
              )}

              <div>
                <p className="text-sm text-gray-600">Tổng tiền:</p>
                <p className="font-medium text-green-600 text-lg">
                  {orderDetails.total_price.toLocaleString("vi-VN")}đ
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={ROUTES.ROOT}
              className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-300"
            >
              Về trang chủ
              <ChevronRight size={18} className="ml-2" />
            </Link>

            <Link
              to={`${ROUTES.ORDER_TRACKING}/${slug}`}
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-green-600 text-green-600 rounded-xl hover:bg-green-50 transition-colors duration-300"
            >
              Theo dõi đơn hàng
              <Package size={18} className="ml-2" />
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-center text-sm text-gray-600">
              <Clock size={16} className="mr-2" />
              <span>Dự kiến giao hàng nội thành 1-2 giờ</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OrderSuccess;
