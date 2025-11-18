import React, { useEffect, useState } from "react";
import "../../App.css"; // use your global styles

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout! (You can integrate payments later)");
  };

  return (
    <div className="container">
      <h2 className="section-title">Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div className="card" key={item._id}>
              <h3>{item.itemName}</h3>
              <p>{item.description}</p>
              <p>Fee: ₹{item.rentalFee}</p>
              <button
                className="btn-close"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </div>
          ))}
          <button className="btn-secondary" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
