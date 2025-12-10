import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface CounterProps {
  target: number;
  suffix?: string;
  label: string;
  delay?: number;
}

const Counter = ({ target, suffix = '', label, delay = 0 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const startTime = Date.now() + delay * 1000;
    
    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      
      if (elapsed < 0) {
        requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      setCount(Math.floor(target * easeOut));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="text-center"
    >
      <div className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-foreground tracking-tight">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="mt-4 text-muted-foreground font-medium tracking-widest uppercase text-sm">
        {label}
      </div>
    </motion.div>
  );
};

const LoveCounter = () => {
  // Calculate days since Dec 11, 2022
  const startDate = new Date('2022-12-11');
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = diffDays * 24;

  return (
    <section id="love-counter" className="relative py-32 md:py-40 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-light/20 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-gold-light/50 text-secondary-foreground font-medium text-sm tracking-widest uppercase mb-6">
            Our Love in Numbers
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground">
            Every Moment <span className="italic text-primary">Counts</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-5xl mx-auto">
          <Counter 
            target={diffDays} 
            label="Days Together" 
            delay={0}
          />
          <Counter 
            target={diffHours} 
            label="Hours of Love" 
            delay={0.2}
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <div className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-foreground tracking-tight">
              ∞
            </div>
            <div className="mt-4 text-muted-foreground font-medium tracking-widest uppercase text-sm">
              Memories Made
            </div>
          </motion.div>
        </div>

        {/* Decorative hearts */}
        <motion.div
          className="absolute top-1/4 left-10 text-rose-light text-4xl"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          ♥
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 right-10 text-gold-light text-3xl"
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        >
          ♥
        </motion.div>
      </div>
    </section>
  );
};

export default LoveCounter;
