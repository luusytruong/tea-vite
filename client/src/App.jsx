import "./App.css";
import { BrowserRouter, useLocation, useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { Suspense, useEffect } from "react";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { AdminProvider } from "./context/AdminContext";
import Loading from "./components/common/Loading";

const AppRoutes = () => {
  const element = useRoutes(routes);
  return element;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <AdminProvider>
            <CartProvider>
              <ScrollToTop />
              <Suspense fallback={<Loading />}>
                <AppRoutes />
              </Suspense>
            </CartProvider>
          </AdminProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
