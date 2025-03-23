import { motion } from 'framer-motion';
import { Coffee, Leaf, Users, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-16"
      >
        <motion.h1 
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-center text-green-800 mb-4"
        >
          Hành Trình Của Chúng Tôi
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-center text-gray-600 max-w-2xl mx-auto mb-16"
        >
          Khám phá câu chuyện về niềm đam mê và sự tận tâm của chúng tôi với nghệ thuật trà Việt Nam
        </motion.p>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {[
            { icon: Coffee, number: "10+", text: "Năm Kinh Nghiệm" },
            { icon: Leaf, number: "50+", text: "Loại Trà Độc Đáo" },
            { icon: Users, number: "10000+", text: "Khách Hàng Tin Tưởng" },
            { icon: Award, number: "15+", text: "Giải Thưởng" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all"
            >
              <stat.icon className="w-12 h-12 mx-auto mb-4 text-green-700" />
              <h3 className="text-3xl font-bold text-green-800">{stat.number}</h3>
              <p className="text-gray-600">{stat.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-green-800 mb-4">Câu Chuyện Của Chúng Tôi</h2>
              <p className="text-gray-600 leading-relaxed">
                Từ những búp trà đầu tiên tại Thái Nguyên, chúng tôi đã dành trọn tâm huyết để tạo nên 
                những sản phẩm trà tinh túy nhất. Mỗi tách trà không chỉ là thức uống, mà còn là câu 
                chuyện về văn hóa, về tình yêu và sự tận tâm với nghề.
              </p>
            </div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-green-50 p-8 rounded-2xl shadow-lg"
            >
              <h2 className="text-2xl font-bold text-green-800 mb-4">Giá Trị Cốt Lõi</h2>
              <ul className="space-y-4">
                {[
                  "Chất lượng không compromised",
                  "Đổi mới và sáng tạo liên tục",
                  "Tôn trọng giá trị truyền thống",
                  "Phát triển bền vững"
                ].map((value, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-center space-x-3"
                  >
                    <span className="h-2 w-2 bg-green-700 rounded-full" />
                    <span className="text-gray-700">{value}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10">
              <img 
                src="/images/tea-ceremony.jpg" 
                alt="Nghệ thuật trà đạo" 
                className="rounded-2xl shadow-2xl"
              />
              {/* Decorative elements */}
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -top-10 -right-10 w-32 h-32 bg-green-200 rounded-full opacity-20"
              />
              <motion.div
                animate={{ 
                  rotate: [360, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -bottom-8 -left-8 w-24 h-24 bg-green-300 rounded-full opacity-20"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default About; 