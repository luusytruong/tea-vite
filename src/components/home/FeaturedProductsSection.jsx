import { memo, useState, useEffect } from "react";
import ProductCard from "../common/ProductCard";
import { products } from "~/data/products";

const FeaturedProductsSection = memo(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Giả lập loading data
    const timer = setTimeout(() => {
      setFeaturedProducts(products.slice(0, 3));
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (productId) => {
    // TODO: Implement add to cart functionality
    console.log("Add to cart:", productId);
  };

  const handleViewDetails = (productId) => {
    // TODO: Implement view details functionality
    console.log("View details:", productId);
  };

  const handleAddToWishlist = (productId) => {
    // TODO: Implement add to wishlist functionality
    console.log("Add to wishlist:", productId);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 font-serif">
            Sản Phẩm Nổi Bật
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-serif">
            Khám phá những sản phẩm trà thượng hạng được chọn lọc kỹ lưỡng từ những vùng trà danh tiếng
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading state
            Array(3).fill(null).map((_, index) => (
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
          ) : (
            featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => handleAddToCart(product.id)}
                onViewDetails={() => handleViewDetails(product.id)}
                onAddToWishlist={() => handleAddToWishlist(product.id)}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
});

FeaturedProductsSection.displayName = "FeaturedProductsSection";

export default FeaturedProductsSection;
