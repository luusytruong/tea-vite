import { memo, useState } from "react";
import { motion } from "framer-motion";
import { Leaf, Package, CheckCircle2 } from "lucide-react";
import ProcessStep from "./ProcessStep";
import { steps } from "~/data/steps";

const ProcessSection = memo(() => {
  const [activeStep, setActiveStep] = useState(1);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.section
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-800 mb-4 sm:mb-6 font-serif relative inline-block">
            Quy Trình Sản Xuất
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-green-700" />
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto font-serif">
            Khám phá quy trình sản xuất trà thượng hạng của chúng tôi, được thực
            hiện theo phương pháp truyền thống và tuân thủ tiêu chuẩn VietGAP
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative max-w-4xl mx-auto pl-8 sm:pl-12">
          {/* Steps */}
          <div className="space-y-6 sm:space-y-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number + i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <ProcessStep
                  step={step}
                  isActive={activeStep === step.number}
                  onClick={() => setActiveStep(step.number)}
                />
              </motion.div>
            ))}
          </div>

          {/* Navigation Dots */}
          <motion.div
            className="flex justify-center gap-3 mt-6 sm:mt-8"
            initial="hidden"
            whileInView="visible"
            variants={itemVariants}
          >
            {steps.map((step) => (
              <motion.button
                key={step.number}
                onClick={() => setActiveStep(step.number)}
                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                  activeStep === step.number
                    ? "bg-green-700 scale-125"
                    : "bg-gray-300 hover:bg-green-600"
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
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
        >
          {[
            {
              icon: CheckCircle2,
              title: "Chất lượng đảm bảo",
              description:
                "Mỗi sản phẩm đều được kiểm tra kỹ lưỡng trước khi đến tay người tiêu dùng",
            },
            {
              icon: Leaf,
              title: "Nguyên liệu tự nhiên",
              description:
                "Sử dụng 100% nguyên liệu tự nhiên, không chất bảo quản",
            },
            {
              icon: Package,
              title: "Bao bì thân thiện",
              description:
                "Sử dụng bao bì thân thiện với môi trường, dễ tái chế",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
});

ProcessSection.displayName = "ProcessSection";

export default ProcessSection;
