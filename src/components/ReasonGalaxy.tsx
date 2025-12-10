import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

const reasons = [
  "The way you crinkle your nose when you laugh",
  "How you support my dreams without hesitation",
  "Your morning voice that melts my heart",
  "The way you look at me when you think I'm not looking",
  "Your kindness to strangers",
  "How safe I feel with you",
  "Your infectious laughter",
  "The way you hold my hand",
  "How you make ordinary moments magical",
  "Your patience with my chaos",
  "The sparkle in your eyes",
  "How you remember the little things",
  "Your warm hugs that feel like home",
  "The way you dance when you're happy",
  "Your unwavering belief in us",
  "How you make me want to be better",
  "The way you say my name",
  "Your silly jokes that always make me smile",
  "How you know what I need before I do",
  "Your beautiful soul",
  "The way you steal my hoodies",
  "How you always save the last bite for me",
  "Your determination and strength",
  "The way you light up any room",
  "How you make my heart race after all this time",
  "Your midnight conversations with me",
  "The way you believe in love",
  "How you make me feel understood",
  "Your beautiful mind",
  "The way you fight for us",
  "How you complete my sentences",
  "Your gentle touch",
  "The way you look in the morning light",
  "How you never give up on me",
  "Your adventurous spirit",
  "The way you make me laugh until I cry",
  "How you are my best friend",
  "Your beautiful heart",
  "The way you love me unconditionally",
  "Simply because you are you"
];

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  reasonIndex: number;
}

const ReasonGalaxy = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<Star[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [currentReasonIndex, setCurrentReasonIndex] = useState(0);
  const [clickedStars, setClickedStars] = useState<Set<number>>(new Set());

  // Generate stars on mount
  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < 60; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 6, // 6-10px for mobile tappability
          delay: Math.random() * 5,
          duration: Math.random() * 3 + 4,
          reasonIndex: i % reasons.length
        });
      }
      setStars(newStars);
    };
    generateStars();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  }, []);

  const handleStarClick = (star: Star) => {
    setSelectedReason(reasons[star.reasonIndex]);
    setCurrentReasonIndex(star.reasonIndex);
    setClickedStars(prev => new Set([...prev, star.id]));
  };

  const handleNextStar = () => {
    const nextIndex = (currentReasonIndex + 1) % reasons.length;
    setCurrentReasonIndex(nextIndex);
    setSelectedReason(reasons[nextIndex]);
  };

  const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  const getConnectedStars = () => {
    const connections: { from: Star; to: Star }[] = [];
    const proximityThreshold = 15;

    stars.forEach((star, i) => {
      // Check mouse proximity
      const mouseDistance = getDistance(star.x, star.y, mousePos.x, mousePos.y);
      if (mouseDistance < proximityThreshold) {
        // Connect to nearby stars
        stars.slice(i + 1).forEach(otherStar => {
          const starDistance = getDistance(star.x, star.y, otherStar.x, otherStar.y);
          if (starDistance < 20) {
            connections.push({ from: star, to: otherStar });
          }
        });
      }
    });
    return connections;
  };

  const connections = getConnectedStars();

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden py-20"
      style={{
        background: 'linear-gradient(180deg, #0F172A 0%, #000000 50%, #0F172A 100%)'
      }}
    >
      {/* Header */}
      <div className="relative z-10 text-center mb-16 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-serif text-amber-200 mb-4"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          If I had a star for every reason I love you...
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-amber-100/60 italic"
        >
          ...I would hold the entire galaxy in my hands.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-sm text-amber-100/40 mt-4"
        >
          ✨ Click on a star to discover a reason ✨
        </motion.p>
      </div>

      {/* SVG for constellation lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-[1]">
        {connections.map((conn, i) => (
          <motion.line
            key={i}
            x1={`${conn.from.x}%`}
            y1={`${conn.from.y}%`}
            x2={`${conn.to.x}%`}
            y2={`${conn.to.y}%`}
            stroke="rgba(251, 191, 36, 0.3)"
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        ))}
      </svg>

      {/* Stars */}
      {stars.map((star) => {
        const isNearMouse = getDistance(star.x, star.y, mousePos.x, mousePos.y) < 15;
        const isClicked = clickedStars.has(star.id);

        return (
          <motion.button
            key={star.id}
            onClick={() => handleStarClick(star)}
            className="absolute rounded-full cursor-pointer z-10 focus:outline-none"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.4, 1, 0.4],
              scale: isNearMouse ? 1.8 : 1,
              boxShadow: isNearMouse
                ? '0 0 20px 8px rgba(251, 191, 36, 0.6)'
                : isClicked
                ? '0 0 15px 5px rgba(251, 191, 36, 0.4)'
                : '0 0 10px 3px rgba(251, 191, 36, 0.3)',
              backgroundColor: isClicked ? '#FCD34D' : '#FDE68A'
            }}
            transition={{
              opacity: {
                duration: star.duration,
                repeat: Infinity,
                delay: star.delay,
              },
              scale: { duration: 0.3 },
              boxShadow: { duration: 0.3 }
            }}
            whileHover={{ scale: 2 }}
            whileTap={{ scale: 2.5 }}
          />
        );
      })}

      {/* Reason Modal */}
      <AnimatePresence>
        {selectedReason && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedReason(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full p-8 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                boxShadow: '0 0 60px rgba(251, 191, 36, 0.2), inset 0 0 60px rgba(251, 191, 36, 0.05)'
              }}
            >
              {/* Sparkle decoration */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Sparkles className="w-6 h-6 text-amber-400" />
              </div>

              {/* Content */}
              <div className="text-center space-y-6">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-400/60">
                  Reason #{currentReasonIndex + 1} of {reasons.length}
                </p>
                
                <motion.p
                  key={currentReasonIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xl md:text-2xl text-amber-100 font-serif leading-relaxed"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  "{selectedReason}"
                </motion.p>

                <div className="flex gap-4 justify-center pt-4">
                  <motion.button
                    onClick={() => setSelectedReason(null)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 rounded-full bg-transparent border border-amber-400/30 text-amber-200 text-sm hover:bg-amber-400/10 transition-colors flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Close
                  </motion.button>
                  
                  <motion.button
                    onClick={handleNextStar}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black text-sm font-medium hover:from-amber-400 hover:to-amber-500 transition-colors flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Next Star
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-amber-300/30 rounded-full pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </section>
  );
};

export default ReasonGalaxy;
