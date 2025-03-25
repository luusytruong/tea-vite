import "./App.css";
import { BrowserRouter, useLocation, useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { Suspense, useEffect } from "react";
import { CartProvider } from "./context/CartContext";

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
      <ScrollToTop />
      <CartProvider>
        <Suspense fallback={<p>Loading...</p>}>
          <AppRoutes />
        </Suspense>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
