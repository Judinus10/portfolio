import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SectionHeading from './SectionHeading';
import { certificates } from '@/lib/brand';

export default function Certificates() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certificates" className="py-20">
      <div className="container mx-auto px-6">
        <SectionHeading
          title="Certificates"
          subtitle="Continuous learning and professional development achievements."
        />

        <motion.div
          ref={ref}
          className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Card 
                variant="glass" 
                className={`h-full hover:shadow-lg transition-all duration-300 group ${
                  cert.url ? 'cursor-pointer' : ''
                }`}
                onClick={cert.url ? () => window.open(cert.url, '_blank', 'noopener,noreferrer') : undefined}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-blossom-100 rounded-lg group-hover:bg-blossom-500 group-hover:text-white transition-colors">
                        <Award className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg leading-tight group-hover:text-blossom-500 transition-colors">
                          {cert.title}
                        </CardTitle>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">
                            {cert.issuer}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {cert.year}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                {cert.url && (
                  <CardContent className="pt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      asChild
                    >
                      <a href={cert.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-3 w-3" />
                        View Certificate
                      </a>
                    </Button>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}