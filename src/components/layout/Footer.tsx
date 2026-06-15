import { Link } from 'react-router-dom';
import { Linkedin, Mail, Youtube, Instagram, Globe, ExternalLink } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer 
      className="relative overflow-hidden border-t border-[rgba(180,200,230,0.28)]"
      style={{
        background: 'rgba(244, 247, 252, 0.62)',
        backdropFilter: 'blur(84px) saturate(400%) brightness(1.1) contrast(0.96)',
        WebkitBackdropFilter: 'blur(84px) saturate(400%) brightness(1.1) contrast(0.96)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,1)',
      }}
    >
      {/* Frosted grain texture overlay (matches header) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />
      
      <div className="max-w-8xl mx-auto section-pad py-10 md:py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6">
          
          {/* Brand & Logo Section */}
          <div className="md:col-span-12 xl:col-span-6 flex flex-col justify-center">
            <Link to="/" className="flex flex-row items-center gap-x-2 group min-w-0">

              {/* MCE Logo + College Name */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <img
                  src="/images/mce logo.webp"
                  alt="Malnad College of Engineering"
                  className="h-[48px] w-auto object-contain flex-shrink-0"
                  style={{ mixBlendMode: 'multiply' }}
                />
                <div className="flex flex-col leading-tight">
                  <span className="font-sans font-semibold text-[11.5px] text-[#1a1f3c] tracking-tight leading-snug whitespace-nowrap">
                    Malnad College of Engineering, Hassan
                  </span>
                  <span className="font-sans font-normal text-[10px] text-[#4a4a5a] tracking-wide leading-snug mt-0.5 whitespace-nowrap">
                    Karnataka, India — 573 202
                  </span>
                </div>
              </div>

              {/* Premium thin divider */}
              <div
                className="flex-shrink-0 mx-2"
                style={{
                  width: '1px',
                  alignSelf: 'stretch',
                  minHeight: '36px',
                  background: 'linear-gradient(to bottom, transparent, rgba(26,31,60,0.22) 20%, rgba(26,31,60,0.35) 50%, rgba(26,31,60,0.22) 80%, transparent)',
                }}
              />

              {/* AIML Logo + Dept Name */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <div
                  className="h-[48px] w-[48px] rounded-full flex-shrink-0"
                  style={{ overflow: 'hidden', background: 'white' }}
                >
                  <img
                    src="/images/aiml logo2 (2).webp?v=2"
                    alt="AIML Department Logo"
                    className="h-[48px] w-[48px] object-cover"
                    style={{ mixBlendMode: 'multiply' }}
                  />
                </div>

                <div className="flex flex-col leading-tight">
                  <span className="font-sans font-light text-[9px] text-[#6b7280] tracking-[0.12em] uppercase mb-0.5">
                    Department of
                  </span>
                  <span className="font-sans font-semibold text-[11.5px] text-[#1a1f3c] tracking-tight leading-snug">
                    Computer Science &amp; Engineering
                  </span>
                  <span className="font-sans font-semibold text-[11.5px] text-[#1a1f3c] tracking-tight leading-snug">
                    Artificial Intelligence &amp; Machine Learning
                  </span>
                </div>
              </div>
            </Link>
          </div>


          {/* Portals */}
          <div className="md:col-span-4 xl:col-span-2">
            <p className="text-[10px] font-semibold tracking-widest uppercase text-[#1a1f3c] mb-5">Portals</p>
            <div className="flex flex-col gap-3">
              <a href="https://mcehassan.ac.in/home/index" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[12px] text-[#4a4a5a] hover:text-[#1a1f3c] transition-colors font-light group">
                <Globe size={16} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                <span>MCE Official</span>
              </a>
              <a href="https://mceparents.contineo.in/parents/index.php" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[12px] text-[#4a4a5a] hover:text-[#1a1f3c] transition-colors font-light group">
                <ExternalLink size={16} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                <span>MCE Contineo</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4 xl:col-span-2">
            <p className="text-[10px] font-semibold tracking-widest uppercase text-[#1a1f3c] mb-5">Navigate</p>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'Alumni Directory', href: '/alumni' },
                { label: 'Faculty', href: '/#faculty' },
                { label: 'Gallery', href: '/#gallery' },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-[12px] text-[#4a4a5a] hover:text-[#1a1f3c] transition-colors font-light"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Media Connect */}
          <div className="md:col-span-4 xl:col-span-2">
            <p className="text-[10px] font-semibold tracking-widest uppercase text-[#1a1f3c] mb-5">Connect</p>
            <div className="flex flex-col gap-3">
              <a href="https://www.linkedin.com/in/aiml-mce-424898304" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[12px] text-[#4a4a5a] hover:text-[#0a66c2] transition-colors font-light group">
                <Linkedin size={16} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                <span>LinkedIn</span>
              </a>
              <a href="mailto:aimlmce@gmail.com" className="flex items-center gap-2 text-[12px] text-[#4a4a5a] hover:text-[#ea4335] transition-colors font-light group">
                <Mail size={16} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                <span>aimlmce@gmail.com</span>
              </a>
              <a href="mailto:aiml@mcehassan.ac.in" className="flex items-center gap-2 text-[12px] text-[#4a4a5a] hover:text-[#ea4335] transition-colors font-light group">
                <Mail size={16} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                <span>aiml@mcehassan.ac.in</span>
              </a>
              <a href="https://youtube.com/@aimlmce?si=2BGIFoMHeR-gaRo-" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[12px] text-[#4a4a5a] hover:text-[#ff0000] transition-colors font-light group">
                <Youtube size={16} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                <span>YouTube</span>
              </a>
              <a href="https://www.instagram.com/mce_aiml" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[12px] text-[#4a4a5a] hover:text-[#e1306c] transition-colors font-light group">
                <Instagram size={16} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="w-full h-[1px] bg-[rgba(26,31,60,0.1)] mt-12 mb-6" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-[11.5px] text-[#4a4a5a] font-light">
            &copy; {year} Department of CSE (AIML), Malnad College of Engineering. All rights reserved.
          </p>
          <p className="text-xs text-[#4a4a5a] font-light italic font-serif">
            Designed by the Founding Batch Students.
          </p>
        </div>
      </div>
    </footer>
  );
}
