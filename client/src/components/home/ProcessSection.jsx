import { memo, useState } from "react";
import { motion } from "framer-motion";
import { Leaf, Package, CheckCircle2, ArrowRight } from "lucide-react";
import { steps } from "~/data/steps";
import teaPattern from "~/assets/images/bg-3.webp";

const ProcessSection = memo(() => {
  const [activeStep, setActiveStep] = useState(1);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-green-900 to-green-800">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage: `url(${teaPattern})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-green-400 rounded-full blur-3xl opacity-10"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-400 rounded-full blur-3xl opacity-10"
        />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-block">
            <span className="text-green-400 text-sm font-medium tracking-wider uppercase mb-4 block">
              Quy Trình Sản Xuất
            </span>
            <h2 className="text-4xl md:text-5xl font-medium text-white mb-6">
              Từ Lá Trà Đến Tách Trà
            </h2>
            <p className="text-green-100/80 text-lg max-w-3xl mx-auto">
              Khám phá quy trình sản xuất trà thượng hạng của chúng tôi, được
              thực hiện theo phương pháp truyền thống và tuân thủ tiêu chuẩn
              VietGAP
            </p>
          </motion.div>
        </motion.div>

        {/* Process Timeline */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            {/* Timeline Line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-green-400/30 to-transparent" />

            {/* Steps */}
            <div className="space-y-12">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  variants={itemVariants}
                  className="relative pl-8"
                >
                  <div
                    className={`absolute left-0 w-px h-full ${
                      activeStep >= step.number
                        ? "bg-green-400"
                        : "bg-green-400/30"
                    } transition-colors duration-500`}
                  />
                  <motion.div
                    whileHover={{ x: 10 }}
                    onClick={() => setActiveStep(step.number)}
                    className={`relative cursor-pointer bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-green-400/20 ${
                      activeStep === step.number ? "bg-white/10" : ""
                    } transition-all duration-300`}
                  >
                    {/* Step Number */}
                    <div className="absolute -left-8 w-4 h-4 rounded-full bg-green-900 border-2 border-green-400 shadow-lg shadow-green-400/20" />

                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-medium text-white mb-2">
                          {step.title}
                        </h3>
                        <p className="text-green-100/70">{step.description}</p>
                      </div>
                      <ArrowRight
                        className={`w-6 h-6 ${
                          activeStep === step.number
                            ? "text-green-400"
                            : "text-green-400/40"
                        } transition-colors duration-300`}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quality Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mt-20"
        >
          {[
            {
              icon: CheckCircle2,
              title: "Chất Lượng Đảm Bảo",
              description:
                "Mỗi sản phẩm đều được kiểm tra kỹ lưỡng trước khi đến tay người tiêu dùng",
            },
            {
              icon: Leaf,
              title: "Nguyên Liệu Tự Nhiên",
              description:
                "Sử dụng 100% nguyên liệu tự nhiên, không chất bảo quản",
            },
            {
              icon: Package,
              title: "Bao Bì Thân Thiện",
              description:
                "Sử dụng bao bì thân thiện với môi trường, dễ tái chế",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-green-400/20"
            >
              <div className="w-12 h-12 rounded-xl bg-green-400/10 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">
                {item.title}
              </h3>
              <p className="text-green-100/70">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

ProcessSection.displayName = "ProcessSection";

export default ProcessSection;
