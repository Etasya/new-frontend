// src/components/Item.js
import React, { useState } from "react";
import ItemModal from "./ItemModal";

const Item = ({ item }) => {
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numDays, setNumDays] = useState(0);
  const [totalRent, setTotalRent] = useState(0);

  const isAvailable = item.status === "AVAILABLE";

  const handleAddToCart = () => {
    try {
      const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
      const isAlreadyInCart = existingCart.find((i) => i.id === item.id);

      if (!isAlreadyInCart) {
        existingCart.push(item);
        localStorage.setItem("cart", JSON.stringify(existingCart));
        alert(`${item.itemName} added to cart successfully!`);
        setShowModal(false);
      } else {
        alert(`${item.itemName} is already in your cart.`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  const handleDateChange = (start, end) => {
    if (start && end) {
      const startD = new Date(start);
      const endD = new Date(end);
      const diffTime = Math.abs(endD - startD);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNumDays(diffDays);
      setTotalRent(diffDays * item.rentalFee);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      AVAILABLE: { color: "green", text: "Available" },
      RENTED: { color: "orange", text: "Rented" },
      UNAVAILABLE: { color: "red", text: "Unavailable" },
    };
    const config = statusConfig[status] || statusConfig.UNAVAILABLE;

    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
          padding: "4px 8px",
          borderRadius: "12px",
          fontSize: "12px",
          fontWeight: "600",
          color: config.color,
          border: `1px solid ${config.color}`,
        }}
      >
        {config.text}
      </span>
    );
  };

  return (
    <>
      {/* Item Card */}
      <div className="item-card">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>{item.itemName}</h3>
          {getStatusBadge(item.status)}
        </div>
        <p>{item.description || "No description available"}</p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>₹{item.rentalFee}/day</p>
          <button onClick={() => setShowModal(true)}>View Details</button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <ItemModal
          item={item}
          onClose={() => setShowModal(false)}
          isAvailable={isAvailable}
          Address={address}
          setAddress={setAddress}
          Startdate={startDate}
          setStartdate={setStartDate}
          enddate={endDate}
          setenddate={setEndDate}
          numDays={numDays}
          totalRent={totalRent}
          handleDateChange={handleDateChange}
          handleAddToCart={handleAddToCart}
        />
      )}
    </>
  );
};

export default Item;
