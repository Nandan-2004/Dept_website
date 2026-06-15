import { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Alumni from './pages/Alumni';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import galleryImages from './data/gallery-images.json';

const ALL_IMAGES_TO_PRELOAD = [
  '/images/hero1bg.webp',
  '/images/mce logo.webp',
  '/images/aiml_logo_circle.webp',
  '/images/depcorecanvas bg.webp',
  ...galleryImages.map(img => img.src)
];

function GlobalPreloader({ onLoaded }: { onLoaded: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let loadedCount = 0;
    const total = ALL_IMAGES_TO_PRELOAD.length;
    let isCancelled = false;

    const loadImages = async () => {
      const promises = ALL_IMAGES_TO_PRELOAD.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            if (isCancelled) return;
            loadedCount++;
            setProgress(Math.round((loadedCount / total) * 100));
            resolve(true);
          };
          img.onerror = () => {
            if (isCancelled) return;
            loadedCount++;
            setProgress(Math.round((loadedCount / total) * 100));
            resolve(true); // Resolve on error so we don't hang
          };
        });
      });

      await Promise.all(promises);
      if (!isCancelled) {
        setTimeout(() => {
          onLoaded();
        }, 600); // Allow 100% to render briefly
      }
    };

    loadImages();
    
    return () => {
      isCancelled = true;
    };
  }, [onLoaded]);

  return (
    <motion.div
      key="global-preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background overflow-hidden"
    >
      <div className="relative flex flex-col items-center">
        {/* Premium double spinning rings */}
        <div className="relative w-16 h-16 mb-8">
          <div className="absolute inset-0 rounded-full border-[1.5px] border-[#e2e8f0]" />
          <div className="absolute inset-0 rounded-full border-[1.5px] border-transparent border-t-[#1a1f3c] border-l-[#1a1f3c] animate-[spin_1.2s_cubic-bezier(0.5,0,0.5,1)_infinite]" />
          <div className="absolute inset-2 rounded-full border-[1.5px] border-transparent border-b-[#4a4a5a] border-r-[#4a4a5a] animate-[spin_1.5s_cubic-bezier(0.5,0,0.5,1)_infinite_reverse]" />
        </div>
        
        <p className="font-serif text-[#1a1f3c] text-lg tracking-wide animate-pulse mb-3">
          Loading AIML
        </p>
        <p className="font-sans text-[#6b7280] text-[10px] font-medium tracking-[0.2em] uppercase">
          {progress}%
        </p>
      </div>
    </motion.div>
  );
}

function App() {
  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    if (!appLoaded) return; // Wait until app is loaded to start smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [appLoaded]);

  return (
    <>
      <AnimatePresence mode="wait">
        {!appLoaded && (
          <GlobalPreloader onLoaded={() => setAppLoaded(true)} />
        )}
      </AnimatePresence>

      <div style={{ opacity: appLoaded ? 1 : 0, transition: 'opacity 0.1s' }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="alumni" element={<Alumni />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/:id" element={<ProjectDetail />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
