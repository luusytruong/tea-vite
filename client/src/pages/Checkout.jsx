import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "~/routes";
import {
  ChevronLeft,
  CreditCard,
  Truck,
  DollarSign,
  Shield,
  Clock,
  Package,
} from "lucide-react";
import { useCart } from "~/context/CartContext";
import { useAuth } from "~/context/AuthContext";
import InputField from "~/components/common/InputField";
import AddressSelect from "~/components/common/AddressSelect";

// Animation variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 }
};

const itemVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 }
};

// Memoized Components
const PaymentMethodCard = React.memo(({
  selected,
  method,
  icon: Icon,
  title,
  description,
  extraInfo,
  onChange,
}) => (
  <div className="relative">
    <motion.label
      className={`block p-4 rounded-xl border-2 cursor-pointer transition-colors duration-200
        ${selected ? "border-green-500 bg-green-50/50" : "border-gray-200 hover:border-gray-300"}`}
    >
      <div className="flex items-start">
        <input
          type="radio"
          name="paymentMethod"
          value={method}
          checked={selected}
          onChange={onChange}
          className="mt-1.5 h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
        />
        <div className="ml-3 flex-grow">
          <span className="flex items-center text-gray-800 font-medium text-base">
            <Icon size={20} className="mr-2 text-green-600" />
            {title}
          </span>
          <span className="text-base text-gray-600 block mt-1">{description}</span>
        </div>
      </div>
    </motion.label>
    
    {selected && extraInfo && (
      <div className="mt-3 p-4 bg-white rounded-lg shadow-sm text-base border border-green-100">
        {extraInfo}
      </div>
    )}
  </div>
));

// Cart Item Component
const CartItem = React.memo(({ item }) => (
  <motion.div
    layout
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    className="flex items-center gap-4"
  >
    <div className="relative w-16 h-16 rounded-lg overflow-hidden">
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute top-0 right-0 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-bl-lg"
      >
        {item.quantity}
      </motion.div>
    </div>
    <div className="flex-grow">
      <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
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
));

// Thêm constant cho phương thức thanh toán
const PAYMENT_METHODS = [
  {
    method: "cod",
    title: "Thanh toán khi nhận hàng (COD)",
    description: "Thanh toán bằng tiền mặt khi nhận hàng",
    icon: DollarSign,
    extraInfo: "Vui lòng chuẩn bị tiền mặt khi nhận hàng. Shipper sẽ không thối tiền lớn."
  },
  {
    method: "bank",
    title: "Chuyển khoản ngân hàng",
    description: "Chuyển khoản qua tài khoản ngân hàng",
    icon: CreditCard,
    extraInfo: (
      <div className="space-y-2">
        <p className="font-medium">Thông tin chuyển khoản:</p>
        <div className="space-y-1">
          <p>Ngân hàng: MB Bank</p>
          <p>Số tài khoản: 0329257843</p>
          <p>Chủ tài khoản: LUU SY TRUONG</p>
          <p>Nội dung: [Họ tên] thanh toán đơn hàng</p>
        </div>
        <p className="text-green-600 font-medium mt-2">
          Đơn hàng sẽ được xác nhận sau khi chúng tôi nhận được thanh toán
        </p>
      </div>
    )
  }
];

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, calculateTotal, handleClearCart } = useCart();
  const { user } = useAuth();
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

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.fullName || "",
        phone: user.phone || "",
        email: user.email || "",
        address: user.address || "",
        city: user.city || "",
        district: user.district || "",
        ward: user.ward || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleAddressChange = (address) => {
    setFormData(prev => ({
      ...prev,
      ...address
    }));
    if (errors.city || errors.district || errors.ward) {
      setErrors(prev => ({
        ...prev,
        city: null,
        district: null,
        ward: null
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
      // Tạo orderNumber giả lập
      const orderNumber = `ORD${Date.now()}`;
      
      // Tạo orderDetails để truyền sang OrderSuccess
      const orderDetails = {
        orderNumber,
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        district: formData.district,
        ward: formData.ward,
        paymentMethod: formData.paymentMethod,
        note: formData.note,
        total: calculateTotal,
        items: cartItems,
        orderDate: new Date().toISOString()
      };

      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear cart
      handleClearCart();
      
      // Navigate với state chứa thông tin đơn hàng
      navigate(ROUTES.ORDER_SUCCESS, {
        state: {
          orderNumber,
          orderDetails
        }
      });
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setLoading(false);
    }
  };

  // Memoize calculated values
  const formattedTotal = useMemo(() => {
    return calculateTotal.toLocaleString("vi-VN") + "đ";
  }, [calculateTotal]);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-green-50 via-white to-green-50 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div 
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="lg:grid lg:grid-cols-3 lg:gap-8"
      >
        {/* Form section */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Thông tin giao hàng */}
            <motion.div className="bg-white rounded-xl shadow-sm p-6">
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

              <AddressSelect
                value={{
                  city: formData.city,
                  district: formData.district,
                  ward: formData.ward
                }}
                onChange={handleAddressChange}
                error={errors}
                required
              />

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
            <motion.div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-medium mb-6 flex items-center text-gray-800">
                <CreditCard className="mr-2 text-green-600" />
                Phương thức thanh toán
              </h2>

              <div className="space-y-4">
                {PAYMENT_METHODS.map((method) => (
                  <PaymentMethodCard
                    key={method.method}
                    selected={formData.paymentMethod === method.method}
                    method={method.method}
                    icon={method.icon}
                    title={method.title}
                    description={method.description}
                    extraInfo={method.extraInfo}
                    onChange={(e) => {
                      handleChange({
                        target: {
                          name: "paymentMethod",
                          value: e.target.value
                        }
                      });
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 mt-6 lg:mt-0">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-[calc(132px)]">
            <h2 className="text-xl font-medium mb-6 text-gray-800">
              Tóm tắt đơn hàng
            </h2>

            <AnimatePresence mode="popLayout">
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </AnimatePresence>

            <motion.button
              type="submit"
              className="w-full mt-6 py-4 bg-green-600 text-white rounded-xl font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? (
                <motion.span 
                  className="flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
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
                </motion.span>
              ) : (
                "Đặt hàng"
              )}
            </motion.button>

            {/* Benefits section */}
            <motion.div 
              className="mt-6 space-y-3"
              variants={containerVariants}
            >
              {[
                { icon: Truck, text: "Giao hàng nội thành trong vòng 1-2 giờ" },
                { icon: Shield, text: "Đảm bảo chất lượng sản phẩm" },
                { icon: Clock, text: "Hỗ trợ đổi trả trong vòng 24h" }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-center gap-3 text-sm text-gray-600"
                >
                  <benefit.icon size={18} className="text-green-600" />
                  <span>{benefit.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default React.memo(Checkout); 