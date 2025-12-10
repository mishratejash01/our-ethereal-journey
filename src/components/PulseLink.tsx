import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export const PulseLink = () => {
  const [clickCount, setClickCount] = useState(0);
  const [isOnline, setIsOnline] = useState(false);
  const [lastReceived, setLastReceived] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      const { data } = await supabase.from('love_clicks').select('count').single();
      if (data) setClickCount(data.count);
    };
    fetchCount();

    const channel = supabase.channel('love_room')
      .on('broadcast', { event: 'heartbeat' }, () => {
        setLastReceived(Date.now());
        setClickCount((prev) => prev + 1);
        triggerHeartAnimation();
        
        toast("She is thinking of you!", {
          icon: '❤️',
          style: { background: '#fff0f5', color: '#e11d48', border: '1px solid #fecdd3' },
          duration: 3000
        });
      })
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const users = Object.keys(state).length;
        setIsOnline(users > 1);
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
    setClickCount((prev) => prev + 1);
    triggerHeartAnimation();

    const channel = supabase.channel('love_room');
    await channel.send({
      type: 'broadcast',
      event: 'heartbeat',
      payload: { from: 'me' }
    });

    const { data } = await supabase.from('love_clicks').select('id, count').single();
    if (data) {
        await supabase.from('love_clicks').update({ count: data.count + 1 }).eq('id', data.id);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-rose-50/30 dark:from-slate-950 dark:to-slate-900">
      <div className="container px-4 mx-auto relative z-10">
        <div className="relative w-full max-w-md mx-auto p-6 text-center">
          <div id="heart-container" className="fixed inset-0 pointer-events-none overflow-hidden" />

          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              backgroundColor: isOnline ? "rgba(34, 197, 94, 0.1)" : "rgba(100, 116, 139, 0.1)",
              borderColor: isOnline ? "rgba(34, 197, 94, 0.3)" : "rgba(100, 116, 139, 0.2)"
            }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-12 backdrop-blur-sm transition-all duration-500"
          >
            <div className="relative">
              <div className={cn("w-2.5 h-2.5 rounded-full", isOnline ? "bg-green-500" : "bg-slate-400")} />
              {isOnline && <div className="absolute inset-0 rounded-full bg-green-500 animate-ping" />}
            </div>
            <span className={cn("text-xs font-medium tracking-wide", isOnline ? "text-green-600" : "text-slate-500")}>
              {isOnline ? "She is here with you" : "Waiting for her..."}
            </span>
          </motion.div>

          <div className="relative group cursor-pointer mb-12" onClick={sendHeartbeat}>
            <div className="absolute inset-0 bg-rose-500/20 rounded-full blur-3xl group-hover:bg-rose-500/30 transition-all duration-500 scale-75 group-hover:scale-110" />
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-40 h-40 mx-auto bg-gradient-to-br from-rose-400 to-rose-600 rounded-full shadow-[0_10px_40px_-10px_rgba(225,29,72,0.5)] flex items-center justify-center text-white border-4 border-rose-200/30 z-10"
            >
              <Heart className="w-16 h-16 fill-rose-100/20 animate-pulse" />
            </motion.button>
            
            <div className="mt-6 space-y-1">
              <h3 className="text-2xl font-serif text-slate-800 dark:text-slate-200">
                Send a Heartbeat
              </h3>
              <p className="text-slate-400 text-sm">
                Tap to tell her you miss her
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-rose-100 dark:border-rose-900/30 shadow-sm">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Total Misses</p>
              <p className="text-2xl font-bold text-rose-500 tabular-nums">
                {clickCount.toLocaleString()}
              </p>
            </div>
            
            <div className="p-4 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-rose-100 dark:border-rose-900/30 shadow-sm">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Last Sync</p>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                {lastReceived ? 'Just now' : 'Wait...'}
              </p>
            </div>
          </div>

          <AnimatePresence>
            {lastReceived && Date.now() - lastReceived < 2000 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1, y: -20 }}
                className="absolute top-0 left-0 right-0 z-20 pointer-events-none flex justify-center"
              >
                <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-lg border border-rose-100 dark:border-rose-900 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium text-rose-600">Miss You!</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
