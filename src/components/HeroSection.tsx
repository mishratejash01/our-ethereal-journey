import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToContent = () => {
    const element = document.getElementById('love-counter');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0 animate-gradient" 
        style={{
          background: `
            radial-gradient(at 40% 20%, hsl(347 80% 95%) 0px, transparent 50%),
            radial-gradient(at 80% 0%, hsl(40 60% 95%) 0px, transparent 50%),
            radial-gradient(at 0% 50%, hsl(350 70% 96%) 0px, transparent 50%),
            radial-gradient(at 80% 50%, hsl(45 50% 96%) 0px, transparent 50%),
            radial-gradient(at 0% 100%, hsl(347 60% 94%) 0px, transparent 50%),
            radial-gradient(at 80% 100%, hsl(35 40% 96%) 0px, transparent 50%),
            hsl(40 20% 98%)
          `,
          backgroundSize: '200% 200%',
        }}
      />

      {/* Decorative Elements */}
      <motion.div 
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-rose-light/40 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-40 right-20 w-40 h-40 rounded-full bg-gold-light/50 blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-rose-light/50 backdrop-blur-sm text-primary font-medium text-sm tracking-widest uppercase">
            Celebrating Love
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-medium text-foreground mb-6"
        >
          <span className="block">Three Years</span>
          <motion.span 
            className="block italic text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            of Us.
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-display italic text-xl md:text-2xl text-muted-foreground"
        >
          Tejash & Akanksha • Est. Dec 11, 2022
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-8"
        >
          <div className="flex items-center justify-center gap-3 text-secondary">
            <div className="w-12 h-px bg-secondary/50" />
            <span className="text-sm font-medium tracking-widest uppercase">♥</span>
            <div className="w-12 h-px bg-secondary/50" />
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer group"
      >
        <span className="text-sm font-medium tracking-widest uppercase">Scroll to Begin</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 group-hover:text-primary transition-colors" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroSection;
