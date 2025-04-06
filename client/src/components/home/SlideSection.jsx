import React, { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "~/routes";
import { slides } from "~/data/slides";

const themeColors = {
  green: {
    bg: "from-green-900/80 to-green-950/50",
    text: "text-white",
    accent: "text-green-400",
    button: "bg-green-500 hover:bg-green-600",
    buttonOutline: "border-green-400 text-green-400 hover:bg-green-400/10",
  },
  earth: {
    bg: "from-amber-900/80 to-amber-950/50",
    text: "text-white",
    accent: "text-amber-400",
    button: "bg-amber-500 hover:bg-amber-600",
    buttonOutline: "border-amber-400 text-amber-400 hover:bg-amber-400/10",
  },
  clay: {
    bg: "from-orange-900/80 to-orange-950/50",
    text: "text-white",
    accent: "text-orange-400",
    button: "bg-orange-500 hover:bg-orange-600",
    buttonOutline: "border-orange-400 text-orange-400 hover:bg-orange-400/10",
  },
};

const SlideSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const currentTheme = useMemo(
    () => themeColors[slides[currentSlide].theme],
    [currentSlide]
  );

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  }, []);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  }, []);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        handleNextSlide();
      } else {
        handlePrevSlide();
      }
    }

    // Reset touch values
    setTouchStart(null);
    setTouchEnd(null);

    // Khôi phục autoplay sau 5 giây
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  return (
    <div
      className="relative min-h-[calc(100vh-80px)] md:min-h-[100svh] bg-black overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          {/* Background Image & Overlay */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-b ${currentTheme.bg}`}
            />
          </motion.div>

          {/* Content Container - Điều chỉnh padding và layout */}
          <div className="relative h-full container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-full grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12 pt-16 pb-20 lg:py-0">
              {/* Left Column - Text Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-left space-y-5 md:space-y-6 max-w-xl mx-0" // Thay đổi alignment và margin
              >
                <span
                  className={`inline-block text-base lg:text-lg ${currentTheme.accent} font-medium tracking-wide`}
                >
                  {slides[currentSlide].subtitle}
                </span>

                <h1
                  className={`text-5xl md:text-5xl lg:text-6xl font-medium old-style ${currentTheme.text} leading-tight`}
                >
                  {slides[currentSlide].title}
                </h1>

                <p
                  className={`text-base md:text-lg ${currentTheme.text} opacity-90 leading-relaxed`}
                >
                  {slides[currentSlide].description}
                </p>

                {/* Stats Section - Điều chỉnh layout */}
                {slides[currentSlide].stats && (
                  <div className="flex flex-wrap md:grid md:grid-cols-3 gap-3 md:gap-4 py-2 md:py-4">
                    {slides[currentSlide].stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        className="text-left p-3 rounded-lg bg-white/5 backdrop-blur-sm"
                      >
                        <div
                          className={`text-xl md:text-2xl lg:text-3xl font-medium ${currentTheme.accent}`}
                        >
                          {stat.value}
                        </div>
                        <div
                          className={`text-sm ${currentTheme.text} opacity-80`}
                        >
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Features Section - Điều chỉnh layout */}
                {slides[currentSlide].features && (
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {slides[currentSlide].features.map((feature, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        className={`px-4 py-2 rounded-full border ${currentTheme.buttonOutline} text-sm backdrop-blur-sm`}
                      >
                        {feature}
                      </motion.span>
                    ))}
                  </div>
                )}

                {/* Collection Section - Điều chỉnh layout */}
                {slides[currentSlide].collection && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="space-y-3"
                  >
                    <h3
                      className={`text-lg font-medium ${currentTheme.accent}`}
                    >
                      {slides[currentSlide].collection.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {slides[currentSlide].collection.items.map(
                        (item, index) => (
                          <span
                            key={index}
                            className={`px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm ${currentTheme.text} text-sm`}
                          >
                            {item}
                          </span>
                        )
                      )}
                    </div>
                  </motion.div>
                )}

                {/* CTA Buttons - Điều chỉnh layout */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="flex flex-row flex-wrap gap-3 pt-2"
                >
                  <Link
                    to={ROUTES.PRODUCTS}
                    className={`group px-6 py-2.5 rounded-xl text-white text-sm md:text-base font-medium ${currentTheme.button} transition-all duration-300 flex items-center gap-2 hover:scale-105`}
                  >
                    {slides[currentSlide].cta.main}
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                    </motion.span>
                  </Link>
                  <Link
                    to={ROUTES.ABOUT}
                    className={`hidden md:block px-6 py-2.5 rounded-xl border text-sm md:text-base transition-colors duration-300 font-medium ${currentTheme.buttonOutline} hover:scale-105`}
                  >
                    {slides[currentSlide].cta.sub}
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right Column - Image */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="relative aspect-[4/3] md:aspect-[16/10] lg:aspect-square w-full max-w-2xl mx-auto lg:ml-auto"
              >
                <div className="hidden md:block absolute inset-0 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
                  <motion.img
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].title}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls - Điều chỉnh vị trí */}
      <div className="absolute bottom-4 left-4 md:left-6 lg:left-8 flex items-center gap-3 z-10">
        <button
          onClick={handlePrevSlide}
          className="p-1.5 md:p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </button>

        <div className="flex gap-1.5 md:gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 5000);
              }}
              className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? `w-6 md:w-8 ${currentTheme.button}`
                  : "w-1.5 md:w-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNextSlide}
          className="p-1.5 md:p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </button>
      </div>

      {/* Progress Bar */}
      <motion.div
        className={`absolute bottom-0 left-0 h-0.5 md:h-1 ${currentTheme.button}`}
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 6, ease: "linear", repeat: Infinity }}
      />
    </div>
  );
};

export default SlideSection;
