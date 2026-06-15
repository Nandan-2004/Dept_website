import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ExternalLink, Tag } from 'lucide-react';
import FadeIn from '../components/ui/FadeIn';
import { projectsData, type Project } from '../data';

// Reuse the elegant background from Alumni page for consistency
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
          <circle cx="300" cy="420" r="5" />
          <circle cx="450" cy="260" r="4" />
          <circle cx="600" cy="460" r="6.5" />
          <circle cx="720" cy="300" r="5" />
        </g>
      </svg>
    </div>
  );
}

export default function Projects() {
  return (
    <div className="min-h-screen pt-[120px] pb-24 relative overflow-hidden bg-background">
      <NeuralNetworkBackground />
      
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-8xl mx-auto section-pad relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 relative">
          <div className="max-w-2xl relative z-10">
            <FadeIn>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[1px] bg-accent-blue/40" />
                <span className="font-sans font-medium text-[11.5px] tracking-[0.15em] uppercase text-accent-blue/80">Innovation &amp; Application</span>
              </div>
              <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-tight text-primary mb-6">
                Student &amp; Alumni <span className="italic font-light text-muted">Projects</span>
              </h1>
              <p className="font-sans text-base md:text-[17px] text-secondary leading-relaxed font-light max-w-xl">
                Explore the groundbreaking work from the AIML department. From artificial intelligence models to fully deployed applications.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence>
            {projectsData.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <FadeIn delay={(index % 3) * 0.1}>
      <div className="group relative bg-gray-200 backdrop-blur-[12px] border border-border/80 rounded-2xl p-6 md:p-8 transition-all duration-500 ease-editorial hover:shadow-[0_15px_30px_-10px_rgba(37,99,235,0.06)] hover:border-accent-blue/20 hover:-translate-y-1.5 flex flex-col h-full overflow-hidden">
        
        {/* Soft glow behind cards on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-accent-light/10 to-indigo-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />

        {/* Image / Icon container */}
        <div className="w-12 h-12 rounded-xl bg-accent-light/50 border border-accent-blue/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent-blue group-hover:text-white transition-all duration-500">
          <ExternalLink size={20} className="text-accent-blue group-hover:text-white transition-colors duration-500" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="font-serif text-2xl text-primary mb-3 leading-snug group-hover:text-accent-blue transition-colors duration-300">
            {project.title}
          </h3>
          <p className="font-sans text-sm text-secondary leading-relaxed font-light mb-6">
            {project.description}
          </p>
        </div>

        {/* Footer info: Authors and Tags */}
        <div className="pt-6 border-t border-border/60 mt-auto">
          <div className="mb-4">
            <span className="font-sans text-[10px] uppercase tracking-widest text-muted font-medium block mb-2">Contributors</span>
            <div className="flex flex-wrap gap-1.5">
              {project.authors.map(author => {
                const name = typeof author === 'string' ? author : author.name;
                return (
                  <span key={name} className="font-sans text-xs text-primary font-medium bg-surface px-2.5 py-1 rounded-md border border-border/50">
                    {name}
                  </span>
                );
              })}
            </div>
          </div>
          
          {project.guides && project.guides.length > 0 && (
            <div className="mb-4">
              <span className="font-sans text-[10px] uppercase tracking-widest text-muted font-medium block mb-2">Under the Guidance of</span>
              <div className="flex flex-wrap gap-1.5">
                {project.guides.map(guide => {
                  const name = typeof guide === 'string' ? guide : guide.name;
                  return (
                    <span key={name} className="font-sans text-xs text-primary font-medium bg-surface/50 px-2.5 py-1 rounded-md border border-border/30">
                      {name}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
          
          <div>
            <span className="font-sans text-[10px] uppercase tracking-widest text-muted font-medium block mb-2 flex items-center gap-1.5">
              <Tag size={10} /> Technologies
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map(tag => (
                <span key={tag} className="font-sans text-[11px] text-accent-blue bg-accent-blue/5 border border-accent-blue/10 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Hidden link overlay making entire card clickable */}
        <Link to={`/projects/${project.id}`} className="absolute inset-0 z-10" aria-label={`View project ${project.title}`}>
          <span className="sr-only">View project</span>
        </Link>
      </div>
    </FadeIn>
  );
}
