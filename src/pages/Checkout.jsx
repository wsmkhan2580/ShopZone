import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { formatCurrency } from '../utils/FormatCurrency';

const field = {
  label: { fontSize: '0.82rem', color: 'var(--clr-text-muted)', marginBottom: 6, display: 'block' },
  input: {
    width: '100%', background: 'var(--clr-surface-2)',
    border: '1px solid #2a2a2a', borderRadius: 8,
    color: 'var(--clr-text)', padding: '11px 14px',
    fontSize: '0.9rem', fontFamily: 'var(--font-body)',
    marginBottom: 18, outline: 'none',
  },
};

const styles = {
  page: { maxWidth: 960, margin: '0 auto', padding: '48px 24px' },
  title: { fontFamily: 'var(--font-display)', fontSize: '2.6rem', marginBottom: 32 },
  grid: { display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40, alignItems: 'start' },
  section: {
    background: 'var(--clr-surface)', border: '1px solid #222',
    borderRadius: 'var(--radius)', padding: '28px',
  },
  sectionTitle: { fontWeight: 600, marginBottom: 20, fontSize: '1rem' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 },
  placeBtn: {
    marginTop: 24, width: '100%',
    background: 'var(--clr-accent)', color: '#000',
    border: 'none', borderRadius: 'var(--radius)',
    padding: '14px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
  },
  successBox: {
    textAlign: 'center', padding: '60px 24px',
    background: 'var(--clr-surface)', borderRadius: 14,
    border: '1px solid #222',
  },
  successIcon: { fontSize: '3.5rem', marginBottom: 16 },
  successTitle: { fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: 10 },
  orderLine: { color: 'var(--clr-text-muted)', fontSize: '0.9rem', marginBottom: 24 },
  contBtn: {
    background: 'var(--clr-accent)', color: '#000',
    border: 'none', borderRadius: 'var(--radius)',
    padding: '12px 32px', fontWeight: 700, cursor: 'pointer',
  },
};

export default function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);
  const [orderId] = useState(() => `SZ-${Math.random().toString(36).slice(2,8).toUpperCase()}`);

  const handlePlace = () => {
    clearCart();
    setPlaced(true);
  };

  if (placed) {
    return (
      <div style={styles.page}>
        <div style={styles.successBox}>
          <div style={styles.successIcon}>🎉</div>
          <h2 style={styles.successTitle}>Order Placed!</h2>
          <p style={styles.orderLine}>Order ID: <strong style={{ color: 'var(--clr-accent)' }}>{orderId}</strong></p>
          <p style={{ ...styles.orderLine, marginBottom: 32 }}>
            Thanks, {user?.name}! Your order will arrive within 3–5 business days.
          </p>
          <button style={styles.contBtn} onClick={() => navigate('/shop')}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Checkout</h1>

      <div style={styles.grid}>
        {/* Left: shipping form */}
        <div>
          <div style={styles.section}>
            <p style={styles.sectionTitle}>📦 Shipping Information</p>

            <div style={styles.row}>
              <div>
                <label style={field.label}>First Name</label>
                <input style={field.input} defaultValue={user?.name || ''} />
              </div>
              <div>
                <label style={field.label}>Last Name</label>
                <input style={field.input} />
              </div>
            </div>

            <label style={field.label}>Email</label>
            <input style={field.input} defaultValue={user?.email || ''} />

            <label style={field.label}>Address</label>
            <input style={field.input} placeholder="123 Main St" />

            <div style={styles.row}>
              <div>
                <label style={field.label}>City</label>
                <input style={field.input} />
              </div>
              <div>
                <label style={field.label}>ZIP Code</label>
                <input style={field.input} />
              </div>
            </div>
          </div>

          {/* Payment (mock) */}
          <div style={{ ...styles.section, marginTop: 24 }}>
            <p style={styles.sectionTitle}>💳 Payment Details</p>
            <label style={field.label}>Card Number</label>
            <input style={field.input} placeholder="4242 4242 4242 4242" maxLength={19} />
            <div style={styles.row}>
              <div>
                <label style={field.label}>Expiry</label>
                <input style={field.input} placeholder="MM / YY" />
              </div>
              <div>
                <label style={field.label}>CVV</label>
                <input style={field.input} placeholder="···" type="password" maxLength={3} />
              </div>
            </div>
          </div>
        </div>

        {/* Right: order summary */}
        <div style={styles.section}>
          <p style={styles.sectionTitle}>🧾 Order Summary</p>
          {items.map(i => (
            <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: '0.88rem' }}>
              <span style={{ color: 'var(--clr-text-muted)', maxWidth: 200 }}>{i.title} × {i.qty}</span>
              <span>{formatCurrency(i.price * i.qty)}</span>
            </div>
          ))}
          <div style={{ borderTop: '1px solid #222', marginTop: 16, paddingTop: 14, display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--clr-accent)' }}>
            <span>Total</span>
            <span>{formatCurrency(cartTotal)}</span>
          </div>
          <button style={styles.placeBtn} onClick={handlePlace}>
            Place Order
          </button>
          <p style={{ textAlign: 'center', marginTop: 12, fontSize: '0.75rem', color: 'var(--clr-text-muted)' }}>
            🔒 This is a demo — no real payment is processed.
          </p>
        </div>
      </div>
    </div>
  );
}