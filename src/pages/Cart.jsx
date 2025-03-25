import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ROUTES } from "~/routes";
import {
  ShoppingBag,
  ArrowLeft,
  Trash,
  ShoppingCart,
  ChevronRight,
  Clock,
  Truck,
} from "lucide-react";
import CartItemCard from "~/components/common/CartItemCard";
import { useCart } from "~/context/CartContext";

const Cart = () => {
  const {
    cartItems,
    handleRemove,
    handleUpdateQuantity,
    handleClearCart,
    calculateTotal,
  } = useCart();

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-tr from-green-50 via-white to-green-50 py-8 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header với tiêu đề và nút quay lại */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-medium text-gray-800 mb-2 flex items-center justify-center">
            <ShoppingCart size={32} className="text-green-600 mr-3" />
            Giỏ Hàng
          </h1>
          <p className="text-gray-600">Quản lý các sản phẩm bạn đã chọn</p>
        </div>

        {cartItems.length > 0 ? (
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Cột trái: Danh sách sản phẩm */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-xl font-medium text-gray-800">
                    Sản phẩm ({cartItems.length})
                  </h2>
                  <motion.button
                    onClick={handleClearCart}
                    className="flex items-center text-gray-500 hover:text-red-500 transition-colors text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Trash size={16} className="mr-1" />
                    <span>Xóa tất cả</span>
                  </motion.button>
                </div>

                <div className="p-4 sm:p-6 space-y-4 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  <AnimatePresence>
                    {cartItems.map((product) => (
                      <CartItemCard
                        key={product.id}
                        product={product}
                        onRemove={handleRemove}
                        onUpdateQuantity={handleUpdateQuantity}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Thông tin vận chuyển và chính sách */}
              <motion.div
                className="bg-white rounded-2xl shadow-md p-6 mb-6 lg:mb-0 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-start gap-3">
                  <Truck className="text-green-500 mt-1 shrink-0" size={20} />
                  <div>
                    <h3 className="font-medium text-gray-800">
                      Miễn phí giao hàng
                    </h3>
                    <p className="text-sm text-gray-600">
                      Cho đơn hàng trên 300.000đ trong phạm vi 10km
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="text-green-500 mt-1 shrink-0" size={20} />
                  <div>
                    <h3 className="font-medium text-gray-800">
                      Giao hàng nhanh
                    </h3>
                    <p className="text-sm text-gray-600">
                      Nhận hàng trong vòng 1-2 giờ tại Hà Nội
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Cột phải: Tóm tắt đơn hàng */}
            <div className="lg:col-span-1">
              <motion.div
                className="bg-white rounded-2xl shadow-md overflow-hidden sticky top-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-medium text-gray-800 mb-4">
                    Tóm tắt đơn hàng
                  </h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Tạm tính ({cartItems.length} sản phẩm):</span>
                      <span>{calculateTotal.toLocaleString("vi-VN")}đ</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Phí vận chuyển:</span>
                      <span className="text-green-600 font-medium">
                        Miễn phí
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between font-medium text-lg pt-4 border-t border-gray-100">
                    <span>Tổng cộng:</span>
                    <span className="text-green-700 font-medium">
                      {calculateTotal.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <Link
                    to={ROUTES.CHECKOUT}
                    className="w-full py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition duration-300 font-medium text-base shadow-lg shadow-green-100 flex items-center justify-center"
                  >
                    Tiến hành thanh toán
                    <ChevronRight size={18} className="ml-2" />
                  </Link>

                  <Link
                    to={ROUTES.PRODUCTS}
                    className="block w-full text-center py-3 text-gray-600 hover:text-green-700 transition-colors"
                  >
                    <ArrowLeft size={16} className="inline mr-2" />
                    <span>Tiếp tục mua sắm</span>
                  </Link>

                  <div className="text-xs text-center text-gray-500 mt-4 space-y-1">
                    <p>* Đảm bảo chất lượng sản phẩm</p>
                    <p>* Hỗ trợ đổi trả trong vòng 7 ngày</p>
                    <p>* Dự kiến giao hàng trong 1-2 giờ</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        ) : (
          <motion.div
            className="bg-white rounded-2xl shadow-md p-12 text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-center mb-6">
              <ShoppingBag size={80} className="text-gray-200" />
            </div>
            <h2 className="text-2xl font-medium text-gray-800 mb-3">
              Giỏ hàng của bạn đang trống
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Hãy thêm một số sản phẩm yêu thích để tiếp tục mua sắm và nhận các
              ưu đãi đặc biệt
            </p>
            <Link
              to={ROUTES.PRODUCTS}
              className="inline-block px-8 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition duration-300 font-medium shadow-lg shadow-green-100"
            >
              Khám phá sản phẩm
            </Link>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Cart;
