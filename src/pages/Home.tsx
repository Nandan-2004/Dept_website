import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import FadeIn from '../components/ui/FadeIn';
import Gallery from '../components/ui/Gallery';
import { facultyData, programOutcomes, alumniData } from '../data';
// Stagger container variant
const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
};

const heroLineVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function Home() {
  return (
    <div className="w-full">

      {/* ─── 1. HERO ─────────────────────────────────────────── */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-end pr-6 md:pr-12 lg:pr-20 pl-6 md:pl-8 lg:pl-10 pb-20 md:pb-28 pt-32 overflow-hidden">
        {/* Background Image with Premium Soft Gradient Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0"
          style={{
            backgroundImage: `url("/images/hero1bg.webp")`,
            opacity: 1,
          }}
        />
        {/* Ambient fade-out gradient to blend perfectly with the rest of the page */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background pointer-events-none z-0" />

        {/* Background year mark */}
        <span
          className="absolute top-32 right-8 md:right-20 font-serif text-[clamp(6rem,18vw,16rem)] text-muted/35 select-none pointer-events-none leading-none z-0"
          aria-hidden="true"
        >
          '22
        </span>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="w-full relative z-10"
        >

          {/* Main title — asymmetric layout */}
          <div className="overflow-hidden pb-6 -mb-6 relative z-10">
            <motion.h1
              variants={heroLineVariant}
              className="font-serif font-normal text-display text-primary leading-none tracking-tight"
            >
              Artificial
            </motion.h1>
          </div>
          <div className="overflow-hidden pb-6 -mb-6 relative z-20">
            <motion.h1
              variants={heroLineVariant}
              className="font-serif font-normal text-display text-primary leading-none tracking-tight md:ml-[12vw]"
            >
              Intelligence
            </motion.h1>
          </div>
          <div className="overflow-hidden pb-8 -mb-8 relative z-30">
            <motion.h1
              variants={heroLineVariant}
              className="font-serif font-light italic text-display text-muted leading-none tracking-tight md:ml-[5vw]"
            >
              &amp; Machine Learning
            </motion.h1>
          </div>

          {/* Bottom row */}
          <motion.div
            variants={heroLineVariant}
            className="flex flex-col md:flex-row md:items-end justify-between mt-12 md:mt-16 gap-8"
          >
            <p className="font-serif font-light italic text-secondary text-[15px] md:text-[17px] max-w-4xl leading-relaxed">
              The future belongs to those who blend intelligence with innovation and purpose. Through Artificial Intelligence and Machine Learning, we inspire students to create meaningful solutions for a smarter and technologically advanced world.
            </p>

          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[1px] h-10 bg-muted/40"
          />
        </motion.div>
      </section>


      {/* ══════════════════════════════════════════════════════════════
          PREMIUM WHITE EDITORIAL CANVAS
          About → Vision → Mission → Program Outcomes
      ══════════════════════════════════════════════════════════════ */}
      <div className="w-full bg-[#fafafa] relative overflow-hidden">

        {/* ── Outer canvas ambient texture (SVG neural mesh) ─────── */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
          style={{ opacity: 0.045 }}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern id="neural-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="1.2" fill="#6b7280" />
              <circle cx="0" cy="0" r="1.2" fill="#6b7280" />
              <circle cx="80" cy="0" r="1.2" fill="#6b7280" />
              <circle cx="0" cy="80" r="1.2" fill="#6b7280" />
              <circle cx="80" cy="80" r="1.2" fill="#6b7280" />
              <line x1="0" y1="0" x2="80" y2="80" stroke="#6b7280" strokeWidth="0.4" />
              <line x1="80" y1="0" x2="0" y2="80" stroke="#6b7280" strokeWidth="0.4" />
              <line x1="40" y1="0" x2="40" y2="80" stroke="#6b7280" strokeWidth="0.3" />
              <line x1="0" y1="40" x2="80" y2="40" stroke="#6b7280" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-grid)" />
        </svg>

        {/* ── 2. ABOUT THE DEPARTMENT ────────────────────────────── */}
        <section id="about" className="relative z-10 px-6 md:px-12 lg:px-20 pt-10 pb-16 md:pb-20">
          <div className="max-w-8xl mx-auto">

            {/* Section label */}
            <FadeIn>
              <p className="text-[15.5px] font-sans font-medium tracking-widest uppercase text-muted mb-10">
                About the Department
              </p>
            </FadeIn>

            {/* Two-column layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">

              {/* Left — Title */}
              <div className="md:col-span-4">
                <FadeIn>
                  <h2 className="font-serif text-[clamp(1.9rem,4.75vw,3.8rem)] text-primary leading-tight">
                    Where Rigor<br />Meets<br />Imagination
                  </h2>
                  {/* Thin accent line */}
                  <div className="w-12 h-[2px] bg-accent-blue mt-8 mb-0 rounded-full" />
                </FadeIn>
              </div>

              {/* Right — Body text */}
              <div className="md:col-span-7 md:col-start-6">
                <FadeIn delay={0.1}>
                  <p className="font-sans font-light text-secondary text-lg leading-relaxed mb-6 text-justify">
                    The Department of Computer Science and Engineering (Artificial Intelligence and Machine Learning) is the youngest branch of MCE established in 2022. The department has fostered excellence in undergraduate education while advancing research that pushes the boundaries of Artificial Intelligence and Machine Learning. It focuses on teaching and research on Artificial Intelligence, Machine Learning, Deep Learning, Computer Vision, Big Data and Natural Language Processing.
                  </p>
                  <p className="font-sans font-light text-secondary text-base leading-relaxed mb-6 text-justify">
                    The department encourages students to think creatively, explore modern technologies, and develop practical solutions for real-world challenges through learning, innovation, and research. With a strong emphasis on academic excellence and industry-oriented practices, students are empowered to build solutions for modern societal and technological challenges.
                  </p>
                  <p className="font-sans font-light text-muted text-base leading-relaxed text-justify">
                    By combining technical knowledge with innovation and ethical responsibility, the department aims to nurture future-ready engineers capable of contributing to a smarter and technologically advanced world driven by Artificial Intelligence and Machine Learning.
                  </p>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* ── INNER FLOATING PREMIUM CANVAS ─────────────────────── */}
        <section id="vision" className="relative z-10 px-6 md:px-12 lg:px-20 pb-20 md:pb-28">
          <div className="max-w-8xl mx-auto">
            <FadeIn>
              <div
                className="relative overflow-hidden rounded-2xl md:rounded-3xl"
                style={{
                  background: 'rgba(255,255,255,0.82)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  border: '1px solid #eaeaea',
                  boxShadow: '0 8px 48px rgba(0,0,0,0.06), 0 2px 12px rgba(0,0,0,0.03)',
                }}
              >

                {/* Inner canvas neural flow texture image */}
                <img
                  src="/images/depcorecanvas bg.webp"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                  style={{ opacity: 0.82 }}
                  aria-hidden="true"
                />

                {/* Inner canvas content */}
                <div className="relative z-10 p-8 md:p-14 lg:p-16">

                  {/* Canvas header */}
                  <FadeIn>
                    <div className="flex items-center gap-4 mb-12 md:mb-16">
                      <div className="w-8 h-[1.5px] bg-blue-900 rounded-full" />
                      <p className="font-sans font-medium text-[13.2px] tracking-widest uppercase text-blue-900">
                        Department Core
                      </p>
                    </div>
                  </FadeIn>

                  {/* Vision & Mission — side by side */}
                  <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-10 md:mb-14">

                    {/* Thin vertical divider — desktop only (scoped to this row) */}
                    <div className="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-border to-transparent pointer-events-none" />

                    {/* Vision */}
                    <FadeIn delay={0.05}>
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-6 h-6 rounded-full border border-accent-blue/30 flex items-center justify-center flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-accent-blue" />
                          </div>
                          <span className="font-sans font-medium text-[11px] tracking-widest uppercase text-accent-blue">Vision</span>
                        </div>
                        <h3 className="font-serif text-xl md:text-2xl text-primary mb-5 leading-snug text-justify">
                          To be a Center of Excellence for innovative teaching, learning, and research to produce socially responsible professionals in the field of Artificial Intelligence and Machine Learning to address real-world problems.
                        </h3>
                      </div>
                    </FadeIn>

                    {/* Mission */}
                    <FadeIn delay={0.12}>
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-6 h-6 rounded-full border border-purple-600/30 flex items-center justify-center flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-purple-600" />
                          </div>
                          <span className="font-sans font-medium text-[11px] tracking-widest uppercase text-purple-600">Mission</span>
                        </div>
                        <ul className="space-y-4">
                          {[
                            'Foster innovation through cutting-edge teaching, transformative learning, and research in the field of Artificial Intelligence and Machine Learning with strong foundations in Computer Science and Engineering.',
                            'Impart the latest technologies through effective industry–academia collaboration and practical learning methodologies.',
                            'Maintain high ethical standards in AI & ML applications with transparency, responsibility, and moral values for the betterment of society.',
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/25 flex-shrink-0" />
                              <p className="font-sans font-light text-secondary text-sm leading-relaxed">{item}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </FadeIn>
                  </div>

                  {/* Thin horizontal divider */}
                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent mb-10 md:mb-14" />

                  {/* Program Outcomes — inside inner canvas */}
                  <div id="outcomes">
                    <FadeIn>
                      <div className="mb-8">
                        <div>
                          <p className="font-sans font-medium text-[11.55px] tracking-widest uppercase text-muted mb-3">Program Outcomes</p>
                          <h2 className="font-serif text-[clamp(1.9rem,4.75vw,3.8rem)] text-primary leading-tight">
                            What Our Students Learn
                          </h2>
                        </div>
                      </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-0">
                      {programOutcomes.map((po, i) => (
                        <FadeIn key={po.code} delay={i * 0.05}>
                          <div className="py-6 border-t border-[#ebebeb] group hover:border-accent-blue/30 transition-colors duration-300">
                            <div className="flex items-baseline gap-3 mb-2">
                              <span className="font-sans text-[10px] text-accent-blue tracking-widest font-medium">{po.code}</span>
                              <h4 className="font-serif text-base text-primary">{po.title}</h4>
                            </div>
                            <p className="font-sans font-light text-muted text-xs leading-relaxed">{po.desc}</p>
                          </div>
                        </FadeIn>
                      ))}
                    </div>
                  </div>

                </div>{/* /inner canvas content */}
              </div>{/* /inner floating canvas */}
            </FadeIn>
          </div>
        </section>

      </div>{/* /outer white editorial canvas */}

      {/* ─── Premium Thin Divider ──────────────────────────────── */}
      <div className="max-w-8xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4d4d4] to-transparent" />
      </div>

      {/* ─── 5. FACULTY ──────────────────────────────────────── */}
      <section id="faculty" className="section-pad pt-6 md:pt-10 pb-8 md:pb-12">
        <div className="max-w-8xl mx-auto">
          <FadeIn>
            <p className="text-[15.5px] font-sans font-medium tracking-widest uppercase text-muted mb-10">Faculty &amp; Staff</p>
          </FadeIn>

          {/* Row 1: 2 Faculty (Aligned to col 1 and 3) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {facultyData.slice(0, 2).map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.08} className={
                i === 0 ? "md:col-span-2 flex md:justify-center" : (i === 1 ? "md:col-start-3" : "")
              }>
                <div className="py-5 border-t border-border flex flex-col md:flex-row md:items-start gap-4 group hover:bg-surface transition-colors duration-300 -mx-4 px-4">
                  <div className="w-10 h-10 md:w-11 md:h-11 bg-surface border border-border flex items-center justify-center flex-shrink-0 group-hover:border-primary/20 transition-colors duration-300">
                    <span className="font-serif text-[15px] md:text-base text-muted">
                      {member.name.replace(/^(Dr\.|Prof\.|Mrs\.|Mr\.)\s*/i, '').charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className={`font-serif text-primary mb-1 ${i === 0 ? 'text-[20px] font-semibold' : 'text-[16px]'}`}>{member.name}</h3>
                    <p className="text-muted/80 text-[11px] uppercase tracking-wide font-medium mb-1">{member.title}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Row 2: 3 Faculty */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {facultyData.slice(2, 5).map((member, i) => (
              <FadeIn key={member.name} delay={(i + 2) * 0.08}>
                <div className="py-5 border-t border-border flex flex-col md:flex-row md:items-start gap-4 group hover:bg-surface transition-colors duration-300 -mx-4 px-4">
                  <div className="w-10 h-10 md:w-11 md:h-11 bg-surface border border-border flex items-center justify-center flex-shrink-0 group-hover:border-primary/20 transition-colors duration-300">
                    <span className="font-serif text-[15px] md:text-base text-muted">
                      {member.name.replace(/^(Dr\.|Prof\.|Mrs\.|Mr\.)\s*/i, '').charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif text-[16px] text-primary mb-1">{member.name}</h3>
                    <p className="text-muted/80 text-[11px] uppercase tracking-wide font-medium mb-1">{member.title}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Row 3: 3 Faculty */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {facultyData.slice(5, 8).map((member, i) => (
              <FadeIn key={member.name} delay={(i + 5) * 0.08}>
                <div className="py-5 border-t border-border flex flex-col md:flex-row md:items-start gap-4 group hover:bg-surface transition-colors duration-300 -mx-4 px-4">
                  <div className="w-10 h-10 md:w-11 md:h-11 bg-surface border border-border flex items-center justify-center flex-shrink-0 group-hover:border-primary/20 transition-colors duration-300">
                    <span className="font-serif text-[15px] md:text-base text-muted">
                      {member.name.replace(/^(Dr\.|Prof\.|Mrs\.|Mr\.)\s*/i, '').charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif text-[16px] text-primary mb-1">{member.name}</h3>
                    <p className="text-muted/80 text-[11px] uppercase tracking-wide font-medium mb-1">{member.title}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Row 4: 4 Staff */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 mt-6">
            {facultyData.slice(8, 12).map((member, i) => (
              <FadeIn key={member.name} delay={(i + 8) * 0.08}>
                <div className="py-5 border-t border-border flex flex-col md:flex-row md:items-start gap-4 group hover:bg-surface transition-colors duration-300 -mx-4 px-4">
                  <div className="w-10 h-10 md:w-11 md:h-11 bg-surface border border-border flex items-center justify-center flex-shrink-0 group-hover:border-primary/20 transition-colors duration-300">
                    <span className="font-serif text-[15px] md:text-base text-muted">
                      {member.name.replace(/^(Dr\.|Prof\.|Mrs\.|Mr\.)\s*/i, '').charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif text-[16px] text-primary mb-1">{member.name}</h3>
                    <p className="text-muted/80 text-[11px] uppercase tracking-wide font-medium mb-1">{member.title}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. FOUNDING BATCH ───────────────────────────────── */}
      <section className="section-pad pt-10 md:pt-14 pb-16 md:pb-20 bg-[#0a0a0c] text-background relative overflow-hidden">
        {/* Background serif watermark */}
        <span
          className="absolute -bottom-8 -right-8 font-serif text-[clamp(8rem,22vw,20rem)] text-white/[0.03] select-none pointer-events-none leading-none"
          aria-hidden="true"
        >
          AIML
        </span>

        <div className="max-w-8xl mx-auto relative z-10">
          <FadeIn>
            <p className="text-[14px] md:text-[15px] font-sans font-semibold tracking-widest uppercase text-accent-blue/80 mb-8">Founding Batch 2022–2026</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7">
              <FadeIn>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] text-white leading-[1.1] tracking-tight mb-6">
                  The first cohort to graduate from an <span className="italic text-white/70 font-light">AIML</span> program in MCE.
                </h2>
                <p className="font-sans font-light text-white/50 text-base md:text-lg leading-relaxed mb-10 max-w-xl">
                  33 Engineers. 4 Years of Experience. One purpose. The founding batch of the MCE CSE (AIML) Department has gone on to leading roles across India's most influential technology organizations, research institutions, and global companies.
                </p>
                <Link
                  to="/alumni"
                  className="group inline-flex items-center gap-3 border border-white/30 text-white font-sans text-[13px] tracking-wide px-8 py-3.5 hover:border-white/50 hover:bg-white/5 transition-all duration-500 rounded-full"
                >
                  View Full Alumni Directory
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </FadeIn>
            </div>

            {/* Stats */}
            <div className="md:col-span-4 md:col-start-9 flex flex-col justify-center gap-8 border-l border-white/10 pl-8 md:pl-12 py-4">
              {[
                { value: '33', label: 'Graduates' },
                { value: '30+', label: 'Placements' },
                { value: '40+', label: 'Projects' },
                { value: '4', label: 'Years of Experience' },
              ].map((stat, i) => (
                <FadeIn key={stat.label} delay={i * 0.1}>
                  <div>
                    <p className="font-serif text-[42px] leading-none text-white mb-2 drop-shadow-sm">{stat.value}</p>
                    <p className="font-sans text-[12px] font-medium tracking-widest uppercase text-white/40">{stat.label}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Alumni name ticker */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-x-8 gap-y-2">
            {alumniData.map((a, i) => (
              <span key={a.id} className="font-sans font-light text-white/30 text-sm">
                {a.name}{i < alumniData.length - 1 ? '' : ''}
              </span>
            ))}
            <span className="font-sans font-light text-white/20 text-sm italic">and many more…</span>
          </div>
        </div>
      </section>

      {/* ─── 7. GALLERY ──────────────────────────────────────── */}
      <section id="gallery" className="pt-10 md:pt-14 pb-4 md:pb-6 overflow-hidden">
        <div className="max-w-8xl mx-auto section-pad mb-6">
          <FadeIn>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[15.5px] font-sans font-medium tracking-widest uppercase text-muted mb-4">Gallery</p>
                <h2 className="font-serif text-[clamp(1.9rem,4.75vw,3.8rem)] leading-tight text-primary">
                  Moments from the Journey
                </h2>
              </div>
              <p className="hidden md:block font-sans font-light text-muted text-sm italic">
                Drag to explore &rarr;
              </p>
            </div>
          </FadeIn>
        </div>
        <FadeIn>
          <Gallery />
        </FadeIn>
      </section>

      {/* ─── 8. ALUMNI CTA ───────────────────────────────────── */}
      <section className="section-pad pt-5 md:pt-6 pb-20 md:pb-28 relative overflow-hidden">

        {/* ── Decorative floating graduation cap ── */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute -top-16 right-[-6%] md:right-[2%] w-[380px] md:w-[520px] lg:w-[620px]"
          style={{
            opacity: 0.08,
            transform: 'rotate(-18deg)',
            animation: 'capFloat 9s ease-in-out infinite',
          }}
        >
          {/* Premium line-art graduation cap SVG */}
          <svg
            viewBox="0 0 200 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Board / mortarboard flat top */}
            <polygon
              points="100,18 196,60 100,102 4,60"
              stroke="#2563EB"
              strokeWidth="3.2"
              strokeLinejoin="round"
              fill="rgba(37,99,235,0.04)"
            />
            {/* Cap body / dome below board */}
            <path
              d="M40,72 Q40,128 100,140 Q160,128 160,72"
              stroke="#2563EB"
              strokeWidth="3.2"
              strokeLinecap="round"
              fill="rgba(37,99,235,0.04)"
            />
            {/* Left side line down from board edge */}
            <line x1="40" y1="60" x2="40" y2="72" stroke="#2563EB" strokeWidth="3.2" strokeLinecap="round" />
            {/* Right side line */}
            <line x1="160" y1="60" x2="160" y2="72" stroke="#2563EB" strokeWidth="3.2" strokeLinecap="round" />
            {/* Tassel cord from right corner of board */}
            <line x1="196" y1="60" x2="196" y2="106" stroke="#2563EB" strokeWidth="2.8" strokeLinecap="round" strokeDasharray="0"/>
            {/* Tassel ball */}
            <circle cx="196" cy="113" r="7" stroke="#2563EB" strokeWidth="2.8" fill="rgba(37,99,235,0.08)" />
            {/* Tassel fringe lines */}
            <line x1="191" y1="120" x2="188" y2="136" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="196" y1="121" x2="196" y2="138" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="201" y1="120" x2="204" y2="136" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" />
            {/* Center stem from underside of board */}
            <line x1="100" y1="102" x2="100" y2="118" stroke="#2563EB" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </div>

        {/* Keyframe style tag for float animation */}
        <style>{`
          @keyframes capFloat {
            0%   { transform: rotate(-18deg) translateY(0px);   }
            50%  { transform: rotate(-18deg) translateY(-14px);  }
            100% { transform: rotate(-18deg) translateY(0px);   }
          }
        `}</style>

        <div className="max-w-8xl mx-auto relative z-10">
          <div className="divider mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <FadeIn className="md:col-span-7">
              <h2 className="font-serif text-display-sm leading-tight text-primary">
                Are you part of<br />
                <span className="italic text-muted">the founding story?</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.1} className="md:col-span-4 md:col-start-9">
              <p className="font-sans font-light text-secondary leading-relaxed mb-4">
                From classroom memories to professional journeys, the AIML community continues to grow together.
              </p>
              <p className="font-sans font-light text-secondary leading-relaxed mb-8">
                Our <span className="font-serif font-semibold italic text-primary">alumni</span> continue to inspire the next generation through their journeys and achievements.
              </p>
            </FadeIn>
          </div>

        </div>
      </section>

      {/* ─── 9. FOUNDING BATCH TRANSITION BRIDGE ────────────────── */}
      <section className="section-pad pt-4 pb-14 md:pb-20 bg-background relative z-20 overflow-visible group">
        <div className="max-w-7xl mx-auto w-full relative">
          
          {/* Layer 1: Subtle Slanted Depth Layer behind */}
          <div 
            className="absolute inset-0 z-0 bg-gradient-to-tr from-accent-blue/15 via-[#1b1b1f] to-[#121214] rounded-[2rem] md:rounded-[2.5rem] -skew-y-[2.5deg] md:-skew-y-[2deg] translate-y-[-8px] translate-x-[2px] opacity-75 blur-[1px] pointer-events-none transition-all duration-700 group-hover:translate-y-[-11px] group-hover:translate-x-[4px]"
          />

          {/* Layer 2: Main Floating matte-black panel */}
          <div className="relative z-10 overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-b from-[#0d0d0f] to-[#040405] border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.4)] -skew-y-[1.5deg] md:-skew-y-[1deg] origin-center transition-all duration-700 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_40px_90px_rgba(37,99,235,0.06),0_20px_50px_rgba(0,0,0,0.5)]">
            
            {/* Ambient glow inside the panel */}
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[80%] rounded-full bg-gradient-to-br from-accent-blue/10 to-purple-600/5 blur-[100px] pointer-events-none z-0" />

            {/* SEAMLESS FULL-CARD BACKGROUND IMAGE */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img 
                src="/images/graduation-celebration.png" 
                alt="The First AIML Graduating Batch Celebration" 
                className="absolute right-0 top-0 w-full md:w-[75%] h-full object-cover object-right opacity-80 transition-transform duration-[1.5s] ease-out group-hover:scale-[1.02]"
                style={{
                  maskImage: 'linear-gradient(to right, transparent 0%, transparent 15%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,1) 85%, rgba(0,0,0,1) 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 15%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,1) 85%, rgba(0,0,0,1) 100%)'
                }}
              />
              {/* Subtle edge vignettes to perfectly soften top/bottom/right borders */}
              <div className="absolute inset-y-0 right-0 w-[5%] bg-gradient-to-l from-[#040405] to-transparent opacity-80" />
              <div className="absolute inset-x-0 top-0 h-[10%] bg-gradient-to-b from-[#0d0d0f] to-transparent opacity-90" />
              <div className="absolute inset-x-0 bottom-0 h-[15%] bg-gradient-to-t from-[#040405] to-transparent opacity-90" />
            </div>

            {/* Content wrapper - reversing the skew to keep content perfectly flat */}
            <div className="relative z-10 px-6 py-10 md:px-12 md:py-16 lg:px-16 lg:py-20 skew-y-[1.5deg] md:skew-y-[1deg] origin-center">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left Side: Typography & Button */}
                <div className="lg:col-span-7 flex flex-col justify-center text-left relative z-20">
                  <FadeIn>
                    <span className="text-[12px] md:text-[13.5px] font-sans tracking-[0.25em] font-semibold text-accent-blue uppercase mb-4 block">
                      FOUNDING BATCH
                    </span>
                    <h2 className="font-serif text-[clamp(1.7rem,3.4vw,2.75rem)] leading-[1.15] tracking-tight mb-2 font-normal">
                      <span className="text-[#f9f1e0] drop-shadow-[0_2px_10px_rgba(212,175,55,0.15)]">The First</span>{" "}
                      <span className="bg-gradient-to-br from-[#f8f9fa] via-[#d4d6db] to-[#9ca3af] text-transparent bg-clip-text italic font-light drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)] px-1">AIML</span><br />
                      <span className="text-[#f9f1e0] drop-shadow-[0_2px_10px_rgba(212,175,55,0.15)]">Graduating Batch</span>
                    </h2>
                    <span 
                      className="text-[25px] md:text-[32px] bg-gradient-to-r from-[#e5e7eb] via-[#d1d5db] to-[#9ca3af] text-transparent bg-clip-text leading-none block pt-3 transform -rotate-2 self-center select-none pointer-events-none tracking-widest drop-shadow-[0_2px_8px_rgba(255,255,255,0.1)]"
                      style={{ fontFamily: "'Alex Brush', cursive" }}
                    >
                      Batch of 2022
                    </span>

                    {/* Premium Alumni Link Button */}
                    <div className="mt-8 flex justify-start">
                      <Link 
                        to="/alumni" 
                        className="inline-flex items-center gap-2 px-7 py-3 border border-white/20 text-white/80 hover:text-white hover:border-white/40 hover:bg-white/5 rounded-full transition-all duration-300 font-sans text-[13px] tracking-wide font-light group/btn"
                      >
                        Alumni <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </FadeIn>
                </div>

                {/* Right Side: Empty space to let the background image shine through */}
                <div className="lg:col-span-5 hidden lg:block"></div>

              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
