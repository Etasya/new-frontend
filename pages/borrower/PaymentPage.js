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

// //   const handlePayment = async (e) => {
// //     e.preventDefault();

// //     const user = JSON.parse(localStorage.getItem('user'));
// //     if (!user || !user.userId) {
// //       alert('User not logged in.');
// //       return;
// //     }

// //     if (!selectedItem) {
// //       alert('No item selected for payment.');
// //       return;
// //     }

// //     if (days <= 0) {
// //       alert('Please enter a valid number of days.');
// //       return;
// //     }

// //     try {
// //       setLoading(true);

// //       // Calculate return date
// //       const startDate = new Date();
// //       const returnDate = new Date(bookingDate.getTime() + days * 24 * 60 * 60 * 1000);

// //       // // 1️⃣ Create booking
// //       // const bookingData = {
// //       //   borrowerUserId: user.userId,
// //       //   itemId: selectedItem._id,
// //       //   serviceProviderUserId: selectedItem.serviceProviderUserId,
// //       //   status: 'BOOKED',
// //       //   bookingDate,
// //       //   returnDate
// //       // };
// //       const bookingData = {
// //   borrowerId: user.userId,  // ✅ renamed
// //   itemId: selectedItem._id,
// //   serviceProviderId: selectedItem.serviceProviderUserId,  // ✅ renamed
// //   status: 'BOOKED',
// //   bookingDate,
// //   returnDate
// // };


// //       await axios.post(`${API_BASE}/api/bookings/initiate`, bookingData);

// //       // 2️⃣ Update item status to RENTED
// //       await axios.put(`${API_BASE}/api/items/${selectedItem._id}/status`, {
// //         status: 'RENTED'
// //       });

// //       // 3️⃣ Show success message
// //       alert(`✅ Payment successful! Item rented for ${days} day(s).`);
// //       navigate('/borrower/history');
// //     } catch (error) {
// //       console.error('Payment failed:', error);
// //       alert('❌ Payment or booking failed. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
// const handlePayment = async (e) => {
//   e.preventDefault();

//   const user = JSON.parse(localStorage.getItem('user'));
//   if (!user || !user.userId) {
//     alert('User not logged in.');
//     return;
//   }

//   if (!selectedItem) {
//     alert('No item selected for payment.');
//     return;
//   }

//   if (days <= 0) {
//     alert('Please enter a valid number of days.');
//     return;
//   }

//   try {
//     setLoading(true);

//     // Calculate return date
//     const startDate = new Date();
//     const endDate = new Date(startDate.getTime() + days * 24 * 60 * 60 * 1000);

//     // ✅ Correct field names and log payload
//     const bookingData = {
//       itemId: selectedItem.id,
//       borrowerId: user.userId,  // renamed
//       serviceProviderUserId: selectedItem.serviceProviderUserId,  // renamed
//       // status: 'BOOKED',
//       startDate,
//       endDate
//     };
//     console.log(bookingData);
//     console.log(selectedItem);


//     // ✅ Debug log — check what you are sending to backend
//     console.log("Booking Data Sent:", bookingData);

//     // 1️⃣ Create booking
//     await axios.post(`${API_BASE}/api/bookings/initiate`, bookingData);

//     // 2️⃣ Update item status to RENTED
//     await axios.put(`${API_BASE}/api/items/${selectedItem._id}/status`, {
//       status: 'RENTED'
//     });

//     // 3️⃣ Success message
//     alert(`✅ Payment successful! Item rented for ${days} day(s).`);
//     navigate('/borrower/history');
//   } catch (error) {
//     console.error('Payment failed:', error);
//     alert('❌ Payment or booking failed. Please try again.');
//   } finally {
//     setLoading(false);
//   }
// };


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


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedItem = location.state?.item;
  console.log(selectedItem)

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(false);
  const [rentalFee, setRentalFee] = useState(0); // ✅ reactive rental fee

  // const [cardName, setCardName] = useState('');
  // const [cardNumber, setCardNumber] = useState('');
  // const [expiry, setExpiry] = useState('');
  // const [cvv, setCvv] = useState('');
  // const [days, setDays] = useState(1);
  // const [loading, setLoading] = useState(false);

  // const rentalFee = selectedItem ? Number(selectedItem.rentalFee) : 0;
  const totalAmount = rentalFee * days;
  // ✅ Initialize rental fee once item is available
  // console.log('--- Render Start ---');
  // console.log('Selected Item:', selectedItem);
  // console.log('Rental Fee:', rentalFee, 'Type:', typeof rentalFee);
  // console.log('Days:', days, 'Type:', typeof days);
  // console.log('Total Amount:', totalAmount);
  // console.log('--- Render End ---');
  useEffect(() => {
    // console.log('--- Render Start ---');
    if (selectedItem && selectedItem.rentalFee) {
      const fee = Number(selectedItem.rentalFee);
      setRentalFee(isNaN(fee) ? 0 : fee);
    }
  }, [selectedItem]);

  // ✅ Compute total dynamically
  // const totalAmount = rentalFee * days;

  // 🔍 Debug logs
  useEffect(() => {
    // console.log("Days:", days);
    // console.log("Rental Fee:", rentalFee);
    // console.log("Total Amount:", totalAmount);
  }, [days, rentalFee]);

  const handlePayment = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.userId) {
      alert('User not logged in.');
      return;
    }

    if (!selectedItem) {
      alert('No item selected for payment.');
      return;
    }

    if (days <= 0) {
      alert('Please enter a valid number of days.');
      return;
    }

    try {
      setLoading(true);

      const bookingDate = new Date();
      const returnDate = new Date(bookingDate.getTime() + days * 24 * 60 * 60 * 1000);

      const bookingData = {
        borrowerId: user.userId,
        itemId: selectedItem.id,
        serviceProviderUserId: selectedItem.serviceProviderUserId,
        startDate: bookingDate,
        endDate: returnDate,
        // status: "COMPLETED"
      };
console.log(bookingData)
      // 1️⃣ Create booking
      await axios.post(`${API_BASE}/api/bookings/initiate`, bookingData);

      // 2️⃣ Update item status
      // await axios.put(`${API_BASE}/api/items/${selectedItem._id}/status`, {
      //   status: 'RENTED'
      // });

      alert(`✅ Payment successful! Item rented for ${days} day(s).`);
      navigate('/borrower/history');
    } catch (error) {
      console.error('Payment failed:', error);
      alert('❌ Payment or booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!selectedItem) {
    return <p style={{ textAlign: 'center' }}>No item selected for payment.</p>;
  }

  return (
    <div className="container" style={{ maxWidth: 500, margin: '40px auto' }}>
      <h2 className="section-title">Confirm Payment</h2>

      <div className="card" style={{ marginBottom: 20 }}>
        <h3 className="card-title">{selectedItem.itemName}</h3>
        <p>{selectedItem.description}</p>
        <p>
          <strong>Rental Fee (per day):</strong> ₹{rentalFee}
        </p>
      </div>

      <form onSubmit={handlePayment}>
        <label>Cardholder Name</label>
        <input
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          placeholder="Enter name on card"
          required
        />

        <label>Card Number</label>
        <input
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="XXXX-XXXX-XXXX-XXXX"
          required
        />

        <label>Expiry Date</label>
        <input
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          placeholder="MM/YYYY"
          required
        />

        <label>CVV</label>
        <input
          type="password"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          placeholder="***"
          required
        />

        <label>Number of Days to Rent</label>
        <input
          type="number"
          value={days}
          min="1"
          onChange={(e) => setDays(parseInt(e.target.value) || 1)}
          placeholder="Enter number of days"
          required
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 20,
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: 5,
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: 16,
          }}
        >
          {loading
            ? 'Processing…'
            : `Pay ₹${totalAmount.toLocaleString('en-IN')}`}
        </button>
      </form>
    </div>
  );
}