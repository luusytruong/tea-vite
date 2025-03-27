import { memo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Search, Filter, Edit, Trash2, MoreVertical, X, Image, ArrowLeft, Save
} from "lucide-react";
import { products } from "~/data/products";
import InputField from "~/components/common/InputField";
import Loading from "~/components/common/Loading";

const DashboardProducts = memo(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // create, edit, view, delete
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    short_description: "",
    price: "",
    original_price: "",
    image: "",
    images: [],
    discount: "",
    category_id: "",
    stock: "",
    weight: "",
    origin: "",
    processing_method: "",
    storage: "",
    ingredients: "",
    benefits: "",
    usage_info: "",
    is_featured: false,
    is_new: false,
    meta_keywords: ""
  });
  
  // Lấy danh sách sản phẩm từ API
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  // Lọc sản phẩm theo từ khóa tìm kiếm
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setFilteredProducts(
      products.filter(product => 
        product.name.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  // Mở modal với chế độ tương ứng
  const openModal = (mode, product = null) => {
    setModalMode(mode);
    setSelectedProduct(product);
    
    if (mode === "create") {
      setFormData({
        name: "",
        description: "",
        short_description: "",
        price: "",
        original_price: "",
        image: "",
        images: [],
        discount: "",
        category_id: "",
        stock: "",
        weight: "",
        origin: "",
        processing_method: "",
        storage: "",
        ingredients: "",
        benefits: "",
        usage_info: "",
        is_featured: false,
        is_new: false,
        meta_keywords: ""
      });
    } else {
      setFormData({
        ...product,
        price: String(product.price),
        original_price: product.original_price ? String(product.original_price) : "",
        discount: product.discount ? String(product.discount) : "",
        stock: String(product.stock)
      });
    }
    
    setIsModalOpen(true);
  };

  // Đóng modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Xử lý thay đổi trường input
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Hiển thị loading
    setIsLoading(true);
    
    setTimeout(() => {
      // Giả lập gọi API
      if (modalMode === "create") {
        console.log("Tạo sản phẩm mới:", formData);
        // Thêm sản phẩm vào danh sách
        const newProduct = {
          ...formData,
          id: Date.now(),
          images: [formData.image],
          category: "Trà",
          price: Number(formData.price),
          original_price: formData.original_price ? Number(formData.original_price) : null,
          discount: formData.discount ? Number(formData.discount) : null,
          stock: Number(formData.stock)
        };
        
        setFilteredProducts([newProduct, ...filteredProducts]);
      } else if (modalMode === "edit") {
        console.log("Cập nhật sản phẩm:", formData);
        // Cập nhật sản phẩm trong danh sách
        const updatedProducts = filteredProducts.map(product => 
          product.id === selectedProduct.id ? {
            ...formData,
            images: [formData.image],
            category: product.category,
            price: Number(formData.price),
            original_price: formData.original_price ? Number(formData.original_price) : null,
            discount: formData.discount ? Number(formData.discount) : null,
            stock: Number(formData.stock)
          } : product
        );
        
        setFilteredProducts(updatedProducts);
      } else if (modalMode === "delete") {
        console.log("Xóa sản phẩm:", selectedProduct.id);
        // Xóa sản phẩm khỏi danh sách
        const remainingProducts = filteredProducts.filter(
          product => product.id !== selectedProduct.id
        );
        
        setFilteredProducts(remainingProducts);
      }
      
      setIsLoading(false);
      closeModal();
    }, 800);
  };

  // Render modal theo chế độ
  const renderModal = () => {
    if (!isModalOpen) return null;

    const modalTitle = {
      create: "Thêm sản phẩm mới",
      edit: "Chỉnh sửa sản phẩm",
      view: "Thông tin sản phẩm",
      delete: "Xác nhận xóa sản phẩm"
    };

    return (
      <AnimatePresence>
        <motion.div 
          className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <button 
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <ArrowLeft size={20} />
                </button>
                <h2 className="text-xl font-medium text-gray-900">{modalTitle[modalMode]}</h2>
              </div>
              <button 
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {modalMode === "delete" ? (
                <div className="text-center py-6">
                  <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <Trash2 size={28} className="text-red-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Bạn có chắc chắn muốn xóa?</h3>
                  <p className="text-gray-500 mb-6">
                    Sản phẩm "{selectedProduct?.name}" sẽ bị xóa vĩnh viễn và không thể khôi phục.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg"
                    >
                      Xóa sản phẩm
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Thông tin cơ bản */}
                    <div className="space-y-4 md:col-span-2">
                      <h3 className="text-lg font-medium text-gray-900">Thông tin cơ bản</h3>
                      <div className="border-t border-gray-200 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <InputField
                            label="Tên sản phẩm"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            disabled={modalMode === "view"}
                          />
                          <InputField
                            label="Danh mục"
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleInputChange}
                            as="select"
                            disabled={modalMode === "view"}
                          >
                            <option value="">Chọn danh mục</option>
                            <option value="1">Trà xanh</option>
                            <option value="2">Trà đen</option>
                            <option value="3">Trà hoa quả</option>
                          </InputField>
                        </div>
                      </div>
                    </div>

                    {/* Hình ảnh sản phẩm */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900">Hình ảnh</h3>
                      <div className="border-t border-gray-200 pt-4">
                        <InputField
                          label="Ảnh chính"
                          name="image"
                          value={formData.image}
                          onChange={handleInputChange}
                          placeholder="URL hình ảnh"
                          disabled={modalMode === "view"}
                        />
                        
                        {formData.image && (
                          <div className="mt-4 relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={formData.image}
                              alt="Preview"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Thông tin giá cả và tồn kho */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900">Giá & Tồn kho</h3>
                      <div className="border-t border-gray-200 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <InputField
                            label="Giá bán"
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                            disabled={modalMode === "view"}
                          />
                          <InputField
                            label="Giá gốc"
                            name="original_price"
                            type="number"
                            value={formData.original_price}
                            onChange={handleInputChange}
                            disabled={modalMode === "view"}
                          />
                          <InputField
                            label="Giảm giá (%)"
                            name="discount"
                            type="number"
                            value={formData.discount}
                            onChange={handleInputChange}
                            disabled={modalMode === "view"}
                          />
                          <InputField
                            label="Số lượng trong kho"
                            name="stock"
                            type="number"
                            value={formData.stock}
                            onChange={handleInputChange}
                            required
                            disabled={modalMode === "view"}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Mô tả sản phẩm */}
                    <div className="space-y-4 md:col-span-2">
                      <h3 className="text-lg font-medium text-gray-900">Mô tả sản phẩm</h3>
                      <div className="border-t border-gray-200 pt-4">
                        <InputField
                          label="Mô tả ngắn"
                          name="short_description"
                          as="textarea"
                          rows={2}
                          value={formData.short_description}
                          onChange={handleInputChange}
                          disabled={modalMode === "view"}
                        />
                        <InputField
                          label="Mô tả chi tiết"
                          name="description"
                          as="textarea"
                          rows={4}
                          value={formData.description}
                          onChange={handleInputChange}
                          className="mt-4"
                          disabled={modalMode === "view"}
                        />
                      </div>
                    </div>

                    {/* Thuộc tính sản phẩm */}
                    <div className="space-y-4 md:col-span-2">
                      <h3 className="text-lg font-medium text-gray-900">Thuộc tính sản phẩm</h3>
                      <div className="border-t border-gray-200 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <InputField
                            label="Khối lượng"
                            name="weight"
                            value={formData.weight}
                            onChange={handleInputChange}
                            disabled={modalMode === "view"}
                          />
                          <InputField
                            label="Xuất xứ"
                            name="origin"
                            value={formData.origin}
                            onChange={handleInputChange}
                            disabled={modalMode === "view"}
                          />
                          <InputField
                            label="Phương pháp chế biến"
                            name="processing_method"
                            value={formData.processing_method}
                            onChange={handleInputChange}
                            disabled={modalMode === "view"}
                          />
                          <InputField
                            label="Bảo quản"
                            name="storage"
                            value={formData.storage}
                            onChange={handleInputChange}
                            disabled={modalMode === "view"}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Thông tin bổ sung */}
                    <div className="space-y-4 md:col-span-2">
                      <h3 className="text-lg font-medium text-gray-900">Thông tin bổ sung</h3>
                      <div className="border-t border-gray-200 pt-4">
                        <InputField
                          label="Thành phần"
                          name="ingredients"
                          as="textarea"
                          rows={2}
                          value={formData.ingredients}
                          onChange={handleInputChange}
                          disabled={modalMode === "view"}
                        />
                        <InputField
                          label="Lợi ích"
                          name="benefits"
                          as="textarea"
                          rows={2}
                          value={formData.benefits}
                          onChange={handleInputChange}
                          className="mt-4"
                          disabled={modalMode === "view"}
                        />
                        <InputField
                          label="Hướng dẫn sử dụng"
                          name="usage_info"
                          as="textarea"
                          rows={2}
                          value={formData.usage_info}
                          onChange={handleInputChange}
                          className="mt-4"
                          disabled={modalMode === "view"}
                        />
                      </div>
                    </div>

                    {/* Tùy chọn */}
                    <div className="space-y-4 md:col-span-2">
                      <h3 className="text-lg font-medium text-gray-900">Tùy chọn</h3>
                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex flex-wrap gap-x-6 gap-y-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              name="is_featured"
                              checked={formData.is_featured}
                              onChange={handleInputChange}
                              disabled={modalMode === "view"}
                              className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                            />
                            <span className="text-gray-700">Sản phẩm nổi bật</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              name="is_new"
                              checked={formData.is_new}
                              onChange={handleInputChange}
                              disabled={modalMode === "view"}
                              className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                            />
                            <span className="text-gray-700">Sản phẩm mới</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {modalMode !== "view" && (
                    <div className="mt-8 flex justify-end gap-4">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg"
                      >
                        Hủy
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2"
                      >
                        <Save size={18} />
                        {modalMode === "create" ? "Tạo sản phẩm" : "Lưu thay đổi"}
                      </button>
                    </div>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  if (isLoading) {
    return <Loading text="Đang tải dữ liệu..." />;
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-medium text-gray-900">Sản phẩm</h2>
            <p className="text-gray-500 mt-1">Quản lý danh sách sản phẩm</p>
          </div>
          <motion.button
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openModal("create")}
          >
            <Plus className="w-5 h-5" />
            Thêm sản phẩm
          </motion.button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-green-500"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50">
                <Filter className="w-5 h-5" />
                Lọc
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Sản phẩm</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Giá</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Tồn kho</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Trạng thái</th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <motion.tr 
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.01)" }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {new Intl.NumberFormat("vi-VN").format(product.price)}đ
                    </td>
                    <td className="px-6 py-4 text-gray-900">{product.stock}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-sm rounded-full ${
                        product.stock > 0 
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {product.stock > 0 ? "Còn hàng" : "Hết hàng"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <motion.button
                          className="p-2 text-gray-500 hover:text-blue-600 rounded-lg hover:bg-blue-50"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openModal("view", product)}
                          title="Xem chi tiết"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          className="p-2 text-gray-500 hover:text-green-600 rounded-lg hover:bg-green-50"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openModal("edit", product)}
                          title="Chỉnh sửa"
                        >
                          <Edit className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          className="p-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openModal("delete", product)}
                          title="Xóa"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {renderModal()}
    </div>
  );
});

DashboardProducts.displayName = "DashboardProducts";

export default DashboardProducts; 