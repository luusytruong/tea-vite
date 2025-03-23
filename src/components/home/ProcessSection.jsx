import { memo, useState, useRef } from "react";
import { Leaf, Sprout, Package, CheckCircle2, CheckCircle2 as CheckCircle2Icon } from "lucide-react";
import { motion, useInView } from "framer-motion";

const ProcessStep = memo(({ step, isActive, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className={`relative cursor-pointer group transition-all duration-300 ${
        isActive ? "scale-105" : "hover:scale-102"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5 rounded-2xl" />
      
      {/* Content */}
      <div className={`relative p-6 sm:p-8 rounded-2xl border-2 transition-all duration-300 ${
        isActive 
          ? "border-green-700 bg-green-50 shadow-lg shadow-green-100" 
          : "border-gray-100 hover:border-green-200 hover:bg-gray-50"
      }`}>
        {/* Step Number */}
        <div className={`absolute -left-6 sm:-left-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold transition-all duration-300 ${
          isActive 
            ? "bg-green-700 text-white" 
            : "bg-gray-100 text-gray-400 group-hover:bg-green-100 group-hover:text-green-600"
        }`}>
          {step.number}
        </div>

        {/* Icon */}
        <div className={`mb-4 transition-all duration-300 ${
          isActive ? "text-green-600" : "text-gray-400 group-hover:text-green-600"
        }`}>
          {step.icon}
        </div>

        {/* Title */}
        <h3 className={`text-lg sm:text-xl font-semibold mb-2 sm:mb-3 transition-all duration-300 ${
          isActive ? "text-green-700" : "text-gray-700 group-hover:text-green-700"
        }`}>
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          {step.description}
        </p>

        {/* Progress Line */}
        <div className="absolute -right-6 sm:-right-8 top-1/2 -translate-y-1/2 w-12 sm:w-16 h-0.5 bg-gray-100">
          <div className={`h-full bg-green-700 transition-all duration-500 ${
            isActive ? "w-full" : "w-0"
          }`} />
        </div>
      </div>
    </motion.div>
  );
});

ProcessStep.displayName = "ProcessStep";

const ProcessSection = memo(() => {
  const [activeStep, setActiveStep] = useState(1);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const steps = [
    {
      number: 1,
      title: "Chọn lọc nguyên liệu",
      description: "Tuyển chọn những búp trà non tơ, tươi ngon từ những vườn trà chất lượng cao, đạt tiêu chuẩn VietGAP",
      icon: <Leaf className="w-8 h-8 sm:w-10 sm:h-10" />,
    },
    {
      number: 2,
      title: "Sơ chế",
      description: "Làm héo, vò trà theo phương pháp truyền thống để tạo hương vị đặc trưng, đảm bảo vệ sinh an toàn thực phẩm",
      icon: <Sprout className="w-8 h-8 sm:w-10 sm:h-10" />,
    },
    {
      number: 3,
      title: "Chế biến",
      description: "Sao trà ở nhiệt độ phù hợp để giữ được hương vị và dưỡng chất tốt nhất, tuân thủ quy trình VietGAP",
      icon: <Package className="w-8 h-8 sm:w-10 sm:h-10" />,
    },
    {
      number: 4,
      title: "Kiểm tra chất lượng",
      description: "Đánh giá kỹ lưỡng về hương vị, màu sắc và độ an toàn của sản phẩm, đạt tiêu chuẩn VietGAP",
      icon: <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.section 
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-20" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/images/pattern.png')] opacity-5" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-12 md:mb-16"
          variants={itemVariants}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 font-serif relative inline-block">
            Quy Trình Sản Xuất
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-green-700" />
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto font-serif">
            Khám phá quy trình sản xuất trà thượng hạng của chúng tôi, được thực hiện theo phương pháp truyền thống và tuân thủ tiêu chuẩn VietGAP
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative max-w-4xl mx-auto pl-8 sm:pl-12">
          {/* Steps */}
          <motion.div 
            className="space-y-6 sm:space-y-8"
            variants={containerVariants}
          >
            {steps.map((step) => (
              <ProcessStep
                key={step.number}
                step={step}
                isActive={activeStep === step.number}
                onClick={() => setActiveStep(step.number)}
              />
            ))}
          </motion.div>

          {/* Navigation Dots */}
          <motion.div 
            className="flex justify-center gap-3 mt-6 sm:mt-8"
            variants={itemVariants}
          >
            {steps.map((step) => (
              <motion.button
                key={step.number}
                onClick={() => setActiveStep(step.number)}
                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                  activeStep === step.number
                    ? "bg-green-700 scale-125"
                    : "bg-gray-300 hover:bg-green-300"
                }`}
                aria-label={`Chuyển đến bước ${step.number}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </motion.div>
        </div>

        {/* Quality Assurance */}
        <motion.div 
          className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
          variants={containerVariants}
        >
          <motion.div 
            className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Chất lượng đảm bảo</h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Mỗi sản phẩm đều được kiểm tra kỹ lưỡng trước khi đến tay người tiêu dùng
            </p>
          </motion.div>
          <motion.div 
            className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Nguyên liệu tự nhiên</h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Sử dụng 100% nguyên liệu tự nhiên, không chất bảo quản
            </p>
          </motion.div>
          <motion.div 
            className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <Package className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Bao bì thân thiện</h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Sử dụng bao bì thân thiện với môi trường, dễ tái chế
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
});

ProcessSection.displayName = "ProcessSection";

export default ProcessSection; 