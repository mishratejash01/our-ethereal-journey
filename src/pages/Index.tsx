import HeroSection from '@/components/HeroSection';
import LoveCounter from '@/components/LoveCounter';
import Timeline from '@/components/Timeline';
import PhotoGallery from '@/components/PhotoGallery';
import LoveLetter from '@/components/LoveLetter';
import MusicPlayer from '@/components/MusicPlayer';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';

const Index = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Main Content */}
      <div className="relative z-10">
        <HeroSection />
        <LoveCounter />
        <Timeline />
        <PhotoGallery />
        <LoveLetter />
        <Footer />
      </div>

      {/* Floating Music Player */}
      <MusicPlayer />
    </main>
  );
};

export default Index;
