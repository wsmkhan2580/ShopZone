import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Context Providers
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Contact from './pages/Contact';

export default function App() {
  return (
    /**
     * Provider nesting order:
     *  AuthProvider wraps CartProvider so CartContext can
     *  optionally read auth state in the future.
     */
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <main style={{ minHeight: 'calc(100vh - 64px - 72px)', paddingTop: 'var(--nav-h)' }}>
            <Routes>
              {/* Public routes */}
              <Route path="/"            element={<Home />} />
              <Route path="/shop"        element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart"        element={<Cart />} />
              <Route path="/login"       element={<Login />} />
              <Route path="/contact"     element={<Contact />} />

              {/* Protected route — requires auth */}
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}