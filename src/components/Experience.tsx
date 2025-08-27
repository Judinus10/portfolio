import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { experience } from '@/lib/brand';

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-6">
        <SectionHeading
          title="Experience"
          subtitle="My journey in building exceptional software solutions."
        />

        <motion.div
          ref={ref}
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-mist-500 via-blossom-500 to-sunrise-500 opacity-30"></div>

            <div className="space-y-12">
              {experience.map((exp, index) => (
                <motion.div
                  key={`${exp.role}-${exp.org}`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="relative pl-20"
                >
                  {/* Timeline Dot */}
                  <motion.div
                    className="absolute left-6 top-6 w-4 h-4 bg-mist-500 rounded-full border-4 border-background shadow-lg"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                  />

                  <div className="glass-card p-8 hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-1">{exp.role}</h3>
                        <div className="flex items-center space-x-4 text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span className="font-medium">{exp.org}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{exp.period}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {exp.bullets.map((bullet, bulletIndex) => (
                        <motion.li
                          key={bulletIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          transition={{ duration: 0.5, delay: index * 0.2 + bulletIndex * 0.1 + 0.5 }}
                          className="flex items-start space-x-3"
                        >
                          <div className="w-1.5 h-1.5 bg-mist-500 rounded-full mt-2.5 flex-shrink-0"></div>
                          <span className="text-foreground/80 leading-relaxed">{bullet}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}