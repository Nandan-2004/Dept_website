import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '/', sectionId: 'hero' },
  { label: 'About', href: '/', sectionId: 'about' },
  { label: 'Faculty', href: '/', sectionId: 'faculty' },
  { label: 'Gallery', href: '/', sectionId: 'gallery' },
  { label: 'Projects', href: '/projects' },
  { label: 'Alumni', href: '/alumni' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();
  const prevY = useRef(0);

  // Scroll spy to update active section
  useEffect(() => {
    if (location.pathname !== '/') return;

    const observers: IntersectionObserver[] = [];
    
    navLinks.forEach(link => {
      if (!link.sectionId) return;
      const el = document.getElementById(link.sectionId);
      if (el) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(link.sectionId);
            }
          },
          { threshold: 0.3 }
        );
        observer.observe(el);
        observers.push(observer);
      }
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      prevY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled
            ? 'rgba(244, 247, 252, 0.62)'
            : 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(84px) saturate(400%) brightness(1.1) contrast(0.96)',
          WebkitBackdropFilter: 'blur(84px) saturate(400%) brightness(1.1) contrast(0.96)',
          borderBottom: scrolled
            ? '1px solid rgba(180,200,230,0.28)'
            : '1px solid rgba(255,255,255,0.55)',
          boxShadow: scrolled
            ? '0 8px 80px rgba(0,0,0,0.06), 0 2px 20px rgba(0,0,0,0.04), 0 1px 0 rgba(255,255,255,0.5), inset 0 1px 0 rgba(255,255,255,1)'
            : '0 2px 40px rgba(0,0,0,0.015), inset 0 1px 0 rgba(255,255,255,1)',
          transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Frosted grain texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
          }}
        />
        {/* Iridescent shimmer top edge */}
        <div
          className="absolute top-0 left-0 right-0 h-[1.5px] pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 15%, rgba(255,255,255,1) 35%, rgba(210,228,255,0.8) 55%, rgba(255,255,255,0.4) 75%, transparent 100%)',
          }}
        />
        {/* Bottom glow edge */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[1px] pointer-events-none"
          style={{
            background: scrolled
              ? 'linear-gradient(90deg, transparent, rgba(150,180,230,0.3) 40%, rgba(150,180,230,0.3) 60%, transparent)'
              : 'transparent',
            opacity: scrolled ? 1 : 0,
            transition: 'opacity 0.8s ease',
          }}
        />
        <div className="w-full px-3 md:pl-5 md:pr-10 py-[8px] md:py-[12px] flex items-center justify-between">
          {/* Left block: Logos + Text */}
          <div className="flex items-center min-w-0">
            {/* === Mobile layout === */}
            <Link to="/" className="md:hidden flex items-center gap-2 min-w-0">
              {/* MCE block */}
              <img
                src="/images/mce logo.webp"
                alt="Malnad College of Engineering"
                className="h-[28px] w-auto object-contain flex-shrink-0"
                style={{ mixBlendMode: 'multiply' }}
              />
              <div className="flex flex-col leading-tight min-w-0">
                <span className="font-sans font-bold text-[10px] text-[#1a1f3c] tracking-tight leading-snug">
                  Malnad College of Engineering
                </span>
                <span className="font-sans font-normal text-[7.5px] text-[#4a4a5a] tracking-wide leading-snug">
                  An Autonomous Institution
                </span>
              </div>

              {/* Divider */}
              <div
                className="self-stretch mx-1 flex-shrink-0"
                style={{
                  width: '1px',
                  background: 'linear-gradient(to bottom, transparent, rgba(26,31,60,0.18) 25%, rgba(26,31,60,0.28) 50%, rgba(26,31,60,0.18) 75%, transparent)',
                  minHeight: '24px',
                }}
              />

              {/* AIML block */}
              <div
                className="h-[28px] w-[28px] rounded-full flex-shrink-0"
                style={{ overflow: 'hidden', background: 'white' }}
              >
                <img
                  src="/images/aiml logo2 (1).webp?v=2"
                  alt="AIML Department"
                  className="h-[28px] w-[28px] object-cover"
                  style={{ mixBlendMode: 'multiply' }}
                />
              </div>
              <div className="flex flex-col leading-tight min-w-0">
                <span className="font-sans font-light text-[7px] text-[#6b7280] tracking-[0.1em] uppercase leading-snug">
                  Department of
                </span>
                <span className="font-sans font-bold text-[9px] text-[#1a1f3c] tracking-tight leading-snug">
                  CSE — AI &amp; ML
                </span>
              </div>
            </Link>

            {/* === Desktop layout === */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/" className="flex items-center gap-3 group">
                <img
                  src="/images/mce logo.webp"
                  alt="Malnad College of Engineering"
                  className="h-[64px] w-auto object-contain flex-shrink-0"
                  style={{ mixBlendMode: 'multiply' }}
                />
                <div className="flex flex-col leading-tight">
                  <span className="font-sans font-bold text-[14px] text-[#1a1f3c] tracking-tight leading-snug">
                    Malnad College of Engineering
                  </span>
                  <span className="font-sans font-normal text-[10.5px] text-[#4a4a5a] tracking-wide leading-snug">
                    An Autonomous Institution
                  </span>
                  <span className="font-sans font-semibold text-[10px] text-[#3a3a4a] tracking-widest uppercase leading-snug">
                    Hassan – 573202, Karnataka
                  </span>
                </div>
              </Link>

              {/* Premium vertical divider */}
              <div
                className="mx-3 self-stretch"
                style={{
                  width: '1px',
                  background: 'linear-gradient(to bottom, transparent, rgba(26,31,60,0.18) 25%, rgba(26,31,60,0.28) 50%, rgba(26,31,60,0.18) 75%, transparent)',
                  minHeight: '36px',
                }}
              />

              {/* Department name with AIML logo */}
              <div className="flex items-center gap-2.5">
                <div
                  className="h-[54px] w-[54px] rounded-full flex-shrink-0"
                  style={{ overflow: 'hidden', background: 'white' }}
                >
                  <img
                    src="/images/aiml logo2 (1).webp?v=2"
                    alt="AIML Department"
                    className="h-[54px] w-[54px] object-cover"
                    style={{ mixBlendMode: 'multiply' }}
                  />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-sans font-light text-[10.5px] text-[#6b7280] tracking-[0.12em] uppercase mb-0.5">
                    Department of
                  </span>
                  <span className="font-sans font-bold text-[14px] text-[#1a1f3c] tracking-tight leading-snug">
                    Computer Science &amp; Engineering
                  </span>
                  <span className="font-sans font-bold text-[14px] text-[#1a1f3c] tracking-tight leading-snug">
                    Artificial Intelligence &amp; Machine Learning
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-[5px] p-2 flex-shrink-0"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="w-5 h-[1.5px] bg-primary block origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-5 h-[1.5px] bg-primary block"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="w-5 h-[1.5px] bg-primary block origin-center"
            />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = 
                (location.pathname === '/' && activeSection === link.sectionId) ||
                (location.pathname === '/alumni' && link.href === '/alumni') ||
                (location.pathname === '/projects' && link.href === '/projects');

              return (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={(e) => {
                    if (location.pathname === '/' && link.sectionId) {
                      e.preventDefault();
                      const el = document.getElementById(link.sectionId);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                  className={`relative py-1 font-serif italic text-[18px] tracking-[0.02em] transition-colors duration-300 hover:text-[#1a1f3c] ${
                    isActive ? 'text-[#1a1f3c]' : 'text-muted'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[#1a1f3c]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-background flex flex-col items-start justify-center section-pad gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={link.href}
                  onClick={(e) => {
                    setMenuOpen(false);
                    if (location.pathname === '/' && link.sectionId) {
                      e.preventDefault();
                      const el = document.getElementById(link.sectionId);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                  className="font-serif text-display-sm text-primary hover:text-muted transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
