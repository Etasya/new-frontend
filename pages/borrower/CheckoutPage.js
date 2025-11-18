// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'

// export default function CheckoutPage() {
//   const { id } = useParams()
//   const [item, setItem] = useState(null)
//   const [days, setDays] = useState(1)
//   const [address, setAddress] = useState('')
//   const [price, setPrice] = useState(0)

//   // mock fetch item details (replace with real API call later)
//   useEffect(() => {
//     const mockItem = {
//       id,
//       name: 'Samsung Galaxy S24 Ultra',
//       description: 'Flagship smartphone with 200MP camera',
//       pricePerDay: 8000,
//     }
//     setItem(mockItem)
//   }, [id])

//   useEffect(() => {
//     if (item) setPrice(item.pricePerDay * days)
//   }, [item, days])

//   if (!item) return <div>Loading...</div>

//   return (
//     <div className="checkout-page">
//       <h2>Checkout</h2>
//       <div className="item-details">
//         <h3>{item.name}</h3>
//         <p>{item.description}</p>
//         <p>Rental Fee (per day): ₹{item.pricePerDay}</p>
//       </div>

//       <div className="checkout-form">
//         <label>
//           Address:
//           <textarea
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             placeholder="Enter your address"
//           />
//         </label>

//         <label>
//           Number of Days:
//           <input
//             type="number"
//             value={days}
//             min="1"
//             onChange={(e) => setDays(Number(e.target.value))}
//           />
//         </label>

//         <h3>Total Price: ₹{price}</h3>

//         <button
//           disabled={!address}
//           onClick={() => alert(`Pay ₹${price} for ${days} days`)}
//         >
//           Pay Now
//         </button>
//       </div>
//     </div>
//   )
// }
