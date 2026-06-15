import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-primary">
      {/* Subtle AI dot-grid texture */}
      <div
        className="fixed inset-0 z-0 pointer-events-none ai-texture opacity-60"
        aria-hidden="true"
      />

      <Navbar />

      <main className="flex-grow relative z-10">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
