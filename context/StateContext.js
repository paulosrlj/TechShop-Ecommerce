import React, {
  useState, createContext, useContext, useEffect, useMemo, useCallback,
} from 'react';

const Context = createContext();

export default function StateContext({ children }) {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [totalQuantities, setTotalQuantities] = useState();
  const [qty, setQty] = useState(1);

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
