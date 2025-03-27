import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Coffee,
  Leaf,
  Users,
  Award,
  Phone,
  Mail,
  MapPin,
  Send,
  ArrowRight,
  Globe,
  Target,
  Rocket,
} from "lucide-react";
import InputField from "~/components/common/InputField";
import { company } from "~/data/company";
import backgroundImage from "~/assets/images/bg-1.jpg";
import st1 from "~/assets/images/story/st-1.png";
import st2 from "~/assets/images/story/st-2.png";
import st3 from "~/assets/images/story/st-3.png";
import st4 from "~/assets/images/story/st-4.png";

const About = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Vui lòng nhập tên";
    if (!formData.email.trim()) {
      errors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email không hợp lệ";
    }
    if (!formData.message.trim()) errors.message = "Vui lòng nhập lời nhắn";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Xử lý gửi form
      console.log("Form submitted", formData);
    }
  };

  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center">
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-700/60" />
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight">
              {company.name}
            </h1>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed">
              {company.description}
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-white text-green-800 px-6 py-3 rounded-full font-medium hover:bg-green-100 transition-all"
              >
                Liên Hệ Ngay
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4">
        <div className="relative -mt-24 z-20">
          {/* Background Decoration */}
          <div className="absolute inset-0 bg-gradient-to-b from-green-50/50 to-white/50 backdrop-blur-sm rounded-[40px] shadow-2xl -z-10" />
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 p-6 md:p-8">
            {[
              { 
                icon: Coffee, 
                number: "10+", 
                text: "Năm Kinh Nghiệm",
                gradient: "from-amber-500 to-orange-600",
                bgLight: "bg-amber-50",
              },
              { 
                icon: Leaf, 
                number: "20+", 
                text: "Loại Trà Độc Đáo",
                gradient: "from-green-500 to-emerald-600",
                bgLight: "bg-green-50",
              },
              { 
                icon: Users, 
                number: "100+", 
                text: "Khách Hàng",
                gradient: "from-blue-500 to-indigo-600",
                bgLight: "bg-blue-50",
              },
              { 
                icon: Award, 
                number: "15+", 
                text: "Giải Thưởng",
                gradient: "from-purple-500 to-pink-600",
                bgLight: "bg-purple-50",
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                  delay: index * 0.1 
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`relative overflow-hidden rounded-2xl ${stat.bgLight} p-6 group`}
              >
                {/* Icon Container */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative mb-4"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} rounded-full opacity-20 blur-xl group-hover:opacity-30 transition-opacity`} />
                  <div className="relative flex items-center justify-center w-16 h-16 mx-auto">
                    <stat.icon className={`w-8 h-8 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`} />
                  </div>
                </motion.div>

                {/* Number with Counter Effect */}
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="relative text-4xl font-medium mb-2 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
                >
                  {stat.number}
                </motion.h3>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-gray-600 font-medium"
                >
                  {stat.text}
                </motion.p>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-r from-white/40 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-gradient-to-r from-white/40 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </motion.div>
            ))}
          </div>

          {/* Decorative Lines */}
          <div className="absolute inset-x-8 top-1/2 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent -z-10" />
          <div className="absolute inset-y-8 left-1/2 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent -z-10" />
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-medium text-green-800">
                Sứ Mệnh Của Chúng Tôi
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Chúng tôi không chỉ là một cửa hàng trà, mà còn là những người
                giữ gìn và lan tỏa văn hóa trà Việt Nam. Mỗi sản phẩm đều mang
                trong mình câu chuyện về con người, về đất và về nghệ thuật chế
                biến tinh tế.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { icon: Globe, title: "Lan Tỏa Văn Hóa" },
                { icon: Target, title: "Chất Lượng Hàng Đầu" },
                { icon: Rocket, title: "Đổi Mới Sáng Tạo" },
                { icon: Leaf, title: "Bền Vững" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 bg-green-50 p-3 rounded-lg"
                >
                  <item.icon className="w-6 h-6 text-green-600" />
                  <span className="text-green-800">{item.title}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={st1}
                alt="Nghệ thuật trà"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 bg-white shadow-sm rounded-2xl p-8 md:p-16">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-medium text-green-800">
              Liên Hệ Chúng Tôi
            </h2>
            <div className="space-y-4">
              {[
                { icon: Phone, text: company.phone },
                { icon: Mail, text: company.email },
                { icon: MapPin, text: company.address },
              ].map((contact, index) => (
                <div key={index} className="flex items-center gap-4">
                  <contact.icon className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">{contact.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                label="Họ và Tên"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                error={formErrors.name}
                required
              />
              <InputField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                error={formErrors.email}
                required
              />
              <InputField
                label="Lời Nhắn"
                as="textarea"
                name="message"
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                error={formErrors.message}
                required
              />
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
              >
                Gửi Tin Nhắn
                <Send className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
