import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "page_views";
const VIEWS_EXPIRY_KEY = "page_views_expiry";
const EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 giờ

export const usePageViews = () => {
  const [views, setViews] = useState(0);

  useEffect(() => {
    // Kiểm tra thời gian hết hạn
    const expiryTime = localStorage.getItem(VIEWS_EXPIRY_KEY);
    const now = Date.now();

    if (!expiryTime || now > parseInt(expiryTime)) {
      // Reset lượt xem nếu đã hết hạn
      localStorage.setItem(STORAGE_KEY, "0");
      localStorage.setItem(VIEWS_EXPIRY_KEY, (now + EXPIRY_TIME).toString());
      setViews(0);
    } else {
      // Lấy lượt xem hiện tại
      const savedViews = localStorage.getItem(STORAGE_KEY);
      setViews(savedViews ? parseInt(savedViews) : 0);
    }

    // Tăng lượt xem mỗi khi trang được reload
    incrementViews();
  }, []);

  const incrementViews = useCallback(() => {
    setViews((prev) => {
      const newViews = prev + 1;
      localStorage.setItem(STORAGE_KEY, newViews.toString());
      return newViews;
    });
  }, []);

  return {
    views,
    incrementViews,
  };
}; 