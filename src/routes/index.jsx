import MainLayout from "~/components/layout/MainLayout";
import Home from "~/pages/Home";
import Products from "~/pages/Products";
import ProductDetail from "~/pages/ProductDetail";
import About from "~/pages/About";
import Contact from "~/pages/Contact";

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:slug",
        element: <ProductDetail />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
];
