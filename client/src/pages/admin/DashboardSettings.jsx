import { memo, useState } from "react";
import { motion } from "framer-motion";
import {
  Save,
  Store,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import { company } from "~/data/company";
import InputField from "~/components/common/InputField";

const DashboardSettings = memo(() => {
  const [settings, setSettings] = useState({
    storeName: company.name,
    email: company.email,
    phone: company.phone,
    address: company.address,
    description: company.description,
    logo: company.logo,
    social: {
      facebook: company.social.facebook,
      instagram: company.social.instagram,
      tiktok: company.social.tiktok,
      youtube: company.social.youtube,
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý lưu cài đặt
    console.log(settings);
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-medium text-gray-900">Cài đặt</h2>
          <p className="text-gray-500 mt-1">Quản lý thông tin cửa hàng</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Thông tin cơ bản */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">
                Thông tin cơ bản
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo
                  </label>
                  <div className="flex items-center gap-4">
                    <img
                      src={settings.logo}
                      alt="Store logo"
                      className="w-16 h-16 rounded-lg object-cover bg-gray-100"
                    />
                    <button
                      type="button"
                      className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50"
                    >
                      Thay đổi
                    </button>
                  </div>
                </div>

                <InputField
                  label="Tên cửa hàng"
                  type="text"
                  value={settings.storeName}
                  onChange={(e) =>
                    setSettings({ ...settings, storeName: e.target.value })
                  }
                  icon={Store}
                  required
                />

                <InputField
                  label="Mô tả"
                  as="textarea"
                  value={settings.description}
                  onChange={(e) =>
                    setSettings({ ...settings, description: e.target.value })
                  }
                  rows={3}
                />
              </div>
            </div>

            {/* Thông tin liên hệ */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">
                Thông tin liên hệ
              </h3>

              <div className="space-y-4">
                <InputField
                  label="Email"
                  type="email"
                  value={settings.email}
                  onChange={(e) =>
                    setSettings({ ...settings, email: e.target.value })
                  }
                  icon={Mail}
                  required
                />

                <InputField
                  label="Số điện thoại"
                  type="tel"
                  value={settings.phone}
                  onChange={(e) =>
                    setSettings({ ...settings, phone: e.target.value })
                  }
                  icon={Phone}
                  required
                />

                <InputField
                  label="Địa chỉ"
                  type="text"
                  value={settings.address}
                  onChange={(e) =>
                    setSettings({ ...settings, address: e.target.value })
                  }
                  icon={MapPin}
                  required
                />
              </div>
            </div>

            {/* Mạng xã hội */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">
                Mạng xã hội
              </h3>

              <div className="space-y-4">
                <InputField
                  label="Facebook"
                  type="text"
                  value={settings.social.facebook}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      social: { ...settings.social, facebook: e.target.value },
                    })
                  }
                  icon={Facebook}
                />

                <InputField
                  label="Instagram"
                  type="text"
                  value={settings.social.instagram}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      social: { ...settings.social, instagram: e.target.value },
                    })
                  }
                  icon={Instagram}
                />

                <InputField
                  label="Youtube"
                  type="text"
                  value={settings.social.youtube}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      social: { ...settings.social, youtube: e.target.value },
                    })
                  }
                  icon={Youtube}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <motion.button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Save className="w-5 h-5" />
                Lưu thay đổi
              </motion.button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});

DashboardSettings.displayName = "DashboardSettings";

export default DashboardSettings;
