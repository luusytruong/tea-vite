import { motion } from "framer-motion";
import { blogs } from "~/data/blog";
import BlogCard from "~/components/common/BlogCard";

const Blog = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-16"
      >
        <motion.h1 
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-medium text-center text-green-800 mb-4"
        >
          Blog & Tin Tức
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-center text-gray-600 max-w-2xl mx-auto mb-16"
        >
          Khám phá những bài viết về văn hóa trà, sức khỏe và lối sống lành mạnh
        </motion.p>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Blog; 