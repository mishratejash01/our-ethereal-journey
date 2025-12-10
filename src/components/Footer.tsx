import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-rose-light/30 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Heart animation */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-rose mb-8"
          >
            <Heart className="w-8 h-8 text-primary-foreground fill-current" />
          </motion.div>

          <p className="font-display text-2xl md:text-3xl text-foreground mb-2">
            Made with <span className="text-primary">❤️</span> by Tejash
          </p>
          
          <p className="font-display italic text-lg text-muted-foreground mb-6">
            for Akanksha
          </p>

          <div className="flex items-center justify-center gap-3 text-gold mb-8">
            <div className="w-16 h-px bg-gold/30" />
            <span className="font-display italic text-foreground/60">Forever to go</span>
            <div className="w-16 h-px bg-gold/30" />
          </div>

          <p className="text-sm text-muted-foreground">
            December 11, 2022 — ∞
          </p>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />
    </footer>
  );
};

export default Footer;
