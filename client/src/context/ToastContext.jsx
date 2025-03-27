import React, { createContext, useContext, useState } from "react";
import Toast from "~/components/common/Toast";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = (obj) => {
    setToast(null);
    if (obj && typeof obj === "object") {
      setTimeout(() => {
        setToast(<Toast obj={obj} setToast={setToast} />);
      }, 4);
    }
  };
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
