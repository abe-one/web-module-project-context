import React, { useState } from "react";
import { Route } from "react-router-dom";
import data from "./data";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";
import { CartContext, ProductContext } from "./contexts";
import { useLocalStorage } from "./components/hooks";

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useLocalStorage("cart", []);

  const removeItem = (itemId) => {
    setCart(cart.filter((inCartItem) => inCartItem.id !== itemId));
  };

  const addItem = (item) => {
    const repeatItemIdx = cart.findIndex((cartItem) => cartItem.id === item.id);
    if (repeatItemIdx !== -1) {
      let newCart = [...cart];
      newCart[repeatItemIdx] = {
        ...cart[repeatItemIdx],
        quantity: cart[repeatItemIdx].quantity + 1,
      };
      setCart(newCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  return (
    <div className="App">
      <CartContext.Provider value={cart}>
        <Navigation cart={cart} />
      </CartContext.Provider>

      {/* Routes */}

      <ProductContext.Provider value={{ products, addItem }}>
        <Route exact path="/">
          <Products />
        </Route>
      </ProductContext.Provider>

      <CartContext.Provider value={{ cart, removeItem }}>
        <Route path="/cart">
          <ShoppingCart />
        </Route>
      </CartContext.Provider>
    </div>
  );
}

export default App;
