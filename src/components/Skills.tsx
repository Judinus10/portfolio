import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import SectionHeading from './SectionHeading';
import { skills } from '@/lib/brand';
import { 
  Code2, Database, Atom, Layers3, Cloud, 
  Cpu, Palette, Figma, GitBranch, Server,
  Globe, Wrench, Bot, BarChart, Shield
} from 'lucide-react';

const skillIcons: Record<string, React.ComponentType<any>> = {
  'JavaScript': Code2,
  'TypeScript': Code2,
  'Python': Code2,
  'PHP': Code2,
  'SQL': Database,
  'React': Atom,
  'Next.js': Layers3,
  'Flask': Server,
  'Laravel': Server,
  'Vue.js': Atom,
  'Vercel': Cloud,
  'Docker': Server,
  'Nginx': Server,
  'GitHub Actions': GitBranch,
  'AWS': Cloud,
  'Transformers': Bot,
  'Pandas': BarChart,
  'KeyBERT': Bot,
  'TensorFlow': Bot,
  'PyTorch': Bot,
  'Tailwind': Palette,
  'Figma': Figma,
  'Framer Motion': Palette,
  'Sass': Palette,
  'Material UI': Palette,
  'PostgreSQL': Database,
  'MySQL': Database,
  'MongoDB': Database,
  'Redis': Database,
  'Supabase': Database,
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState(0);

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'ArrowLeft' && index > 0) {
      setActiveTab(index - 1);
    } else if (event.key === 'ArrowRight' && index < skills.length - 1) {
      setActiveTab(index + 1);
    } else if (event.key === 'Home') {
      setActiveTab(0);
    } else if (event.key === 'End') {
      setActiveTab(skills.length - 1);
    }
  };

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <SectionHeading
          title="Skills & Technologies"
          subtitle="Tools and technologies I work with to bring ideas to life."
        />

        <motion.div
          ref={ref}
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          {/* Tab Navigation */}
          <div 
            className="flex flex-wrap justify-center mb-8 glass-card p-2 rounded-2xl"
            role="tablist"
            aria-label="Skills categories"
          >
            {skills.map((skillGroup, index) => (
              <button
                key={skillGroup.label}
                role="tab"
                tabIndex={activeTab === index ? 0 : -1}
                aria-selected={activeTab === index}
                aria-controls={`skillpanel-${index}`}
                onClick={() => setActiveTab(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === index
                    ? 'bg-mist-500 text-white shadow-lg transform scale-105'
                    : 'text-foreground/70 hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {skillGroup.label}
              </button>
            ))}
          </div>

          {/* Tab Panels */}
          <div className="min-h-[200px]">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.label}
                id={`skillpanel-${index}`}
                role="tabpanel"
                tabIndex={0}
                aria-labelledby={`tab-${index}`}
                className={`${activeTab === index ? 'block' : 'hidden'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-wrap gap-3 justify-center">
                  {skillGroup.items.map((skill, skillIndex) => {
                    const IconComponent = skillIcons[skill] || Code2;
                    return (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                      >
                        <Badge
                          variant="tech"
                          className="text-sm px-4 py-2 hover:scale-105 transition-transform cursor-default flex items-center gap-2"
                        >
                          <IconComponent className="h-4 w-4" />
                          {skill}
                        </Badge>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}