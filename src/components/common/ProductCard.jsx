import { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { ROUTES } from "~/routes";
import { formatPrice } from "~/utils/format";
import { motion } from "framer-motion";
const ProductCard = memo(({ product }) => {
  const {
    id,
    name,
    slug,
    shortDescription,
    price,
    originalPrice,
    image,
    discount,
    rating,
    reviewCount,
  } = product;

  return (
    <motion.div
      whileTap={{ scale: 0.98, duration: 0 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:scale-102 transition-all duration-300"
    >
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          -{discount}%
        </div>
      )}

      {/* Image Container */}
      <div className="relative overflow-hidden aspect-square">
        <Link to={`${ROUTES.PRODUCTS}/${slug}-${id}`}>
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </Link>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {/* Category */}
        <div className="text-sm text-green-700 font-medium mb-2">
          {product.category}
        </div>

        {/* Title */}
        <Link to={`${ROUTES.PRODUCTS}/${slug}-${id}`}>
          <h3 className="text-lg sm:text-xl font-medium text-gray-800 mb-2 group-hover:text-green-700 transition-colors duration-300 line-clamp-2">
            {name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {shortDescription ||
            "Sản phẩm chất lượng cao, được chọn lọc kỹ lưỡng"}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`w-4 h-4 ${
                  index < rating
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">
            ({reviewCount} đánh giá)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-medium text-green-700">
              {formatPrice(price)}
            </span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
          <button
            className="p-3 rounded-full bg-green-50 text-green-700 hover:bg-green-100 transition-colors duration-300 cursor-pointer"
            title="Thêm vào giỏ hàng"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
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
    shortDescription: PropTypes.string,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number,
    image: PropTypes.string.isRequired,
    discount: PropTypes.number,
    rating: PropTypes.number.isRequired,
    reviewCount: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
};

ProductCard.displayName = "ProductCard";

export default ProductCard;
