import HeroSection from '@/components/HeroSection';
import LoveCounter from '@/components/LoveCounter';
import VisualPoetry from '@/components/VisualPoetry';
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
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Main Content */}
      <div className="relative z-10">
        <HeroSection />
        <LoveCounter />
        <VisualPoetry />
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
