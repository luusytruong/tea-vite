import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  memo,
} from "react";
import useFetch from "~/hooks/useFetch";
import { useAuth } from "./AuthContext";

const HomeContext = createContext();

const HomeProvider = memo(({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const { fetchGet } = useFetch();
  const { setIsLoading } = useAuth();

  // console.log(generateInsertSQL("products", productsHas));

  useEffect(() => {
    const fetchData = async () => {
      const [productsData, categoriesData] = await Promise.all([
        fetchGet("product/list"),
        fetchGet("category/list"),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const value = {
    blogs,
    products,
    categories,
  };

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
});

const useHome = () => {
  return useContext(HomeContext);
};

export { HomeContext, HomeProvider, useHome };
