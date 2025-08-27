import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { brand } from '@/lib/brand';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-muted/50 border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <span>© {currentYear} {brand.name}. Built with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="h-4 w-4 text-red-500 fill-current" />
            </motion.div>
            <span>and modern web technologies.</span>
          </div>
          
          <motion.div
            className="text-sm text-muted-foreground/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-mist-500 via-blossom-500 to-sunrise-500 bg-clip-text text-transparent font-medium">
              Making the web a more beautiful place, one project at a time.
            </span>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}