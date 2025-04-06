import { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, Edit, Trash2, MoreVertical } from "lucide-react";
import { products } from "~/data/products";
import Loading from "~/components/common/Loading";
import ProductFormModal from "~/components/admin/modals/ProductFormModal";
import DeleteModal from "~/components/admin/modals/DeleteModal";

const DashboardProducts = memo(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // create, edit, view

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
    meta_keywords: "",
  });

  // Lấy danh sách sản phẩm từ API
  useEffect(() => {
    console.log(generateInsertSQL("products", products));

    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  // Lọc sản phẩm theo từ khóa tìm kiếm
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  // Mở form modal với chế độ tương ứng
  const openFormModal = (mode, product = null) => {
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
        meta_keywords: "",
      });
    } else {
      setFormData({
        ...product,
        price: String(product.price),
        original_price: product.original_price
          ? String(product.original_price)
          : "",
        discount: product.discount ? String(product.discount) : "",
        stock: String(product.stock),
      });
    }

    setIsFormModalOpen(true);
  };

  // Mở modal xóa
  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  // Xử lý submit form
  const handleFormSubmit = () => {
    setIsActionLoading(true);

    setTimeout(() => {
      if (modalMode === "create") {
        console.log("Tạo sản phẩm mới:", formData);
        // Thêm sản phẩm vào danh sách
        const newProduct = {
          ...formData,
          id: Date.now(),
          images: [formData.image],
          category_id: formData.category_id,
          price: Number(formData.price),
          original_price: formData.original_price
            ? Number(formData.original_price)
            : null,
          discount: formData.discount ? Number(formData.discount) : null,
          stock: Number(formData.stock),
        };

        setFilteredProducts([newProduct, ...filteredProducts]);
      } else if (modalMode === "edit") {
        console.log("Cập nhật sản phẩm:", formData);
        // Cập nhật sản phẩm trong danh sách
        const updatedProducts = filteredProducts.map((product) =>
          product.id === selectedProduct.id
            ? {
                ...formData,
                images: [formData.image],
                category: product.categoryId,
                price: Number(formData.price),
                original_price: formData.original_price
                  ? Number(formData.original_price)
                  : null,
                discount: formData.discount ? Number(formData.discount) : null,
                stock: Number(formData.stock),
              }
            : product
        );

        setFilteredProducts(updatedProducts);
      }

      setIsActionLoading(false);
      setIsFormModalOpen(false);
    }, 800);
  };

  // Xử lý xóa sản phẩm
  const handleDelete = () => {
    setIsActionLoading(true);

    setTimeout(() => {
      console.log("Xóa sản phẩm:", selectedProduct.id);
      // Xóa sản phẩm khỏi danh sách
      const remainingProducts = filteredProducts.filter(
        (product) => product.id !== selectedProduct.id
      );

      setFilteredProducts(remainingProducts);
      setIsActionLoading(false);
      setIsDeleteModalOpen(false);
    }, 800);
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
            onClick={() => openFormModal("create")}
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
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    Sản phẩm
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    Giá
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    Tồn kho
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                    Thao tác
                  </th>
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
                          <div className="font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.category}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {new Intl.NumberFormat("vi-VN").format(product.price)}đ
                    </td>
                    <td className="px-6 py-4 text-gray-900">{product.stock}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-sm rounded-full ${
                          product.stock > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.stock > 0 ? "Còn hàng" : "Hết hàng"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <motion.button
                          className="p-2 text-gray-500 hover:text-blue-600 rounded-lg hover:bg-blue-50"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openFormModal("view", product)}
                          title="Xem chi tiết"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          className="p-2 text-gray-500 hover:text-green-600 rounded-lg hover:bg-green-50"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openFormModal("edit", product)}
                          title="Chỉnh sửa"
                        >
                          <Edit className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          className="p-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openDeleteModal(product)}
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

      {/* Form Modal */}
      <ProductFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        formData={formData}
        onChange={setFormData}
        mode={modalMode}
        isLoading={isActionLoading}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        itemName={selectedProduct?.name}
        isLoading={isActionLoading}
      />
    </div>
  );
});

DashboardProducts.displayName = "DashboardProducts";

export default DashboardProducts;
