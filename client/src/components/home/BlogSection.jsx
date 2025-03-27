import { memo, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { blogs } from "~/data/blog";
import { ArrowRight, BookOpen } from "lucide-react";
import { ROUTES } from "~/routes";
import BlogCard from "../common/BlogCard";

const BlogSection = memo(() => {
  const containerRef = useRef(null);
  const featuredBlogs = blogs.slice(0, 3);

  return (
    <section
      ref={containerRef}
      className="relative py-24 overflow-hidden bg-gradient-to-b from-green-50/50 to-white"
    >
      <div className="container mx-auto px-4 relative z-20">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100/80 backdrop-blur-sm flex items-center justify-center"
          >
            <BookOpen className="w-8 h-8 text-green-600" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-medium text-gray-800 mb-6">
            Bài viết mới nhất
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Khám phá những bài viết hữu ích về trà, cách pha trà và những câu
            chuyện thú vị xung quanh văn hóa trà Việt Nam
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              className="group"
            >
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <BlogCard blog={blog} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.2 }}
                  className="absolute -z-10 inset-0 bg-gradient-to-r from-green-100/50 to-emerald-100/50 blur-xl rounded-2xl transform -rotate-6 scale-95"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link
            to={ROUTES.BLOG}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg shadow-green-200"
          >
            <span className="font-medium">Xem tất cả bài viết</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
});

BlogSection.displayName = "BlogSection";

export default BlogSection;
