import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Send, X, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

interface Lantern {
  id: string;
  message: string;
  x: number;
  createdAt: number;
  isOwn: boolean;
}

const SkyOfWishes = () => {
  const [lanterns, setLanterns] = useState<Lantern[]>([]);
  const [wishText, setWishText] = useState('');
  const [selectedLantern, setSelectedLantern] = useState<Lantern | null>(null);
  const [userId] = useState(() => `user_${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    const channel = supabase.channel('lanterns');

    channel
      .on('broadcast', { event: 'new_lantern' }, ({ payload }) => {
        if (payload.senderId !== userId) {
          const newLantern: Lantern = {
            id: payload.id,
            message: payload.message,
            x: Math.random() * 80 + 10, // Random x position 10-90%
            createdAt: Date.now(),
            isOwn: false,
          };
          setLanterns((prev) => [...prev, newLantern]);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  // Clean up old lanterns
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setLanterns((prev) => prev.filter((l) => now - l.createdAt < 20000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const releaseLantern = useCallback(async () => {
    if (!wishText.trim()) return;

    const newLantern: Lantern = {
      id: `lantern_${Date.now()}`,
      message: wishText,
      x: Math.random() * 60 + 20,
      createdAt: Date.now(),
      isOwn: true,
    };

    setLanterns((prev) => [...prev, newLantern]);
    setWishText('');

    // Broadcast to others
    const channel = supabase.channel('lanterns');
    await channel.send({
      type: 'broadcast',
      event: 'new_lantern',
      payload: {
        id: newLantern.id,
        message: newLantern.message,
        senderId: userId,
      },
    });
  }, [wishText, userId]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Starry background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-amber-950/20 via-transparent to-indigo-950/30" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-light tracking-widest text-amber-100/90 mb-3">
            Sky of Wishes
          </h2>
          <p className="text-white/40 font-light text-sm tracking-wide">
            Release your hopes into the night sky
          </p>
        </motion.div>

        {/* Floating Lanterns */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <AnimatePresence>
            {lanterns.map((lantern) => (
              <motion.div
                key={lantern.id}
                className="absolute bottom-0 pointer-events-auto cursor-pointer"
                style={{ left: `${lantern.x}%` }}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: '-120vh', opacity: [0, 1, 1, 0.8, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 18, ease: 'linear' }}
                onClick={() => setSelectedLantern(lantern)}
              >
                {/* Lantern glow */}
                <motion.div
                  className="relative"
                  animate={{
                    x: [0, 10, -10, 5, -5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {/* Outer glow */}
                  <div className="absolute inset-0 -m-4 bg-amber-400/20 rounded-full blur-xl" />
                  
                  {/* Lantern body */}
                  <div className="relative w-16 h-20 flex flex-col items-center">
                    {/* Top cap */}
                    <div className="w-6 h-2 bg-amber-700/80 rounded-t-lg" />
                    
                    {/* Paper body */}
                    <motion.div
                      className={`w-14 h-16 rounded-b-[2rem] rounded-t-lg ${
                        lantern.isOwn
                          ? 'bg-gradient-to-b from-amber-400/90 to-orange-500/80'
                          : 'bg-gradient-to-b from-rose-400/90 to-pink-500/80'
                      } shadow-lg relative overflow-hidden`}
                      animate={{
                        boxShadow: [
                          '0 0 20px 5px rgba(251,191,36,0.3)',
                          '0 0 30px 10px rgba(251,191,36,0.5)',
                          '0 0 20px 5px rgba(251,191,36,0.3)',
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {/* Inner glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-white/40" />
                      
                      {/* Flame icon */}
                      <motion.div
                        className="absolute bottom-2 left-1/2 -translate-x-1/2"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        <Flame className="w-4 h-4 text-yellow-200/80" />
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative z-20 w-full max-w-md mt-auto"
        >
          <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-amber-500/20">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <input
                  type="text"
                  value={wishText}
                  onChange={(e) => setWishText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && releaseLantern()}
                  placeholder="Make a wish for us..."
                  maxLength={100}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/90 placeholder:text-white/30 focus:outline-none focus:border-amber-500/50 transition-colors font-light tracking-wide"
                />
                <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400/40" />
              </div>
              
              <Button
                onClick={releaseLantern}
                disabled={!wishText.trim()}
                className="w-full bg-gradient-to-r from-amber-500/80 to-orange-500/80 hover:from-amber-500 hover:to-orange-500 text-white border-0 rounded-xl py-6 font-light tracking-wide transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Flame className="w-5 h-5 mr-2" />
                Release Lantern
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Message Modal */}
      <AnimatePresence>
        {selectedLantern && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedLantern(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-sm p-8 rounded-2xl bg-gradient-to-br from-amber-900/40 to-orange-900/30 backdrop-blur-xl border border-amber-500/30 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedLantern(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>

              {/* Content */}
              <div className="flex flex-col items-center gap-4 text-center">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Flame className="w-12 h-12 text-amber-400" />
                </motion.div>
                
                <div>
                  <p className="text-xs text-amber-300/60 tracking-widest uppercase mb-2">
                    {selectedLantern.isOwn ? 'Your Wish' : 'A Wish For You'}
                  </p>
                  <p className="text-xl text-amber-100 font-light leading-relaxed italic">
                    "{selectedLantern.message}"
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                    >
                      <Sparkles className="w-4 h-4 text-amber-400/60" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SkyOfWishes;
