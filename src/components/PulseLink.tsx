import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Zap, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth'; // Import Auth to know who is who
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export const PulseLink = () => {
  const { getUserRole } = useAuth();
  const role = getUserRole(); // 'him' | 'her' | 'guest'
  
  // State for both counters
  const [counts, setCounts] = useState({ him: 0, her: 0 });
  const [isPartnerOnline, setIsPartnerOnline] = useState(false);
  const [lastReceived, setLastReceived] = useState<number | null>(null);

  // Determine whose stats to SHOW (Opposite of who I am)
  // If I am 'him', I want to see how much 'her' missed me (her_count).
  // If I am 'her', I want to see how much 'him' missed me (him_count).
  const displayCount = role === 'him' ? counts.her : counts.him;
  const mySentCount = role === 'him' ? counts.him : counts.her;

  useEffect(() => {
    // 1. Fetch initial counts
    const fetchCounts = async () => {
      const { data } = await supabase.from('love_clicks').select('him_count, her_count').single();
      if (data) {
        setCounts({ him: data.him_count, her: data.her_count });
      }
    };
    fetchCounts();

    // 2. Realtime Subscription
    const channel = supabase.channel('love_room')
      .on('broadcast', { event: 'heartbeat' }, ({ payload }) => {
        // payload.from will be 'him' or 'her'
        setLastReceived(Date.now());
        
        // Update local state immediately
        setCounts(prev => ({
          ...prev,
          [payload.from]: prev[payload.from as keyof typeof prev] + 1
        }));

        // If the heartbeat is meant FOR ME (e.g. I am 'her' and 'him' sent it)
        if (payload.from !== role) {
          triggerHeartAnimation();
          toast(payload.from === 'him' ? "He is missing you!" : "She is missing you!", {
            icon: '❤️',
            style: { background: '#fff0f5', color: '#e11d48', border: '1px solid #fecdd3' },
            duration: 3000
          });
        }
      })
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const users = Object.keys(state).length;
        setIsPartnerOnline(users > 1);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ 
            user: role, 
            online_at: new Date().toISOString() 
          });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [role]);

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
    if (!role || role === 'guest') {
      toast.error("You need to be logged in!");
      return;
    }

    // 1. Optimistic Update (Update MY count locally)
    setCounts(prev => ({
      ...prev,
      [role]: prev[role as keyof typeof prev] + 1
    }));
    
    // 2. Visuals
    triggerHeartAnimation();

    // 3. Broadcast to Partner
    const channel = supabase.channel('love_room');
    await channel.send({
      type: 'broadcast',
      event: 'heartbeat',
      payload: { from: role } // 'him' or 'her'
    });

    // 4. Update Database
    // We update the specific column based on role
    const { data } = await supabase.from('love_clicks').select('id, him_count, her_count').single();
    if (data) {
      const updateData = role === 'him' 
        ? { him_count: data.him_count + 1 }
        : { her_count: data.her_count + 1 };
        
      await supabase.from('love_clicks').update(updateData).eq('id', data.id);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-rose-50/30 dark:from-slate-950 dark:to-slate-900">
      <div className="container px-4 mx-auto relative z-10">
        <div className="relative w-full max-w-md mx-auto p-6 text-center">
          <div id="heart-container" className="fixed inset-0 pointer-events-none overflow-hidden" />

          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              backgroundColor: isPartnerOnline ? "rgba(34, 197, 94, 0.1)" : "rgba(100, 116, 139, 0.1)",
              borderColor: isPartnerOnline ? "rgba(34, 197, 94, 0.3)" : "rgba(100, 116, 139, 0.2)"
            }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-12 backdrop-blur-sm transition-all duration-500"
          >
            <div className="relative">
              <div className={cn("w-2.5 h-2.5 rounded-full", isPartnerOnline ? "bg-green-500" : "bg-slate-400")} />
              {isPartnerOnline && <div className="absolute inset-0 rounded-full bg-green-500 animate-ping" />}
            </div>
            <span className={cn("text-xs font-medium tracking-wide", isPartnerOnline ? "text-green-600" : "text-slate-500")}>
              {isPartnerOnline 
                ? (role === 'him' ? "She is here with you" : "He is here with you")
                : (role === 'him' ? "Waiting for her..." : "Waiting for him...")}
            </span>
          </motion.div>

          {/* Main Action Button */}
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
                Tap to tell {role === 'him' ? 'her' : 'him'} you miss {role === 'him' ? 'her' : 'him'}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Box 1: How much PARTNER missed ME */}
            <div className="p-4 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-rose-100 dark:border-rose-900/30 shadow-sm">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">
                {role === 'him' ? "She Missed You" : "He Missed You"}
              </p>
              <p className="text-2xl font-bold text-rose-500 tabular-nums">
                {displayCount.toLocaleString()}
              </p>
              <p className="text-[10px] text-slate-400">times</p>
            </div>
            
            {/* Box 2: How much I missed PARTNER */}
            <div className="p-4 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
               <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">
                 You Missed {role === 'him' ? 'Her' : 'Him'}
               </p>
               <p className="text-2xl font-bold text-slate-600 dark:text-slate-300 tabular-nums">
                 {mySentCount.toLocaleString()}
               </p>
               <p className="text-[10px] text-slate-400">times</p>
            </div>
          </div>

          {/* "Miss You" Popup Animation */}
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
                  <span className="text-sm font-medium text-rose-600">
                    {role === 'him' ? "She missed you!" : "He missed you!"}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
