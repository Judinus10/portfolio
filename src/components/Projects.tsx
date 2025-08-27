import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import SectionHeading from './SectionHeading';
import { projects } from '@/lib/brand';

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="work" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <SectionHeading
          title="Featured Work"
          subtitle="Building solutions that make a difference, one project at a time."
        />

        <motion.div
          ref={ref}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Card variant="glass" className="h-full hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-mist-500 transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {project.impact && (
                    <div className="flex items-start space-x-2 p-3 bg-mist-50 rounded-lg border border-mist-100">
                      <TrendingUp className="h-4 w-4 text-mist-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-mist-700 font-medium">{project.impact}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="tech" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    {project.link && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-3 w-3" />
                          Live
                        </a>
                      </Button>
                    )}
                    {project.repo && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.repo} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-3 w-3" />
                          Code
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}