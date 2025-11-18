


import React, { useEffect, useState } from "react";
import { useSession } from "../../session"; // Your session context
import ItemCard from '../../components/ItemCard'

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

const BookingStatus = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
  CONFIRMED: "CONFIRMED",
  COMPLETED: "COMPLETED",
};

export default function SpHistory() {
  const { user } = useSession();
  const [history, setHistory] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [itemNames, setItemNames] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [filters, setFilters] = useState({ userId: "", type: "", search: "" });
  const [items, setItems] = React.useState([]);
  const [newReview, setNewReview] = useState({
    itemId: "",
    userId: user?.userId || "",
    type: "Borrower",
    feedback: "",
    rating: "",
  });
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const sessionUser = JSON.parse(localStorage.getItem("user"));
    if (!sessionUser || !sessionUser.userId) {
      alert("User not logged in.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/bookings/user/${sessionUser.userId}`);
      if (!res.ok) throw new Error("Failed to fetch history data");
      const data = await res.json();
      console.log(data)
      setHistory(Array.isArray(data) ? data : []);
      setFiltered(Array.isArray(data) ? data : []);

      // Extract unique itemIds from bookings
      const uniqueItemIds = [...new Set((Array.isArray(data) ? data : []).map(b => b.itemId))];
      const nameMapping = {};

      await Promise.all(uniqueItemIds.map(async (itemId) => {
        try {
          const itemRes = await fetch(`${API_BASE}/api/items/${itemId}`, {
            method: "GET",
            headers: { Accept: "application/json" },
          });
          if (itemRes.ok) {
            const item = await itemRes.json();
            console.log(`Fetched item for ID ${itemId}:`, item);
            // Use item._id as key and item.itemName as value
            nameMapping[item._id] = item.itemName || item.name || itemId;
          } else {
            console.warn(`Item not found for ID: ${itemId}`);
            nameMapping[itemId] = itemId; // fallback to ID
          }
        } catch (err) {
          console.error(`Error fetching item for ID ${itemId}:`, err);
          nameMapping[itemId] = itemId;
        }
      }));

      setItemNames(nameMapping);

      // Debug log mapping and bookings
      console.log("Item Names Mapping:", nameMapping);
      (Array.isArray(data) ? data : []).forEach(b =>
        console.log(`Booking itemId: ${b.itemId} → itemName: ${nameMapping[b.itemId]}`)
      );

    } catch (err) {
      console.error(err);
      setError("Failed to load history data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...filtered].sort((a, b) => {
      const aValue = a[key] || "";
      const bValue = b[key] || "";
      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setFiltered(sortedData);
  };

  useEffect(() => {
    

// React.useEffect(() => {
  const loadItems = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/items/all`);
      const data = await res.json();
      setItems(data);   // ⬅️ save in useState
    } catch (error) {
      console.error("Failed to load items:", error);
      setItems([]);
    }
  };

  loadItems();
// }, []);
console.log(items)

    let result = [...history];
    if (filters.userId)
      result = result.filter((h) =>
        h.userId?.toLowerCase().includes(filters.userId.toLowerCase())
      );
    if (filters.type)
      result = result.filter((h) =>
        h.type?.toLowerCase().includes(filters.type.toLowerCase())
      );
    if (filters.search)
      result = result.filter((h) =>
        h.feedback?.toLowerCase().includes(filters.search.toLowerCase())
      );
    setFiltered(result);
  }, [filters, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.itemId || !newReview.rating || !newReview.feedback) {
      alert("Please fill all fields before submitting.");
      return;
    }
    try {

      // const re = await fetch(`${API_BASE}/api/items`)
      const res = await fetch(`${API_BASE}/history`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newReview,
          userId: user?.userId,
          type: "Borrower",
        }),
      });
      if (res.ok) {
        setSuccessMsg("Review added successfully!");
        setNewReview({
          itemId: "",
          userId: user?.userId || "",
          type: "Borrower",
          feedback: "",
          rating: "",
        });
        fetchHistory();
        setTimeout(() => setSuccessMsg(""), 2000);
      } else {
        alert("Failed to add review");
      }
    } catch (err) {
      alert("Failed to submit review");
    }
    
  };

  return (
    <div>
      <h2>Booking History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("itemId")}>Item Name</th>
              <th onClick={() => handleSort("status")}>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
              {/* <th>Feedback</th>
              <th>Rating</th> */}
            </tr>
          </thead>
          {/* <tbody>
            {filtered.map((booking) => {
              console.log(booking)
              return(
              <tr key={booking._id || booking.id}>
                <td>{itemNames[booking.itemId] || booking.itemId}</td>
                <td>{booking.status}</td>
                <td>{booking.startDate}</td>
                <td>{booking.endDate}</td>
                <td>{booking.feedback || ""}</td>
                <td>{booking.rating || ""}</td>
              </tr>
            )})}
          </tbody> */}
          <tbody>
  {filtered.map((booking) => {
    const item = items.find(i => i.id === booking.itemId);
    console.log(items)

    return (
      <tr key={booking._id || booking.id}>
        <td>{item ? item.itemName : "Unknown item"}</td>
        <td>{booking.status}</td>
        <td>{booking.startDate}</td>
        <td>{booking.endDate}</td>
        {/* <td>{booking.feedback || ""}</td>
        <td>{booking.rating || ""}</td> */}
      </tr>
    );
  })}
</tbody>
        </table>
      )}
      
      <h3>Submit a Review</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Item:
          <select
            value={newReview.itemId}
            onChange={(e) =>
              setNewReview({ ...newReview, itemId: e.target.value })
            }
            required
          >
            <option value="">Select Item</option>
            {Object.entries(itemNames).map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Rating:
          <input
            type="number"
            value={newReview.rating}
            min="1"
            max="5"
            onChange={(e) =>
              setNewReview({ ...newReview, rating: e.target.value })
            }
            required
          />
        </label>
        <label>
          Feedback:
          <textarea
            value={newReview.feedback}
            onChange={(e) =>
              setNewReview({ ...newReview, feedback: e.target.value })
            }
            required
          />
        </label>
        <button type="submit">Submit Review</button>
      </form>
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
    </div>
  );
}
