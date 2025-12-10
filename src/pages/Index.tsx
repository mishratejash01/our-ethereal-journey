import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import { Heart, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HeroSection from '@/components/HeroSection';
import LoveCounter from '@/components/LoveCounter';
import { PulseLink } from '@/components/PulseLink'; // Updated Import
import Timeline from '@/components/Timeline';
import TruthTest from '@/components/TruthTest';
import HeartbeatSync from '@/components/HeartbeatSync';
import ReasonGalaxy from '@/components/ReasonGalaxy';
import EternalRose from '@/components/EternalRose';
import RelationshipReceipt from '@/components/RelationshipReceipt';
import PhotoGallery from '@/components/PhotoGallery';
import LoveLetter from '@/components/LoveLetter';
import MusicPlayer from '@/components/MusicPlayer';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import OpenWhen from '@/components/OpenWhen';
import SkyOfWishes from '@/components/SkyOfWishes';

const Index = () => {
  const { user, loading, signOut, getUserRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth', { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Heart className="w-16 h-16 text-primary" fill="currentColor" />
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const role = getUserRole();

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* User Badge & Logout */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-4 right-4 z-50 flex items-center gap-3"
      >
        <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${role === 'her' ? 'bg-pink-500' : 'bg-blue-500'}`} />
          <span className="text-sm font-medium text-foreground">
            {role === 'her' ? 'Her 💕' : role === 'him' ? 'Him 💙' : 'Guest'}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={signOut}
          className="glass-card rounded-full h-10 w-10 hover:bg-destructive/20"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10">
        <HeroSection />
        <LoveCounter />
        
        {/* Replaced VisualPoetry with PulseLink */}
        <PulseLink />
        
        <Timeline />
        <TruthTest />
        <HeartbeatSync />
        <ReasonGalaxy />
        <EternalRose />
        <RelationshipReceipt />
        <PhotoGallery />
        <LoveLetter />
        <OpenWhen />
        <SkyOfWishes />
        <Footer />
      </div>

      {/* Floating Music Player */}
      <MusicPlayer />
    </main>
  );
};

export default Index;
