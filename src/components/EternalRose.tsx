import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EternalRose = () => {
  const [isPlanted, setIsPlanted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handlePlant = () => {
    setIsPlanted(true);
    setTimeout(() => {
      setShowMessage(true);
    }, 4000);
  };

  // Firefly particles
  const fireflies = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
  }));

  return (
    <section className="py-24 md:py-32 relative overflow-hidden min-h-[80vh] flex items-center">
      {/* Magical Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      {/* Fireflies */}
      <AnimatePresence>
        {isPlanted && (
          <>
            {fireflies.map((fly) => (
              <motion.div
                key={fly.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 1, 0],
                  x: [0, Math.random() * 50 - 25, Math.random() * 100 - 50],
                  y: [0, -30, -60],
                }}
                transition={{
                  duration: fly.duration,
                  delay: fly.delay + 2,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 3,
                }}
                className="absolute z-10"
                style={{
                  left: `${fly.initialX}%`,
                  top: `${fly.initialY}%`,
                }}
              >
                <div className="w-2 h-2 bg-gold rounded-full blur-[2px] shadow-lg shadow-gold/50" />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            A Gift That <span className="italic text-gold">Never</span> Fades
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl font-light mb-12">
            Real flowers die, but this one is forever.
          </p>

          {/* Rose Container */}
          <div className="relative h-[400px] md:h-[500px] flex items-center justify-center">
            {/* Plant Button */}
            <AnimatePresence>
              {!isPlanted && (
                <motion.div
                  initial={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5, y: 50 }}
                  transition={{ duration: 0.5 }}
                >
                  <Button
                    onClick={handlePlant}
                    className="relative px-10 py-6 text-lg font-medium bg-gradient-to-r from-gold to-primary text-white rounded-full shadow-2xl shadow-gold/30 overflow-hidden group"
                  >
                    <motion.div
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Plant a Seed for Us
                      <Sparkles className="w-5 h-5" />
                    </span>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Growing Rose SVG */}
            <AnimatePresence>
              {isPlanted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <svg
                    viewBox="0 0 200 300"
                    className="w-48 h-72 md:w-64 md:h-96"
                  >
                    {/* Stem */}
                    <motion.path
                      d="M100 280 Q100 200 100 150"
                      stroke="#2D5A27"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                    />

                    {/* Left Leaf */}
                    <motion.path
                      d="M100 220 Q70 210 60 230 Q70 250 100 230"
                      fill="#3D7A37"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1, duration: 0.5 }}
                      style={{ transformOrigin: '100px 225px' }}
                    />

                    {/* Right Leaf */}
                    <motion.path
                      d="M100 190 Q130 180 140 200 Q130 220 100 200"
                      fill="#3D7A37"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.2, duration: 0.5 }}
                      style={{ transformOrigin: '100px 195px' }}
                    />

                    {/* Rose Petals - Layer 1 (Outer) */}
                    <motion.ellipse
                      cx="100"
                      cy="120"
                      rx="35"
                      ry="25"
                      fill="#D4AF37"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.8, duration: 0.6 }}
                      style={{ transformOrigin: '100px 120px' }}
                    />
                    <motion.ellipse
                      cx="75"
                      cy="105"
                      rx="25"
                      ry="20"
                      fill="#D4AF37"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 2, duration: 0.6 }}
                      style={{ transformOrigin: '75px 105px' }}
                    />
                    <motion.ellipse
                      cx="125"
                      cy="105"
                      rx="25"
                      ry="20"
                      fill="#D4AF37"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 2.2, duration: 0.6 }}
                      style={{ transformOrigin: '125px 105px' }}
                    />

                    {/* Rose Petals - Layer 2 (Middle) */}
                    <motion.ellipse
                      cx="100"
                      cy="100"
                      rx="28"
                      ry="22"
                      fill="#E5C158"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 2.4, duration: 0.6 }}
                      style={{ transformOrigin: '100px 100px' }}
                    />
                    <motion.ellipse
                      cx="85"
                      cy="90"
                      rx="20"
                      ry="16"
                      fill="#E5C158"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 2.6, duration: 0.6 }}
                      style={{ transformOrigin: '85px 90px' }}
                    />
                    <motion.ellipse
                      cx="115"
                      cy="90"
                      rx="20"
                      ry="16"
                      fill="#E5C158"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 2.8, duration: 0.6 }}
                      style={{ transformOrigin: '115px 90px' }}
                    />

                    {/* Rose Center */}
                    <motion.circle
                      cx="100"
                      cy="85"
                      r="15"
                      fill="#F0D77C"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 3, duration: 0.6 }}
                      style={{ transformOrigin: '100px 85px' }}
                    />
                    <motion.circle
                      cx="100"
                      cy="82"
                      r="8"
                      fill="#D4AF37"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 3.2, duration: 0.6 }}
                      style={{ transformOrigin: '100px 82px' }}
                    />

                    {/* Sparkle Effects */}
                    <motion.circle
                      cx="60"
                      cy="70"
                      r="3"
                      fill="#FFFFFF"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ delay: 3.5, duration: 1.5, repeat: Infinity }}
                    />
                    <motion.circle
                      cx="140"
                      cy="80"
                      r="2"
                      fill="#FFFFFF"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ delay: 3.8, duration: 1.5, repeat: Infinity }}
                    />
                    <motion.circle
                      cx="100"
                      cy="50"
                      r="2.5"
                      fill="#FFFFFF"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ delay: 4, duration: 1.5, repeat: Infinity }}
                    />
                  </svg>

                  {/* Glow Effect Behind Rose */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.6, scale: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute w-48 h-48 md:w-64 md:h-64 bg-gold/20 rounded-full blur-3xl -z-10"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Revealed Message */}
          <AnimatePresence>
            {showMessage && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="max-w-xl mx-auto mt-8"
              >
                <div className="bg-white/60 backdrop-blur-xl border border-white/30 rounded-3xl p-8 md:p-10 shadow-2xl">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="font-playfair text-lg md:text-xl text-foreground leading-relaxed italic"
                  >
                    "I could have bought you a thousand roses, but they would all wither.
                    <br /><br />
                    So I coded this one.
                    <br /><br />
                    <span className="text-gold font-semibold not-italic">
                      It will bloom for you forever, just like my love.
                    </span>"
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="mt-6 text-primary font-playfair text-right"
                  >
                    — Tejash ❤️
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default EternalRose;
