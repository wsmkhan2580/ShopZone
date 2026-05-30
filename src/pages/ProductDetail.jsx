import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { formatCurrency } from '../utils/FormatCurrency';

const styles = {
  page: { maxWidth: 1000, margin: '0 auto', padding: '48px 24px' },
  back: {
    background: 'none',
    border: 'none',
    color: 'var(--clr-text-muted)',
    fontSize: '0.88rem',
    marginBottom: 32,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 48,
    alignItems: 'start',
  },
  imgBox: {
    background: '#fff',
    borderRadius: 'var(--radius)',
    padding: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 340,
  },
  img: { maxHeight: 320, objectFit: 'contain' },
  category: {
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    color: 'var(--clr-accent)',
    fontWeight: 600,
    marginBottom: 10,
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
    lineHeight: 1.1,
    marginBottom: 14,
  },
  brand: { color: 'var(--clr-text-muted)', fontSize: '0.88rem', marginBottom: 18 },
  desc: { color: 'var(--clr-text-muted)', lineHeight: 1.8, marginBottom: 24, fontSize: '0.95rem' },
  price: {
    fontFamily: 'var(--font-display)',
    fontSize: '2.4rem',
    color: 'var(--clr-accent)',
    marginBottom: 10,
  },
  discount: {
    fontSize: '0.82rem',
    color: 'var(--clr-success)',
    marginBottom: 24,
  },
  stock: { fontSize: '0.82rem', color: 'var(--clr-text-muted)', marginBottom: 24 },
  addBtn: {
    width: '100%',
    background: 'var(--clr-accent)',
    color: '#000',
    border: 'none',
    borderRadius: 'var(--radius)',
    padding: '14px',
    fontSize: '1rem',
    fontWeight: 700,
    letterSpacing: '0.5px',
    cursor: 'pointer',
    transition: 'opacity var(--transition)',
    marginBottom: 12,
  },
  addedBtn: {
    width: '100%',
    background: 'var(--clr-success)',
    color: '#000',
    border: 'none',
    borderRadius: 'var(--radius)',
    padding: '14px',
    fontSize: '1rem',
    fontWeight: 700,
    cursor: 'default',
    marginBottom: 12,
  },
  viewCartBtn: {
    width: '100%',
    background: 'transparent',
    color: 'var(--clr-text)',
    border: '1px solid #333',
    borderRadius: 'var(--radius)',
    padding: '13px',
    fontSize: '0.95rem',
    fontWeight: 500,
    cursor: 'pointer',
  },
  tags: { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 },
  tag: {
    fontSize: '0.75rem',
    padding: '4px 10px',
    borderRadius: 100,
    background: 'var(--clr-surface-2)',
    color: 'var(--clr-text-muted)',
  },
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded]     = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  // Fetch single product by ID
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res  = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setActiveImg(0);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', padding: 80, color: 'var(--clr-text-muted)' }}>Loading…</div>;
  if (!product) return <div style={{ textAlign: 'center', padding: 80, color: 'var(--clr-danger)' }}>Product not found.</div>;

  const images = product.images?.length ? product.images : [product.thumbnail];

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={styles.page}>
      <button style={styles.back} onClick={() => navigate(-1)}>← Back</button>

      <div style={styles.layout}>
        {/* Image panel */}
        <div>
          <div style={styles.imgBox}>
            <img src={images[activeImg]} alt={product.title} style={styles.img} />
          </div>
          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
              {images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  onClick={() => setActiveImg(i)}
                  style={{
                    width: 64, height: 64, objectFit: 'contain',
                    background: '#fff', borderRadius: 8, cursor: 'pointer', padding: 4,
                    border: i === activeImg ? '2px solid var(--clr-accent)' : '2px solid transparent',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info panel */}
        <div>
          <p style={styles.category}>{product.category}</p>
          <h1 style={styles.title}>{product.title}</h1>
          <p style={styles.brand}>By <strong>{product.brand || 'ShopZone Brand'}</strong></p>

          {product.tags?.length > 0 && (
            <div style={styles.tags}>
              {product.tags.map(t => <span key={t} style={styles.tag}>{t}</span>)}
            </div>
          )}

          <p style={styles.desc}>{product.description}</p>

          <p style={styles.price}>{formatCurrency(product.price)}</p>
          {product.discountPercentage > 0 && (
            <p style={styles.discount}>🎉 Save {product.discountPercentage.toFixed(1)}% today</p>
          )}
          <p style={styles.stock}>📦 Stock: {product.stock} units available</p>

          <button style={added ? styles.addedBtn : styles.addBtn} onClick={handleAdd}>
            {added ? '✓ Added to Cart!' : 'Add to Cart'}
          </button>
          <button style={styles.viewCartBtn} onClick={() => navigate('/cart')}>
            View Cart
          </button>
        </div>
      </div>
    </div>
  );
}