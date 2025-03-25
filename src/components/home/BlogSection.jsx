import { memo, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { blogs } from "~/data/blog";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "~/routes";
import BlogCard from "../common/BlogCard";

const BlogSection = memo(() => {
  const containerRef = useRef(null);
  const featuredBlogs = blogs.slice(0, 3);

  return (
    <section
      ref={containerRef}
      className="relative py-20 overflow-hidden bg-gradient-to-b from-green-50 to-white"
    >
      <div className="container mx-auto px-4 relative z-20">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          //   viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.32 }}
        >
          <h2 className="text-3xl md:text-4xl font-medium text-gray-800 mb-4">
            Bài viết mới nhất
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Khám phá những bài viết hữu ích về trà, cách pha trà và những câu
            chuyện thú vị xung quanh văn hóa trà Việt Nam
          </p>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          //   viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {featuredBlogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              className="group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              //   viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <BlogCard blog={blog} />
            </motion.article>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          //   viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link to={ROUTES.BLOG}>
            <motion.button
              className="inline-flex items-center gap-2 bg-green-700 text-white px-8 py-3 rounded-full hover:bg-green-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Xem tất cả bài viết</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
});

BlogSection.displayName = "BlogSection";

export default BlogSection;
