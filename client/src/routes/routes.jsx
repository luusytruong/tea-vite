import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
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
import Profile from "~/pages/Profile";
import Login from "~/pages/Login";
import Register from "~/pages/Register";
import OrderTracking from "~/pages/OrderTracking";
import OrdersList from "~/pages/user/OrdersList";

// Lazy loading các components
const Dashboard = lazy(() => import("~/pages/admin/Dashboard"));
const DashboardOverview = lazy(() => import("~/pages/admin/DashboardOverview"));
const DashboardOrders = lazy(() => import("~/pages/admin/DashboardOrders"));
const DashboardProducts = lazy(() => import("~/pages/admin/DashboardProducts"));
const DashboardCustomers = lazy(() =>
  import("~/pages/admin/DashboardCustomers")
);
const DashboardBlog = lazy(() => import("~/pages/admin/DashboardBlog"));
const DashboardSettings = lazy(() => import("~/pages/admin/DashboardSettings"));

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
        path: ROUTES.PRODUCTS + "/:slug",
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
        path: ROUTES.ORDER_LIST,
        element: <OrdersList />,
      },
      {
        path: ROUTES.ORDER_TRACKING + "/:slug",
        element: <OrderTracking />,
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
        path: ROUTES.BLOG + "/:slug",
        element: <BlogDetail />,
      },
      {
        path: ROUTES.ACCOUNT,
        element: <Profile />,
      },
      {
        path: ROUTES.LOGIN,
        element: <Login />,
      },
      {
        path: ROUTES.REGISTER,
        element: <Register />,
      },
    ],
  },
  {
    path: ROUTES.DASHBOARD,
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <DashboardOverview />,
      },
      {
        path: "orders",
        element: <DashboardOrders />,
      },
      {
        path: "products",
        element: <DashboardProducts />,
      },
      {
        path: "customers",
        element: <DashboardCustomers />,
      },
      {
        path: "blog",
        element: <DashboardBlog />,
      },
      {
        path: "settings",
        element: <DashboardSettings />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export const router = createBrowserRouter(routes);
