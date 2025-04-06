import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const InputField = ({ 
  label, 
  error, 
  icon: Icon,
  children, 
  className = '',
  helpText,
  ...props 
}) => {
  // Kiểm tra nếu là select hoặc textarea
  const isSelectOrTextarea = props.as === "select" || props.as === "textarea";
  const Component = isSelectOrTextarea ? props.as : "input";

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-gray-700 text-sm font-medium mb-2">
          {label} {props.required && <span className="text-red-500">*</span>}
        </label>
      )}
      <motion.div
        whileFocus={{ scale: 1.01 }}
        className={`relative w-full rounded-lg border ${
          error ? "border-red-400" : "border-gray-300"
        } focus-within:outline-none focus-within:ring-2 focus-within:ring-green-500 focus-within:border-transparent transition-all duration-300 ${className}`}
      >
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        )}
        <Component
          {...props}
          className={`w-full px-4 py-3 bg-transparent rounded-lg focus:outline-none ${
            Icon ? 'pl-10' : ''
          }`}
        >
          {children}
        </Component>
      </motion.div>
      {helpText && (
        <p className="mt-1 text-sm text-gray-500">{helpText}</p>
      )}
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-xs mt-1 flex items-center"
        >
          <AlertCircle size={12} className="mr-1" /> {error}
        </motion.p>
      )}
    </div>
  );
};

export default InputField; 