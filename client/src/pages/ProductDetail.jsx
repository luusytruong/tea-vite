import { memo, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, getRelatedProducts } from "~/data/products";
import {
  Star,
  ShoppingCart,
  Share2,
  Truck,
  Shield,
  ChevronRight,
} from "lucide-react";
import ProductCard from "~/components/common/ProductCard";
import { ROUTES } from "~/routes";
import { motion, AnimatePresence } from "framer-motion";
import { formatDate } from "~/utils/format";
import { reviews } from "~/data/reviews";
import ReviewCard from "~/components/common/ReviewCard";
import ReviewForm from "~/components/common/ReviewForm";

const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN").format(price) + "đ";
};

const ProductDetail = memo(() => {
  const { slugId } = useParams();
  const id = slugId.split("-").pop();
  const product = getProductById(id);
  const relatedProducts = getRelatedProducts(id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [isBuy, setIsBuy] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const productReviews = reviews.filter((r) => r.productId === parseInt(id));
  const averageRating =
    productReviews.length > 0
      ? productReviews.reduce((acc, review) => acc + review.rating, 0) /
        productReviews.length
      : 0;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${product?.name || "Sản phẩm không tồn tại"} - Chè Thái`;
  }, [product]);

  if (!product) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-medium text-gray-800">
            Không tìm thấy sản phẩm
          </h1>
          <p className="text-gray-600">
            Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <Link
            to={ROUTES.PRODUCTS}
            className="inline-block px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
          >
            Quay lại cửa hàng
          </Link>
        </div>
      </motion.div>
    );
  }

  const handleAddToCart = () => {
    // Xử lý thêm vào giỏ hàng
  };

  const handleBuyNow = () => {
    // Xử lý mua ngay
  };

  const handleAddReview = (reviewData) => {
    // Xử lý thêm đánh giá
    setShowReviewForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/30 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link
            to={ROUTES.ROOT}
            className="hover:text-green-600 transition-colors"
          >
            Trang chủ
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link
            to={ROUTES.PRODUCTS}
            className="hover:text-green-600 transition-colors"
          >
            Sản phẩm
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        {/* Product Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-xl overflow-hidden bg-white ${
                    selectedImage === index
                      ? "ring-2 ring-green-500 ring-offset-2"
                      : "hover:ring-2 hover:ring-green-500/50 hover:ring-offset-2"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-medium text-gray-900">
                {product.name}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(averageRating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-600">
                    ({productReviews.length} đánh giá)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <span className="w-2 h-2 rounded-full bg-green-600"></span>
                  <span>Còn {product.stock} sản phẩm</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-3xl font-medium text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.discount && (
                  <span className="px-3 py-1 text-sm font-medium text-red-600 bg-red-50 rounded-full">
                    -{product.discount}%
                  </span>
                )}
              </div>
            </div>

            <div className="prose prose-green max-w-none">
              <p>{product.description}</p>
            </div>

            <div className="flex items-center gap-4">
              <motion.button
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white h-12 rounded-xl font-medium hover:bg-green-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBuyNow}
              >
                Mua ngay
              </motion.button>

              <motion.button
                className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-200 hover:border-green-600 hover:text-green-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5" />
              </motion.button>

              <motion.button
                className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-200 hover:border-green-600 hover:text-green-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    Miễn phí vận chuyển
                  </p>
                  <p className="text-sm text-gray-500">Đơn hàng trên 500k</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Bảo hành 7 ngày</p>
                  <p className="text-sm text-gray-500">Đổi trả miễn phí</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs Section */}
        <div className="mb-16">
          <div className="flex items-center gap-8 border-b border-gray-200">
            <button
              className={`py-4 px-2 text-lg font-medium border-b-2 transition-colors ${
                activeTab === "description"
                  ? "border-green-600 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("description")}
            >
              Mô tả sản phẩm
            </button>
            <button
              className={`py-4 px-2 text-lg font-medium border-b-2 transition-colors ${
                activeTab === "reviews"
                  ? "border-green-600 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              Đánh giá ({productReviews.length})
            </button>
          </div>

          <div className="py-8">
            <AnimatePresence mode="wait">
              {activeTab === "description" ? (
                <motion.div
                  key="description"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-12"
                >
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Thông tin sản phẩm
                      </h3>
                      <dl className="space-y-3">
                        <div className="flex">
                          <dt className="w-32 text-gray-500">Thương hiệu</dt>
                          <dd className="flex-1 text-gray-900">
                            Trà Thái Nguyên
                          </dd>
                        </div>
                        <div className="flex">
                          <dt className="w-32 text-gray-500">Xuất xứ</dt>
                          <dd className="flex-1 text-gray-900">
                            {product?.origin}
                          </dd>
                        </div>
                        <div className="flex">
                          <dt className="w-32 text-gray-500">Trọng lượng</dt>
                          <dd className="flex-1 text-gray-900">
                            {product?.weight}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Thành phần
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        {product?.ingredients
                          .split("\n")
                          .map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                          ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Công dụng
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        {product?.benefits.split("\n").map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Cách sử dụng
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        {product?.usage.split("\n").map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  {!showReviewForm ? (
                    <motion.button
                      className="w-full h-12 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowReviewForm(true)}
                    >
                      Viết đánh giá
                    </motion.button>
                  ) : (
                    <ReviewForm onSubmit={handleAddReview} isBuy={isBuy} />
                  )}

                  {productReviews.length > 0 ? (
                    <div className="space-y-8">
                      <div className="bg-white rounded-2xl shadow-sm p-6">
                        <div className="flex items-start gap-12">
                          <div className="text-center">
                            <div className="text-5xl font-medium text-gray-900 mb-2">
                              {averageRating.toFixed(1)}
                            </div>
                            <div className="flex items-center gap-1 mb-1">
                              {[...Array(5)].map((_, index) => (
                                <Star
                                  key={index}
                                  className={`w-5 h-5 ${
                                    index < averageRating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-200"
                                  }`}
                                />
                              ))}
                            </div>
                            <div className="text-sm text-gray-500">
                              {productReviews.length} đánh giá
                            </div>
                          </div>

                          <div className="flex-1">
                            {[5, 4, 3, 2, 1].map((star) => {
                              const count = productReviews.filter(
                                (r) => r.rating === star
                              ).length;
                              const percentage =
                                (count / productReviews.length) * 100;
                              return (
                                <div
                                  key={star}
                                  className="flex items-center gap-2 mb-2"
                                >
                                  <div className="flex items-center gap-1 w-12">
                                    <span className="text-sm text-gray-600">
                                      {star}
                                    </span>
                                    <Star className="w-4 h-4 text-gray-400" />
                                  </div>
                                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div
                                      className="h-full bg-yellow-400"
                                      initial={{ width: 0 }}
                                      animate={{ width: `${percentage}%` }}
                                      transition={{ duration: 0.8, delay: 0.2 }}
                                    />
                                  </div>
                                  <span className="text-sm text-gray-500 w-12">
                                    {count}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        {productReviews.map((review) => (
                          <ReviewCard key={review.id} review={review} />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-900 font-medium mb-2">
                        Chưa có đánh giá nào
                      </p>
                      <p className="text-gray-500">
                        Hãy là người đầu tiên đánh giá sản phẩm này!
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-medium text-gray-900 mb-8">
              Sản phẩm liên quan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((product, index) => (
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
          </motion.div>
        )}
      </div>
    </div>
  );
});

ProductDetail.displayName = "ProductDetail";

export default ProductDetail;
