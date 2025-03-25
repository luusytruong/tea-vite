import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "blog_stats";

export const useBlogStats = (blogId) => {
  const [stats, setStats] = useState({
    views: 0,
    likes: 0,
    isLiked: false,
  });

  useEffect(() => {
    // Lấy dữ liệu từ localStorage khi component mount
    const savedStats = localStorage.getItem(STORAGE_KEY);
    if (savedStats) {
      const allStats = JSON.parse(savedStats);
      const blogStats = allStats[blogId] || { views: 0, likes: 0, isLiked: false };
      setStats(blogStats);
    }
  }, [blogId]);

  const incrementViews = useCallback(() => {
    setStats((prev) => {
      const newStats = {
        ...prev,
        views: prev.views + 1,
      };
      // Lưu vào localStorage
      const savedStats = localStorage.getItem(STORAGE_KEY);
      const allStats = savedStats ? JSON.parse(savedStats) : {};
      allStats[blogId] = newStats;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allStats));
      return newStats;
    });
  }, [blogId]);

  const toggleLike = useCallback(() => {
    setStats((prev) => {
      const newStats = {
        ...prev,
        likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
        isLiked: !prev.isLiked,
      };
      // Lưu vào localStorage
      const savedStats = localStorage.getItem(STORAGE_KEY);
      const allStats = savedStats ? JSON.parse(savedStats) : {};
      allStats[blogId] = newStats;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allStats));
      return newStats;
    });
  }, [blogId]);

  return {
    stats,
    incrementViews,
    toggleLike,
  };
}; 