import React, { useState, useRef } from "react";
import { Save, Upload, X, Plus } from "lucide-react";
import Modal from "./Modal";
import InputField from "~/components/common/InputField";
import { categories } from "~/data/products";

const ProductFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onChange,
  mode = "create", // create, edit, view
  isLoading = false,
}) => {
  const isViewMode = mode === "view";
  const modalTitle = {
    create: "Thêm sản phẩm mới",
    edit: "Chỉnh sửa sản phẩm",
    view: "Thông tin sản phẩm",
  };

  const imageInputRef = useRef(null);
  const imagesInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(formData.image || "");
  const [imagesPreview, setImagesPreview] = useState(formData.images || []);

  const createSlug = (text) => {
    // Chuyển chữ hoa thành chữ thường
    text = text.toLowerCase();

    // Xóa dấu
    text = text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d");

    // Loại bỏ ký tự đặc biệt và thay thế khoảng trắng bằng dấu gạch ngang
    text = text.replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

    return text;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    onChange({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
      slug: name === "name" ? createSlug(value) : formData.slug,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Xử lý kiểm tra định dạng và kích thước file
    if (!file.type.match(/image\/(jpeg|jpg|png|webp)/)) {
      alert("Chỉ chấp nhận file hình ảnh (JPG, PNG, WEBP)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Kích thước file không được vượt quá 5MB");
      return;
    }

    // Tạo preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);

    // Cập nhật formData
    onChange({
      ...formData,
      image_file: file,
      image: URL.createObjectURL(file),
    });
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Xử lý kiểm tra định dạng và kích thước file
    const validFiles = files.filter((file) => {
      if (!file.type.match(/image\/(jpeg|jpg|png|webp)/)) {
        alert(`File ${file.name} không phải là hình ảnh hợp lệ`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} vượt quá 5MB`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    // Tạo preview
    const newPreviews = [...imagesPreview];
    const newFiles = [...(formData.images_files || [])];

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviews.push(e.target.result);
        setImagesPreview([...newPreviews]);
      };
      reader.readAsDataURL(file);
      newFiles.push(file);
    });

    // Cập nhật formData
    onChange({
      ...formData,
      images_files: newFiles,
      images: newPreviews,
    });
  };

  const removeImage = (index) => {
    const newImages = [...imagesPreview];
    newImages.splice(index, 1);
    setImagesPreview(newImages);

    const newFiles = [...(formData.images_files || [])];
    if (newFiles[index]) {
      newFiles.splice(index, 1);
    }

    onChange({
      ...formData,
      images_files: newFiles,
      images: newImages,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={modalTitle[mode]}>
      <form onSubmit={handleSubmit} className="h-fit">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Thông tin cơ bản */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900">
              Thông tin cơ bản
            </h3>
            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Tên sản phẩm"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  required
                  disabled={isViewMode}
                />
                <InputField
                  label="Slug"
                  name="slug"
                  value={formData.slug || ""}
                  onChange={handleInputChange}
                  required
                  disabled={isViewMode}
                  helpText="URL thân thiện, chỉ chứa chữ thường, số và dấu gạch ngang"
                />
                <InputField
                  label="Danh mục"
                  name="category_id"
                  as="select"
                  value={formData.category_id || ""}
                  onChange={handleInputChange}
                  required
                  disabled={isViewMode}
                >
                  <option value="">Chọn danh mục</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </InputField>
                <InputField
                  label="SKU"
                  name="sku"
                  value={formData.sku || ""}
                  onChange={handleInputChange}
                  disabled={isViewMode}
                  helpText="Mã sản phẩm duy nhất"
                />
              </div>
            </div>
          </div>

          {/* Hình ảnh sản phẩm chính */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              Hình ảnh chính
            </h3>
            <div className="border-t border-gray-200 pt-4">
              {isViewMode ? (
                formData.image && (
                  <div className="mt-2 relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )
              ) : (
                <div className="space-y-4">
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50"
                    onClick={() => imageInputRef.current?.click()}
                  >
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2 text-sm text-gray-500">
                      <span className="font-medium text-green-600">
                        Click để chọn hình ảnh chính
                      </span>
                      <p className="text-xs mt-1">PNG, JPG, WEBP tối đa 5MB</p>
                    </div>
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>

                  {imagePreview && (
                    <div className="mt-2 relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                      <button
                        type="button"
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                        onClick={() => {
                          setImagePreview("");
                          onChange({
                            ...formData,
                            image: "",
                            image_file: null,
                          });
                        }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Thư viện hình ảnh */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              Thư viện hình ảnh
            </h3>
            <div className="border-t border-gray-200 pt-4">
              {isViewMode ? (
                <div className="grid grid-cols-2 gap-2">
                  {formData.images &&
                    formData.images.map((image, index) => (
                      <div
                        key={index}
                        className="aspect-square rounded-lg overflow-hidden bg-gray-100"
                      >
                        <img
                          src={image}
                          alt={`Product ${index}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50"
                    onClick={() => imagesInputRef.current?.click()}
                  >
                    <Plus className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2 text-sm text-gray-500">
                      <span className="font-medium text-green-600">
                        Click để thêm hình ảnh
                      </span>
                      <p className="text-xs mt-1">PNG, JPG, WEBP tối đa 5MB</p>
                    </div>
                    <input
                      ref={imagesInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      multiple
                      onChange={handleImagesChange}
                      className="hidden"
                    />
                  </div>

                  {imagesPreview && imagesPreview.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {imagesPreview.map((image, index) => (
                        <div
                          key={index}
                          className="relative aspect-square rounded-lg overflow-hidden bg-gray-100"
                        >
                          <img
                            src={image}
                            alt={`Product ${index}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full"
                            onClick={() => removeImage(index)}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Thông tin giá cả và tồn kho */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900">Giá & Tồn kho</h3>
            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InputField
                  label="Giá bán"
                  name="price"
                  type="number"
                  value={formData.price || ""}
                  onChange={handleInputChange}
                  required
                  disabled={isViewMode}
                />
                <InputField
                  label="Giá gốc"
                  name="original_price"
                  type="number"
                  value={formData.original_price || ""}
                  onChange={handleInputChange}
                  disabled={isViewMode}
                />
                <InputField
                  label="Giảm giá (%)"
                  name="discount"
                  type="number"
                  value={formData.discount || ""}
                  onChange={handleInputChange}
                  disabled={isViewMode}
                />
                <InputField
                  label="Số lượng trong kho"
                  name="stock"
                  type="number"
                  value={formData.stock || ""}
                  onChange={handleInputChange}
                  required
                  disabled={isViewMode}
                />
                <InputField
                  label="Khối lượng"
                  name="weight"
                  value={formData.weight || ""}
                  onChange={handleInputChange}
                  disabled={isViewMode}
                  placeholder="Ví dụ: 100g, 500g, 1kg"
                />
                <InputField
                  label="Đánh giá trung bình"
                  name="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating || ""}
                  onChange={handleInputChange}
                  disabled={isViewMode}
                />
              </div>
            </div>
          </div>

          {/* Mô tả sản phẩm */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900">
              Mô tả sản phẩm
            </h3>
            <div className="border-t border-gray-200 pt-4">
              <InputField
                label="Mô tả ngắn"
                name="short_description"
                as="textarea"
                rows={2}
                value={formData.short_description || ""}
                onChange={handleInputChange}
                disabled={isViewMode}
              />
              <InputField
                label="Mô tả chi tiết"
                name="description"
                as="textarea"
                rows={4}
                value={formData.description || ""}
                onChange={handleInputChange}
                className="mt-4"
                disabled={isViewMode}
              />
            </div>
          </div>

          {/* Thuộc tính sản phẩm */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900">
              Thuộc tính sản phẩm
            </h3>
            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Xuất xứ"
                  name="origin"
                  value={formData.origin || ""}
                  onChange={handleInputChange}
                  disabled={isViewMode}
                />
                <InputField
                  label="Phương pháp chế biến"
                  name="processing_method"
                  value={formData.processing_method || ""}
                  onChange={handleInputChange}
                  disabled={isViewMode}
                />
                <InputField
                  label="Bảo quản"
                  name="storage"
                  value={formData.storage || ""}
                  onChange={handleInputChange}
                  disabled={isViewMode}
                />
                <InputField
                  label="Số lượt đánh giá"
                  name="review_count"
                  type="number"
                  value={formData.review_count || ""}
                  onChange={handleInputChange}
                  disabled={isViewMode}
                />
              </div>
            </div>
          </div>

          {/* Thông tin bổ sung */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900">
              Thông tin bổ sung
            </h3>
            <div className="border-t border-gray-200 pt-4">
              <InputField
                label="Thành phần"
                name="ingredients"
                as="textarea"
                rows={2}
                value={formData.ingredients || ""}
                onChange={handleInputChange}
                disabled={isViewMode}
              />
              <InputField
                label="Lợi ích"
                name="benefits"
                as="textarea"
                rows={2}
                value={formData.benefits || ""}
                onChange={handleInputChange}
                className="mt-4"
                disabled={isViewMode}
              />
              <InputField
                label="Hướng dẫn sử dụng"
                name="usage_info"
                as="textarea"
                rows={2}
                value={formData.usage_info || ""}
                onChange={handleInputChange}
                className="mt-4"
                disabled={isViewMode}
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
                    checked={formData.is_featured || false}
                    onChange={handleInputChange}
                    disabled={isViewMode}
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="text-gray-700">Sản phẩm nổi bật</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_new"
                    checked={formData.is_new || false}
                    onChange={handleInputChange}
                    disabled={isViewMode}
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="text-gray-700">Sản phẩm mới</span>
                </label>
              </div>
            </div>
          </div>

          {/* Meta Keywords */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900">SEO</h3>
            <div className="border-t border-gray-200 pt-4">
              <InputField
                label="Meta Keywords"
                name="meta_keywords"
                as="textarea"
                rows={2}
                value={formData.meta_keywords || ""}
                onChange={handleInputChange}
                placeholder="Nhập từ khóa SEO, phân cách bằng dấu phẩy"
                disabled={isViewMode}
                helpText="Thêm các từ khóa giúp người dùng dễ dàng tìm thấy sản phẩm (VD: trà xanh, trà matcha, trà thảo mộc)"
              />
            </div>
          </div>
        </div>

        {!isViewMode && (
          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg"
              disabled={isLoading}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 min-w-[130px] justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
              ) : (
                <>
                  <Save size={18} />
                  {mode === "create" ? "Tạo sản phẩm" : "Lưu thay đổi"}
                </>
              )}
            </button>
          </div>
        )}
      </form>
    </Modal>
  );
};

export default ProductFormModal;
