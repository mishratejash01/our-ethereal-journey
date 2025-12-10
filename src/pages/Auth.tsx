import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Mail, Lock, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  
  // Ref to track if we are in the middle of a manual login
  const isManualLogin = useRef(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // If user is already logged in and we are NOT manually logging in (logging in via form), redirect.
      if (session?.user && !isManualLogin.current) {
        navigate('/', { replace: true });
      }
      setCheckingAuth(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user && !isManualLogin.current) {
        navigate('/', { replace: true });
      }
      setCheckingAuth(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const getUserRole = (email: string): string => {
    if (email === 'bakanksha171@gmail.com') return 'Her 💕';
    if (email === 'mtejash07@gmail.com') return 'Him 💙';
    return 'Guest';
  };

  const playLoginSound = async () => {
    try {
      console.log("Searching for sound in 'sound_bck'...");
      
      const { data: files, error } = await supabase
        .storage
        .from('sound_bck')
        .list();

      if (error) {
        console.error("Error listing sounds:", error);
        return;
      }

      if (files && files.length > 0) {
        // Find first valid file (ignoring folders)
        const soundFile = files.find(f => f.name !== '.emptyFolderPlaceholder');
        
        if (soundFile) {
          const { data } = supabase.storage
            .from('sound_bck')
            .getPublicUrl(soundFile.name);

          if (data.publicUrl) {
            console.log("Playing:", data.publicUrl);
            const audio = new Audio(data.publicUrl);
            audio.volume = 0.7;
            
            // Return a promise that resolves when audio starts playing
            return new Promise<void>((resolve) => {
              audio.onplay = () => resolve();
              audio.onerror = () => {
                console.error("Audio error");
                resolve(); // Resolve anyway to not block login
              };
              // Play and catch any auto-play errors
              audio.play().catch(e => {
                console.error("Autoplay blocked:", e);
                resolve();
              });
            });
          }
        }
      }
    } catch (err) {
      console.error("Sound playback failed:", err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    isManualLogin.current = true; // Prevents the useEffect from redirecting early

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
        isManualLogin.current = false;
      } else {
        // Success!
        toast({
          title: `Welcome back, ${getUserRole(email)}`,
          description: "Your love story awaits...",
        });

        // 1. Play sound
        await playLoginSound();

        // 2. Wait a tiny bit (1 second) so the sound is heard before page switch
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 1000);
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      isManualLogin.current = false;
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Heart className="w-12 h-12 text-primary" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
      {/* Background & Auth Card Code remains same as before... */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/10 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-card rounded-3xl p-8 shadow-2xl border border-border/50">
          <motion.div 
            className="flex flex-col items-center mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-16 h-16 text-primary" fill="currentColor" />
              </motion.div>
            </div>
            <h1 className="font-display text-3xl mt-4 text-foreground">Our Story</h1>
            <p className="text-muted-foreground text-sm mt-1">Welcome back, my love</p>
          </motion.div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11"
                  required
                />
              </div>
            </div>
            <Button type="submit" disabled={loading} className="w-full h-12 bg-primary text-primary-foreground rounded-xl">
              {loading ? <Loader2 className="animate-spin" /> : "Enter Our World"}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
