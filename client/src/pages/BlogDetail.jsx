import { memo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { blogs } from "~/data/blog";
import {
  Calendar,
  Clock,
  Tag,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Eye,
  Heart,
} from "lucide-react";
import { formatDate } from "~/utils/format";
import { motion } from "framer-motion";
import { useBlogStats } from "~/hooks/useBlogStats";

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

const BlogDetail = memo(() => {
  const { slug } = useParams();
  const blog = blogs.find((b) => b.slug === slug);
  const { stats, incrementViews, toggleLike } = useBlogStats(blog.id);

  useEffect(() => {
    // Tăng lượt xem khi component mount
    incrementViews();
  }, []); // Chỉ chạy một lần khi component mount

  if (!blog) {
    return (
      <motion.div
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <h1 className="text-2xl font-medium text-gray-800 mb-4">
            Không tìm thấy bài viết
          </h1>
          <p className="text-gray-600">
            Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-green-50 to-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          className="relative h-[400px] rounded-2xl overflow-hidden mb-8"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-8 text-white"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <motion.span
                className="bg-green-600 px-3 py-1 rounded-full text-sm w-fit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {blog.category}
              </motion.span>
              <motion.div
                className="flex items-center gap-2 w-fit"
                whileHover={{ scale: 1.05 }}
              >
                <Calendar className="w-4 h-4" />
                <span>{formatDate(blog.date)}</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2 w-fit"
                whileHover={{ scale: 1.05 }}
              >
                <Clock className="w-4 h-4" />
                <span>{blog.readTime}</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2 w-fit"
                whileHover={{ scale: 1.05 }}
              >
                <Eye className="w-4 h-4" />
                <span>{stats.views} lượt xem</span>
              </motion.div>
            </div>
            <h1 className="text-4xl font-medium mb-4">{blog.title}</h1>
            <p className="text-lg opacity-90">{blog.shortDescription}</p>
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div className="lg:col-span-2" variants={fadeInUp}>
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed">{blog.content}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.div className="space-y-6" variants={fadeInUp}>
            {/* Author */}
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-medium mb-4">Tác giả</h3>
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-2xl font-medium text-green-700">
                    {blog.author[0]}
                  </span>
                </motion.div>
                <div>
                  <h4 className="font-medium">{blog.author}</h4>
                  <p className="text-sm text-gray-600">Tác giả</p>
                </div>
              </div>
            </motion.div>

            {/* Like Button */}
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <motion.button
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg transition-colors"
                onClick={toggleLike}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  backgroundColor: stats.isLiked ? "#dcfce7" : "#f3f4f6",
                  color: stats.isLiked ? "#166534" : "#374151",
                }}
              >
                <Heart
                  className={`w-5 h-5 ${stats.isLiked ? "fill-current" : ""}`}
                />
                <span>{stats.likes} lượt thích</span>
              </motion.button>
            </motion.div>

            {/* Tags */}
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-medium mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.split("\n").map((tag, index) => (
                  <motion.span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
                    whileHover={{ scale: 1.05, backgroundColor: "#dcfce7" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Tag className="w-4 h-4" />
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Share */}
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-medium mb-4">Chia sẻ</h3>
              <div className="flex items-center gap-4">
                <motion.button
                  className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Facebook className="w-5 h-5" />
                </motion.button>
                <motion.button
                  className="p-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Twitter className="w-5 h-5" />
                </motion.button>
                <motion.button
                  className="p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin className="w-5 h-5" />
                </motion.button>
                <motion.button
                  className="p-2 rounded-full bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
});

BlogDetail.displayName = "BlogDetail";

export default BlogDetail;
