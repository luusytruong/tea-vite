import { memo, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductBySlug, getRelatedProducts } from "~/data/products";
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, ArrowLeft } from "lucide-react";
import ProductCard from "~/components/common/ProductCard";

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
};

const ProductDetail = memo(() => {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const relatedProducts = getRelatedProducts(product?.id);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Không tìm thấy sản phẩm</h1>
          <p className="text-gray-600">Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
        <a href="/" className="hover:text-green-700">Trang chủ</a>
        <span>/</span>
        <a href="/products" className="hover:text-green-700">Sản phẩm</a>
        <span>/</span>
        <span className="text-gray-800">{product.name}</span>
      </div>

      {/* Product Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden ${
                  selectedImage === index ? 'ring-2 ring-green-500' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4 font-serif">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="text-gray-700">{product.rating}</span>
                <span className="text-gray-500">({product.reviewCount} đánh giá)</span>
              </div>
              <span className="text-gray-500">|</span>
              <span className="text-gray-500">Còn {product.stock} sản phẩm</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-green-700">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.discount && (
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  -{product.discount}%
                </span>
              )}
            </div>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 bg-green-700 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              <span>Thêm vào giỏ hàng</span>
            </button>
            <button className="p-3 border border-gray-200 rounded-lg hover:border-green-700 hover:text-green-600 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-3 border border-gray-200 rounded-lg hover:border-green-700 hover:text-green-600 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6 border-t">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-green-700" />
              <span className="text-sm text-gray-600">Miễn phí vận chuyển</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-700" />
              <span className="text-sm text-gray-600">Bảo hành 7 ngày</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mb-12">
        <div className="border-b border-gray-200">
          <nav className="flex gap-8">
            <button className="py-4 px-2 border-b-2 border-green-600 text-green-700 font-medium">
              Mô tả sản phẩm
            </button>
            <button className="py-4 px-2 text-gray-500 hover:text-gray-700">
              Thông tin chi tiết
            </button>
            <button className="py-4 px-2 text-gray-500 hover:text-gray-700">
              Đánh giá ({product.reviewCount})
            </button>
          </nav>
        </div>

        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Thông tin sản phẩm</h3>
              <ul className="space-y-2 text-gray-600">
                <li><span className="font-medium">Thương hiệu:</span> Trà Thái Nguyên</li>
                <li><span className="font-medium">Xuất xứ:</span> {product.origin}</li>
                <li><span className="font-medium">Trọng lượng:</span> {product.weight}</li>
                <li><span className="font-medium">Ngày thu hoạch:</span> {product.harvestDate}</li>
                <li><span className="font-medium">Phương pháp chế biến:</span> {product.processingMethod}</li>
                <li><span className="font-medium">Bảo quản:</span> {product.storage}</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Thành phần</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {product.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Công dụng</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {product.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Cách sử dụng</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {product.usage.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

ProductDetail.displayName = "ProductDetail";

export default ProductDetail; 