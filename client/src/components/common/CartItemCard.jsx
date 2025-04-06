import React, { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { formatPrice } from "~/utils/format";
import { ROUTES } from "~/routes";
import { Trash2, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { IMAGE_URL } from "~/context/AuthContext";
const CartItemCard = memo(({ product, onRemove, onUpdateQuantity }) => {
  const {
    id,
    name,
    slug,
    price,
    image,
    quantity,
    variant,
    weight,
    original_price,
  } = product;

  // Sử dụng useCallback để tránh re-render không cần thiết
  const handleDecrease = useCallback(() => {
    onUpdateQuantity(id, "down");
  }, [id, onUpdateQuantity]);

  const handleIncrease = useCallback(() => {
    onUpdateQuantity(id, "up");
  }, [id, onUpdateQuantity]);

  const discount = original_price
    ? Math.round(((original_price - price) / original_price) * 100)
    : 0;

  return (
    <AnimatePresence>
      <motion.div
        className="group relative bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 flex w-full mb-4"
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={{ scale: 1.01 }}
      >
        {/* Ảnh sản phẩm - đảm bảo tỷ lệ 1:1 */}
        <div className="relative w-[100px] min-w-[100px] sm:w-[140px] sm:min-w-[140px] aspect-square shrink-0">
          <NavLink
            to={`${ROUTES.PRODUCTS}/${slug}`}
            className="block w-full h-full overflow-hidden"
          >
            <motion.div
              className="w-full h-full relative"
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={`${IMAGE_URL}${image}`}
                alt={name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
          </NavLink>
          {discount > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] xs:text-xs font-medium px-1.5 py-0.5 xs:px-2 xs:py-1 rounded-full">
              -{discount}%
            </div>
          )}
        </div>

        {/* Thông tin sản phẩm */}
        <div className="flex-grow min-w-0 p-2 xs:p-3 sm:p-4 flex flex-col justify-between">
          <div>
            <NavLink to={`${ROUTES.PRODUCTS}/${slug}`}>
              <h3 className="text-sm xs:text-base sm:text-lg font-medium text-gray-800 hover:text-green-600 transition-colors duration-300 line-clamp-2">
                {name}
              </h3>
            </NavLink>

            <div className="mt-1 sm:mt-2 flex flex-wrap gap-1 sm:gap-2">
              {variant && (
                <span className="inline-block bg-gray-100 text-gray-700 text-[10px] xs:text-xs px-1.5 py-0.5 xs:px-2 xs:py-1 rounded-full">
                  {variant}
                </span>
              )}
              {weight && (
                <span className="inline-block bg-gray-100 text-gray-700 text-[10px] xs:text-xs px-1.5 py-0.5 xs:px-2 xs:py-1 rounded-full">
                  {weight}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mt-2 sm:mt-4">
            {/* Điều khiển số lượng */}
            <div className="flex items-center bg-gray-50 rounded-lg p-0.5 xs:p-1">
              <motion.button
                onClick={handleDecrease}
                className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md hover:bg-white hover:shadow-md text-gray-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Minus size={14} />
              </motion.button>
              <span className="w-7 xs:w-8 sm:w-10 text-center text-sm xs:text-base font-medium text-gray-700">
                {quantity || 1}
              </span>
              <motion.button
                onClick={handleIncrease}
                className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md hover:bg-white hover:shadow-md text-gray-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Plus size={14} />
              </motion.button>
            </div>

            {/* Giá sản phẩm */}
            <div className="text-right">
              <motion.p
                className="text-sm xs:text-base sm:text-lg font-medium text-green-600"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
              >
                {formatPrice(price * (quantity || 1))}
              </motion.p>
              {original_price && (
                <p className="text-xs sm:text-sm text-gray-400 line-through">
                  {formatPrice(original_price * (quantity || 1))}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Nút xóa */}
        <motion.button
          onClick={() => onRemove(id)}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-md text-gray-400 hover:text-red-500 hover:shadow-lg transition-all duration-300"
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
        >
          <Trash2 size={14} className="xs:hidden" />
          <Trash2 size={16} className="hidden xs:block" />
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
});

CartItemCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    quantity: PropTypes.number,
    variant: PropTypes.string,
    weight: PropTypes.string,
    original_price: PropTypes.number,
  }).isRequired,
  onRemove: PropTypes.func,
  onUpdateQuantity: PropTypes.func,
};

CartItemCard.defaultProps = {
  onRemove: () => {},
  onUpdateQuantity: () => {},
};

CartItemCard.displayName = "CartItemCard";

export default CartItemCard;
