// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, useLocation } from 'react-router-dom';

// const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

// export default function PaymentPage() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const selectedItem = location.state?.item; // passed via "View" → "Payment"
//   const [cardName, setCardName] = useState('');
//   const [cardNumber, setCardNumber] = useState('');
//   const [expiry, setExpiry] = useState('');
//   const [cvv, setCvv] = useState('');
//   const [days, setDays] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const handlePayment = async (e) => {
//     e.preventDefault();

//     const user = JSON.parse(localStorage.getItem('user'));
//     if (!user || !user.userId) {
//       alert('User not logged in.');
//       return;
//     }

//     if (!selectedItem) {
//       alert('No item selected for payment.');
//       return;
//     }

//     if (days <= 0) {
//       alert('Please enter a valid number of days.');
//       return;
//     }

//     try {
//       setLoading(true);

//       // Calculate return date
//       const bookingDate = new Date();
//       const returnDate = new Date(bookingDate.getTime() + days * 24 * 60 * 60 * 1000);

//       // 1️⃣ Create booking
//       const bookingData = {
//   borrowerId: user.userId,                 // ✅ corrected
//   itemId: selectedItem._id,
//   serviceProviderUserId: selectedItem.serviceProviderUserId,
//   startDate: new Date(),                   // ✅ renamed
//   endDate: returnDate ? new Date(returnDate) : null, // ✅ renamed
//   //status: 'BOOKED'                         // ✅ valid if your enum has BOOKED
// };
// // console.log(bookingData);
// // console.log(selectedItem._id);



//       await axios.post(`${API_BASE}/api/bookings/initiate`, bookingData);

//       // 2️⃣ Update item status to RENTED
//       await axios.put(`${API_BASE}/api/items/${selectedItem._id}/status`, {
//         status: 'RENTED'
//       });

//       // 3️⃣ Show success message
//       alert(`✅ Payment successful! Item rented for ${days} day(s).`);
//       navigate('/borrower/history');
//     } catch (error) {
//       console.error('Payment failed:', error);
//       alert('❌ Payment or booking failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <h2 className="section-title">Confirm Payment</h2>

//       {selectedItem ? (
//         <div className="card" style={{ marginBottom: 20 }}>
//           <h3 className="card-title">{selectedItem.itemName}</h3>
//           <p>{selectedItem.description}</p>
//           <p>
//             <strong>Rental Fee:</strong> ₹{selectedItem.rentalFee}
//           </p>
//         </div>
//       ) : (
//         <p>No item selected.</p>
//       )}

//       <form onSubmit={handlePayment}>
//         <label>Cardholder Name</label>
//         <input
//           value={cardName}
//           onChange={(e) => setCardName(e.target.value)}
//           placeholder="Enter name on card"
//           required
//         />

//         <label>Card Number</label>
//         <input
//           value={cardNumber}
//           onChange={(e) => setCardNumber(e.target.value)}
//           placeholder="XXXX-XXXX-XXXX-XXXX"
//           required
//         />

//         <label>Expiry Date</label>
//         <input
//           value={expiry}
//           onChange={(e) => setExpiry(e.target.value)}
//           placeholder="MM/YYYY"
//           required
//         />

//         <label>CVV</label>
//         <input
//           type="password"
//           value={cvv}
//           onChange={(e) => setCvv(e.target.value)}
//           placeholder="***"
//           required
//         />

//         <label>Number of Days to Rent</label>
//         <input
//           type="number"
//           value={days}
//           onChange={(e) => setDays(parseInt(e.target.value) || 1)}
//           placeholder="Enter number of days"
//           min="1"
//           required
//         />

//         <button type="submit" disabled={loading}>
//           {loading ? 'Processing…' : `Pay ₹${selectedItem?.rentalFee || ''}`}
//         </button>
//       </form>
//     </div>
//   );
// }



