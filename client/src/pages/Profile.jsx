import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Camera,
  Lock,
  ShoppingBag,
  LogOut,
} from "lucide-react";
import { useAuth } from "~/context/AuthContext";
import { useToast } from "~/context/ToastContext";
import InputField from "~/components/common/InputField";
import Avatar from "~/components/common/Avatar";
import AddressSelect from "~/components/common/AddressSelect";
import { ROUTES } from "~/routes";
import { useNavigate, Link } from "react-router-dom";
import useFormData from "~/hooks/useFormData";
import ProfileSection from "~/components/profile/ProfileSection";

const Profile = () => {
  const { user, updateProfile, logout, isLoading } = useAuth();
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    avatar: null,
  });
  const fileInputRef = useRef();
  const [errors, setErrors] = useState({});

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
      showToast({
        status: "success",
        title: "Đã chọn ảnh đại diện",
      });
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (addressData) => {
    setFormData((prev) => ({
      ...prev,
      city: addressData.city,
      district: addressData.district,
      ward: addressData.ward,
    }));

    if (errors.city || errors.district || errors.ward) {
      setErrors((prev) => ({
        ...prev,
        city: null,
        district: null,
        ward: null,
      }));
    }
  };

  const validateProfile = (data) => {
    const errors = {};

    if (!data.full_name?.trim()) {
      errors.full_name = "Vui lòng nhập họ tên";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email?.trim()) {
      errors.email = "Vui lòng nhập email";
    } else if (!emailRegex.test(data.email)) {
      errors.email = "Email không hợp lệ";
    }

    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!data.phone?.trim()) {
      errors.phone = "Vui lòng nhập số điện thoại";
    } else if (!phoneRegex.test(data.phone)) {
      errors.phone = "Số điện thoại không hợp lệ";
    }

    if (!data.city) {
      errors.city = "Vui lòng chọn tỉnh/thành phố";
    }
    if (!data.district) {
      errors.district = "Vui lòng chọn quận/huyện";
    }
    if (!data.ward) {
      errors.ward = "Vui lòng chọn phường/xã";
    }
    if (!data.address?.trim()) {
      errors.address = "Vui lòng nhập địa chỉ chi tiết";
    }

    return errors;
  };

  const handleSaveProfile = async () => {
    const validationErrors = validateProfile(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast({
        status: "error",
        title: "Đã xảy ra lỗi",
        content: "Vui lòng kiểm tra lại thông tin",
      });
      return;
    }

    try {
      await updateProfile(useFormData(formData));
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      navigate(ROUTES.LOGIN);
      return;
    }

    setFormData((prev) => {
      if (
        prev.full_name === user.full_name &&
        prev.email === user.email &&
        prev.phone === user.phone &&
        prev.address === user.address &&
        prev.city === user.city &&
        prev.district === user.district &&
        prev.ward === user.ward
      ) {
        return prev;
      }

      return {
        full_name: user.full_name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        district: user.district || "",
        ward: user.ward || "",
        avatar: user.avatar || null,
      };
    });
  }, [user, isLoading]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Thông tin cá nhân */}
          <div className="md:col-span-1 space-y-8">
            <ProfileSection title="Hồ Sơ Cá Nhân">
              <div className="relative mx-auto w-32 h-32 mb-6">
                <Avatar
                  src={user?.avatar}
                  alt="Avatar"
                  name={user?.full_name}
                  size={128}
                  className="w-full h-full"
                />
                {isEditing ? (
                  <motion.button
                    onClick={() => fileInputRef.current.click()}
                    className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full shadow-sm"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Camera size={20} />
                  </motion.button>
                ) : null}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                  accept="image/*"
                />
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <InputField
                    label="Họ và tên"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    placeholder="Nhập họ và tên"
                    icon={User}
                    required
                    error={errors.full_name}
                  />
                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Nhập email"
                    icon={Mail}
                    required
                    error={errors.email}
                  />
                  <InputField
                    label="Số điện thoại"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Nhập số điện thoại"
                    icon={Phone}
                    required
                    error={errors.phone}
                  />
                  <AddressSelect
                    value={{
                      city: formData.city,
                      district: formData.district,
                      ward: formData.ward,
                    }}
                    onChange={handleAddressChange}
                    error={errors}
                    required
                  />
                  <InputField
                    label="Địa chỉ chi tiết"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Số nhà, tên đường..."
                    icon={MapPin}
                    required
                    error={errors.address}
                  />
                  <div className="flex justify-between">
                    <motion.button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Hủy
                    </motion.button>
                    <motion.button
                      onClick={handleSaveProfile}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Lưu
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <h3 className="text-xl font-medium text-gray-800">
                    {user?.full_name}
                  </h3>
                  <p className="text-gray-600 mb-4">{user?.email}</p>
                  <motion.button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center justify-center mx-auto gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Edit size={16} />
                    Chỉnh sửa hồ sơ
                  </motion.button>
                </div>
              )}
            </ProfileSection>

            {/* Menu chức năng */}
            <ProfileSection title="Chức Năng">
              <div className="space-y-2">
                {[
                  {
                    icon: Lock,
                    text: "Đổi mật khẩu",
                    onClick: () => {
                      /* Xử lý đổi mật khẩu */
                    },
                  },
                  {
                    icon: LogOut,
                    text: "Đăng xuất",
                    onClick: logout,
                  },
                ].map((item) => (
                  <motion.button
                    key={item.text}
                    onClick={item.onClick}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <item.icon size={20} className="text-green-600" />
                    {item.text}
                  </motion.button>
                ))}
              </div>
            </ProfileSection>
          </div>

          {/* Thông tin chi tiết và đơn hàng */}
          <div className="md:col-span-2 space-y-8">
            <ProfileSection title="Thông Tin Chi Tiết">
              <div className="space-y-4">
                {[
                  {
                    icon: User,
                    label: "Họ và tên",
                    value: user?.full_name,
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: user?.email,
                  },
                  {
                    icon: Phone,
                    label: "Số điện thoại",
                    value: user?.phone || "Chưa cập nhật",
                  },
                  {
                    icon: MapPin,
                    label: "Địa chỉ đầy đủ",
                    value: user?.city
                      ? `${user.address}, ${user.ward}, ${user.district}, ${user.city}`
                      : "Chưa cập nhật",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 pb-3 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="bg-green-50 p-2 rounded-full">
                      <item.icon size={20} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{item.label}</p>
                      <p className="font-medium text-gray-800">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ProfileSection>

            <ProfileSection
              title="Đơn Hàng Gần Đây"
              className="overflow-hidden"
            >
              <Link to={ROUTES.ORDER_LIST} className="text-green-600">
                Xem tất cả đơn hàng
              </Link>
            </ProfileSection>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default React.memo(Profile);
