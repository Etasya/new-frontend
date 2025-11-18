
// import React from 'react'
// import { useSession } from '../../session'
// //import { getUserBookings } from '../../api/bookings'
// //import { initiateReturn } from '../../api/returns'

// const BookingStatus = {
//   PENDING: 'PENDING',
//   ACCEPTED: 'ACCEPTED',
//   REJECTED: 'REJECTED',
//   CONFIRMED: 'CONFIRMED',
//   COMPLETED: 'COMPLETED',
// }

// export default function BrReturns() {
//   const { user } = useSession()
//   const [bookings, setBookings] = React.useState([])
//   const [loading, setLoading] = React.useState(false)
//   const [error, setError] = React.useState('')
//   const [submittingId, setSubmittingId] = React.useState(null)

//   const load = async () => {
//     if (!user) return
//     setLoading(true)
//     setError('')
//     try {
//       const data = null;
//       setBookings(Array.isArray(data) ? data : [])
//     } catch (e) {
//       console.error(e)
//       setError('Failed to load bookings.')
//       setBookings([])
//     } finally {
//       setLoading(false)
//     }
//   }

//   React.useEffect(() => {
//     load()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [user])

//   const eligible = bookings.filter(
//     (b) => b.status === BookingStatus.ACCEPTED || b.status === BookingStatus.CONFIRMED
//   )

//   const onInitiateReturn = async (b) => {
//     if (!user) return
//     setSubmittingId(b.id)
//     setError('')
//     try {
      
//       alert('Return initiated. Waiting for service provider to complete.')
//       await load()
//     } catch (e) {
//       console.error(e)
//       setError('Failed to initiate return.')
//     } finally {
//       setSubmittingId(null)
//     }
//   }

//   return (
//     <div style={{ padding: 16 }}>
//       <h2>Initiate Return</h2>

//       {loading && <div>Loading bookings…</div>}
//       {error && <div style={{ color: 'red' }}>{error}</div>}

//       {!loading && eligible.length === 0 && (
//         <div>No active bookings eligible for return.</div>
//       )}

//       <ul style={{ listStyle: 'none', padding: 0 }}>
//         {eligible.map((b) => (
//           <li
//             key={b.id}
//             style={{
//               border: '1px solid #ddd',
//               borderRadius: 8,
//               padding: 12,
//               marginBottom: 8,
//               display: 'flex',
//               alignItems: 'center',
//               gap: 12,
//             }}
//           >
//             <div style={{ flex: 1 }}>
//               <div><strong>Booking:</strong> {b.id}</div>
//               <div><strong>Status:</strong> {b.status}</div>
//               <div><strong>Item:</strong> {b.itemId}</div>
//               <div><strong>Provider:</strong> {b.serviceProviderUserId}</div>
//               <div><strong>Start:</strong> {b.startDate}</div>
//               <div><strong>End:</strong> {b.endDate}</div>
//             </div>
//             <button
//               onClick={() => onInitiateReturn(b)}
//               disabled={submittingId === b.id}
//             >
//               {submittingId === b.id ? 'Submitting…' : 'Initiate Return'}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }



// import React from 'react'
// import { useSession } from '../../session'

// const BookingStatus = {
//   PENDING: 'PENDING',
//   ACCEPTED: 'ACCEPTED',
//   REJECTED: 'REJECTED',
//   CONFIRMED: 'CONFIRMED',
//   COMPLETED: 'COMPLETED',
// }

// export default function BrReturns() {
//   const { user } = useSession()
//   const [bookings, setBookings] = React.useState([])
//   const [loading, setLoading] = React.useState(false)
//   const [error, setError] = React.useState('')
//   const [submittingId, setSubmittingId] = React.useState(null)

//   const load = async () => {
//     if (!user) return
//     setLoading(true)
//     setError('')
//     try {
//       const data = null // Replace with API call
//       setBookings(Array.isArray(data) ? data : [])
//     } catch (e) {
//       console.error(e)
//       setError('Failed to load bookings.')
//       setBookings([])
//     } finally {
//       setLoading(false)
//     }
//   }

//   React.useEffect(() => {
//     load()
//   }, [user])

//   const eligible = bookings.filter(
//     (b) => b.status === BookingStatus.ACCEPTED || b.status === BookingStatus.CONFIRMED
//   )

//   const onInitiateReturn = async (b) => {
//     if (!user) return
//     setSubmittingId(b.id)
//     setError('')
//     try {
//       alert('Return initiated. Waiting for service provider to complete.')
//       await load()
//     } catch (e) {
//       console.error(e)
//       setError('Failed to initiate return.')
//     } finally {
//       setSubmittingId(null)
//     }
//   }

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Initiate Return</h2>

//       {loading && <div>Loading bookings…</div>}
//       {error && <div style={{ color: 'red' }}>{error}</div>}

//       {!loading && eligible.length === 0 && (
//         <div>No active bookings eligible for return.</div>
//       )}

//       {!loading && eligible.length > 0 && (
//         <table
//           style={{
//             width: '100%',
//             borderCollapse: 'collapse',
//             marginTop: '20px',
//             border: '1px solid #ddd',
//           }}
//         >
//           <thead style={{ backgroundColor: '#f5f5f5' }}>
//             <tr>
//               <th style={thStyle}>Booking ID</th>
//               <th style={thStyle}>Status</th>
//               <th style={thStyle}>Item ID</th>
//               <th style={thStyle}>Provider</th>
//               <th style={thStyle}>Start Date</th>
//               <th style={thStyle}>End Date</th>
//               <th style={thStyle}>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {eligible.map((b) => (
//               <tr key={b.id} style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
//                 <td style={tdStyle}>{b.id}</td>
//                 <td style={tdStyle}>{b.status}</td>
//                 <td style={tdStyle}>{b.itemId}</td>
//                 <td style={tdStyle}>{b.serviceProviderUserId}</td>
//                 <td style={tdStyle}>{b.startDate}</td>
//                 <td style={tdStyle}>{b.endDate}</td>
//                 <td style={tdStyle}>
//                   <button
//                     onClick={() => onInitiateReturn(b)}
//                     disabled={submittingId === b.id}
//                     style={{
//                       backgroundColor: submittingId === b.id ? '#ccc' : '#007bff',
//                       color: '#fff',
//                       border: 'none',
//                       padding: '6px 12px',
//                       borderRadius: '4px',
//                       cursor: submittingId === b.id ? 'not-allowed' : 'pointer',
//                     }}
//                   >
//                     {submittingId === b.id ? 'Submitting…' : 'Initiate Return'}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   )
// }

// const thStyle = {
//   border: '1px solid #ddd',
//   padding: '10px',
//   textAlign: 'center',
//   fontWeight: '600',
// }

// const tdStyle = {
//   border: '1px solid #ddd',
//   padding: '10px',
// }


// dummy data

// import React from 'react'
// import { useSession } from '../../session'

// const BookingStatus = {
//   PENDING: 'PENDING',
//   ACCEPTED: 'ACCEPTED',
//   REJECTED: 'REJECTED',
//   CONFIRMED: 'CONFIRMED',
//   COMPLETED: 'COMPLETED',
// }

// export default function BrReturns() {
//   const { user } = useSession()
//   const [bookings, setBookings] = React.useState([])
//   const [loading, setLoading] = React.useState(false)
//   const [error, setError] = React.useState('')
//   const [submittingId, setSubmittingId] = React.useState(null)

//   const load = async () => {
//     if (!user) return
//     setLoading(true)
//     setError('')
//     try {
//       // 🧩 Mock data (replace with your API later)
//       const data = [
//         {
//           id: 'B001',
//           status: 'CONFIRMED',
//           itemId: 'ITEM001',
//           serviceProviderUserId: 'PROVIDER001',
//           startDate: '2025-10-10',
//           endDate: '2025-10-15',
//         },
//         {
//           id: 'B002',
//           status: 'ACCEPTED',
//           itemId: 'ITEM002',
//           serviceProviderUserId: 'PROVIDER002',
//           startDate: '2025-10-12',
//           endDate: '2025-10-18',
//         },
//         {
//           id: 'B003',
//           status: 'PENDING',
//           itemId: 'ITEM003',
//           serviceProviderUserId: 'PROVIDER003',
//           startDate: '2025-10-14',
//           endDate: '2025-10-20',
//         },
//       ]
//       setBookings(Array.isArray(data) ? data : [])
//     } catch (e) {
//       console.error(e)
//       setError('Failed to load bookings.')
//       setBookings([])
//     } finally {
//       setLoading(false)
//     }
//   }

//   React.useEffect(() => {
//     load()
//   }, [user])

//   const eligible = bookings.filter(
//     (b) => b.status === BookingStatus.ACCEPTED || b.status === BookingStatus.CONFIRMED
//   )

//   const onInitiateReturn = async (b) => {
//     if (!user) return
//     setSubmittingId(b.id)
//     setError('')
//     try {
//       alert(`Return initiated for booking ID: ${b.id}`)
//       await load()
//     } catch (e) {
//       console.error(e)
//       setError('Failed to initiate return.')
//     } finally {
//       setSubmittingId(null)
//     }
//   }

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Initiate Return</h2>

//       {loading && <div>Loading bookings…</div>}
//       {error && <div style={{ color: 'red' }}>{error}</div>}

//       {!loading && eligible.length === 0 && (
//         <div>No active bookings eligible for return.</div>
//       )}

//       {!loading && eligible.length > 0 && (
//         <table
//           style={{
//             width: '100%',
//             borderCollapse: 'collapse',
//             marginTop: '20px',
//             border: '1px solid #ddd',
//           }}
//         >
//           <thead style={{ backgroundColor: '#f5f5f5' }}>
//             <tr>
//               <th style={thStyle}>Booking ID</th>
//               <th style={thStyle}>Status</th>
//               <th style={thStyle}>Item ID</th>
//               <th style={thStyle}>Provider</th>
//               <th style={thStyle}>Start Date</th>
//               <th style={thStyle}>End Date</th>
//               <th style={thStyle}>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {eligible.map((b) => (
//               <tr key={b.id} style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
//                 <td style={tdStyle}>{b.id}</td>
//                 <td style={tdStyle}>{b.status}</td>
//                 <td style={tdStyle}>{b.itemId}</td>
//                 <td style={tdStyle}>{b.serviceProviderUserId}</td>
//                 <td style={tdStyle}>{b.startDate}</td>
//                 <td style={tdStyle}>{b.endDate}</td>
//                 <td style={tdStyle}>
//                   <button
//                     onClick={() => onInitiateReturn(b)}
//                     disabled={submittingId === b.id}
//                     style={{
//                       backgroundColor: submittingId === b.id ? '#ccc' : '#007bff',
//                       color: '#fff',
//                       border: 'none',
//                       padding: '6px 12px',
//                       borderRadius: '4px',
//                       cursor: submittingId === b.id ? 'not-allowed' : 'pointer',
//                     }}
//                   >
//                     {submittingId === b.id ? 'Submitting…' : 'Initiate Return'}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   )
// }

// const thStyle = {
//   border: '1px solid #ddd',
//   padding: '10px',
//   textAlign: 'center',
//   fontWeight: '600',
// }

// const tdStyle = {
//   border: '1px solid #ddd',
//   padding: '10px',
// }



import React from 'react'
import { useSession } from '../../session'
import axios from 'axios'

const BookingStatus = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  CONFIRMED: 'CONFIRMED',
  COMPLETED: 'COMPLETED',
}

export default function BrReturns() {
  const { user } = useSession()
  const [bookings, setBookings] = React.useState([])
  const [returns, setReturns] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [submittingId, setSubmittingId] = React.useState(null)

  // ✅ Fetch bookings from backend
  const loadBookings = async () => {
    if (!user) return
    setLoading(true)
    setError('')
    try {
      const res = await axios.get(`http://localhost:8080/api/bookings/user/${user.userId}`)
      setBookings(Array.isArray(res.data) ? res.data : [])
    } catch (e) {
      console.error(e)
      setError('Failed to load bookings.')
      setBookings([])
    } finally {
      setLoading(false)
    }
  }

  // ✅ Fetch return history
  const loadReturns = async () => {
    if (!user) return
    try {
      const res = await axios.get(`http://localhost:8080/api/returns/borrower/${user.userId}`)
      setReturns(Array.isArray(res.data) ? res.data : [])
    } catch (e) {
      console.error(e)
    }
  }

  React.useEffect(() => {
    loadBookings()
    loadReturns()
  }, [user])

  // ✅ Eligible bookings for return
  const eligible = bookings.filter(
    (b) => b.status === BookingStatus.ACCEPTED || b.status === BookingStatus.CONFIRMED
  )

  // ✅ Initiate a return
  const onInitiateReturn = async (b) => {
    if (!user) return
    setSubmittingId(b.id)
    setError('')
    try {
      await axios.post(`http://localhost:8080/api/returns/initiate`, {
        bookingId: b.id,
        borrowerId: user.userId,
      })
      alert(`Return initiated for booking ID: ${b.id}`)
      await loadBookings()
      await loadReturns()
    } catch (e) {
      console.error(e)
      setError('Failed to initiate return.')
    } finally {
      setSubmittingId(null)
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Initiate Return</h2>

      {loading && <div>Loading bookings…</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {/* Eligible Bookings Table */}
      {!loading && eligible.length === 0 && (
        <div>No active bookings eligible for return.</div>
      )}

      {!loading && eligible.length > 0 && (
        <table style={tableStyle}>
          <thead style={theadStyle}>
            <tr>
              <th style={thStyle}>Booking ID</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Item ID</th>
              <th style={thStyle}>Provider</th>
              <th style={thStyle}>Start Date</th>
              <th style={thStyle}>End Date</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {eligible.map((b) => (
              <tr key={b.id} style={trStyle}>
                <td style={tdStyle}>{b.id}</td>
                <td style={tdStyle}>{b.status}</td>
                <td style={tdStyle}>{b.itemId}</td>
                <td style={tdStyle}>{b.serviceProviderUserId}</td>
                <td style={tdStyle}>{b.startDate}</td>
                <td style={tdStyle}>{b.endDate}</td>
                <td style={tdStyle}>
                  <button
                    onClick={() => onInitiateReturn(b)}
                    disabled={submittingId === b.id}
                    style={{
                      backgroundColor: submittingId === b.id ? '#ccc' : '#007bff',
                      color: '#fff',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      cursor: submittingId === b.id ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {submittingId === b.id ? 'Submitting…' : 'Initiate Return'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Return History Table */}
      <div style={{ marginTop: '50px' }}>
        <h2>Return History</h2>

        {returns.length === 0 ? (
          <div>No returns have been initiated yet.</div>
        ) : (
          <table style={tableStyle}>
            <thead style={theadStyle}>
              <tr>
                <th style={thStyle}>Return ID</th>
                <th style={thStyle}>Booking ID</th>
                <th style={thStyle}>Item ID</th>
                <th style={thStyle}>Borrower</th>
                <th style={thStyle}>Provider</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Initiated Date</th>
              </tr>
            </thead>
            <tbody>
              {returns.map((r) => (
                <tr key={r.id} style={trStyle}>
                  <td style={tdStyle}>{r.id}</td>
                  <td style={tdStyle}>{r.bookingId}</td>
                  <td style={tdStyle}>{r.itemId}</td>
                  <td style={tdStyle}>{r.borrowerId}</td>
                  <td style={tdStyle}>{r.serviceProviderUserId}</td>
                  <td style={tdStyle}>{r.status}</td>
                  <td style={tdStyle}>{r.initiatedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

// ---------- Styling ----------
const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
  border: '1px solid #ddd',
}

const theadStyle = {
  backgroundColor: '#f5f5f5',
}

const thStyle = {
  border: '1px solid #ddd',
  padding: '10px',
  textAlign: 'center',
  fontWeight: '600',
}

const tdStyle = {
  border: '1px solid #ddd',
  padding: '10px',
  textAlign: 'center',
}

const trStyle = {
  borderBottom: '1px solid #ddd',
}

