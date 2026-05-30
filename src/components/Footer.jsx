import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  footer: {
    borderTop: '1px solid #1a1a1a',
    padding: '20px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
  },
  brand: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.2rem',
    color: 'var(--clr-accent)',
    letterSpacing: 2,
  },
  links: {
    display: 'flex',
    gap: 20,
    listStyle: 'none',
    fontSize: '0.8rem',
    color: 'var(--clr-text-muted)',
  },
  copy: { fontSize: '0.78rem', color: '#444' },
};

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <span style={styles.brand}>ShopZone</span>
      <ul style={styles.links}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      <span style={styles.copy}>© {new Date().getFullYear()} ShopZone. All rights reserved.</span>
    </footer>
  );
}