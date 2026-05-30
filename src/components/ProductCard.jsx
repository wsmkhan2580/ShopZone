import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { formatCurrency } from '../utils/FormatCurrency';

const styles = {
  card: {
    background: 'var(--clr-surface)',
    border: '1px solid #222',
    borderRadius: 'var(--radius)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform var(--transition), box-shadow var(--transition)',
    cursor: 'pointer',
  },
  imgWrap: {
    height: 200,
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  img: { maxHeight: '100%', objectFit: 'contain', padding: 12 },
  body: { padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 6 },
  category: {
    fontSize: '0.72rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: 'var(--clr-accent)',
    fontWeight: 600,
  },
  title: { fontSize: '0.95rem', fontWeight: 500, lineHeight: 1.4 },
  rating: { fontSize: '0.8rem', color: 'var(--clr-text-muted)' },
  footer: {
    padding: '10px 16px 14px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #1e1e1e',
  },
  price: { fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--clr-accent)' },
  addBtn: {
    background: 'var(--clr-accent)',
    color: '#000',
    border: 'none',
    borderRadius: 8,
    padding: '7px 14px',
    fontSize: '0.82rem',
    fontWeight: 700,
    transition: 'opacity var(--transition)',
  },
  addedBtn: {
    background: 'var(--clr-success)',
    color: '#000',
    border: 'none',
    borderRadius: 8,
    padding: '7px 14px',
    fontSize: '0.82rem',
    fontWeight: 700,
  },
};

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation(); // don't navigate when clicking the button
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const stars = '★'.repeat(Math.round(product.rating)) + '☆'.repeat(5 - Math.round(product.rating));

  return (
    <div
      style={styles.card}
      onClick={() => navigate(`/product/${product.id}`)}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.4)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={styles.imgWrap}>
        <img src={product.thumbnail} alt={product.title} style={styles.img} loading="lazy" />
      </div>

      <div style={styles.body}>
        <span style={styles.category}>{product.category}</span>
        <p style={styles.title}>{product.title}</p>
        <span style={styles.rating}>{stars} ({product.rating})</span>
      </div>

      <div style={styles.footer}>
        <span style={styles.price}>{formatCurrency(product.price)}</span>
        <button
          style={added ? styles.addedBtn : styles.addBtn}
          onClick={handleAdd}
        >
          {added ? '✓ Added' : '+ Cart'}
        </button>
      </div>
    </div>
  );
}