import React from "react";
import { IMAGE_URL } from "~/context/AuthContext";

const Avatar = ({ src, alt, name = "T", size = 32, className = "" }) => {
  const getInitials = (name) => {
    if (!name) return "T";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRandomColor = (name) => {
    const colors = [
      "bg-green-100 text-green-700",
      "bg-blue-100 text-blue-700",
      "bg-purple-100 text-purple-700",
      "bg-pink-100 text-pink-700",
      "bg-yellow-100 text-yellow-700",
      "bg-red-100 text-red-700",
      "bg-indigo-100 text-indigo-700",
      "bg-teal-100 text-teal-700",
    ];

    if (!name) return colors[0];
    const index =
      name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
      colors.length;
    return colors[index];
  };

  // Tính toán font size dựa trên size của avatar
  const getFontSize = (size) => {
    if (size <= 24) return "text-xs"; // <= 24px
    if (size <= 32) return "text-sm"; // <= 32px
    if (size <= 40) return "text-base"; // <= 40px
    if (size <= 48) return "text-lg"; // <= 48px
    if (size <= 56) return "text-xl"; // <= 56px
    if (size <= 64) return "text-2xl"; // <= 64px
    if (size <= 80) return "text-3xl"; // <= 80px
    return "text-4xl"; // > 80px
  };

  // Tính toán border width dựa trên size
  const getBorderWidth = (size) => {
    if (size <= 32) return "border-2";
    if (size <= 56) return "border-3";
    return "border-4";
  };

  if (src) {
    return (
      <img
        src={`${IMAGE_URL}${src}`}
        alt={alt}
        className={`rounded-full object-cover ${getBorderWidth(
          size
        )} border-green-50 shadow-sm ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className={`rounded-full flex items-center justify-center font-bold ${getFontSize(
        size
      )} ${getRandomColor(name)} ${className}`}
      style={{
        width: size,
        height: size,
        lineHeight: 1, // Đảm bảo căn giữa tốt hơn
      }}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
