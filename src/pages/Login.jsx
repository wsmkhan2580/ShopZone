import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const styles = {
  page: {
    minHeight: '80vh', display: 'flex',
    alignItems: 'center', justifyContent: 'center', padding: 24,
  },
  card: {
    background: 'var(--clr-surface)',
    border: '1px solid #222',
    borderRadius: 14,
    padding: '48px 40px',
    width: '100%', maxWidth: 420,
    textAlign: 'center',
  },
  logo: {
    fontFamily: 'var(--font-display)',
    fontSize: '2.2rem', color: 'var(--clr-accent)',
    letterSpacing: 3, marginBottom: 8,
  },
  tagline: { color: 'var(--clr-text-muted)', fontSize: '0.9rem', marginBottom: 36 },
  guestBtn: {
    width: '100%',
    background: 'var(--clr-accent)',
    color: '#000',
    border: 'none', borderRadius: 'var(--radius)',
    padding: '14px', fontSize: '1rem', fontWeight: 700,
    cursor: 'pointer',
    marginBottom: 14,
    transition: 'opacity var(--transition)',
  },
  divider: {
    display: 'flex', alignItems: 'center', gap: 12,
    color: 'var(--clr-text-muted)', fontSize: '0.8rem', marginBottom: 14,
  },
  line: { flex: 1, height: 1, background: '#2a2a2a' },
  note: { color: 'var(--clr-text-muted)', fontSize: '0.8rem', lineHeight: 1.6 },
  redirectNote: {
    marginTop: 28, fontSize: '0.82rem',
    color: 'var(--clr-text-muted)',
    background: 'var(--clr-accent-dim)',
    border: '1px solid rgba(240,192,64,0.2)',
    borderRadius: 8, padding: '10px 14px',
  },
};

export default function Login() {
  const { isLoggedIn, loginAsGuest } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();

  // Where to redirect after login (default: home)
  const from = location.state?.from?.pathname || '/';

  // If already logged in, bounce to destination
  useEffect(() => {
    if (isLoggedIn) navigate(from, { replace: true });
  }, [isLoggedIn, navigate, from]);

  const handleGuestLogin = () => {
    loginAsGuest();
    // Navigation happens automatically via the useEffect above
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>ShopZone</div>
        <p style={styles.tagline}>Sign in to continue shopping</p>

        <button
          style={styles.guestBtn}
          onClick={handleGuestLogin}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          👤 Login as Guest
        </button>

        <div style={styles.divider}>
          <span style={styles.line} />
          <span>This is a demo app</span>
          <span style={styles.line} />
        </div>

        <p style={styles.note}>
          No account creation required. Click "Login as Guest" to instantly
          access all features including checkout.
        </p>

        {/* Tell the user where they'll be redirected */}
        {from !== '/' && (
          <p style={styles.redirectNote}>
            🔒 You were redirected here from <strong>{from}</strong>. You'll be sent back after login.
          </p>
        )}
      </div>
    </div>
  );
}