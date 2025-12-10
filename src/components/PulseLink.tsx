import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Wifi, User, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export const PulseLink = () => {
  const [clickCount, setClickCount] = useState(0);
  const [isOnline, setIsOnline] = useState(false); // Tracks if she is online
  const [presenceCount, setPresenceCount] = useState(0);
  const [lastReceived, setLastReceived] = useState<number | null>(null);
  
  // Audio for the heartbeat sound (optional)
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // 1. Fetch initial count (If table exists)
    const fetchCount = async () => {
      const { data } = await supabase.from('love_clicks').select('count').single();
      if (data) setClickCount(data.count);
    };
    fetchCount();

    // 2. Realtime Subscription
    const channel = supabase.channel('love_room')
      .on('broadcast', { event: 'heartbeat' }, (payload) => {
        // RECEIVED A HEARTBEAT FROM HER
        setLastReceived(Date.now());
        setClickCount((prev) => prev + 1);
        triggerHeartAnimation();
        
        toast("She is thinking of you!", {
          icon: '❤️',
          style: { background: '#fff0f5', color: '#e11d48' },
          duration: 3000
        });
      })
      .on('presence', { event: 'sync' }, () => {
        // TRACK ONLINE STATUS
        const state = channel.presenceState();
        const users = Object.keys(state).length;
        setPresenceCount(users);
        setIsOnline(users > 1); // If more than 1 person, she is here!
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ online_at: new Date().toISOString() });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Function to show floating hearts on screen
  const triggerHeartAnimation = () => {
    const container = document.getElementById('heart-container');
    if (!container) return;

    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.className = 'fixed text-4xl animate-float-up pointer-events-none z-50';
    heart.style.left = Math.random() * 80 + 10 + '%';
    heart.style.bottom = '100px';
    container.appendChild(heart);

    setTimeout(() => heart.remove(), 2000);
  };

  const sendHeartbeat = async () => {
    // 1. Optimistic Update
    setClickCount((prev) => prev + 1);
    triggerHeartAnimation();

    // 2. Broadcast to Her
    const channel = supabase.channel('love_room');
    await channel.send({
      type: 'broadcast',
      event: 'heartbeat',
      payload: { from: 'me' }
    });

    // 3. Update DB (Fire and forget)
    // This increments the permanent counter in the background
    await supabase.rpc('increment_love_count'); // Assumes you made an RPC or just update table directly
    // Simple table update fallback:
    const { data } = await supabase.from('love_clicks').select('count').single();
    if (data) {
        await supabase.from('love_clicks').update({ count: data.count + 1 }).eq('id', data.id); // Note: In real prod, use RPC for atomicity
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto p-6 text-center">
      {/* Invisible Container for Flying Hearts */}
      <div id="heart-container" className="fixed inset-0 pointer-events-none overflow-hidden" />

      {/* Online Status Indicator */}
      <motion.div 
        animate={{ 
          backgroundColor: isOnline ? "rgba(34, 197, 94, 0.1)" : "rgba(100, 116, 139, 0.1)",
          borderColor: isOnline ? "rgba(34, 197, 94, 0.3)" : "rgba(100, 116, 139, 0.2)"
        }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8 backdrop-blur-sm transition-colors duration-500"
      >
        <div className="relative">
          <div className={cn("w-2.5 h-2.5 rounded-full", isOnline ? "bg-green-500" : "bg-slate-400")} />
          {isOnline && <div className="absolute inset-0 rounded-full bg-green-500 animate-ping" />}
        </div>
        <span className={cn("text-xs font-medium tracking-wide", isOnline ? "text-green-600" : "text-slate-500")}>
          {isOnline ? "She is here with you" : "Waiting for her..."}
        </span>
      </motion.div>

      {/* The Main Heart Button */}
      <div className="relative group cursor-pointer" onClick={sendHeartbeat}>
        {/* Ripple Effects */}
        <div className="absolute inset-0 bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/20 transition-all duration-500 scale-75 group-hover:scale-110" />
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-40 h-40 mx-auto bg-gradient-to-br from-rose-400 to-rose-600 rounded-full shadow-[0_10px_40px_-10px_rgba(225,29,72,0.5)] flex items-center justify-center text-white border-4 border-rose-200/30 z-10"
        >
          <Heart className="w-16 h-16 fill-rose-100/20 animate-pulse" />
        </motion.button>
        
        {/* Helper Text */}
        <div className="mt-6 space-y-1">
          <h3 className="text-2xl font-display text-slate-800">
            Send a Heartbeat
          </h3>
          <p className="text-slate-400 text-sm">
            Tap to tell her you miss her
          </p>
        </div>
      </div>

      {/* The Counter */}
      <div className="mt-12 grid grid-cols-2 gap-4">
        <div className="p-4 bg-white/50 rounded-2xl border border-rose-100 shadow-sm">
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Total Misses</p>
          <p className="text-2xl font-bold text-rose-500 tabular-nums">
            {clickCount.toLocaleString()}
          </p>
        </div>
        
        <div className="p-4 bg-white/50 rounded-2xl border border-rose-100 shadow-sm">
           <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Last Sync</p>
           <p className="text-sm font-medium text-slate-600">
             {lastReceived ? 'Just now' : 'Wait...'}
           </p>
        </div>
      </div>

      {/* Received Animation Overlay */}
      <AnimatePresence>
        {lastReceived && Date.now() - lastReceived < 2000 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
          >
            <div className="bg-white px-4 py-2 rounded-full shadow-lg border border-rose-100 flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium text-rose-600">Miss You!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
