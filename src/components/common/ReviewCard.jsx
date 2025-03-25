import { memo } from "react";
import { motion } from "framer-motion";
import { Star, Image as ImageIcon } from "lucide-react";
import { formatDate } from "~/utils/format";

const ReviewCard = memo(({ review }) => {
  const { userName, userAvatar, rating, comment, date, images } = review;

  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* User Info */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={userAvatar}
          alt={userName}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-medium text-gray-900">{userName}</h4>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`w-4 h-4 ${
                  index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Comment */}
      <p className="text-gray-600 mb-4">{comment}</p>

      {/* Images */}
      {images && images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={image}
                alt={`Review image ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Date */}
      <p className="text-sm text-gray-500">{formatDate(date)}</p>
    </motion.div>
  );
});

ReviewCard.displayName = "ReviewCard";

export default ReviewCard; 