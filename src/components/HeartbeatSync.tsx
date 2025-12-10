import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Wifi, WifiOff, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface PresenceState {
  isTouching: boolean;
  odys_id: string;
}

const HeartbeatSync = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [partnerOnline, setPartnerOnline] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [partnerTouching, setPartnerTouching] = useState(false);
  const [syncAchieved, setSyncAchieved] = useState(false);
  const [channel, setChannel] = useState<ReturnType<typeof supabase.channel> | null>(null);
  const [userId] = useState(() => `user_${Math.random().toString(36).substr(2, 9)}`);

  const isSynced = isTouching && partnerTouching;

  // Trigger vibration when synced
  useEffect(() => {
    if (isSynced && !syncAchieved) {
      setSyncAchieved(true);
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 200]);
      }
    }
  }, [isSynced, syncAchieved]);

  // Reset sync achieved when both release
  useEffect(() => {
    if (!isTouching && !partnerTouching) {
      setSyncAchieved(false);
    }
  }, [isTouching, partnerTouching]);

  useEffect(() => {
    const ch = supabase.channel('heartbeat-room', {
      config: {
        presence: {
          key: userId,
        },
      },
    });

    ch
      .on('presence', { event: 'sync' }, () => {
        const state = ch.presenceState();
        const users = Object.values(state).flat() as unknown as PresenceState[];
        const otherUsers = users.filter((u) => u.odys_id !== userId);
        
        setPartnerOnline(otherUsers.length > 0);
        setPartnerTouching(otherUsers.some((u) => u.isTouching));
      })
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        console.log('User joined:', newPresences);
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        console.log('User left:', leftPresences);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          setIsConnected(true);
          setChannel(ch);
          await ch.track({ isTouching: false, odys_id: userId });
        }
      });

    return () => {
      supabase.removeChannel(ch);
    };
  }, [userId]);

  const handleTouchStart = useCallback(async () => {
    setIsTouching(true);
    if (channel) {
      await channel.track({ isTouching: true, odys_id: userId });
    }
  }, [channel, userId]);

  const handleTouchEnd = useCallback(async () => {
    setIsTouching(false);
    if (channel) {
      await channel.track({ isTouching: false, odys_id: userId });
    }
  }, [channel, userId]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 transition-all duration-1000"
        animate={{
          background: isSynced
            ? 'radial-gradient(ellipse at center, rgba(244,63,94,0.3) 0%, rgba(15,23,42,1) 70%)'
            : 'radial-gradient(ellipse at center, rgba(244,63,94,0.05) 0%, rgba(15,23,42,1) 70%)',
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-rose-400/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              y: [null, -100],
              opacity: [0.3, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 px-4">
        {/* Connection Status */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          {isConnected ? (
            <Wifi className="w-5 h-5 text-emerald-400" />
          ) : (
            <WifiOff className="w-5 h-5 text-rose-400" />
          )}
          <span className="text-sm font-light tracking-wide text-white/60">
            {!isConnected
              ? 'Connecting...'
              : partnerOnline
              ? '✨ Partner Connected'
              : 'Waiting for partner...'}
          </span>
          {partnerOnline && (
            <motion.div
              className="w-2 h-2 bg-emerald-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-light tracking-widest text-white/90 text-center"
        >
          Heartbeat Sync
        </motion.h2>

        {/* Heart Container */}
        <div className="relative flex items-center justify-center gap-16">
          {/* My Heart Indicator */}
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                isTouching ? 'bg-rose-500 shadow-lg shadow-rose-500/50' : 'bg-white/20'
              }`}
              animate={isTouching ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.5, repeat: isTouching ? Infinity : 0 }}
            />
            <span className="text-xs text-white/40 tracking-wide">You</span>
          </motion.div>

          {/* Main Heart Button */}
          <motion.button
            className="relative w-40 h-40 md:w-52 md:h-52 flex items-center justify-center cursor-pointer touch-none select-none"
            onMouseDown={handleTouchStart}
            onMouseUp={handleTouchEnd}
            onMouseLeave={() => isTouching && handleTouchEnd()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            whileTap={{ scale: 0.95 }}
          >
            {/* Outer glow rings */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: isSynced
                  ? [
                      '0 0 60px 20px rgba(244,63,94,0.4)',
                      '0 0 80px 30px rgba(244,63,94,0.6)',
                      '0 0 60px 20px rgba(244,63,94,0.4)',
                    ]
                  : isTouching
                  ? '0 0 40px 10px rgba(244,63,94,0.3)'
                  : '0 0 20px 5px rgba(244,63,94,0.1)',
              }}
              transition={{ duration: 0.8, repeat: isSynced ? Infinity : 0 }}
            />

            {/* Heart Icon */}
            <motion.div
              animate={
                isSynced
                  ? {
                      scale: [1, 1.15, 1],
                    }
                  : isTouching
                  ? { scale: 1.1 }
                  : { scale: 1 }
              }
              transition={{
                duration: isSynced ? 0.6 : 0.3,
                repeat: isSynced ? Infinity : 0,
                ease: 'easeInOut',
              }}
            >
              <Heart
                className={`w-24 h-24 md:w-32 md:h-32 transition-all duration-300 ${
                  isSynced
                    ? 'text-rose-400 fill-rose-500 drop-shadow-[0_0_30px_rgba(244,63,94,0.8)]'
                    : isTouching
                    ? 'text-rose-400 fill-rose-500/50 drop-shadow-[0_0_20px_rgba(244,63,94,0.5)]'
                    : 'text-rose-300/60'
                }`}
              />
            </motion.div>

            {/* Sparkles when synced */}
            <AnimatePresence>
              {isSynced && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0.5, 1.5, 0.5],
                        x: Math.cos((i * Math.PI) / 3) * 80,
                        y: Math.sin((i * Math.PI) / 3) * 80,
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    >
                      <Sparkles className="w-5 h-5 text-rose-300" />
                    </motion.div>
                  ))}
                </>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Partner Heart Indicator */}
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                partnerTouching
                  ? 'bg-pink-400 shadow-lg shadow-pink-400/50'
                  : partnerOnline
                  ? 'bg-white/30'
                  : 'bg-white/10'
              }`}
              animate={partnerTouching ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.5, repeat: partnerTouching ? Infinity : 0 }}
            />
            <span className="text-xs text-white/40 tracking-wide">Her</span>
          </motion.div>
        </div>

        {/* Instruction Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-white/40 text-sm font-light tracking-wide text-center max-w-xs"
        >
          Hold the heart and feel our connection transcend distance
        </motion.p>

        {/* Sync Message Reveal */}
        <AnimatePresence>
          {syncAchieved && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[90%] max-w-md"
            >
              <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-rose-500/20 shadow-2xl shadow-rose-500/10">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-500/10 to-transparent" />
                <div className="relative flex flex-col items-center gap-3 text-center">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-8 h-8 text-rose-400" />
                  </motion.div>
                  <h3 className="text-xl font-light tracking-wide text-rose-200">
                    Perfect Synchronization
                  </h3>
                  <p className="text-white/60 font-light italic leading-relaxed">
                    "Distance means nothing when you mean everything."
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HeartbeatSync;
