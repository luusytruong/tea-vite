import { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Calendar, Clock, Tag } from "lucide-react";
import { ROUTES } from "~/routes";
import { formatDate } from "~/utils/format";

const BlogCard = memo(({ blog }) => {
  const {
    id,
    title,
    slug,
    shortDescription,
    image,
    date,
    category,
    readTime,
    tags,
  } = blog;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[16/9]">
        <Link to={`${ROUTES.BLOG}/${slug}`}>
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <span className="text-sm text-white bg-green-600 px-3 py-1 rounded-full w-fit absolute bottom-2 left-2">
            {category}
          </span>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </Link>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category */}

        {/* Title */}
        <Link to={`${ROUTES.BLOG}/${slug}`}>
          <h3 className="text-xl font-medium text-gray-800 mb-3 group-hover:text-green-700 transition-colors duration-300 line-clamp-2">
            {title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {shortDescription}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1 w-fit">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(date)}</span>
          </div>
          <div className="flex items-center gap-1 w-fit">
            <Clock className="w-4 h-4" />
            <span>{readTime}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags
            .split("\n")
            .slice(0, 3)
            .map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
});

BlogCard.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    readTime: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

BlogCard.displayName = "BlogCard";

export default BlogCard;
