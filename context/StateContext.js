import React, {
  useState, createContext, useContext, useEffect, useMemo, useCallback,
} from 'react';

import { toast } from 'react-hot-toast';

const Context = createContext();

export default function StateContext({ children }) {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        }
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart`);
  };

  const onRemove = (product) => {
    const foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (id, value) => {
    const foundProduct = cartItems.find((item) => item._id === id);
    const index = cartItems.findIndex((product) => product._id === id);

    const newCartItems = cartItems.filter((item) => item._id !== id);

    const correctItemsOrder = [...newCartItems];
    let product = null;

    if (value === 'inc') {
      product = { ...foundProduct, quantity: foundProduct.quantity + 1 };
      correctItemsOrder.splice(index, 0, product);
      setCartItems(correctItemsOrder);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === 'desc') {
      if (foundProduct.quantity > 1) {
        product = { ...foundProduct, quantity: foundProduct.quantity - 1 };
        correctItemsOrder.splice(index, 0, product);
        setCartItems(correctItemsOrder);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  const memoizedValues = useMemo(() => ({
    incQty,
    decQty,
    setCartItems,
    setQty,
    setShowCart,
    setTotalPrice,
    setTotalQuantities,
    showCart,
    cartItems,
    totalPrice,
    totalQuantities,
    qty,
    onAdd,
    toggleCartItemQuantity,
    onRemove,
  }), [showCart,
    cartItems,
    totalPrice,
    totalQuantities,
    qty]);

  return (
    <Context.Provider
      // value={{
      //   incQty,
      //   decQty,
      //   setQty,
      //   showCart,
      //   cartItems,
      //   totalPrice,
      //   totalQuantities,
      //   qty,
      // }}
      value={memoizedValues}
    >
      {children}
    </Context.Provider>
  );
}

export const useStateContext = () => useContext(Context);
