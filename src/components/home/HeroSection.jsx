import { memo, useState, useEffect, useRef } from "react";
import {
  Leaf,
  Award,
  Heart,
  Trees,
  Mountain,
  Star,
  Coffee,
  ArrowRight,
} from "lucide-react";
import { heroConfig } from "~/data/hero";
import { motion, AnimatePresence } from "framer-motion";
import { ROUTES } from "~/routes";

const FeatureItem = memo(({ icon: Icon, text, description, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    className="group flex items-start gap-3 p-4 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
  >
    <motion.div
      whileHover={{ scale: 1.1, rotate: 360 }}
      transition={{ duration: 0.6 }}
      className="p-2 rounded-full bg-green-700/20 group-hover:bg-green-700/30 transition-colors"
    >
      <Icon className="w-5 h-5 text-green-300" />
    </motion.div>
    <div>
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: index * 0.15 + 0.3 }}
        className="font-medium text-green-300"
      >
        {text}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: index * 0.15 + 0.4 }}
        className="text-sm text-green-100/80"
      >
        {description}
      </motion.p>
    </div>
  </motion.div>
));

FeatureItem.displayName = "FeatureItem";

const StatItem = memo(({ number, label, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.8,
      delay: 0.8 + index * 0.2,
      type: "spring",
      stiffness: 100,
    }}
    whileHover={{ scale: 1.05 }}
    className="text-center"
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 1 + index * 0.2,
        type: "spring",
      }}
      className="text-3xl font-medium text-green-300 mb-1"
    >
      {number}
    </motion.div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
      className="text-sm text-green-100/80"
    >
      {label}
    </motion.div>
  </motion.div>
));

StatItem.displayName = "StatItem";

const HeroSection = memo(() => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slideInterval = useRef(null);
  const { items, stats } = heroConfig;

  // Xử lý chuyển slide tự động - đã loại bỏ điều kiện isHovered
  useEffect(() => {
    if (!isTransitioning) {
      slideInterval.current = setInterval(() => {
        handleSlideChange((currentSlide + 1) % items.length);
      }, 5000);
    }

    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [isTransitioning, currentSlide, items.length]);

  // Xử lý touch events
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleSlideChange((currentSlide + 1) % items.length);
    } else if (isRightSwipe) {
      handleSlideChange(
        (currentSlide - 1 + items.length) % items.length
      );
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Xử lý chuyển slide
  const handleSlideChange = (newIndex) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentSlide(newIndex);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  // Xử lý chuyển slide bằng dots
  const goToSlide = (index) => {
    handleSlideChange(index);
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case "Leaf":
        return Leaf;
      case "Award":
        return Award;
      case "Heart":
        return Heart;
      case "Tree":
        return Trees;
      case "Mountain":
        return Mountain;
      case "Star":
        return Star;
      case "Coffee":
        return Coffee;
      default:
        return Leaf;
    }
  };

  // Tùy chỉnh các hiệu ứng cho từng slide
  const getSlideInitialState = (index, direction) => {
    // Slide đầu tiên không có hiệu ứng trượt, chỉ có fade in
    if (index === 0) {
      return {
        opacity: 0,
      };
    }
    // Các slide khác vẫn giữ hiệu ứng trượt
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  };

  return (
    <motion.section
      initial="initial"
      animate="animate"
      className="relative md:min-h-[calc(100vh-116px)] overflow-hidden"
    >
      {/* Background Slider */}
      <div
        className="relative min-h-screen md:min-h-[calc(100vh-116px)] md:h-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence initial={true} custom={currentSlide}>
          {items.map(
            (bg, index) =>
              index === currentSlide && (
                <motion.div
                  key={bg.id}
                  custom={currentSlide}
                  initial={getSlideInitialState(index, 1)}
                  animate={{
                    zIndex: 1,
                    x: 0,
                    opacity: 1,
                  }}
                  exit={{
                    zIndex: 0,
                    x: currentSlide > index ? 1000 : -1000,
                    opacity: 0,
                  }}
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.5 },
                  }}
                  className="absolute inset-0"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${bg.image})` }}
                  >
                    <div className="absolute inset-0 bg-black/40" />
                  </div>

                  {/* Content */}
                  <div className="relative h-full container mx-auto px-4 flex items-center">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
                      {/* Left Column - Main Content */}
                      <div className="text-white">
                        <div className="flex flex-wrap gap-4 mb-6">
                          {bg.features.map((feature, idx) => {
                            const Icon = getIcon(feature.icon);
                            return (
                              <FeatureItem
                                key={idx}
                                icon={Icon}
                                text={feature.text}
                                description={feature.description}
                                index={idx}
                              />
                            );
                          })}
                        </div>

                        <motion.h1
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.8,
                            delay: 0.5,
                            type: "spring",
                            stiffness: 100,
                          }}
                          className="text-5xl font-medium mb-6 leading-tight font-serif"
                        >
                          {bg.title}
                        </motion.h1>
                        <motion.p
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.8,
                            delay: 0.7,
                            type: "spring",
                            stiffness: 100,
                          }}
                          className="text-xl mb-8 text-green-100 font-serif"
                        >
                          {bg.description}
                        </motion.p>

                        <motion.a
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.8,
                            delay: 0.9,
                            type: "spring",
                            stiffness: 100,
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={ROUTES.PRODUCTS}
                          className="group inline-flex items-center gap-2 bg-white text-green-900 px-8 py-3 rounded-full font-medium hover:bg-green-100 transition-all duration-300"
                        >
                          Khám phá ngay
                          <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          >
                            <ArrowRight className="w-5 h-5" />
                          </motion.span>
                        </motion.a>
                      </div>

                      {/* Right Column - Stats */}
                      <div className="hidden lg:flex items-center justify-center">
                        <motion.div
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.8,
                            delay: 0.6,
                            type: "spring",
                            stiffness: 100,
                          }}
                          className="grid grid-cols-3 gap-8 p-8 rounded-2xl bg-white/5 backdrop-blur-sm"
                        >
                          {stats.map((stat, index) => (
                            <StatItem key={index} {...stat} index={index} />
                          ))}
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>

      {/* Dots Navigation - đã cải thiện giao diện */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
        {items.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`h-3 shadow-md rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white w-10"
                : "bg-white/50 w-3 hover:bg-white/75"
            }`}
            aria-label={`Chuyển đến slide ${index + 1}`}
          />
        ))}
      </div>
    </motion.section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
