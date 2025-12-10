import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToContent = () => {
    const element = document.getElementById('love-counter');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated Gradient Mesh Background - Now using CSS Variables for Consistency */}
      <div className="absolute inset-0 animate-gradient opacity-60" 
        style={{
          background: `
            radial-gradient(at 40% 20%, hsl(var(--rose-light)) 0px, transparent 50%),
            radial-gradient(at 80% 0%, hsl(var(--gold-light)) 0px, transparent 50%),
            radial-gradient(at 0% 50%, hsl(var(--champagne)) 0px, transparent 50%),
            radial-gradient(at 80% 50%, hsl(var(--muted)) 0px, transparent 50%),
            radial-gradient(at 0% 100%, hsl(var(--rose-light)) 0px, transparent 50%),
            radial-gradient(at 80% 100%, hsl(var(--gold-light)) 0px, transparent 50%)
          `,
          backgroundSize: '150% 150%',
          filter: 'blur(60px)', // Softer blur for premium feel
        }}
      />

      {/* Decorative Elements - Refined Opacity */}
      <motion.div 
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-40 right-20 w-40 h-40 rounded-full bg-secondary/10 blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary font-medium text-xs tracking-[0.2em] uppercase">
            Celebrating Love
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-medium text-foreground mb-8 leading-tight"
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
          className="font-display italic text-lg md:text-xl text-muted-foreground/80"
        >
          Tejash & Akanksha • Est. Dec 11, 2022
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-10"
        >
          <div className="flex items-center justify-center gap-4 text-secondary/60">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-secondary to-transparent" />
            <span className="text-xs font-medium tracking-widest uppercase">Forever</span>
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-secondary to-transparent" />
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-muted-foreground/60 hover:text-primary transition-colors cursor-pointer group"
      >
        <span className="text-[10px] font-medium tracking-[0.2em] uppercase">Begin Journey</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 group-hover:text-primary transition-colors" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroSection;
