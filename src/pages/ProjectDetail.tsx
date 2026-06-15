import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Tag, Users, Award, Mail, Github } from 'lucide-react';
import FadeIn from '../components/ui/FadeIn';
import { projectsData } from '../data';

export default function ProjectDetail() {
  const { id } = useParams();
  
  // Find project based on ID from URL
  const project = projectsData.find(p => p.id === Number(id));

  // Handle case where project doesn't exist
  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="min-h-screen pt-[120px] pb-24 relative overflow-hidden bg-background">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto section-pad relative z-10">
        <FadeIn>
          {/* Back Button */}
          <Link 
            to="/projects" 
            className="inline-flex items-center gap-2 text-sm font-sans font-medium text-muted hover:text-accent-blue transition-colors mb-12 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>

          {/* Header Section */}
          <header className="mb-16">
            <h1 className="font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] tracking-tight text-primary mb-8">
              {project.title}
            </h1>

            <div className="flex flex-col md:flex-row gap-6 md:gap-12 pb-8 border-b border-border/60">
              {/* Contributors */}
              <div>
                <span className="font-sans text-[10px] uppercase tracking-widest text-muted font-semibold block mb-3 flex items-center gap-1.5">
                  <Users size={12} /> Contributors
                </span>
                <div className="flex flex-wrap gap-3">
                  {project.authors.map(author => {
                    const name = typeof author === 'string' ? author : author.name;
                    const email = typeof author === 'string' ? undefined : author.email;
                    return (
                      <div key={name} className="flex flex-col bg-surface px-4 py-3 rounded-lg border border-border/80 shadow-sm min-w-[200px]">
                        <span className="font-sans text-[14px] text-primary font-medium">
                          {name}
                        </span>
                        {email && (
                          <span className="font-sans text-[12px] text-muted flex items-center gap-1.5 mt-1">
                            <Mail size={12} className="text-accent-blue" />
                            <a href={`mailto:${email}`} className="hover:text-accent-blue transition-colors">{email}</a>
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Guides */}
              {project.guides && project.guides.length > 0 && (
                <div>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-muted font-semibold block mb-3 flex items-center gap-1.5">
                    <Award size={12} /> Under the Guidance of
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {project.guides.map(guide => {
                      const name = typeof guide === 'string' ? guide : guide.name;
                      const email = typeof guide === 'string' ? undefined : guide.email;
                      return (
                        <div key={name} className="flex flex-col bg-surface/50 px-4 py-3 rounded-lg border border-border/50 min-w-[200px]">
                          <span className="font-sans text-[14px] text-primary font-medium">
                            {name}
                          </span>
                          {email && (
                            <span className="font-sans text-[12px] text-muted flex items-center gap-1.5 mt-1">
                              <Mail size={12} className="text-accent-blue" />
                              <a href={`mailto:${email}`} className="hover:text-accent-blue transition-colors">{email}</a>
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </header>

          {/* Main Content Area */}
          <div className="prose prose-lg prose-slate max-w-none mb-16">
            {project.detailedContent ? (
              <div className="space-y-8 font-sans font-light text-[17px] leading-relaxed text-secondary">
                {project.detailedContent.map((block, index) => {
                  if (block.type === 'text') {
                    return (
                      <div key={index}>
                        {block.heading && (
                          <h2 className="font-serif text-3xl text-primary mt-12 mb-6">{block.heading}</h2>
                        )}
                        <p className="text-secondary/90">
                          {block.content}
                        </p>
                      </div>
                    );
                  } else if (block.type === 'list') {
                    return (
                      <div key={index} className="bg-surface/30 p-6 rounded-2xl border border-border/40">
                        {block.title && (
                          <h3 className="font-sans font-medium text-lg text-primary mb-4">
                            {block.title}
                          </h3>
                        )}
                        <ul className="list-none space-y-3 m-0 p-0">
                          {block.items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-secondary/80">
                              <span className="text-accent-blue mt-1.5 flex-shrink-0">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent-blue/60" />
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  } else if (block.type === 'image') {
                    return (
                      <div key={index} className="my-10 rounded-2xl overflow-hidden border border-border/50 bg-white shadow-sm">
                        <img src={block.src} alt={block.caption || "Project diagram"} className="w-full h-auto object-cover max-h-[600px]" />
                        {block.caption && (
                          <div className="bg-surface/50 px-6 py-3 border-t border-border/50">
                            <p className="font-sans text-sm text-center text-muted m-0">{block.caption}</p>
                          </div>
                        )}
                      </div>
                    );
                  } else if (block.type === 'table') {
                    return (
                      <div key={index} className="my-8 overflow-hidden rounded-xl border border-border/85 bg-surface/20 shadow-sm max-w-xl mx-auto">
                        {block.title && (
                          <div className="bg-surface/50 border-b border-border/60 px-6 py-4">
                            <h3 className="font-sans font-semibold text-[15px] tracking-wide text-primary">
                              {block.title}
                            </h3>
                          </div>
                        )}
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="border-b border-border/70 bg-surface/35">
                                {block.headers.map((header, idx) => (
                                  <th key={idx} className="font-sans text-[13px] font-semibold tracking-wider text-muted uppercase px-6 py-3.5">
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                              {block.rows.map((row, rowIdx) => (
                                <tr key={rowIdx} className="hover:bg-accent-blue/[0.02] transition-colors">
                                  {row.map((cell, cellIdx) => (
                                    <td key={cellIdx} className="font-sans text-[14px] text-secondary/90 px-6 py-3">
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ) : (
              <p className="font-sans text-lg text-secondary leading-relaxed font-light">
                {project.description}
              </p>
            )}
          </div>

          {/* Footer - Technologies & GitHub */}
        <div className="pt-10 border-t border-border/60 flex flex-col md:flex-row justify-between gap-8">
          <div>
            <span className="font-sans text-[11px] uppercase tracking-widest text-muted font-semibold block mb-4 flex items-center gap-2">
              <Tag size={14} /> Technologies &amp; Tools Used
            </span>
            <div className="flex flex-wrap gap-2.5">
              {project.tags.map(tag => (
                <span key={tag} className="font-sans text-[13px] text-accent-blue bg-accent-blue/5 border border-accent-blue/15 px-4 py-1.5 rounded-full shadow-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {project.githubRepo && (
            <div className="md:text-right">
              <span className="font-sans text-[11px] uppercase tracking-widest text-muted font-semibold block mb-4 flex items-center gap-2 md:justify-end">
                <Github size={14} /> Source Code
              </span>
              <a 
                href={project.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-accent-blue transition-colors font-sans text-[14px] font-medium shadow-md hover:shadow-lg"
              >
                <Github size={16} />
                View GitHub Repository
              </a>
            </div>
          )}
        </div>

        </FadeIn>
      </div>
    </div>
  );
}
