import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  X, 
  Linkedin, 
  Search, 
  Briefcase, 
  GraduationCap, 
  Compass, 
  Users,
  Grid,
  Github,
  Instagram,
  Globe
} from 'lucide-react';
import FadeIn from '../components/ui/FadeIn';
import { alumniData, type AlumniProfile } from '../data';

function NeuralNetworkBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none">
      <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#2563eb" strokeWidth="0.5" strokeOpacity="0.1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        
        {/* Soft elegant neural connections */}
        <g stroke="#2563eb" strokeWidth="0.75" strokeOpacity="0.4" fill="none">
          <path d="M 100 150 Q 250 80 400 200 T 700 120" />
          <path d="M 150 400 Q 350 320 500 450 T 850 380" />
          <path d="M 600 200 Q 750 350 900 250 T 1200 400" />
          
          <line x1="200" y1="120" x2="350" y2="280" />
          <line x1="350" y1="280" x2="500" y2="150" />
          <line x1="500" y1="150" x2="680" y2="330" />
          <line x1="680" y1="330" x2="850" y2="210" />
          
          <line x1="300" y1="420" x2="450" y2="260" />
          <line x1="600" y1="460" x2="720" y2="300" />
        </g>
        
        {/* Soft interactive floating nodes */}
        <g fill="#2563eb" opacity="0.6">
          <circle cx="200" cy="120" r="4" />
          <circle cx="350" cy="280" r="5.5" />
          <circle cx="500" cy="150" r="4" />
          <circle cx="680" cy="330" r="6" />
          <circle cx="850" cy="210" r="4.5" />
          <circle cx="1000" cy="350" r="5" />
          
          <circle cx="300" cy="420" r="5" />
          <circle cx="450" cy="260" r="4" />
          <circle cx="600" cy="460" r="6" />
          <circle cx="720" cy="300" r="4.5" />
        </g>
      </svg>
      
      {/* Dynamic luxury gradient blobs with low opacity */}
      <div className="absolute top-[10%] left-[-5%] w-[35vw] h-[35vw] bg-gradient-to-tr from-accent-light via-blue-50 to-indigo-50/20 opacity-60 blur-[120px] rounded-full" />
      <div className="absolute top-[40%] right-[-5%] w-[40vw] h-[40vw] bg-gradient-to-bl from-purple-50 via-indigo-50/15 to-accent-light opacity-50 blur-[130px] rounded-full" />
    </div>
  );
}

export default function Alumni() {
  const [selected, setSelected] = useState<AlumniProfile | null>(null);
  const [filter] = useState<'all' | 'industry' | 'studies' | 'opportunities'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamic grouping logic based on roles/companies in parsed CSV
  const filteredAlumni = useMemo(() => {
    return alumniData.filter(al => {
      // Search matches — check every meaningful field
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        al.name.toLowerCase().includes(q) ||
        al.role.toLowerCase().includes(q) ||
        al.company.toLowerCase().includes(q) ||
        (al.bio?.toLowerCase().includes(q) ?? false) ||
        (al.badge?.toLowerCase().includes(q) ?? false) ||
        (al.quote?.toLowerCase().includes(q) ?? false) ||
        (al.batch?.toLowerCase().includes(q) ?? false);
      
      if (!matchesSearch) return false;
      if (al.hidden) return false;
      
      if (filter === 'all') return true;
      
      const comp = al.company.toLowerCase();
      const role = al.role.toLowerCase();
      
      const isOpportunity = comp.includes('seeking') || comp.includes('opportunit') || comp.includes('exploring');
      const isStudies = comp.includes('university') || comp.includes('college') || comp.includes('studies') || comp.includes('masters') || comp.includes('abroad') || role.includes('scholar') || role.includes('student');
      const isIndustry = !isOpportunity && !isStudies;
      
      if (filter === 'industry') return isIndustry;
      if (filter === 'studies') return isStudies;
      if (filter === 'opportunities') return isOpportunity;
      
      return true;
    });
  }, [searchQuery, filter]);

  return (
    <div className="w-full relative min-h-screen bg-white overflow-x-hidden">
      <NeuralNetworkBackground />

      {/* ─── HERO SECTION ───────────────────────────────────── */}
      <section className="section-pad pt-28 pb-4 md:pt-36 md:pb-6 relative z-10">
        <div className="max-w-8xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-sans text-xs font-semibold tracking-wider uppercase mb-5 shadow-sm">
              <Users size={12} />
              Our Alumni
            </span>
            <h1 className="font-serif text-[clamp(2.55rem,6.8vw,5.95rem)] text-primary leading-[1.05] tracking-tight mb-6">
              Where AIML Journeys Continue
            </h1>
            <p className="font-sans font-light text-secondary text-lg md:text-xl leading-relaxed max-w-2xl">
              Meet the graduates shaping innovation, research, technology, and industry across diverse domains.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── CONTROLS & FILTER ROW ───────────────────────────── */}
      <section className="section-pad pb-6 relative z-10">
        <div className="max-w-8xl mx-auto border-b border-border/80 pb-6">
          <div className="flex flex-col lg:flex-row gap-6 justify-end items-start lg:items-center">

            {/* Premium Search Bar */}
            <div className="relative w-full lg:w-72">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder="Search alumni, roles, companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#f3f4f6] border border-border/80 focus:border-accent-blue/30 focus:bg-white text-primary text-sm placeholder:text-muted outline-none transition-all duration-300 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>

          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="font-sans text-[13.5px] text-muted">
              Showing <span className="font-medium text-secondary">{filteredAlumni.length}</span> of {alumniData.length} founding batch graduates
            </p>
            <span className="inline-flex items-center gap-1.5 text-2xs text-accent-blue font-semibold uppercase tracking-widest bg-accent-light/50 border border-accent-blue/5 px-2.5 py-1 rounded-md">
              <Grid size={10} /> Batch of 2022
            </span>
          </div>
        </div>
      </section>

      {/* ─── ALUMNI GRID SECTION ─────────────────────────────── */}
      <section className="section-pad pb-32 relative z-10">
        <div className="max-w-8xl mx-auto">
          {filteredAlumni.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredAlumni.map((alumni, i) => (
                <AlumniCard
                  key={alumni.id}
                  alumni={alumni}
                  index={i}
                  onClick={() => setSelected(alumni)}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-white/40 border border-dashed border-border/80 rounded-2xl max-w-md mx-auto p-8 shadow-sm">
              <Compass className="mx-auto text-muted/60 mb-4" size={32} />
              <h3 className="font-serif text-lg text-primary mb-1">No alumni found</h3>
              <p className="font-sans text-sm text-secondary font-light">
                Try refining your search keyword or selecting a different directory segment filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ─── PROFILE SLIDE-OUT MODAL ─────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <ProfileModal alumni={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Alumni Card Component ───────────────────────────── */
function AlumniCard({
  alumni,
  index,
  onClick,
}: {
  alumni: AlumniProfile;
  index: number;
  onClick: () => void;
}) {
  const initials = alumni.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  // Dynamic tags mapping
  const statusInfo = useMemo(() => {
    if (alumni.badge) {
      return {
        label: alumni.badge,
        icon: Briefcase,
        style: 'bg-blue-50/80 text-blue-700 border-blue-100/50'
      };
    }

    const comp = alumni.company.toLowerCase();
    const role = alumni.role.toLowerCase();
    
    if (comp.includes('seeking') || comp.includes('opportunit') || comp.includes('exploring')) {
      return {
        label: 'Seeking Opportunities',
        icon: Compass,
        style: 'bg-amber-50/80 text-amber-700 border-amber-100/50'
      };
    } else if (comp.includes('university') || comp.includes('college') || comp.includes('studies') || comp.includes('masters') || comp.includes('abroad') || role.includes('scholar') || role.includes('student')) {
      return {
        label: 'Higher Studies',
        icon: GraduationCap,
        style: 'bg-emerald-50/80 text-emerald-700 border-emerald-100/50'
      };
    } else {
      return {
        label: 'Industry / Placed',
        icon: Briefcase,
        style: 'bg-blue-50/80 text-blue-700 border-blue-100/50'
      };
    }
  }, [alumni]);

  const StatusIcon = statusInfo.icon;

  return (
    <FadeIn delay={(index % 4) * 0.05}>
      <div 
        onClick={onClick}
        className="group relative bg-[#fafafa] backdrop-blur-[12px] border border-border/80 rounded-2xl p-5 transition-all duration-500 ease-editorial hover:shadow-[0_15px_30px_-10px_rgba(37,99,235,0.06)] hover:border-accent-blue/20 hover:-translate-y-1.5 flex flex-col h-full cursor-pointer select-none"
      >
        {/* Soft glow behind cards on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-accent-light/10 to-indigo-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />

        {/* Profile portrait area */}
        <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-5 bg-surface/50 border border-border/50">
          {alumni.image ? (
            <img
              src={alumni.image}
              alt={alumni.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.03]"
              style={{ objectPosition: alumni.imagePosition || 'center' }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-accent-light via-blue-50 to-indigo-50/40 flex flex-col items-center justify-center text-center p-4">
              <span className="font-serif text-3xl font-light text-accent-blue/80 mb-1">{initials}</span>
              <span className="text-2xs text-muted font-sans tracking-wider uppercase">MCE AIML</span>
            </div>
          )}
        </div>

        {/* Status indicator pill */}
        <div className="flex items-center mb-3">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-sans text-2xs font-semibold ${statusInfo.style}`}>
            <StatusIcon size={10} />
            {statusInfo.label}
          </span>
        </div>

        {/* Alumni info header */}
        <div className="flex-1">
          <h3 className="font-serif text-xl text-primary mb-1 group-hover:text-accent-blue transition-colors duration-300">
            {alumni.name}
          </h3>
          <p className="font-sans text-sm text-secondary font-light line-clamp-1 mb-1 leading-snug">
            {alumni.role}
          </p>
          <p className="font-sans text-xs text-muted font-light leading-none">
            {alumni.company}
          </p>
        </div>

        {/* Divider line in card */}
        <div className="w-full h-px bg-border/60 my-4" />

        {/* Card Footer controls */}
        <div className="flex items-center justify-between">
          <span className="font-sans text-2xs text-muted font-light">Batch of 2022</span>
          
          <div className="flex items-center gap-3">
            {alumni.linkedin && (
              <a
                href={alumni.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-lg bg-surface/50 text-muted hover:text-accent-blue hover:bg-accent-light/80 border border-border/20 transition-all duration-300"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={13} />
              </a>
            )}
            <span className="p-2 rounded-lg bg-surface/50 text-muted group-hover:text-accent-blue group-hover:bg-accent-light/80 border border-border/20 transition-all duration-300">
              <ExternalLink size={13} />
            </span>
          </div>
        </div>

      </div>
    </FadeIn>
  );
}

/* ── Profile Slide-out Drawer Component ───────────────── */
function ProfileModal({
  alumni,
  onClose,
}: {
  alumni: AlumniProfile;
  onClose: () => void;
}) {
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, []);

  const initials = alumni.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  const statusInfo = useMemo(() => {
    if (alumni.badge) {
      return {
        label: alumni.badge,
        icon: Briefcase,
        style: 'bg-blue-50 text-blue-700 border-blue-100'
      };
    }

    const comp = alumni.company.toLowerCase();
    const role = alumni.role.toLowerCase();
    
    if (comp.includes('seeking') || comp.includes('opportunit') || comp.includes('exploring')) {
      return {
        label: 'Seeking Opportunities',
        icon: Compass,
        style: 'bg-amber-50 text-amber-700 border-amber-100'
      };
    } else if (comp.includes('university') || comp.includes('college') || comp.includes('studies') || comp.includes('masters') || comp.includes('abroad') || role.includes('scholar') || role.includes('student')) {
      return {
        label: 'Higher Studies',
        icon: GraduationCap,
        style: 'bg-emerald-50 text-emerald-700 border-emerald-100'
      };
    } else {
      return {
        label: 'Industry / Placed',
        icon: Briefcase,
        style: 'bg-blue-50 text-blue-700 border-blue-100'
      };
    }
  }, [alumni]);

  const StatusIcon = statusInfo.icon;

  return (
    <>
      {/* Backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 bg-primary/20 backdrop-blur-[6px]"
        onClick={onClose}
      />

      {/* Right Drawer Panel */}
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: '100%' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-white border-l border-border/80 flex flex-col shadow-[-10px_0_40px_rgba(0,0,0,0.03)] overflow-y-auto no-scrollbar"
        data-lenis-prevent="true"
      >
        {/* Drawer Header Controls */}
        <div className="flex justify-between items-center px-8 pt-8 pb-4">
          <span className="font-sans text-2xs uppercase tracking-widest text-muted font-semibold">
            {alumni.batch}
          </span>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-surface hover:border-primary/20 transition-all duration-200"
            aria-label="Close"
          >
            <X size={14} className="text-muted" />
          </button>
        </div>

        {/* Center Profile Presentation */}
        <div className="px-8 pt-6 pb-6 flex flex-col items-center text-center border-b border-border/60">
          <div className="w-32 h-32 bg-accent-light border border-accent-blue/15 rounded-full overflow-hidden flex items-center justify-center mb-5 shadow-[0_8px_16px_-4px_rgba(37,99,235,0.05)] relative">
            {alumni.image ? (
              <img
                src={alumni.image}
                alt={alumni.name}
                className="w-full h-full object-cover"
                style={{ objectPosition: alumni.imagePosition || 'center' }}
              />
            ) : (
              <span className="font-serif text-4xl font-light text-accent-blue">{initials}</span>
            )}
          </div>
          
          <h2 className="font-serif text-3xl text-primary mb-1 font-normal">
            {alumni.name}
          </h2>
          {alumni.usn && (
            <p className="font-sans text-xs tracking-widest text-muted font-medium mb-3 uppercase">
              {alumni.usn}
            </p>
          )}

          <div className="flex items-center gap-1.5 mb-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border font-sans text-2xs font-semibold ${statusInfo.style}`}>
              <StatusIcon size={10} />
              {statusInfo.label}
            </span>
          </div>

          <p className="font-sans text-sm text-secondary font-medium mb-1 leading-snug">
            {alumni.role}
          </p>
          <p className="font-sans text-xs text-muted font-light tracking-wide">
            {alumni.company}
          </p>
        </div>

        {/* Detailed Student Bio */}
        <div className="px-8 py-8">
          {alumni.quote && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8"
            >
              <p className="font-serif italic text-[17px] text-primary/90 text-center leading-relaxed">
                {alumni.quote}
              </p>
            </motion.div>
          )}

          <span className="text-2xs uppercase tracking-widest text-muted font-semibold block mb-4">
            Graduate Statement
          </span>
          <blockquote className="border-l-2 border-accent-blue/30 pl-4">
            <p className="font-sans font-light text-secondary text-sm md:text-base leading-relaxed italic">
              "{alumni.bio}"
            </p>
          </blockquote>
          
          <div className="mt-8 pt-8 border-t border-border/50">
            <span className="text-2xs uppercase tracking-widest text-muted font-semibold block mb-3">
              Department Credentials
            </span>
            <div className="bg-surface/50 border border-border/40 rounded-xl p-4 flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs font-sans">
                <span className="text-muted">Institution</span>
                <span className="font-medium text-secondary">Malnad College of Engineering</span>
              </div>
              <div className="flex justify-between items-center text-xs font-sans">
                <span className="text-muted">Specialization</span>
                <span className="font-medium text-secondary">Artificial Intelligence & ML</span>
              </div>
              <div className="flex justify-between items-center text-xs font-sans">
                <span className="text-muted">Academic Batch</span>
                <span className="font-medium text-secondary">Founding Batch ({alumni.batch})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links Footer */}
        <div className="px-8 py-6 border-t border-border/60 bg-surface/20 flex flex-col items-center">
          <span className="text-2xs uppercase tracking-widest text-muted font-semibold mb-4">
            Connect
          </span>
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center justify-center gap-4"
          >
            {alumni.linkedin && (
              <a
                href={alumni.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all duration-300 shadow-sm hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            )}
            {alumni.github && (
              <a
                href={alumni.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 transition-all duration-300 shadow-sm hover:-translate-y-1"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            )}
            {alumni.instagram && (
              <a
                href={alumni.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-zinc-800 border border-zinc-200 hover:bg-zinc-50 transition-all duration-300 shadow-sm hover:-translate-y-1"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            )}
            {alumni.portfolio && (
              <a
                href={alumni.portfolio}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50 transition-all duration-300 shadow-sm hover:-translate-y-1"
                aria-label="Portfolio"
              >
                <Globe size={18} />
              </a>
            )}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
