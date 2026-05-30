import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.find(
        item => item.id === action.payload.id
      );

      if (existingItem) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...state, { ...action.payload, qty: 1 }];
    }

    case "REMOVE_ITEM":
      return state.filter(
        item => item.id !== action.payload
      );

    case "INCREMENT":
      return state.map(item =>
        item.id === action.payload
          ? { ...item, qty: item.qty + 1 }
          : item
      );

    case "DECREMENT":
      return state
        .map(item =>
          item.id === action.payload
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter(item => item.qty > 0);

    case "CLEAR_CART":
      return [];

    case "HYDRATE":
      return Array.isArray(action.payload)
        ? action.payload
        : [];

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(
    cartReducer,
    [],
    () => {
      try {
        const savedCart =
          localStorage.getItem("shopzone_cart");

        return savedCart
          ? JSON.parse(savedCart)
          : [];
      } catch (error) {
        console.error(
          "Failed to load cart:",
          error
        );
        return [];
      }
    }
  );

  useEffect(() => {
    try {
      localStorage.setItem(
        "shopzone_cart",
        JSON.stringify(items)
      );
    } catch (error) {
      console.error(
        "Failed to save cart:",
        error
      );
    }
  }, [items]);

  const cartCount = items.reduce(
    (total, item) => total + item.qty,
    0
  );

  const cartTotal = items.reduce(
    (total, item) =>
      total + item.price * item.qty,
    0
  );

  const addItem = product =>
    dispatch({
      type: "ADD_ITEM",
      payload: product,
    });

  const removeItem = id =>
    dispatch({
      type: "REMOVE_ITEM",
      payload: id,
    });

  const increment = id =>
    dispatch({
      type: "INCREMENT",
      payload: id,
    });

  const decrement = id =>
    dispatch({
      type: "DECREMENT",
      payload: id,
    });

  const clearCart = () =>
    dispatch({
      type: "CLEAR_CART",
    });

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount,
        cartTotal,
        addItem,
        removeItem,
        increment,
        decrement,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}