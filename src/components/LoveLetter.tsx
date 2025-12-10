import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Heart, X } from 'lucide-react';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';

const LoveLetter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  const handleEnvelopeClick = () => {
    setIsEnvelopeOpen(true);
    setTimeout(() => setIsOpen(true), 800);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setIsEnvelopeOpen(false), 300);
  };

  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-light/20 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-rose-light/50 text-primary font-medium text-sm tracking-widest uppercase mb-6">
            Special Message
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground">
            A Letter <span className="italic text-primary">For You</span>
          </h2>
        </motion.div>

        {/* Envelope */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleEnvelopeClick}
            className="relative cursor-pointer group"
          >
            {/* Envelope Body */}
            <div className="w-72 md:w-96 h-48 md:h-56 bg-gradient-to-br from-cream to-champagne rounded-lg shadow-lifted relative overflow-hidden border border-gold/20">
              {/* Envelope Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, hsl(var(--rose-light)) 10px, hsl(var(--rose-light)) 11px)`
                }} />
              </div>

              {/* Envelope Flap */}
              <motion.div
                animate={{ rotateX: isEnvelopeOpen ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ transformOrigin: 'top', transformStyle: 'preserve-3d' }}
                className="absolute -top-1 left-0 right-0"
              >
                <svg viewBox="0 0 400 120" className="w-full">
                  <path
                    d="M0,0 L200,100 L400,0 L400,5 L200,105 L0,5 Z"
                    fill="url(#envelope-gradient)"
                    className="drop-shadow-md"
                  />
                  <defs>
                    <linearGradient id="envelope-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(35 40% 92%)" />
                      <stop offset="100%" stopColor="hsl(40 30% 88%)" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>

              {/* Wax Seal */}
              <motion.div
                animate={{ 
                  scale: isEnvelopeOpen ? 0 : 1,
                  opacity: isEnvelopeOpen ? 0 : 1
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-rose shadow-lg flex items-center justify-center group-hover:shadow-glow transition-shadow duration-500">
                  <Heart className="w-6 h-6 text-primary-foreground fill-current animate-heartbeat" />
                </div>
              </motion.div>

              {/* Label */}
              <motion.div
                animate={{ opacity: isEnvelopeOpen ? 0 : 1 }}
                className="absolute bottom-6 left-0 right-0 text-center"
              >
                <p className="font-display italic text-foreground/70 text-lg">
                  Click to Open
                </p>
              </motion.div>
            </div>

            {/* Glow effect */}
            <div className="absolute -inset-4 bg-primary/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
          </motion.div>
        </motion.div>
      </div>

      {/* Letter Modal */}
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl bg-cream/95 backdrop-blur-xl border-gold/20 p-0 overflow-hidden">
          <div className="relative">
            {/* Decorative header */}
            <div className="h-2 bg-gradient-to-r from-primary via-rose to-primary" />
            
            <div className="p-8 md:p-12">
              <DialogClose className="absolute top-4 right-4 w-10 h-10 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors">
                <X className="w-5 h-5 text-muted-foreground" />
              </DialogClose>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="text-center mb-8">
                  <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="font-display text-3xl md:text-4xl text-foreground italic">
                    To My Dearest Akanksha
                  </h3>
                </div>

                <div className="font-body text-foreground/80 leading-relaxed space-y-4 text-center md:text-left">
                  <p className="font-display italic text-lg text-primary">
                    Happy 3rd Anniversary, my love! ♥
                  </p>
                  
                  <p>
                    Three years ago, my life changed forever when you became a part of it. 
                    Looking back at all the moments we've shared, I realize that every single 
                    day with you has been a gift I never knew I needed.
                  </p>
                  
                  <p>
                    You are my best friend, my confidant, my greatest adventure, and my 
                    forever home. Your smile lights up my darkest days, your laughter is 
                    my favorite melody, and your love is the anchor that keeps me grounded.
                  </p>
                  
                  <p>
                    Thank you for choosing me, for believing in us, and for loving me 
                    in ways I never thought possible. Here's to three amazing years, 
                    and to all the beautiful years ahead of us.
                  </p>
                  
                  <p className="font-display italic text-lg">
                    Forever and always yours,
                  </p>
                  
                  <p className="font-display text-2xl text-primary">
                    Tejash ♥
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Decorative footer */}
            <div className="h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default LoveLetter;
