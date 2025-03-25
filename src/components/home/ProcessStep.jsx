import { memo } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const ProcessStep = memo(({ step, isActive, onClick }) => {
  const { number, icon, title, description } = step;

  return (
    <motion.div
      onClick={onClick}
      className={`relative cursor-pointer group transition-all duration-300 bg-white ${
        isActive ? "scale-103" : "hover:scale-102"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Content */}
      <div
        className={`relative p-7 sm:p-8 rounded-2xl border-2 transition-all duration-300 ${
          isActive
            ? "border-green-700 bg-green-50 shadow-lg shadow-green-100"
            : "border-gray-100 hover:border-green-600 hover:bg-gray-50"
        }`}
      >
        {/* Step Number */}
        <div
          className={`absolute -left-5 sm:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-2xl font-medium transition-all duration-300 ${
            isActive
              ? "bg-green-700 text-white"
              : "bg-gray-100 text-gray-400 group-hover:bg-green-600 group-hover:text-white"
          }`}
        >
          {number}
        </div>

        {/* Icon */}
        <div
          className={`mb-4 transition-all duration-300 ${
            isActive
              ? "text-green-600"
              : "text-gray-400 group-hover:text-green-600"
          }`}
        >
          {icon}
        </div>

        {/* Title */}
        <h3
          className={`text-lg sm:text-xl font-medium mb-2 sm:mb-3 transition-all duration-300 ${
            isActive
              ? "text-green-700"
              : "text-gray-700 group-hover:text-green-700"
          }`}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          {description}
        </p>

        {/* Progress Line */}
        <div className="absolute -right-6 sm:-right-8 top-1/2 -translate-y-1/2 w-12 sm:w-16 h-0.5 bg-gray-100">
          <div
            className={`h-full bg-green-700 transition-all duration-500 ${
              isActive ? "w-full" : "w-0"
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
});

ProcessStep.propTypes = {
  step: PropTypes.shape({
    number: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

ProcessStep.displayName = "ProcessStep";

export default ProcessStep; 