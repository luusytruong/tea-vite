import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "~/routes";
import {
  ChevronLeft,
  CreditCard,
  Truck,
  DollarSign,
  Check,
  Shield,
  Clock,
  AlertCircle,
  Package,
} from "lucide-react";
import { useCart } from "~/context/CartContext";

const PaymentMethodCard = ({
  selected,
  method,
  icon: Icon,
  title,
  description,
  extraInfo,
  onChange,
}) => (
  <motion.label
    className={`block p-4 rounded-xl border-2 cursor-pointer transition-all duration-300
      ${
        selected
          ? "border-green-500 bg-green-50/50"
          : "border-gray-200 hover:border-gray-300"
      }`}
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
  >
    <div className="flex items-start">
      <input
        type="radio"
        name="paymentMethod"
        value={method}
        checked={selected}
        onChange={onChange}
        className="mt-1 h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
      />
      <div className="ml-3 flex-grow">
        <span className="flex items-center text-gray-800 font-medium">
          <Icon size={20} className="mr-2 text-green-600" />
          {title}
        </span>
        <span className="text-sm text-gray-600 block mt-1">{description}</span>
        {selected && extraInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 p-4 bg-white rounded-lg shadow-sm text-sm border border-green-100"
          >
            {extraInfo}
          </motion.div>
        )}
      </div>
    </div>
  </motion.label>
);

const InputField = ({ label, error, children, ...props }) => {
  // Kiểm tra nếu là select hoặc textarea
  const isSelectOrTextarea = props.as === "select" || props.as === "textarea";

  // Chọn component phù hợp
  const Component = isSelectOrTextarea ? props.as : "input";

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-medium mb-2">
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
      <motion.div
        whileFocus={{ scale: 1.01 }}
        className={`w-full rounded-lg border ${
          error ? "border-red-400" : "border-gray-300"
        } focus-within:outline-none focus-within:ring-2 focus-within:ring-green-500 focus-within:border-transparent transition-all duration-300`}
      >
        {isSelectOrTextarea ? (
          <Component
            {...props}
            className="w-full px-4 py-3 bg-transparent rounded-lg focus:outline-none"
          >
            {children}
          </Component>
        ) : (
          <Component
            {...props}
            className="w-full px-4 py-3 bg-transparent rounded-lg focus:outline-none"
          />
        )}
      </motion.div>
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-xs mt-1 flex items-center"
        >
          <AlertCircle size={12} className="mr-1" /> {error}
        </motion.p>
      )}
    </div>
  );
};

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, calculateTotal, handleClearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    paymentMethod: "cod",
    note: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Vui lòng nhập họ tên";
    if (!formData.phone) newErrors.phone = "Vui lòng nhập số điện thoại";
    if (!formData.address) newErrors.address = "Vui lòng nhập địa chỉ";
    if (!formData.city) newErrors.city = "Vui lòng chọn thành phố";
    if (!formData.district) newErrors.district = "Vui lòng chọn quận/huyện";
    if (!formData.ward) newErrors.ward = "Vui lòng chọn phường/xã";

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Giả lập API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Xử lý thành công
      handleClearCart();
      navigate(ROUTES.ORDER_SUCCESS, {
        state: {
          orderNumber: `ORD${Date.now()}`,
          orderDetails: { ...formData, total: calculateTotal },
        },
      });
    } catch (error) {
      setErrors({ submit: "Có lỗi xảy ra, vui lòng thử lại" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-tr from-green-50 via-white to-green-50 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            to={ROUTES.CART}
            className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors mb-4"
          >
            <ChevronLeft size={20} className="mr-1" />
            Quay lại giỏ hàng
          </Link>
          <h1 className="text-3xl font-medium text-gray-800">Thanh toán</h1>
          <p className="text-gray-600 mt-2">Hoàn tất đơn hàng của bạn</p>
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Form thanh toán */}
          <div className="lg:col-span-2">
            <motion.form onSubmit={handleSubmit} className="space-y-6" layout>
              {/* Thông tin giao hàng */}
              <motion.div
                className="bg-white rounded-xl shadow-sm p-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <h2 className="text-xl font-medium mb-6 flex items-center text-gray-800">
                  <Package className="mr-2 text-green-600" />
                  Thông tin giao hàng
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Họ và tên"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Nhập họ và tên"
                    error={errors.fullName}
                  />

                  <InputField
                    label="Số điện thoại"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Nhập số điện thoại"
                    error={errors.phone}
                  />
                </div>

                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Nhập email (không bắt buộc)"
                  error={errors.email}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InputField
                    label="Tỉnh/Thành phố"
                    name="city"
                    as="select"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    error={errors.city}
                  >
                    <option value="">Chọn tỉnh/thành phố</option>
                    <option value="hanoi">Hà Nội</option>
                    <option value="hcm">TP. Hồ Chí Minh</option>
                  </InputField>

                  <InputField
                    label="Quận/Huyện"
                    name="district"
                    as="select"
                    value={formData.district}
                    onChange={handleChange}
                    required
                    error={errors.district}
                  >
                    <option value="">Chọn quận/huyện</option>
                    <option value="district1">Quận 1</option>
                    <option value="district2">Quận 2</option>
                  </InputField>

                  <InputField
                    label="Phường/Xã"
                    name="ward"
                    as="select"
                    value={formData.ward}
                    onChange={handleChange}
                    required
                    error={errors.ward}
                  >
                    <option value="">Chọn phường/xã</option>
                    <option value="ward1">Phường 1</option>
                    <option value="ward2">Phường 2</option>
                  </InputField>
                </div>

                <InputField
                  label="Địa chỉ chi tiết"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Số nhà, tên đường..."
                  error={errors.address}
                />

                <InputField
                  label="Ghi chú"
                  name="note"
                  as="textarea"
                  value={formData.note}
                  onChange={handleChange}
                  placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn"
                  rows="3"
                />
              </motion.div>

              {/* Phương thức thanh toán */}
              <motion.div
                className="bg-white rounded-xl shadow-sm p-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-xl font-medium mb-6 flex items-center text-gray-800">
                  <CreditCard className="mr-2 text-green-600" />
                  Phương thức thanh toán
                </h2>

                <div className="space-y-4">
                  <PaymentMethodCard
                    selected={formData.paymentMethod === "cod"}
                    method="cod"
                    icon={DollarSign}
                    title="Thanh toán khi nhận hàng (COD)"
                    description="Thanh toán bằng tiền mặt khi nhận được hàng"
                    onChange={handleChange}
                  />

                  <PaymentMethodCard
                    selected={formData.paymentMethod === "bank"}
                    method="bank"
                    icon={CreditCard}
                    title="Chuyển khoản ngân hàng"
                    description="Chuyển khoản qua tài khoản ngân hàng"
                    onChange={handleChange}
                    extraInfo={
                      <div>
                        <p className="font-medium mb-2">Thông tin tài khoản:</p>
                        <p>Ngân hàng: Vietcombank</p>
                        <p>Số tài khoản: 1234567890</p>
                        <p>Chủ tài khoản: CÔNG TY TNHH TRÀ VIỆT</p>
                        <p className="mt-2 text-xs text-gray-500">
                          Nội dung chuyển khoản: [Họ tên] - [Số điện thoại]
                        </p>
                      </div>
                    }
                  />
                </div>
              </motion.div>
            </motion.form>
          </div>

          {/* Tóm tắt đơn hàng */}
          <motion.div
            className="lg:col-span-1 mt-6 lg:mt-0"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-[calc(132px)]">
              <h2 className="text-xl font-medium mb-6 text-gray-800">
                Tóm tắt đơn hàng
              </h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className="flex items-center gap-4"
                    layout
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-0 right-0 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-bl-lg">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-sm font-medium text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {item.variant} {item.weight && `- ${item.weight}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-800">
                        {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính:</span>
                  <span>{calculateTotal.toLocaleString("vi-VN")}đ</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Phí vận chuyển:</span>
                  <span className="text-green-600">Miễn phí</span>
                </div>
                <div className="flex justify-between text-lg font-medium border-t border-gray-100 pt-3">
                  <span>Tổng cộng:</span>
                  <span className="text-green-600">
                    {calculateTotal.toLocaleString("vi-VN")}đ
                  </span>
                </div>
              </div>

              <motion.button
                type="submit"
                className="w-full mt-6 py-4 bg-green-600 text-white rounded-xl font-medium transition-all duration-300 relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <motion.span
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full inline-block"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <span className="ml-2">Đang xử lý...</span>
                  </span>
                ) : (
                  "Đặt hàng"
                )}
              </motion.button>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck size={18} className="text-green-600" />
                  <span>Giao hàng nội thành trong vòng 1-2 giờ</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield size={18} className="text-green-600" />
                  <span>Đảm bảo chất lượng sản phẩm</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Clock size={18} className="text-green-600" />
                  <span>Hỗ trợ đổi trả trong vòng 24h</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;
