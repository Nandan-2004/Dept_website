import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useAnimationFrame, useMotionValue } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import galleryImages from '../../data/gallery-images.json';

interface GalleryImageItem {
  id: number;
  src: string;
  label: string;
  width: number;
  height: number;
  aspectRatio: number;
}

const isSpecialImage = (item: GalleryImageItem) => {
  const lowercaseSrc = item.src.toLowerCase();
  return (
    lowercaseSrc.includes('automathon') ||
    lowercaseSrc.includes('farewell') ||
    lowercaseSrc.includes('project expo') ||
    lowercaseSrc.includes('project%20expo')
  );
};

// Dynamically split the gallery images into two balanced rows
const half = Math.ceil(galleryImages.length / 2);
const row1Images = galleryImages.slice(0, half) as GalleryImageItem[];
const row2Images = galleryImages.slice(half) as GalleryImageItem[];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImageItem | null>(null);

  // Lock body scroll when lightbox is active
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) setSelectedImage(null);
    },
    [selectedImage]
  );
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="w-full flex flex-col gap-6 md:gap-8 overflow-hidden py-4">
      {/* Row 1: Scrolling Left */}
      <MarqueeRow
        items={row1Images}
        direction="left"
        speed={0.48}
        onSelect={setSelectedImage}
      />

      {/* Row 2: Scrolling Right */}
      <MarqueeRow
        items={row2Images}
        direction="right"
        speed={0.48}
        onSelect={setSelectedImage}
      />

      {/* Premium Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <PremiumLightbox
            item={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── MarqueeRow Subcomponent ──────────────────────────── */
function MarqueeRow({
  items,
  direction,
  speed,
  onSelect,
}: {
  items: GalleryImageItem[];
  direction: 'left' | 'right';
  speed: number;
  onSelect: (item: GalleryImageItem) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const isDragging = useRef(false);
  const dragStart = useRef(0);
  const startClientX = useRef(0);
  const wasDragging = useRef(false);
  const [paused, setPaused] = useState(false);
  const [trackWidth, setTrackWidth] = useState(0);

  const duplicatedItems = [...items, ...items];

  useEffect(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.scrollWidth / 2);
    }
  }, [items]);

  useEffect(() => {
    const handleResize = () => {
      if (trackRef.current) {
        setTrackWidth(trackRef.current.scrollWidth / 2);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useAnimationFrame(() => {
    if (!paused && !isDragging.current && trackWidth > 0) {
      let current = x.get();
      if (direction === 'left') {
        current -= speed;
        if (current <= -trackWidth) current += trackWidth;
      } else {
        current += speed;
        if (current >= 0) current -= trackWidth;
      }
      x.set(current);
    }
  });

  const handleDragStart = (clientX: number) => {
    isDragging.current = true;
    dragStart.current = clientX - x.get();
    startClientX.current = clientX;
    wasDragging.current = false;
    setPaused(true);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging.current) return;
    if (Math.abs(clientX - startClientX.current) > 6) wasDragging.current = true;
    let newX = clientX - dragStart.current;
    if (trackWidth > 0) {
      if (newX > 0) newX = -trackWidth + (newX % trackWidth);
      else if (newX < -trackWidth) newX = newX % trackWidth;
    }
    x.set(newX);
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    setTimeout(() => setPaused(false), 850);
  };

  return (
    <div
      className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onMouseDown={(e) => handleDragStart(e.clientX)}
      onMouseMove={(e) => handleDragMove(e.clientX)}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
      onTouchEnd={handleDragEnd}
    >
      <motion.div
        ref={trackRef}
        style={{ x, willChange: 'transform' }}
        className="flex gap-4 md:gap-6 items-center py-4 select-none"
      >
        {duplicatedItems.map((item, i) => {
          const isSpecial = isSpecialImage(item);
          return (
            <div
              key={`${item.id}-${i}`}
              onClick={(e) => {
                if (wasDragging.current) { e.preventDefault(); return; }
                if (isSpecial) onSelect(item);
              }}
              style={{ aspectRatio: item.aspectRatio }}
              className={`flex-shrink-0 h-40 md:h-52 lg:h-60 group relative overflow-hidden bg-surface border border-border/10 shadow-sm transition-all duration-500 hover:border-accent-blue/35 hover:shadow-[0_20px_50px_rgba(37,99,235,0.14),0_10px_20px_-10px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:z-10 ${
                isSpecial ? 'cursor-zoom-in' : 'cursor-grab active:cursor-grabbing'
              } ${
                i % 3 === 0
                  ? 'translate-y-1.5 hover:translate-y-0.5'
                  : i % 3 === 1
                  ? '-translate-y-1.5 hover:-translate-y-2.5'
                  : 'translate-y-0 hover:-translate-y-1'
              }`}
            >
              <GalleryImage src={item.src} alt={item.label} />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Label */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 pointer-events-none">
                <p className="text-[10.5px] font-sans font-medium text-white tracking-widest uppercase opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                  {item.label}
                </p>
              </div>

              {/* Zoom-in badge for special collages */}
              {isSpecial && (
                <div className="absolute top-3.5 right-3.5 bg-white/15 backdrop-blur-md border border-white/25 text-white rounded-full p-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 pointer-events-none shadow-lg">
                  <ZoomIn size={14} className="stroke-[2.5]" />
                </div>
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ── Premium Lightbox Component ───────────────────────── */
function PremiumLightbox({
  item,
  onClose,
}: {
  item: GalleryImageItem;
  onClose: () => void;
}) {
  const isPortrait = item.aspectRatio < 1;

  return (
    <motion.div
      key="lightbox-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-6"
      onClick={onClose}
    >
      {/* Multi-layered cinematic backdrop */}
      <div className="absolute inset-0 bg-black/80" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${item.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(60px) brightness(0.25) saturate(1.8)',
          transform: 'scale(1.1)',
        }}
      />
      {/* Vignette ring */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.75) 100%)',
        }}
      />

      {/* Close button */}
      <motion.button
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onClick={onClose}
        className="absolute top-5 right-5 z-[210] flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 hover:bg-white/15 text-white/70 hover:text-white border border-white/12 hover:border-white/25 backdrop-blur-xl transition-all duration-300 shadow-xl cursor-pointer text-[11px] tracking-widest uppercase font-medium"
        aria-label="Close"
      >
        <X size={13} strokeWidth={2.5} />
        <span>Close</span>
      </motion.button>

      {/* Main lightbox card */}
      <motion.div
        key="lightbox-card"
        initial={{ scale: 0.88, opacity: 0, y: 28 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 22, stiffness: 200, mass: 0.9 }}
        onClick={(e) => e.stopPropagation()}
        className={`relative z-[205] flex ${isPortrait ? 'flex-row gap-8 items-center' : 'flex-col items-center'} max-w-[94vw] max-h-[88vh] overflow-y-auto`}
      >
        {/* Image frame */}
        <div
          className="relative overflow-hidden rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.07)] flex-shrink-0"
          style={{
            maxHeight: isPortrait ? '72vh' : '70vh',
            maxWidth: isPortrait ? '50vw' : '88vw',
          }}
        >
          {/* Subtle inner glow border */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 z-10 pointer-events-none" />
          <img
            src={item.src}
            alt={item.label}
            className="block w-auto select-none rounded-2xl"
            style={{
              maxHeight: isPortrait ? '72vh' : '70vh',
              maxWidth: isPortrait ? '50vw' : '88vw',
              height: 'auto',
              width: 'auto',
              objectFit: 'contain',
            }}
          />
        </div>

        {/* Caption panel */}
        <motion.div
          initial={{ opacity: 0, x: isPortrait ? 16 : 0, y: isPortrait ? 0 : 12 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 0.18, duration: 0.5, ease: 'easeOut' }}
          className={`${isPortrait ? 'max-w-[220px]' : 'mt-5 text-center max-w-lg px-4'}`}
        >
          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
            className={`h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mb-4 ${isPortrait ? 'w-16 mx-0 origin-left' : 'w-24 mx-auto origin-center'}`}
          />

          <p
            className={`font-sans text-[9px] tracking-[0.22em] uppercase text-white/40 mb-2 ${isPortrait ? '' : 'text-center'}`}
          >
            AIML Department • MCE
          </p>

          <h3
            className={`font-serif font-medium text-white leading-snug ${isPortrait ? 'text-lg' : 'text-xl md:text-2xl text-center'}`}
          >
            {item.label}
          </h3>

          {isPortrait && (
            <p className="mt-3 text-[10px] text-white/35 font-sans tracking-wide leading-relaxed">
              Tap outside or press{' '}
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/15 text-[9px]">
                Esc
              </kbd>{' '}
              to close
            </p>
          )}
        </motion.div>

        {/* Bottom hint for landscape images */}
        {!isPortrait && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-2 text-[10px] text-white/30 font-sans tracking-wide"
          >
            Press{' '}
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/15 text-[9px]">
              Esc
            </kbd>{' '}
            or click outside to close
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ── Smooth Image Loader Component ──────────────────────── */
function GalleryImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // If the image is already in the browser cache (due to the global preloader),
    // the onLoad event might fire before React attaches the listener. 
    // This instantly marks it as loaded to prevent invisible images.
    if (imgRef.current && imgRef.current.complete) {
      setLoaded(true);
    }
  }, []);

  return (
    <div className={`absolute inset-0 w-full h-full ${loaded ? 'bg-transparent' : 'bg-[#e2e8f0] animate-pulse'}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="eager"
        decoding="sync"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ease-out group-hover:scale-[1.03] pointer-events-none select-none ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
