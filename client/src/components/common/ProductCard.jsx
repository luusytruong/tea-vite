import { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { ROUTES } from "~/routes";
import { formatPrice } from "~/utils/format";
import { motion } from "framer-motion";
import { useCart } from "~/context/CartContext";
import useFormData from "~/hooks/useFormData";
import { IMAGE_URL } from "~/context/AuthContext";

const ProductCard = memo(({ product }) => {
  const { actionCart } = useCart();
  const {
    id,
    name,
    slug,
    short_description,
    price,
    original_price,
    image,
    discount,
    rating,
    review_count,
  } = product;

  const handleAddToCart = async () => {
    await actionCart(
      useFormData({
        product_id: product.id,
        quantity: 1,
      }),
      "add"
    );
  };

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -5 }}
      className="group relative bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl  transition-shadow duration-120"
    >
      {/* Favorite Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-colors duration-300"
      >
        <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
      </motion.button>

      {/* Discount Badge */}
      {discount > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-4 left-4 z-10"
        >
          <div className="px-3 py-1 rounded-full bg-red-500/90 backdrop-blur-sm text-white text-sm font-medium shadow-lg">
            -{discount}%
          </div>
        </motion.div>
      )}

      {/* Image Container */}
      <div className="relative overflow-hidden aspect-square">
        <Link to={`${ROUTES.PRODUCTS}/${slug}`}>
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
            src={`${IMAGE_URL}${image}`}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-3.5 h-3.5 ${
                    index < rating || 5
                      ? "text-yellow-400 fill-current"
                      : "text-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">({review_count || 0})</span>
          </div>
        </div>

        {/* Title */}
        <Link to={`${ROUTES.PRODUCTS}/${slug}`}>
          <h3 className="text-lg font-medium text-gray-800 mb-2 line-clamp-2 group-hover:text-green-700 transition-colors duration-300">
            {name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {short_description ||
            "Sản phẩm chất lượng cao, được chọn lọc kỹ lưỡng"}
        </p>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xl font-medium text-green-700">
              {formatPrice(price)}
            </div>
            {original_price && (
              <div className="text-sm text-gray-400 line-through">
                {formatPrice(original_price)}
              </div>
            )}
          </div>

          <motion.button
            onClick={handleAddToCart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition-colors duration-300"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm font-medium">Thêm</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
});

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    short_description: PropTypes.string,
    price: PropTypes.number.isRequired,
    original_price: PropTypes.number,
    image: PropTypes.string.isRequired,
    discount: PropTypes.number,
    rating: PropTypes.number.isRequired,
    review_count: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
};

ProductCard.displayName = "ProductCard";

export default ProductCard;
