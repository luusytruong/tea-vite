import { memo, useState, useEffect } from "react";
import ProductCard from "../common/ProductCard";
import { products } from "~/data/products";
import { motion } from "framer-motion";

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
    transition: { duration: 0.6 },
  },
};

const FeaturedProductsSection = memo(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Giả lập loading data
    const timer = setTimeout(() => {
      setFeaturedProducts(products);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.section
      className="py-16 bg-gray-50"
      initial="hidden"
      whileInView="visible"
      // viewport={{ once: false, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-medium text-gray-800 mb-4 font-serif">
            Sản Phẩm Nổi Bật
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-serif">
            Khám phá những sản phẩm trà thượng hạng được chọn lọc kỹ lưỡng từ
            những vùng trà danh tiếng
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading
            ? // Loading state
              Array(4)
                .fill(null)
                .map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                      <div className="aspect-square bg-gray-200" />
                      <div className="p-5">
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                        <div className="h-4 bg-gray-200 rounded w-full mb-4" />
                        <div className="h-8 bg-gray-200 rounded w-1/2 mb-4" />
                        <div className="h-10 bg-gray-200 rounded w-full" />
                      </div>
                    </div>
                  </div>
                ))
            : featuredProducts.slice(0, 4).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={() => handleAddToCart(product.id)}
                    onViewDetails={() => handleViewDetails(product.id)}
                    onAddToWishlist={() => handleAddToWishlist(product.id)}
                  />
                </motion.div>
              ))}
        </div>
      </div>
    </motion.section>
  );
});

FeaturedProductsSection.displayName = "FeaturedProductsSection";

export default FeaturedProductsSection;
