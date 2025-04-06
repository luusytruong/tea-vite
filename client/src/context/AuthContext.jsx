import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "~/routes/config";
import { useToast } from "./ToastContext";
import Loading from "~/components/common/Loading";

// Tạo context với giá trị mặc định null
const AuthContext = createContext(null);
const API_URL = import.meta.env.VITE_API_URL;
const IMAGE_URL = API_URL + "public/uploads/";

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Kiểm tra session khi khởi động
  useEffect(() => {
    checkAuth();
  }, []);

  // Kiểm tra session
  const checkAuth = async () => {
    try {
      const response = await fetch(`${API_URL}user/auth`, {
        method: "POST",
        credentials: "include", // Quan trọng để gửi cookie session
      });

      const data = await response.json();

      if (data.status === "success") {
        setUser(data.user[0]);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Lỗi kiểm tra session:", error);
    }
  };

  // Đăng ký
  const register = async (formData) => {
    try {
      const response = await fetch(`${API_URL}user/register`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();
      showToast(data);
      console.log(data);

      if (data.status === "success") {
        setUser(data.user);
        setIsAuthenticated(true);
        navigate(ROUTES.ACCOUNT);
      }
    } catch (error) {
      throw error;
    }
  };

  // Đăng nhập
  const login = async (formData) => {
    try {
      const response = await fetch(`${API_URL}user/login`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();
      showToast(data);
      console.log(data);

      if (data.status === "success") {
        setUser(data.user);
        setIsAuthenticated(true);
        navigate(ROUTES.ACCOUNT);
      }
    } catch (error) {
      throw error;
    }
  };

  // Đăng xuất
  const logout = async () => {
    try {
      const response = await fetch(`${API_URL}user/logout`, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();
      showToast(data);
      console.log(data);

      if (data.status === "success") {
        setUser(null);
        setIsAuthenticated(false);
        navigate(ROUTES.LOGIN);
      }
    } catch (error) {
      showToast({
        status: "error",
        title: "Đã xảy ra lỗi",
        content: "Vui lòng thử lại sau",
      });
    }
  };

  // Cập nhật hồ sơ
  const updateProfile = async (formData) => {
    try {
      const response = await fetch(`${API_URL}user/update`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();
      showToast(data);
      console.log(data);

      if (data.status === "success") {
        setUser(data.user);
      }
    } catch (error) {
      console.error(error);
      showToast({
        status: "error",
        title: "Đã xảy ra lỗi",
        content: "Vui lòng thử lại sau",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        register,
        login,
        logout,
        updateProfile,
        isLoading,
        setIsLoading,
      }}
    >
      {isLoading ? <Loading /> : null}
      {children}
    </AuthContext.Provider>
  );
};

// Hook useAuth với kiểm tra context
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth phải được sử dụng trong AuthProvider");
  }
  return context;
};

export { AuthContext, AuthProvider, useAuth, API_URL, IMAGE_URL };
