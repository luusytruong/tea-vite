import { memo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { company } from "~/data/company";
import { usePageViews } from "~/hooks/usePageViews";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Smartphone,
  Leaf,
  Heart,
  Eye,
} from "lucide-react";

const Footer = memo(() => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: false, amount: 0.2 });
  const { views } = usePageViews();

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const socialVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 10 },
    },
    hover: { scale: 1.1, rotate: 5 },
  };

  return (
    <motion.footer
      ref={footerRef}
      className="bg-green-800 text-white py-8 overflow-hidden z-10"
      role="contentinfo"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <motion.div
              initial={{ opacity: 0, rotate: -5 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-2 mb-4"
            >
              <Leaf className="w-6 h-6 text-green-50" />
              <h3 className="text-xl font-medium">{company.name}</h3>
            </motion.div>
            <motion.p className="text-green-100" variants={itemVariants}>
              {company.description}
            </motion.p>
            <motion.div
              className="mt-4 flex items-center gap-2 text-green-100"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <Eye className="w-5 h-5 text-green-50" />
              <span>{views.toLocaleString()} lượt xem hôm nay</span>
            </motion.div>
            <motion.div
              className="mt-4 flex items-center"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <Heart className="w-5 h-5 text-red-400 mr-2" />
              <span className="text-green-100">
                Cảm ơn quý khách đã tin tưởng!
              </span>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.h3
              className="text-xl font-medium mb-4 flex items-center gap-2"
              variants={itemVariants}
            >
              Liên hệ
            </motion.h3>
            <motion.address
              className="text-green-100 not-italic space-y-3"
              variants={containerVariants}
            >
              <motion.p
                className="flex items-center gap-2"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <Mail className="w-4 h-4 text-green-50" />
                <span>Email: </span>
                <a
                  href={`mailto:${company.email}`}
                  className="hover:text-white transition-colors underline"
                >
                  {company.email}
                </a>
              </motion.p>
              <motion.p
                className="flex items-center gap-2"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <Smartphone className="w-4 h-4 text-green-50" />
                <span>Điện thoại: </span>
                <a
                  href={`tel:${company.phone}`}
                  className="hover:text-white transition-colors underline"
                >
                  {company.phone}
                </a>
              </motion.p>
              <motion.p
                className="flex items-center gap-2"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <MapPin className="w-4 h-4 text-green-50" />
                <span>{company.address}</span>
              </motion.p>
            </motion.address>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.h3
              className="text-xl font-medium mb-4 flex items-center gap-2"
              variants={itemVariants}
            >
              Theo dõi chúng tôi
            </motion.h3>
            <motion.div className="flex space-x-4" variants={containerVariants}>
              <motion.a
                href="#"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-blue-600 transition-all"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                variants={socialVariants}
                whileHover="hover"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-pink-600 transition-all"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                variants={socialVariants}
                whileHover="hover"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-blue-500 transition-all"
                aria-label="Zalo"
                target="_blank"
                rel="noopener noreferrer"
                variants={socialVariants}
                whileHover="hover"
              >
                <span className="font-medium">Z</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-8 pt-8 border-t border-green-700 text-center text-green-100"
          variants={itemVariants}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.p
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-center gap-2"
          >
            &copy; {new Date().getFullYear()} {company.name}. All rights
            reserved.
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
