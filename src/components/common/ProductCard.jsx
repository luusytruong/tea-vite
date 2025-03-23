import { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
};

/**
 * ProductCard Component
 * @param {Object} props - Component props
 * @param {Object} props.product - Product data
 * @param {number} props.product.id - Product ID
 * @param {string} props.product.name - Product name
 * @param {string} props.product.description - Product description
 * @param {number} props.product.price - Product price
 * @param {string} props.product.image - Product image URL
 * @param {number} [props.product.discount] - Product discount percentage
 * @param {number} [props.product.originalPrice] - Original product price
 * @param {number} [props.product.rating] - Product rating (1-5)
 */
const ProductCard = memo(({ product }) => {
  const { id, name, slug, shortDescription, price, originalPrice, image, discount, rating } = product;

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          -{discount}%
        </div>
      )}

      {/* Image Container */}
      <div className="relative overflow-hidden aspect-square">
        <Link to={`/products/${slug}`}>
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
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
        <Link to={`/products/${slug}`}>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 group-hover:text-green-700 transition-colors duration-300 line-clamp-2">
            {name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {shortDescription || "Sản phẩm chất lượng cao, được chọn lọc kỹ lưỡng"}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`w-4 h-4 ${
                  index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">({rating})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-bold text-green-700">
              {formatPrice(price)}
            </span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
          <button className="p-2 rounded-full bg-green-50 text-green-700 hover:bg-green-100 transition-colors duration-300">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button className="flex-1 py-2.5 px-4 bg-green-700 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 text-sm font-medium">
            Thêm vào giỏ
          </button>
          <button className="p-2.5 rounded-lg border border-gray-200 text-gray-600 hover:border-green-700 hover:text-green-700 transition-colors duration-300">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
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
    category: PropTypes.string.isRequired,
  }).isRequired,
};

ProductCard.displayName = "ProductCard";

export default ProductCard; 