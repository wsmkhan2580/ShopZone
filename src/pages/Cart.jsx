import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { formatCurrency } from '../utils/FormatCurrency';

const styles = {
  page: { maxWidth: 860, margin: '0 auto', padding: '48px 24px' },
  title: { fontFamily: 'var(--font-display)', fontSize: '2.6rem', marginBottom: 32 },
  empty: {
    textAlign: 'center', padding: '80px 0',
    color: 'var(--clr-text-muted)', fontSize: '1rem',
  },
  table: { width: '100%', borderCollapse: 'collapse', marginBottom: 32 },
  th: {
    textAlign: 'left', padding: '10px 14px',
    fontSize: '0.75rem', textTransform: 'uppercase',
    letterSpacing: '1px', color: 'var(--clr-text-muted)',
    borderBottom: '1px solid #222',
  },
  td: { padding: '14px', borderBottom: '1px solid #1a1a1a', verticalAlign: 'middle' },
  imgThumb: {
    width: 56, height: 56, objectFit: 'contain',
    background: '#fff', borderRadius: 8, padding: 4,
  },
  productName: { fontWeight: 500, fontSize: '0.95rem' },
  qtyRow: { display: 'flex', alignItems: 'center', gap: 10 },
  qtyBtn: {
    width: 28, height: 28, borderRadius: 6,
    background: 'var(--clr-surface-2)', color: 'var(--clr-text)',
    border: 'none', fontSize: '1rem', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  qtyNum: { minWidth: 24, textAlign: 'center', fontWeight: 600 },
  removeBtn: {
    background: 'none', border: 'none',
    color: 'var(--clr-danger)', cursor: 'pointer', fontSize: '1rem',
  },
  summary: {
    background: 'var(--clr-surface)',
    border: '1px solid #222',
    borderRadius: 'var(--radius)',
    padding: '24px',
    maxWidth: 360,
    marginLeft: 'auto',
  },
  summaryRow: {
    display: 'flex', justifyContent: 'space-between',
    marginBottom: 14, fontSize: '0.95rem',
  },
  totalRow: {
    display: 'flex', justifyContent: 'space-between',
    fontFamily: 'var(--font-display)', fontSize: '1.5rem',
    borderTop: '1px solid #2a2a2a', paddingTop: 14, marginTop: 4,
    color: 'var(--clr-accent)',
  },
  checkoutBtn: {
    marginTop: 20, width: '100%',
    background: 'var(--clr-accent)', color: '#000',
    border: 'none', borderRadius: 'var(--radius)',
    padding: '13px', fontWeight: 700, fontSize: '1rem',
    cursor: 'pointer',
  },
  clearBtn: {
    marginTop: 10, width: '100%',
    background: 'transparent', color: 'var(--clr-text-muted)',
    border: '1px solid #333', borderRadius: 'var(--radius)',
    padding: '11px', fontSize: '0.88rem', cursor: 'pointer',
  },
};

export default function Cart() {
  const { items, cartTotal, removeItem, increment, decrement, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div style={styles.page}>
        <h1 style={styles.title}>Your Cart</h1>
        <div style={styles.empty}>
          <p style={{ fontSize: '3rem', marginBottom: 16 }}>🛒</p>
          <p>Your cart is empty.</p>
          <Link to="/shop" style={{ color: 'var(--clr-accent)', marginTop: 12, display: 'inline-block' }}>
            Continue Shopping →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Your Cart</h1>

      {/* Line items table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Product</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Qty</th>
            <th style={styles.th}>Subtotal</th>
            <th style={styles.th}></th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td style={styles.td}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <img src={item.thumbnail} alt={item.title} style={styles.imgThumb} />
                  <span style={styles.productName}>{item.title}</span>
                </div>
              </td>
              <td style={styles.td}>{formatCurrency(item.price)}</td>
              <td style={styles.td}>
                <div style={styles.qtyRow}>
                  <button style={styles.qtyBtn} onClick={() => decrement(item.id)}>−</button>
                  <span style={styles.qtyNum}>{item.qty}</span>
                  <button style={styles.qtyBtn} onClick={() => increment(item.id)}>+</button>
                </div>
              </td>
              <td style={styles.td}>{formatCurrency(item.price * item.qty)}</td>
              <td style={styles.td}>
                <button style={styles.removeBtn} onClick={() => removeItem(item.id)} title="Remove">✕</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Order summary */}
      <div style={styles.summary}>
        <div style={styles.summaryRow}>
          <span>Subtotal</span>
          <span>{formatCurrency(cartTotal)}</span>
        </div>
        <div style={styles.summaryRow}>
          <span>Shipping</span>
          <span style={{ color: 'var(--clr-success)' }}>Free</span>
        </div>
        <div style={styles.totalRow}>
          <span>Total</span>
          <span>{formatCurrency(cartTotal)}</span>
        </div>
        <button style={styles.checkoutBtn} onClick={() => navigate('/checkout')}>
          Proceed to Checkout
        </button>
        <button style={styles.clearBtn} onClick={clearCart}>Clear Cart</button>
      </div>
    </div>
  );
}