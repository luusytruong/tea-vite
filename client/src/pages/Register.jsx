import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "~/context/AuthContext";
import { ROUTES } from "~/routes";
import InputField from "~/components/common/InputField";
import useFormData from "~/hooks/useFormData";

const Register = () => {
  const { register, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    city: "",
    district: "",
    ward: "",
    password: "",
    confirm_password: "",
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

    if (name === "city") {
      setFormData((prev) => ({
        ...prev,
        district: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = "Vui lòng nhập họ và tên";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Mật khẩu không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (validateForm()) {
      try {
        await register(useFormData(formData));
      } catch (error) {
        console.error("Lỗi đăng ký:", error);
        setErrors({ submit: error.message });
      }
    }
  };

  useEffect(() => {
    if (isLoading) return;

    if (user) {
      navigate(ROUTES.ACCOUNT);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4 py-8">
      <motion.div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-medium text-gray-800 mb-2">Đăng Ký</h2>
          <p className="text-gray-600">
            Tạo tài khoản mới để trải nghiệm dịch vụ của chúng tôi
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Họ và tên"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="Nhập họ và tên của bạn"
            error={errors.full_name}
            icon={User}
            required
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Nhập email của bạn"
            error={errors.email}
            icon={Mail}
          />

          <InputField
            label="Số điện thoại"
            name="phone"
            type="tel"
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

          <InputField
            label="Xác nhận mật khẩu"
            name="confirm_password"
            type="password"
            value={formData.confirm_password}
            onChange={handleChange}
            placeholder="Nhập lại mật khẩu"
            error={errors.confirm_password}
            icon={Lock}
            required
          />

          {errors.submit && (
            <div className="text-red-600 text-sm">{errors.submit}</div>
          )}

          <motion.button
            type="submit"
            className="w-full py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Đăng Ký
          </motion.button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Hoặc</span>
            </div>
          </div>

          <p className="text-center text-gray-600">
            Đã có tài khoản?{" "}
            <Link
              to={ROUTES.LOGIN}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Đăng nhập
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
