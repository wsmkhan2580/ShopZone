import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const styles = {
  nav: {
    position: 'fixed',
    top: 0, left: 0, right: 0,
    height: 'var(--nav-h)',
    background: 'rgba(10,10,10,0.85)',
    backdropFilter: 'blur(14px)',
    borderBottom: '1px solid #222',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 24px',
  },
  logo: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.8rem',
    letterSpacing: '2px',
    color: 'var(--clr-accent)',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '28px',
    listStyle: 'none',
  },
  link: {
    fontSize: '0.88rem',
    fontWeight: 500,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    color: 'var(--clr-text-muted)',
    transition: 'color var(--transition)',
  },
  activeLink: {
    color: 'var(--clr-accent)',
  },
  cartBtn: {
    position: 'relative',
    background: 'var(--clr-accent-dim)',
    border: '1px solid var(--clr-accent)',
    color: 'var(--clr-accent)',
    borderRadius: 'var(--radius)',
    padding: '6px 14px',
    fontSize: '0.85rem',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'background var(--transition)',
  },
  badge: {
    background: 'var(--clr-accent)',
    color: '#000',
    borderRadius: '50%',
    width: 18,
    height: 18,
    fontSize: '0.72rem',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  authBtn: {
    background: 'transparent',
    border: '1px solid #333',
    color: 'var(--clr-text-muted)',
    borderRadius: 'var(--radius)',
    padding: '6px 14px',
    fontSize: '0.82rem',
    transition: 'all var(--transition)',
  },
  userChip: {
    fontSize: '0.8rem',
    color: 'var(--clr-success)',
    border: '1px solid var(--clr-success)',
    borderRadius: 'var(--radius)',
    padding: '4px 12px',
  },
};

export default function Navbar() {
  const { cartCount } = useCart();
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  // Active-link style helper for NavLink
  const linkStyle = ({ isActive }) =>
    isActive ? { ...styles.link, ...styles.activeLink } : styles.link;

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        {/* Brand */}
        <Link to="/" style={styles.logo}>ShopZone</Link>

        {/* Navigation links */}
        <ul style={styles.links}>
          <li><NavLink to="/"        style={linkStyle} end>Home</NavLink></li>
          <li><NavLink to="/shop"    style={linkStyle}>Shop</NavLink></li>
          <li><NavLink to="/contact" style={linkStyle}>Contact</NavLink></li>

          {/* Cart button with badge */}
          <li>
            
<button style={styles.cartBtn} onClick={() => navigate('/cart')}>
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/>
    <circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
  {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
</button>
          </li>

          {/* Auth status */}
          <li>
            {isLoggedIn ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={styles.userChip}>👤 {user.name}</span>
                <button style={styles.authBtn} onClick={logout}>Logout</button>
              </div>
            ) : (
              <button style={styles.authBtn} onClick={() => navigate('/login')}>
                Login
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}