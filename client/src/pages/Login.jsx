import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "~/context/AuthContext";
import InputField from "~/components/common/InputField";
import { ROUTES } from "~/routes";
import useFormData from "~/hooks/useFormData";

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Reset lỗi khi người dùng nhập
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập Số điện thoại";
    } else if (formData.phone.length !== 10) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await login(useFormData(formData));
      } catch (error) {
        setErrors({ submit: error.message });
      }
    }
  };

  useEffect(() => {
    if (user) {
      navigate(ROUTES.ACCOUNT);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4">
      <motion.div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-medium text-gray-800 mb-2">Đăng Nhập</h2>
          <p className="text-gray-600">Chào mừng bạn quay lại!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Số điện thoại"
            name="phone"
            type="number"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Nhập số điện thoại"
            error={errors.phone}
            icon={Phone}
            required
          />

          <InputField
            label="Mật khẩu"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Nhập mật khẩu"
            error={errors.password}
            icon={Lock}
            required
          />

          <motion.button
            type="submit"
            className="w-full py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Đăng Nhập
          </motion.button>

          <div className="flex items-center justify-between text-sm">
            <Link
              to="#"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Quên mật khẩu?
            </Link>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Hoặc</span>
            </div>
          </div>

          <p className="text-center text-gray-600">
            Chưa có tài khoản?{" "}
            <Link
              to={ROUTES.REGISTER}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Đăng ký ngay
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
