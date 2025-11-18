// // pages/Home.js - Enhanced Professional Version
// import React from 'react'
// import { Link, Navigate } from 'react-router-dom'
// import { useSession } from '../session'

// /**
//  * Home Page Component
//  * Displays landing page with hero section and call-to-action buttons
//  * Auto-redirects authenticated users to their respective dashboards
//  */
// export default function Home() {
//   const { user, activeRole } = useSession()

//   // Redirect authenticated users to their dashboard
//   if (user) {
//     return <Navigate to={activeRole === 'SERVICE_PROVIDER' ? '/sp/items' : '/borrower/items'} />
//   }

//   return (
//     <div className="home-container">
//       {/* Hero Section */}
//       <div style={{ maxWidth: '900px', margin: '0 auto' }}>
//         <h1>Welcome to Resource Sharing Platform</h1>
        
//         <p style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-xl)' }}>
//           The modern marketplace for renting and sharing resources. 
//           Whether you want to rent items or share your own, we've got you covered.
//         </p>

//         {/* Feature Highlights */}
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//           gap: 'var(--space-lg)',
//           marginBottom: 'var(--space-2xl)',
//           textAlign: 'left'
//         }}>
//           {/* Feature 1 */}
//           <div className="card" style={{ 
//             background: 'var(--surface-elevated)',
//             padding: 'var(--space-xl)',
//             borderRadius: 'var(--radius-lg)'
//           }}>
//             <div style={{ 
//               fontSize: 'var(--font-size-3xl)', 
//               marginBottom: 'var(--space-md)',
//               color: 'var(--primary)'
//             }}>
//               🎯
//             </div>
//             <h3 style={{ 
//               color: 'var(--primary)', 
//               fontSize: 'var(--font-size-lg)',
//               marginBottom: 'var(--space-sm)' 
//             }}>
//               Easy to Use
//             </h3>
//             <p style={{ 
//               color: 'var(--text-light)', 
//               fontSize: 'var(--font-size-sm)',
//               lineHeight: '1.6',
//               margin: 0
//             }}>
//               Browse available items, rent what you need, and manage your bookings effortlessly.
//             </p>
//           </div>

//           {/* Feature 2 */}
//           <div className="card" style={{ 
//             background: 'var(--surface-elevated)',
//             padding: 'var(--space-xl)',
//             borderRadius: 'var(--radius-lg)'
//           }}>
//             <div style={{ 
//               fontSize: 'var(--font-size-3xl)', 
//               marginBottom: 'var(--space-md)',
//               color: 'var(--secondary)'
//             }}>
//               💰
//             </div>
//             <h3 style={{ 
//               color: 'var(--secondary)', 
//               fontSize: 'var(--font-size-lg)',
//               marginBottom: 'var(--space-sm)' 
//             }}>
//               Save Money
//             </h3>
//             <p style={{ 
//               color: 'var(--text-light)', 
//               fontSize: 'var(--font-size-sm)',
//               lineHeight: '1.6',
//               margin: 0
//             }}>
//               Rent items instead of buying. Save money and reduce waste by sharing resources.
//             </p>
//           </div>

//           {/* Feature 3 */}
//           <div className="card" style={{ 
//             background: 'var(--surface-elevated)',
//             padding: 'var(--space-xl)',
//             borderRadius: 'var(--radius-lg)'
//           }}>
//             <div style={{ 
//               fontSize: 'var(--font-size-3xl)', 
//               marginBottom: 'var(--space-md)',
//               color: 'var(--primary)'
//             }}>
//               🤝
//             </div>
//             <h3 style={{ 
//               color: 'var(--primary)', 
//               fontSize: 'var(--font-size-lg)',
//               marginBottom: 'var(--space-sm)' 
//             }}>
//               Earn Income
//             </h3>
//             <p style={{ 
//               color: 'var(--text-light)', 
//               fontSize: 'var(--font-size-sm)',
//               lineHeight: '1.6',
//               margin: 0
//             }}>
//               List your unused items and earn money by sharing them with others in your community.
//             </p>
//           </div>
//         </div>

//         {/* Call to Action Buttons */}
//         <div style={{ 
//           display: 'flex', 
//           gap: 'var(--space-lg)', 
//           justifyContent: 'center',
//           flexWrap: 'wrap',
//           marginTop: 'var(--space-2xl)'
//         }}>
//           <Link 
//             to="/login"
//             style={{
//               textDecoration: 'none'
//             }}
//           >
//             <button className="btn-primary" style={{
//               padding: 'var(--space-lg) var(--space-2xl)',
//               fontSize: 'var(--font-size-lg)',
//               fontWeight: '600',
//               minWidth: '180px'
//             }}>
//               Login
//             </button>
//           </Link>
          
//           <Link 
//             to="/register"
//             style={{
//               textDecoration: 'none'
//             }}
//           >
//             <button className="btn-secondary" style={{
//               padding: 'var(--space-lg) var(--space-2xl)',
//               fontSize: 'var(--font-size-lg)',
//               fontWeight: '600',
//               minWidth: '180px'
//             }}>
//               Create Account
//             </button>
//           </Link>
//         </div>

//         {/* Additional Info */}
//         <p style={{ 
//           marginTop: 'var(--space-2xl)',
//           fontSize: 'var(--font-size-sm)',
//           color: 'var(--text-muted)'
//         }}>
//           Join thousands of users already sharing and renting resources
//         </p>
//       </div>
//     </div>
//   )
// }



// pages/Home.js - Professional Enhanced Version
import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useSession } from '../session'

export default function Home() {
  const { user, activeRole } = useSession()

  // Redirect authenticated users to their dashboard
  if (user) {
    return <Navigate to={activeRole === 'SERVICE_PROVIDER' ? '/sp/items' : '/borrower/items'} />
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f1419 0%, #1a1d24 50%, #14161a 100%)',
      color: '#e8eaf0',
      marginLeft: '-24px',
      marginRight: '-24px',
      marginTop: '-32px',
      padding: '0'
    }}>
      {/* Hero Section */}
      <section style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '100px 40px 80px',
        textAlign: 'center'
      }}>
        <div style={{
          animation: 'fadeInUp 0.8s ease-out',
          marginBottom: '48px'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #9ab4f0 0%, #7998e6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '24px',
            lineHeight: '1.2',
            letterSpacing: '-0.02em'
          }}>
            Share Resources.<br />Build Community.
          </h1>
          
          <p style={{
            fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
            color: '#a0a4b0',
            maxWidth: '700px',
            margin: '0 auto 48px',
            lineHeight: '1.7',
            fontWeight: '400'
          }}>
            The modern marketplace for renting and sharing resources. 
            Connect with your community and make the most of what you have.
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '80px'
          }}>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <button style={{
                padding: '18px 48px',
                fontSize: '1.125rem',
                fontWeight: '600',
                background: 'linear-gradient(135deg, #9ab4f0 0%, #7998e6 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(154, 180, 240, 0.3)',
                fontFamily: 'inherit'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 8px 30px rgba(154, 180, 240, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 4px 20px rgba(154, 180, 240, 0.3)'
              }}>
                Get Started →
              </button>
            </Link>
            
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <button style={{
                padding: '18px 48px',
                fontSize: '1.125rem',
                fontWeight: '600',
                background: 'transparent',
                color: '#9ab4f0',
                border: '2px solid #9ab4f0',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(154, 180, 240, 0.1)'
                e.target.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent'
                e.target.style.transform = 'translateY(0)'
              }}>
                Create Account
              </button>
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '32px',
          maxWidth: '900px',
          margin: '0 auto 80px',
          padding: '40px',
          background: 'rgba(29, 31, 37, 0.6)',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(154, 180, 240, 0.1)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '2.75rem',
              fontWeight: '700',
              color: '#9ab4f0',
              marginBottom: '8px'
            }}>5,000+</div>
            <div style={{ color: '#a0a4b0', fontSize: '1rem', fontWeight: '500' }}>Active Users</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '2.75rem',
              fontWeight: '700',
              color: '#00b894',
              marginBottom: '8px'
            }}>10,000+</div>
            <div style={{ color: '#a0a4b0', fontSize: '1rem', fontWeight: '500' }}>Items Shared</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '2.75rem',
              fontWeight: '700',
              color: '#9ab4f0',
              marginBottom: '8px'
            }}>98%</div>
            <div style={{ color: '#a0a4b0', fontSize: '1rem', fontWeight: '500' }}>Satisfaction</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '80px 40px'
      }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 2.75rem)',
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: '24px',
          color: '#e8eaf0'
        }}>
          Why Choose Our Platform?
        </h2>
        <p style={{
          textAlign: 'center',
          color: '#a0a4b0',
          fontSize: '1.125rem',
          maxWidth: '600px',
          margin: '0 auto 60px'
        }}>
          Everything you need to share, rent, and earn in one place
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px'
        }}>
          {[
            {
              icon: '🎯',
              title: 'Easy to Use',
              description: 'Intuitive interface designed for seamless browsing, renting, and managing your bookings with just a few clicks.',
              color: '#9ab4f0'
            },
            {
              icon: '💰',
              title: 'Save Money',
              description: 'Access what you need without the full cost of ownership. Pay only for what you use and reduce waste.',
              color: '#00b894'
            },
            {
              icon: '🤝',
              title: 'Earn Income',
              description: 'Turn your unused items into a revenue stream. List once and start earning from your idle assets.',
              color: '#7998e6'
            },
            {
              icon: '🔒',
              title: 'Secure Transactions',
              description: 'Built-in payment protection and verified users ensure safe and reliable transactions every time.',
              color: '#9ab4f0'
            },
            {
              icon: '🌍',
              title: 'Build Community',
              description: 'Connect with neighbors and contribute to a sustainable sharing economy in your local area.',
              color: '#00b894'
            },
            {
              icon: '⚡',
              title: 'Instant Access',
              description: 'Browse thousands of items available near you. Book instantly and get what you need when you need it.',
              color: '#7998e6'
            }
          ].map((feature, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(29, 31, 37, 0.6)',
                padding: '40px 32px',
                borderRadius: '20px',
                border: '1px solid rgba(154, 180, 240, 0.1)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.borderColor = feature.color
                e.currentTarget.style.boxShadow = `0 20px 50px rgba(0, 0, 0, 0.4)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = 'rgba(154, 180, 240, 0.1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{
                fontSize: '3.5rem',
                marginBottom: '20px',
                display: 'inline-block'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: feature.color,
                marginBottom: '16px',
                lineHeight: '1.3'
              }}>
                {feature.title}
              </h3>
              <p style={{
                color: '#a0a4b0',
                lineHeight: '1.7',
                fontSize: '1rem',
                margin: 0
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '80px 40px'
      }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 2.75rem)',
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: '24px',
          color: '#e8eaf0'
        }}>
          How It Works
        </h2>
        <p style={{
          textAlign: 'center',
          color: '#a0a4b0',
          fontSize: '1.125rem',
          maxWidth: '600px',
          margin: '0 auto 60px'
        }}>
          Get started in four simple steps
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '48px',
          position: 'relative'
        }}>
          {[
            { step: '1', title: 'Create Account', desc: 'Sign up in seconds with just your email address' },
            { step: '2', title: 'Browse Items', desc: 'Explore thousands of resources in your area' },
            { step: '3', title: 'Book & Pay', desc: 'Secure your rental with safe payment options' },
            { step: '4', title: 'Enjoy & Return', desc: 'Use the item and return it hassle-free' }
          ].map((item, index) => (
            <div key={index} style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{
                width: '90px',
                height: '90px',
                margin: '0 auto 24px',
                background: `linear-gradient(135deg, ${index % 2 === 0 ? '#9ab4f0' : '#00b894'} 0%, ${index % 2 === 0 ? '#7998e6' : '#008a57'} 100%)`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.25rem',
                fontWeight: '700',
                color: '#fff',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {item.step}
              </div>
              <h3 style={{
                fontSize: '1.375rem',
                fontWeight: '600',
                color: '#e8eaf0',
                marginBottom: '12px'
              }}>
                {item.title}
              </h3>
              <p style={{
                color: '#a0a4b0',
                fontSize: '1rem',
                margin: 0,
                lineHeight: '1.6'
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto 80px',
        padding: '80px 40px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(154, 180, 240, 0.15) 0%, rgba(0, 184, 148, 0.15) 100%)',
        borderRadius: '24px',
        border: '1px solid rgba(154, 180, 240, 0.3)',
        boxShadow: '0 10px 50px rgba(0, 0, 0, 0.3)'
      }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: '700',
          marginBottom: '24px',
          color: '#e8eaf0',
          lineHeight: '1.2'
        }}>
          Ready to Get Started?
        </h2>
        <p style={{
          fontSize: '1.25rem',
          color: '#a0a4b0',
          marginBottom: '48px',
          maxWidth: '600px',
          margin: '0 auto 48px',
          lineHeight: '1.7'
        }}>
          Join thousands of users already sharing and renting resources in their communities.
        </p>
        <Link to="/register" style={{ textDecoration: 'none' }}>
          <button style={{
            padding: '20px 64px',
            fontSize: '1.25rem',
            fontWeight: '600',
            background: 'linear-gradient(135deg, #9ab4f0 0%, #7998e6 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 20px rgba(154, 180, 240, 0.4)',
            fontFamily: 'inherit'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-4px) scale(1.02)'
            e.target.style.boxShadow = '0 12px 40px rgba(154, 180, 240, 0.5)'
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0) scale(1)'
            e.target.style.boxShadow = '0 4px 20px rgba(154, 180, 240, 0.4)'
          }}>
            Create Free Account
          </button>
        </Link>
      </section>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}