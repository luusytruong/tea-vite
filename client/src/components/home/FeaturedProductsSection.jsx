import { memo, useState, useEffect } from "react";
import ProductCard from "../common/ProductCard";
import { products } from "~/data/products";
import { motion } from "framer-motion";
import { Leaf, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "~/routes";
import { useHome } from "~/context/HomeContext";
import { useAuth } from "~/context/AuthContext";

const FeaturedProductsSection = memo(() => {
  const { products } = useHome();
  const { isLoading } = useAuth();
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    setFeaturedProducts(products.filter((product) => product.is_featured));
  }, [products]);

  if (isLoading || !products.length) return null;

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center"
          >
            <Leaf className="w-8 h-8 text-green-600" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-medium text-gray-800 mb-6">
            Sản Phẩm Nổi Bật
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Khám phá những sản phẩm trà thượng hạng được chọn lọc kỹ lưỡng từ
            những vùng trà danh tiếng
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading
            ? Array(4)
                .fill(null)
                .map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="animate-pulse"
                  >
                    <div className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
                      <div className="aspect-square bg-gray-200/50" />
                      <div className="p-6">
                        <div className="h-6 bg-gray-200/50 rounded-lg w-3/4 mb-3" />
                        <div className="h-4 bg-gray-200/50 rounded-lg w-full mb-4" />
                        <div className="h-8 bg-gray-200/50 rounded-lg w-1/2 mb-4" />
                        <div className="h-10 bg-gray-200/50 rounded-lg w-full" />
                      </div>
                    </div>
                  </motion.div>
                ))
            : featuredProducts.slice(0, 4).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            to={ROUTES.PRODUCTS}
            className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors group"
          >
            Xem tất cả sản phẩm
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
});

FeaturedProductsSection.displayName = "FeaturedProductsSection";

export default FeaturedProductsSection;
