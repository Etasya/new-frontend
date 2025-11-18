

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ItemCard = ({ item }) => {
  const [showModal, setShowModal] = useState(false);
  const [Address, setAddress] = useState("");
  const [Startdate, setStartdate] = useState("");
  const [enddate, setenddate] = useState("");
  const [numDays, setNumDays] = useState(0);
  const [totalRent, setTotalRent] = useState(0);
  // const [review, setReview] = useState("");

  const navigate = useNavigate();

  const handleAddToCart = () => {
    try {
      const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
      const isAlreadyInCart = existingCart.find((i) => i._id === item._id);

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

  const handleRentNow = () => {
    if (Address) {
      navigate("/payment", { state: { item } });
    } else {
      document.getElementById("Warning").innerHTML =
        "Please enter your address first!";
    }
  };

  const handleDateChange = (start, end) => {
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNumDays(diffDays);
      setTotalRent(diffDays * item.rentalFee);
    }
  };
  const stored = JSON.parse(localStorage.getItem('user'));
console.log(stored.userRole);

  const getStatusBadge = (status) => {
    const statusConfig = {
      AVAILABLE: {
        color: "green",
        bg: "rgba(0, 184, 148, 0.1)",
        icon: "✓",
        text: "Available",
      },
      RENTED: {
        color: "orange",
        bg: "rgba(243, 156, 18, 0.1)",
        icon: "🔒",
        text: "Rented",
      },
      UNAVAILABLE: {
        color: "red",
        bg: "rgba(248, 113, 113, 0.1)",
        icon: "✕",
        text: "Unavailable",
      },
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
          background: config.bg,
          border: `1px solid ${config.color}`,
        }}
      >
        <span>{config.icon}</span>
        <span>{config.text}</span>
      </span>
    );
  };

  const isAvailable = item.status === "AVAILABLE";

  // const handleReviewSubmit = () => {
  //   if (review.trim() === "") {
  //     alert("Please enter a review before submitting.");
  //     return;
  //   }
  //   alert("Thank you for your review!");
  //   setReview("");
  // };

  return (
    <>
      <div className="item-card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "12px",
          }}
        >
          <h3 className="item-title" style={{ margin: 0, flex: 1 }}>
            {item.itemName}
          </h3>
          {getStatusBadge(item.status)}
        </div>

        <p
          className="item-sub"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            minHeight: "3em",
          }}
        >
          {item.description || "No description available"}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "12px",
            paddingTop: "12px",
            borderTop: "1px solid #ccc",
          }}
        >
          <div>
            <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>
              Rental Fee
            </p>
            <p
              style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "green",
                margin: 0,
              }}
            >
              ₹{item.rentalFee}
              <span style={{ fontSize: "14px", color: "#999" }}>/day</span>
            </p>
          </div>

          {(stored.userRole === 'BORROWER')?<button
            className="btn-view"
            onClick={() => setShowModal(true)}
            style={{
              padding: "8px 16px",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            View Details
          </button>:<div></div>}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ margin: 0, flex: 1 }}>{item.itemName}</h2>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#999",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ marginBottom: "16px" }}>{getStatusBadge(item.status)}</div>

            <div style={{ marginBottom: "16px" }}>
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#666",
                  marginBottom: "8px",
                }}
              >
                Description
              </h4>
              <p>{item.description || "No description provided."}</p>
            </div>

           

            <div
              style={{
                display: "grid",
                gap: "12px",
                padding: "16px",
                background: "#f9f9f9",
                borderRadius: "8px",
                marginBottom: "16px",
              }}
            >
              <label style={{ color: "black" }}>Start Date:</label>
              <input
                type="date"
                value={Startdate}
                onChange={(e) => {
                  setStartdate(e.target.value);
                  handleDateChange(e.target.value, enddate);
                }}
              />

              <label style={{ color: "black" }}>End Date:</label>
              <input
                type="date"
                value={enddate}
                onChange={(e) => {
                  setenddate(e.target.value);
                  handleDateChange(Startdate, e.target.value);
                }}
              />

              <p style={{ color: "black", margin: 0 }}>
                Number of Days: {numDays || 0}
              </p>
              <p style={{ color: "black", margin: 0 }}>
                Total Rent: ₹{totalRent || 0}
              </p>
            </div>

            {/* Address */}
            <input
              className="input"
              placeholder="Enter your address"
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <div id="Warning" style={{ color: "red", fontSize: "14px" }}></div>

            {/* Buttons */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "12px",
                flexWrap: "wrap",
              }}
            >
              {isAvailable ? (
                <>
                  <button className="btn-primary" onClick={handleAddToCart}>
                    🛒 Add to Cart
                  </button>
                  <button className="btn-secondary" onClick={handleRentNow}>
                    ⚡ Rent Now
                  </button>
                </>
              ) : (
                <button
                  disabled
                  style={{
                    flex: 1,
                    opacity: 0.5,
                    cursor: "not-allowed",
                    background: "#ccc",
                  }}
                >
                  Currently Unavailable
                </button>
              )}
              <button
                className="btn-close"
                onClick={() => setShowModal(false)}
                style={{ flex: 1 }}
              >
                Close
              </button>
            </div>

            
            </div>
          </div>
        
      )}
    </>
  );
};

export default ItemCard;





