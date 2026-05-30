import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const styles = {
  page: { padding: '48px 24px', maxWidth: 1200, margin: '0 auto' },
  header: { marginBottom: 36 },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    letterSpacing: 1,
  },
  subtitle: { color: 'var(--clr-text-muted)', marginTop: 8 },
  controls: {
    display: 'flex',
    gap: 14,
    marginBottom: 32,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    minWidth: 220,
    background: 'var(--clr-surface)',
    border: '1px solid #2a2a2a',
    borderRadius: 'var(--radius)',
    color: 'var(--clr-text)',
    padding: '10px 16px',
    fontSize: '0.9rem',
    fontFamily: 'var(--font-body)',
    outline: 'none',
  },
  select: {
    background: 'var(--clr-surface)',
    border: '1px solid #2a2a2a',
    borderRadius: 'var(--radius)',
    color: 'var(--clr-text)',
    padding: '10px 16px',
    fontSize: '0.9rem',
    fontFamily: 'var(--font-body)',
    cursor: 'pointer',
    outline: 'none',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
    gap: 20,
  },
  loading: {
    textAlign: 'center',
    padding: '80px 0',
    fontSize: '1.1rem',
    color: 'var(--clr-text-muted)',
  },
  spinner: {
    display: 'inline-block',
    width: 40,
    height: 40,
    border: '3px solid #222',
    borderTop: '3px solid var(--clr-accent)',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    marginBottom: 16,
  },
  count: { fontSize: '0.85rem', color: 'var(--clr-text-muted)', marginBottom: 20 },
};

// Inject spinner keyframe once
const spinnerStyle = document.createElement('style');
spinnerStyle.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
document.head.appendChild(spinnerStyle);

export default function Shop() {
  const [products, setProducts]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [search, setSearch]       = useState('');
  const [category, setCategory]   = useState('all');

  // Fetch all products from dummyjson
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const res  = await fetch('https://dummyjson.com/products?limit=100');
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Derive unique categories for filter dropdown
  const categories = ['all', ...new Set(products.map(p => p.category))];

  // Client-side filtering
  const filtered = products.filter(p => {
    const matchesSearch   = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || p.category === category;
    return matchesSearch && matchesCategory;
  });

  if (loading) return (
    <div style={{ ...styles.loading, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={styles.spinner} />
      Loading products…
    </div>
  );

  if (error) return <div style={{ ...styles.loading, color: 'var(--clr-danger)' }}>{error}</div>;

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>The Shop</h1>
        <p style={styles.subtitle}>Browse our full collection of premium products.</p>
      </div>

      {/* Search + Filter controls */}
      <div style={styles.controls}>
        <input
          style={styles.searchInput}
          type="text"
          placeholder="Search products…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          style={styles.select}
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          {categories.map(c => (
            <option key={c} value={c}>
              {c === 'all' ? 'All Categories' : c}
            </option>
          ))}
        </select>
      </div>

      <p style={styles.count}>{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>

      <div style={styles.grid}>
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ ...styles.count, textAlign: 'center', marginTop: 60 }}>
          No products match your search. Try a different term.
        </p>
      )}
    </div>
  );
}