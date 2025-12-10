import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const TruthTest = () => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [hasClickedYes, setHasClickedYes] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const runAway = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current.getBoundingClientRect();
    const maxX = container.width / 2 - 60;
    const maxY = 100;
    
    const randomX = (Math.random() - 0.5) * 2 * maxX;
    const randomY = (Math.random() - 0.5) * 2 * maxY;
    
    setNoButtonPosition({ x: randomX, y: randomY });
  };

  const handleYesClick = () => {
    setHasClickedYes(true);
    setShowConfetti(true);
    setTimeout(() => {
      setShowDialog(true);
    }, 500);
  };

  // Confetti particles
  const confettiColors = ['#E11D48', '#D4AF37', '#FFB6C1', '#FF69B4', '#FFC0CB'];
  const confettiParticles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    rotation: Math.random() * 360,
  }));

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Confetti Explosion */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {confettiParticles.map((particle) => (
              <motion.div
                key={particle.id}
                initial={{
                  x: '50vw',
                  y: '50vh',
                  scale: 0,
                  rotate: 0,
                }}
                animate={{
                  x: `${particle.x}vw`,
                  y: ['50vh', '-20vh'],
                  scale: [0, 1, 1, 0.5],
                  rotate: particle.rotation + 720,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 2.5,
                  delay: particle.delay,
                  ease: 'easeOut',
                }}
                className="absolute"
              >
                <Heart
                  className="w-4 h-4 md:w-6 md:h-6"
                  style={{ color: particle.color, fill: particle.color }}
                />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Sparkle decorations */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute top-10 left-1/4 text-gold opacity-50"
          >
            <Sparkles className="w-8 h-8" />
          </motion.div>

          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            The <span className="italic text-primary">Ultimate</span> Question
          </h2>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/50 backdrop-blur-xl border border-white/30 rounded-3xl p-8 md:p-12 shadow-2xl"
          >
            <p className="text-xl md:text-2xl text-foreground mb-10 font-light">
              Do you love <span className="font-playfair italic text-primary font-medium">Tejash</span> more than anything?
            </p>

            <div ref={containerRef} className="relative h-32 flex items-center justify-center gap-6">
              {/* YES Button */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleYesClick}
                  disabled={hasClickedYes}
                  className="relative px-10 py-6 text-xl font-semibold bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg shadow-primary/40 overflow-hidden group"
                >
                  {/* Glow effect */}
                  <motion.div
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute inset-0 bg-primary/50 blur-xl rounded-full"
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    YES! <Heart className="w-5 h-5 fill-current" />
                  </span>
                </Button>
              </motion.div>

              {/* NO Button - Runs Away */}
              <motion.div
                animate={noButtonPosition}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                onMouseEnter={runAway}
                onTouchStart={runAway}
                className="absolute"
                style={{ left: 'calc(50% + 80px)' }}
              >
                <Button
                  variant="outline"
                  className="px-4 py-2 text-sm text-muted-foreground border-muted-foreground/30 rounded-full hover:bg-muted/50"
                >
                  No
                </Button>
              </motion.div>
            </div>

            <p className="text-sm text-muted-foreground mt-8 italic">
              (Choose wisely... or try to 😏)
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-white/90 backdrop-blur-xl border border-white/30 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center font-playfair text-3xl text-foreground">
              I KNEW IT! 😭❤️
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-6 py-6">
            {/* Crying happy cat GIF */}
            <img
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHN5OGZ3NXI3NXRhYnQ3cnQ4cmVtYmd6aGRtcHdnNWJ0ZWpvdGZjZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEdv6sy3ulLW9aHrW/giphy.gif"
              alt="Happy tears"
              className="w-48 h-48 object-cover rounded-2xl"
            />
            <p className="text-center text-muted-foreground text-lg">
              (Go give him a hug now) 🤗
            </p>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-12 h-12 text-primary fill-primary" />
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default TruthTest;
