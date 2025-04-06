import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useAuth } from "./AuthContext";
import useFetch from "~/hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "~/routes/config";
import { useToast } from "./ToastContext";
import Loading from "~/components/common/Loading";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [buyNowItems, setBuyNowItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const { user } = useAuth();
  const { fetchGet, fetchPost } = useFetch();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const actionCart = async (formData, action, notify = true) => {
    if (!user) {
      navigate(ROUTES.LOGIN);
      return;
    }
    setIsLoading(true);
    const data = await fetchPost("cart/" + action, formData);

    if (data.status === "success") {
      setCartItems(data?.cart || []);
      setItemCount(
        data?.cart?.reduce((acc, item) => acc + parseInt(item.quantity), 0) || 0
      );
    }

    if (notify) showToast(data);
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchCart = async () => {
      const data = await fetchGet("cart/list");
      setCartItems(data || []);
      setItemCount(
        data?.reduce((acc, item) => acc + parseInt(item.quantity), 0) || 0
      );
    };
    fetchCart();
  }, []);

  const calculateTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  }, [cartItems]);

  const value = {
    cartItems,
    itemCount,
    calculateTotal,
    actionCart,
    buyNowItems,
    setBuyNowItems,
  };

  return (
    <CartContext.Provider value={value}>
      {isLoading && <Loading text="Đang xử lý..." />}
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
