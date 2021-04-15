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
    const duplicateItem = cart.findIndex((cartItem) => cartItem.id === item.id);
    // console.log(duplicateItem);
    // console.log(cart[duplicateItem]);
    if (duplicateItem !== -1) {
      console.log("it's there");
      let newCart = [...cart];
      newCart[duplicateItem] = {
        ...cart[duplicateItem],
        quantity: cart[duplicateItem].quantity + 1,
      };
      // console.log(newCart);
      setCart(newCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
      console.log("it's not there");
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
