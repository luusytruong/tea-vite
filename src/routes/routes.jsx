import { ROUTES } from "./config";
import MainLayout from "~/components/layout/MainLayout";
import Home from "~/pages/Home";
import Products from "~/pages/Products";
import ProductDetail from "~/pages/ProductDetail";
import About from "~/pages/About";
import Blog from "~/pages/Blog";
import BlogDetail from "~/pages/BlogDetail";
import Cart from "~/pages/Cart";
import NotFound from "~/pages/NotFound";
import Checkout from "~/pages/Checkout";
import OrderSuccess from "~/pages/OrderSuccess";

export const routes = [
  {
    path: ROUTES.ROOT,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ROUTES.PRODUCTS,
        element: <Products />,
      },
      {
        path: ROUTES.PRODUCTS + "/:slugId",
        element: <ProductDetail />,
      },
      {
        path: ROUTES.CART,
        element: <Cart />,
      },
      {
        path: ROUTES.CHECKOUT,
        element: <Checkout />,
      },
      {
        path: ROUTES.ORDER_SUCCESS,
        element: <OrderSuccess />,
      },
      {
        path: ROUTES.ABOUT,
        element: <About />,
      },
      {
        path: ROUTES.BLOG,
        element: <Blog />,
      },
      {
        path: ROUTES.BLOG + "/:slugId",
        element: <BlogDetail />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
