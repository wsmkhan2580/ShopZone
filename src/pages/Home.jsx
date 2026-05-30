import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  hero: {
    minHeight: '88vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '0 24px',
    position: 'relative',
    overflow: 'hidden',
  },
  grain: {
    // Subtle noise texture via SVG data-URI for depth
    position: 'absolute', inset: 0, opacity: 0.04,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
    pointerEvents: 'none',
  },
  eyebrow: {
    fontFamily: 'var(--font-display)',
    fontSize: '0.85rem',
    letterSpacing: '6px',
    color: 'var(--clr-accent)',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  headline: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(3rem, 9vw, 7.5rem)',
    lineHeight: 0.95,
    letterSpacing: '-1px',
    marginBottom: 28,
  },
  sub: {
    maxWidth: 520,
    fontSize: '1.05rem',
    color: 'var(--clr-text-muted)',
    marginBottom: 44,
    lineHeight: 1.7,
  },
  ctaRow: { display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' },
  ctaPrimary: {
    background: 'var(--clr-accent)',
    color: '#000',
    padding: '14px 36px',
    borderRadius: 'var(--radius)',
    fontWeight: 700,
    fontSize: '1rem',
    letterSpacing: '0.5px',
    transition: 'opacity var(--transition)',
    display: 'inline-block',
  },
  ctaSecondary: {
    background: 'transparent',
    color: 'var(--clr-text)',
    padding: '13px 36px',
    borderRadius: 'var(--radius)',
    fontWeight: 500,
    fontSize: '1rem',
    border: '1px solid #333',
    display: 'inline-block',
    transition: 'border-color var(--transition)',
  },
  // Feature strip
  strip: {
    display: 'flex',
    justifyContent: 'center',
    gap: 40,
    flexWrap: 'wrap',
    padding: '60px 24px',
    borderTop: '1px solid #1a1a1a',
  },
  featureBox: {
    textAlign: 'center',
    maxWidth: 200,
  },
  featureIcon: { fontSize: '2rem', marginBottom: 12 },
  featureTitle: { fontWeight: 600, marginBottom: 6 },
  featureSub: { fontSize: '0.85rem', color: 'var(--clr-text-muted)' },
};

const features = [
  { icon: '⚡', title: 'Fast Shipping', sub: 'Free delivery on orders over $50.' },
  { icon: '🔒', title: 'Secure Checkout', sub: 'Your data is always protected.' },
  { icon: '♻️', title: 'Easy Returns', sub: '30-day hassle-free returns.' },
  { icon: '🎁', title: 'Loyalty Rewards', sub: 'Earn points on every purchase.' },
];

export default function Home() {
  return (
    <>
      <section style={styles.hero}>
        <div style={styles.grain} aria-hidden />
        <p style={styles.eyebrow}>New Arrivals · Summer 2025</p>
        <h1 style={styles.headline}>
          Shop <span style={{ color: 'var(--clr-accent)' }}>Without</span><br />Limits.
        </h1>
        <p style={styles.sub}>
          Discover thousands of products — from electronics to fashion — curated for
          the modern buyer. Quality you trust, prices you'll love.
        </p>
        <div style={styles.ctaRow}>
          <Link to="/shop" style={styles.ctaPrimary}>Browse Products</Link>
          <Link to="/contact" style={styles.ctaSecondary}>Get in Touch</Link>
        </div>
      </section>

      {/* Feature strip */}
      <section style={styles.strip}>
        {features.map(f => (
          <div key={f.title} style={styles.featureBox}>
            <div style={styles.featureIcon}>{f.icon}</div>
            <div style={styles.featureTitle}>{f.title}</div>
            <div style={styles.featureSub}>{f.sub}</div>
          </div>
        ))}
      </section>
    </>
  );
}