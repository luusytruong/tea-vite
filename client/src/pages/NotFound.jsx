import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "~/routes";
import { Home } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-center space-y-8 p-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.h1
            className="text-9xl font-medium text-green-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, -5, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            404
          </motion.h1>
        </motion.div>

        <div className="space-y-4">
          <motion.h2
            className="text-4xl font-medium text-gray-800"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Không tìm thấy trang
          </motion.h2>

          <motion.p
            className="text-gray-600 max-w-md mx-auto"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời
            không truy cập được.
          </motion.p>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Link
            to={ROUTES.ROOT}
            className="inline-flex items-center gap-2 px-8 py-3 bg-green-700 text-white rounded-lg font-medium 
                                transition-all duration-300 hover:bg-green-800 hover:shadow-lg
                                transform hover:-translate-y-1"
          >
            <Home size={20} />
            Về trang chủ
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;
