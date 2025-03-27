import { motion } from "framer-motion";
const ProfileSection = ({ title, children, className = "" }) => {
  return (
    <motion.div
      className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-medium text-gray-800 mb-4 border-b border-gray-100 pb-2 flex items-center">
        {title}
      </h2>
      {children}
    </motion.div>
  );
};

export default ProfileSection;
