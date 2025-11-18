import React, { useEffect, useMemo, useState } from 'react';

// If you already have API helpers, we'll try to use them.
// Otherwise, we fall back to inline fetch helpers below.
let getUserBookings, getPaymentsByBorrower;
try {
  const bookingsApi = require('./api/bookings');
  const paymentsApi = require('./api/payments');
  getUserBookings = bookingsApi.getUserBookings;
  getPaymentsByBorrower = paymentsApi.getPaymentsByBorrower;
} catch (e) {
  // fallback
}

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

async function apiGet(url) {
  const res = await fetch(API_BASE + url, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (!res.ok) throw new Error(`GET ${url} failed: ${res.status}`);
  return res.json();
}

export default function HistoryList({ userId, show = 'all', className }) {
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');

  const useBookings = show === 'all' || show === 'bookings';
  const usePayments = show === 'all' || show === 'payments';

  const load = async () => {
    if (!userId) return;
    setLoading(true);
    setError('');
    try {
      if (useBookings) {
        if (getUserBookings) {
          const b = await getUserBookings(userId);
          setBookings(Array.isArray(b) ? b : []);
        } else {
          const b = await apiGet(`/api/bookings/user/${encodeURIComponent(userId)}`);
          setBookings(Array.isArray(b) ? b : []);
        }
      } else {
        setBookings([]);
      }

      if (usePayments) {
        if (getPaymentsByBorrower) {
          const p = await getPaymentsByBorrower(userId);
          setPayments(Array.isArray(p) ? p : []);
        } else {
          const p = await apiGet(`/api/payments/user/${encodeURIComponent(userId)}`);
          setPayments(Array.isArray(p) ? p : []);
        }
      } else {
        setPayments([]);
      }
    } catch (e) {
      console.error(e);
      setError('Failed to load history.');
      setBookings([]);
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, show]);

  const filteredBookings = useMemo(() => {
    if (!filter) return bookings;
    const f = filter.toLowerCase();
    return bookings.filter((b) =>
      (b.id || '').toLowerCase().includes(f) ||
      (b.status || '').toLowerCase().includes(f) ||
      (b.itemId || '').toLowerCase().includes(f) ||
      (b.borrowerId || '').toLowerCase().includes(f) ||
      (b.serviceProviderUserId || '').toLowerCase().includes(f)
    );
  }, [bookings, filter]);

  const filteredPayments = useMemo(() => {
    if (!filter) return payments;
    const f = filter.toLowerCase();
    return payments.filter((p) =>
      (p.id || '').toLowerCase().includes(f) ||
      (p.status || '').toLowerCase().includes(f) ||
      (p.bookingId || '').toLowerCase().includes(f) ||
      String(p.amount || '').toLowerCase().includes(f) ||
      (p.paymentMethod || '').toLowerCase().includes(f)
    );
  }, [payments, filter]);

  return (
    <div className={className} style={{ padding: 20 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ margin: 0, color: '#fff' }}>History</h2>
        <input
          placeholder="Filter by id, status, item, amount..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            flex: 1,
            padding: '8px 10px',
            borderRadius: 6,
            border: '1px solid #555',
            backgroundColor: '#1e1e1e',
            color: '#fff',
          }}
        />
        <button
          onClick={load}
          disabled={loading}
          style={{
            backgroundColor: '#4a6cf7',
            color: '#fff',
            border: 'none',
            padding: '8px 14px',
            borderRadius: 6,
            cursor: 'pointer',
          }}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>

      {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}

      {/* BOOKINGS SECTION */}
      {useBookings && (
        <>
          <h3 style={{ color: '#9dbff9' }}>Bookings</h3>
          {filteredBookings.length === 0 ? (
            <div style={{ marginBottom: 12, color: '#bbb' }}>No bookings found.</div>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {filteredBookings.map((b) => (
                <li
                  key={b.id}
                  style={{
                    backgroundColor: '#1c1c1c',
                    border: '1px solid #333',
                    borderRadius: 8,
                    padding: 14,
                    marginBottom: 10,
                    color: '#ddd',
                  }}
                >
                  <div><strong>Booking:</strong> {b.id}</div>
                  <div><strong>Status:</strong> {b.status}</div>
                  <div><strong>Item:</strong> {b.itemId}</div>
                  <div><strong>Borrower:</strong> {b.borrowerId}</div>
                  <div><strong>Provider:</strong> {b.serviceProviderUserId}</div>
                  <div><strong>Start:</strong> {b.startDate}</div>
                  <div><strong>End:</strong> {b.endDate}</div>

                  {/* ✅ ORDER SUCCESS MESSAGE */}
                  {b.status === 'BOOKED' && (
                    <p
                      style={{
                        color: '#00b894',
                        fontWeight: 'bold',
                        marginTop: 6,
                      }}
                    >
                      ✅ Order successfully placed
                    </p>
                  )}

                  {/* RENTED STATUS */}
                  {b.status === 'RENTED' && (
                    <p
                      style={{
                        color: '#f39c12',
                        fontWeight: 'bold',
                        marginTop: 6,
                      }}
                    >
                      📦 Item is currently rented
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {/* PAYMENTS SECTION */}
      {usePayments && (
        <>
          <h3 style={{ color: '#9dbff9', marginTop: 30 }}>Payments</h3>
          {filteredPayments.length === 0 ? (
            <div style={{ color: '#bbb' }}>No payments found.</div>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {filteredPayments.map((p) => (
                <li
                  key={p.id}
                  style={{
                    backgroundColor: '#1c1c1c',
                    border: '1px solid #333',
                    borderRadius: 8,
                    padding: 14,
                    marginBottom: 10,
                    color: '#ddd',
                  }}
                >
                  <div><strong>Payment:</strong> {p.id}</div>
                  <div><strong>Booking:</strong> {p.bookingId}</div>
                  <div><strong>Status:</strong> {p.status}</div>
                  <div><strong>Amount:</strong> ₹{p.amount}</div>
                  <div><strong>Method:</strong> {p.paymentMethod}</div>
                  <div><strong>Transaction:</strong> {p.transactionId}</div>
                  <div><strong>Date:</strong> {p.creationDate}</div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
