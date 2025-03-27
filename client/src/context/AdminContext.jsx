import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [admin, setAdmin] = useState(null);
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;
    if (user?.role === "admin") {
      setIsAdmin(true);
      setAdmin(user);
    }
  }, [isLoading, user]);

  return (
    <AdminContext.Provider value={{ isAdmin, isLoading, admin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  return useContext(AdminContext);
};
