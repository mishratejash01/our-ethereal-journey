import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Music, Play, Pause, Volume2 } from 'lucide-react';

const MusicPlayer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <motion.div
        layout
        onClick={() => setIsExpanded(!isExpanded)}
        className="glass-card rounded-full cursor-pointer overflow-hidden shadow-lifted hover:shadow-glow transition-shadow duration-500"
      >
        <motion.div 
          layout
          className="flex items-center gap-3 p-3 md:p-4"
        >
          {/* Music Icon with pulse effect */}
          <motion.div
            animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary to-rose flex items-center justify-center flex-shrink-0"
          >
            <Music className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
          </motion.div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-4 overflow-hidden"
              >
                <div className="whitespace-nowrap">
                  <p className="font-display text-sm text-foreground">Our Song</p>
                  <p className="text-xs text-muted-foreground">Perfect - Ed Sheeran</p>
                </div>

                {/* Play/Pause Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlaying(!isPlaying);
                  }}
                  className="w-8 h-8 rounded-full bg-foreground/10 hover:bg-foreground/20 flex items-center justify-center transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 text-foreground" />
                  ) : (
                    <Play className="w-4 h-4 text-foreground ml-0.5" />
                  )}
                </motion.button>

                {/* Volume indicator */}
                <div className="flex items-center gap-1">
                  <Volume2 className="w-4 h-4 text-muted-foreground" />
                  <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary rounded-full"
                      initial={{ width: '70%' }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Sound wave animation when playing */}
        <AnimatePresence>
          {isPlaying && isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -bottom-1 left-0 right-0 flex justify-center gap-0.5 pb-2"
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-0.5 bg-primary rounded-full"
                  animate={{
                    height: [4, 12, 4],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default MusicPlayer;
