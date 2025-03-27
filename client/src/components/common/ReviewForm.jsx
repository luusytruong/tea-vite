import { memo, useState } from "react";
import { motion } from "framer-motion";
import { Star, Image as ImageIcon, X } from "lucide-react";

const ReviewForm = memo(({ onSubmit, isBuy }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 3) {
      alert("Bạn chỉ có thể tải lên tối đa 3 hình ảnh");
      return;
    }

    const newImages = [...images, ...files];
    setImages(newImages);

    // Tạo preview URLs
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...newPreviewUrls]);
  };

  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviewUrls = previewImages.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviewImages(newPreviewUrls);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Vui lòng chọn số sao đánh giá");
      return;
    }
    if (!comment.trim()) {
      alert("Vui lòng nhập nội dung đánh giá");
      return;
    }
    onSubmit({ rating, comment, images });
    // Reset form
    setRating(0);
    setComment("");
    setImages([]);
    setPreviewImages([]);
  };

  if (!isBuy) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <p className="text-gray-600">Bạn cần mua sản phẩm để đánh giá</p>
        <p className="text-gray-500 mt-2">Hãy mua sản phẩm và trải nghiệm để đánh giá chất lượng!</p>
      </div>
    );
  }

  return (
    <motion.form
      className="bg-white rounded-lg shadow-sm p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
    >
      <h3 className="text-lg font-medium mb-4">Viết đánh giá của bạn</h3>
      
      {/* Rating */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Đánh giá của bạn
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.button
              key={star}
              type="button"
              className={`p-1 ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
              onClick={() => handleRatingClick(star)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Star className="w-6 h-6 fill-current" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nội dung đánh giá
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          rows="4"
          placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
        />
      </div>

      {/* Image Upload */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Hình ảnh (tối đa 3 ảnh hình vuông)
        </label>
        <div className="flex items-center gap-4">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
            <motion.div
              className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-green-500 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ImageIcon className="w-6 h-6 text-gray-400" />
            </motion.div>
          </label>
          <div className="flex gap-2">
            {previewImages.map((url, index) => (
              <motion.div
                key={index}
                className="relative w-24 h-24"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <motion.button
                  type="button"
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  onClick={() => handleRemoveImage(index)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Gửi đánh giá
      </motion.button>
    </motion.form>
  );
});

ReviewForm.displayName = "ReviewForm";

export default ReviewForm; 