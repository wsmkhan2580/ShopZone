import React, { useState } from 'react';

const field = {
  label: { fontSize: '0.82rem', color: 'var(--clr-text-muted)', marginBottom: 6, display: 'block' },
  input: {
    width: '100%', background: 'var(--clr-surface-2)',
    border: '1px solid #2a2a2a', borderRadius: 8,
    color: 'var(--clr-text)', padding: '11px 14px',
    fontSize: '0.9rem', fontFamily: 'var(--font-body)', outline: 'none', marginBottom: 18,
  },
  textarea: {
    width: '100%', background: 'var(--clr-surface-2)',
    border: '1px solid #2a2a2a', borderRadius: 8,
    color: 'var(--clr-text)', padding: '11px 14px',
    fontSize: '0.9rem', fontFamily: 'var(--font-body)', outline: 'none',
    resize: 'vertical', minHeight: 120, marginBottom: 18,
  },
};

const styles = {
  page: {
    maxWidth: 640, margin: '0 auto', padding: '72px 24px',
  },
  eyebrow: { color: 'var(--clr-accent)', fontSize: '0.78rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 12 },
  title: { fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,5vw,3rem)', marginBottom: 14 },
  sub: { color: 'var(--clr-text-muted)', marginBottom: 44, fontSize: '0.95rem', lineHeight: 1.7 },
  submitBtn: {
    width: '100%', background: 'var(--clr-accent)', color: '#000',
    border: 'none', borderRadius: 'var(--radius)',
    padding: '14px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
  },
  successMsg: {
    textAlign: 'center', padding: '32px',
    background: 'rgba(82,201,122,0.08)', borderRadius: 12,
    border: '1px solid rgba(82,201,122,0.2)', color: 'var(--clr-success)',
  },
};

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div style={styles.page}>
      <p style={styles.eyebrow}>Get In Touch</p>
      <h1 style={styles.title}>Contact Us</h1>
      <p style={styles.sub}>
        Have a question, feedback, or just want to say hello? Fill out the form below
        and our team will get back to you within 24 hours.
      </p>

      {sent ? (
        <div style={styles.successMsg}>
          <p style={{ fontSize: '2rem', marginBottom: 12 }}>✅</p>
          <p style={{ fontWeight: 600, marginBottom: 6 }}>Message received!</p>
          <p style={{ fontSize: '0.88rem', color: 'var(--clr-text-muted)' }}>
            Thanks for reaching out. We'll be in touch soon.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label style={field.label}>Your Name</label>
          <input style={field.input} placeholder="Jane Doe" required />

          <label style={field.label}>Email Address</label>
          <input style={field.input} type="email" placeholder="jane@example.com" required />

          <label style={field.label}>Subject</label>
          <input style={field.input} placeholder="Order inquiry, partnership, etc." />

          <label style={field.label}>Message</label>
          <textarea style={field.textarea} placeholder="How can we help you?" required />

          <button type="submit" style={styles.submitBtn}>Send Message →</button>
        </form>
      )}
    </div>
  );
}