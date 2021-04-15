import React, { useContext } from "react";
import { CartContext } from "../contexts";

const Item = ({ id, image, title, price }) => {
  const { removeItem } = useContext(CartContext);

  const handleRemoveItem = (_) => removeItem(id);

  return (
    <div className="shopping-cart_item">
      <img src={image} alt={`${title} book`} />

      <div>
        <h1>{title}</h1>
        <p>$ {price}</p>
        <button onClick={handleRemoveItem}>Remove from cart</button>
      </div>
    </div>
  );
};

export default Item;
