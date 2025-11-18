import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSession } from '../session'



// =========================
// ROLE SWITCHER COMPONENT
// =========================
function RoleSwitcher() {
  const { user, activeRole, setActiveRole } = useSession()
  
  // ✅ allow switching only if user role is BOTH
  const canSwitch = user?.userRole === 'BOTH'

  // Optional: theme toggle handler
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme')
    document.documentElement.setAttribute(
      'data-theme',
      current === 'light' ? 'dark' : 'light'
    )
  }

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <span style={{ color: 'black' }}>Role:</span>

      <select
        value={activeRole}
        onChange={(e) => setActiveRole(e.target.value)}
        disabled={!canSwitch}
        style={{
          backgroundColor: canSwitch ? 'white' : '#f0f0f0',
          cursor: canSwitch ? 'pointer' : 'not-allowed',
        }}
      >
        <option value="SERVICE_PROVIDER">Service Provider</option>
        <option value="BORROWER">Borrower</option>
      </select>

      {/* Optional theme toggle button */}
      {/* <button className="theme-toggle" onClick={toggleTheme}>🌗</button> */}
    </div>
  )
}

// =========================
// NAVBAR COMPONENT
// =========================
export default function Navbar() {
  const { user, activeRole, logout } = useSession()
  const loc = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    localStorage.removeItem('user') // clear local storage too
    navigate('/login') // redirect to login after logout
  }

  return (
    <nav
      style={{
        display: 'flex',
        gap: 16,
        padding: 12,
        borderBottom: '1px solid #eee',
        background: '#fff',
        alignItems: 'center',
      }}
    >
      {/* Home Link */}
      <Link
        to={
          user
            ? activeRole === 'SERVICE_PROVIDER'
              ? '/sp/items'
              : '/borrower/items'
            : '/'
        }
      >
        Home
      </Link>

      {/* Show Cart only if logged in */}
      {user && <Link to="/cart">Cart</Link>}

      {/* Authenticated user navigation */}
      {user && (
        <>
          <RoleSwitcher />

          {activeRole === 'SERVICE_PROVIDER' && (
            <>
              <Link
                to="/sp/items"
                className={loc.pathname.startsWith('/sp/items') ? 'active' : ''}
              >
                Items
              </Link>
              <Link
                to="/sp/history"
                className={loc.pathname === '/sp/history' ? 'active' : ''}
              >
                History
              </Link>
            </>
          )}

          {activeRole === 'BORROWER' && (
            <>
              <Link
                to="/borrower/items"
                className={
                  loc.pathname.startsWith('/borrower/items') ? 'active' : ''
                }
              >
                Items
              </Link>
              <Link
                to="/borrower/history"
                className={loc.pathname === '/borrower/history' ? 'active' : ''}
              >
                History
              </Link>
              <Link
                to="/borrower/returns"
                className={loc.pathname === '/borrower/returns' ? 'active' : ''}
              >
                Returns
              </Link>
            </>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            style={{
              marginLeft: 'auto',
              background: '#f44336',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </>
      )}

      {/* Not logged in */}
      {!user && (
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 12 }}>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </nav>
  )
}
