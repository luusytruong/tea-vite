import { memo, useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, getRelatedProducts } from "~/data/products";
import { Star, ShoppingCart, Heart, Share2, Truck, Shield } from "lucide-react";
import ProductCard from "~/components/common/ProductCard";
import { ROUTES } from "~/routes";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { formatDate } from "~/utils/format";
import { reviews } from "~/data/reviews";
import ReviewCard from "~/components/common/ReviewCard";
import bg from "~/assets/images/bg-1.jpg";
import ReviewForm from "~/components/common/ReviewForm";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  const productReviews = reviews.filter((r) => r.productId === parseInt(id));
  const averageRating =
    productReviews.length > 0
      ? productReviews.reduce((acc, review) => acc + review.rating, 0) /
        productReviews.length
      : 0;

  if (!product) {
    return (
      <motion.div
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <h1 className="text-2xl font-medium text-gray-800 mb-4">
            Không tìm thấy sản phẩm
          </h1>
          <p className="text-gray-600">
            Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
        </div>
      </motion.div>
    );
  }

  const handleAddToCart = () => {
    console.log(product);
  };

  const handleBuyNow = () => {
    console.log(product);
  };

  const handleAddReview = (reviewData) => {
    console.log("Review data:", reviewData);
    setShowReviewForm(false);
    const newReview = {
      id: productReviews.length + 1,
      productId: parseInt(id),
      userId: 1,
      userName: "Nguyễn Văn A",
      userAvatar: "/images/avatars/avatar-1.jpg",
      rating: reviewData.rating,
      comment: reviewData.comment,
      date: new Date().toISOString().split("T")[0],
      images: [],
    };
    productReviews.push(newReview);
  };

  useEffect(() => {
    document.title = `Mua ${product.name} - Chè Thái`;
  }, [product]);

  return (
    <>
      <meta name="description" content={product.shortDescription} />
      <meta name="keywords" content={product.metaKeywords} />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Product",
          name: "Trà Oolong Sữa",
          image: "https://luusytruong.id.vn/assets/tea-2-DAaWUTCA.png",
          description:
            "Trà Oolong sữa với hương vị béo ngậy, thơm ngon đặc trưng",
          brand: { "@type": "Brand", name: "Chè Thái" },
          offers: {
            "@type": "Offer",
            price: 280000,
            priceCurrency: "VND",
            availability: "http://schema.org/InStock",
            priceValidUntil: "2025-12-31",
            shippingDetails: {
              "@type": "OfferShippingDetails",
              shippingRate: {
                "@type": "MonetaryAmount",
                value: "30000",
                currency: "VND",
              },
              shippingDestination: {
                "@type": "DefinedRegion",
                addressCountry: "VN",
              },
              deliveryTime: {
                "@type": "ShippingDeliveryTime",
                handlingTime: {
                  "@type": "QuantitativeValue",
                  minValue: 1,
                  maxValue: 2,
                  unitCode: "DAY",
                },
                transitTime: {
                  "@type": "QuantitativeValue",
                  minValue: 2,
                  maxValue: 5,
                  unitCode: "DAY",
                },
              },
            },
            hasMerchantReturnPolicy: {
              "@type": "MerchantReturnPolicy",
              applicableCountry: "VN",
              returnPolicyCategory:
                "https://schema.org/MerchantReturnFiniteReturnWindow",
              returnMethod: "http://schema.org/ReturnByMail",
              returnFees: "http://schema.org/FreeReturn",
            },
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: 4.5,
            reviewCount: 96,
          },
          review: [
            {
              "@type": "Review",
              author: { "@type": "Person", name: "Nguyễn Văn A" },
              datePublished: "2024-03-01",
              reviewBody: "Trà Oolong có hương vị béo ngậy, rất thơm ngon!",
              reviewRating: {
                "@type": "Rating",
                ratingValue: "5",
                bestRating: "5",
              },
            },
            {
              "@type": "Review",
              author: { "@type": "Person", name: "Trần Thị B" },
              datePublished: "2024-02-15",
              reviewBody: "Chất lượng tuyệt vời, đáng giá tiền!",
              reviewRating: {
                "@type": "Rating",
                ratingValue: "4.5",
                bestRating: "5",
              },
            },
          ],
        })}
      </script>
      <div ref={containerRef} className="relative min-h-screen">
        <motion.div
          className="container mx-auto px-4 py-8 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Breadcrumb */}
          <motion.div
            className="flex items-center gap-2 text-sm text-gray-600 mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to={ROUTES.ROOT} className="hover:text-green-700">
              Trang chủ
            </Link>
            <span>/</span>
            <Link to={ROUTES.PRODUCTS} className="hover:text-green-700">
              Sản phẩm
            </Link>
            <span>/</span>
            <span className="text-gray-800">{product.name}</span>
          </motion.div>

          {/* Product Info */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Product Images */}
            <motion.div className="space-y-4" variants={fadeInUp}>
              <motion.div
                className="aspect-square rounded-lg overflow-hidden bg-gray-100"
                whileHover={{ scale: 1.02 }}
              >
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
              </motion.div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden ${
                      selectedImage === index ? "ring-2 ring-green-500" : ""
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
            <motion.div className="space-y-6" variants={fadeInUp}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-2xl font-medium text-gray-800 mb-4 font-serif">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    className="flex items-center gap-1"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-gray-700">
                      {averageRating.toFixed(1)}
                    </span>
                    <span className="text-gray-500">
                      ({productReviews.length} đánh giá)
                    </span>
                  </motion.div>
                  <span className="text-gray-500">|</span>
                  <span className="text-gray-500">
                    Còn {product.stock} sản phẩm
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-medium text-green-700">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {product.discount && (
                    <motion.span
                      className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.4 }}
                    >
                      -{product.discount}%
                    </motion.span>
                  )}
                </div>
              </motion.div>

              <motion.div
                className="prose max-w-none"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-gray-600">{product.description}</p>
              </motion.div>

              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  className="flex-1 flex items-center justify-center gap-2 bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBuyNow}
                >
                  <span>Mua ngay</span>
                </motion.button>
                <motion.button
                  className="p-3 border border-gray-200 rounded-lg hover:bg-green-700 hover:text-white hover:scale-110 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5" />
                </motion.button>
                <motion.button
                  className="p-3 border border-gray-200 rounded-lg hover:border-green-700 hover:text-green-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
              </motion.div>

              <motion.div
                className="grid grid-cols-2 gap-4 pt-6 border-t"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.div
                  className="flex items-center gap-2"
                  whileHover={{ x: 5 }}
                >
                  <Truck className="w-5 h-5 text-green-700" />
                  <span className="text-sm text-gray-600">
                    Miễn phí vận chuyển
                  </span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2"
                  whileHover={{ x: 5 }}
                >
                  <Shield className="w-5 h-5 text-green-700" />
                  <span className="text-sm text-gray-600">Bảo hành 7 ngày</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Product Tabs */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="border-b border-gray-200">
              <nav className="flex gap-8">
                <motion.button
                  className={`py-4 px-2 ${
                    activeTab === "description"
                      ? "border-b-2 border-green-600 text-green-700 font-medium"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab("description")}
                >
                  Mô tả sản phẩm
                </motion.button>
                <motion.button
                  className={`py-4 px-2 ${
                    activeTab === "reviews"
                      ? "border-b-2 border-green-600 text-green-700 font-medium"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab("reviews")}
                >
                  Đánh giá ({productReviews.length})
                </motion.button>
              </nav>
            </div>

            <motion.div
              className="py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {activeTab === "description" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <h3 className="text-lg font-medium mb-4">
                      Thông tin sản phẩm
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>
                        <span className="font-medium">Thương hiệu:</span> Trà
                        Thái Nguyên
                      </li>
                      <li>
                        <span className="font-medium">Xuất xứ:</span>{" "}
                        {product.origin}
                      </li>
                      <li>
                        <span className="font-medium">Trọng lượng:</span>{" "}
                        {product.weight}
                      </li>
                      <li>
                        <span className="font-medium">Ngày thu hoạch:</span>{" "}
                        {formatDate(product.harvestDate)}
                      </li>
                      <li>
                        <span className="font-medium">
                          Phương pháp chế biến:
                        </span>{" "}
                        {product.processingMethod}
                      </li>
                      <li>
                        <span className="font-medium">Bảo quản:</span>{" "}
                        {product.storage}
                      </li>
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <h3 className="text-lg font-medium mb-4">Thành phần</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      {product.ingredients
                        .split("\n")
                        .map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <h3 className="text-lg font-medium mb-4">Công dụng</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      {product.benefits.split("\n").map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <h3 className="text-lg font-medium mb-4">Cách sử dụng</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      {product.usage.split("\n").map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              ) : (
                <motion.div
                  className="space-y-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Review Form */}
                  {!showReviewForm ? (
                    <motion.button
                      className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition-colors"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowReviewForm(true)}
                    >
                      Viết đánh giá
                    </motion.button>
                  ) : (
                    <ReviewForm onSubmit={handleAddReview} isBuy={isBuy} />
                  )}

                  {productReviews.length > 0 ? (
                    <>
                      {/* Review Summary */}
                      <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center gap-8">
                          <div className="text-center">
                            <div className="text-4xl font-medium text-green-700 mb-1">
                              {averageRating.toFixed(1)}
                            </div>
                            <div className="flex items-center gap-1 mb-2">
                              {[...Array(5)].map((_, index) => (
                                <Star
                                  key={index}
                                  className={`w-5 h-5 ${
                                    index < averageRating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <div className="text-gray-600">
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
                                  <span className="text-sm text-gray-600 w-4">
                                    {star}
                                  </span>
                                  <div className="flex-1 h-2 bg-gray-100 rounded-full">
                                    <div
                                      className="h-full bg-yellow-400 rounded-full"
                                      style={{ width: `${percentage}%` }}
                                    />
                                  </div>
                                  <span className="text-sm text-gray-600 w-8">
                                    {count}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Review List */}
                      <div className="space-y-6">
                        {productReviews.map((review) => (
                          <ReviewCard key={review.id} review={review} />
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-600">
                        Chưa có đánh giá nào cho sản phẩm này.
                      </p>
                      <p className="text-gray-500 mt-2">
                        Hãy là người đầu tiên đánh giá sản phẩm!
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <h2 className="text-2xl font-medium text-gray-800 mb-8">
                Sản phẩm liên quan
              </h2>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {relatedProducts.map((product) => (
                  <motion.div key={product.id} variants={fadeInUp}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
});

ProductDetail.displayName = "ProductDetail";

export default ProductDetail;
