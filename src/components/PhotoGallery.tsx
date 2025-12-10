import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { X, Play, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';

interface Memory {
  id: string;
  title: string | null;
  description: string | null;
  file_path: string;
  file_type: string;
  storage_url: string | null;
  display_order: number | null;
  aspect_ratio: string | null;
}

interface MediaCardProps {
  memory: Memory;
  index: number;
  onClick: () => void;
}

const MediaCard = ({ memory, index, onClick }: MediaCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const isVideo = memory.file_type === 'video';
  
  // Get the public URL from Supabase storage
  const getMediaUrl = () => {
    if (memory.storage_url) return memory.storage_url;
    // Using file_path directly as we are fetching from the bucket root
    const { data } = supabase.storage.from('IMAGES').getPublicUrl(memory.file_path);
    return data.publicUrl;
  };

  // Get the specific fallback image from Supabase to replace broken/black placeholders
  const { data: fallbackData } = supabase.storage.from('IMAGES').getPublicUrl('IMG-20251210-WA0065.jpg');
  const fallbackUrl = fallbackData.publicUrl;

  const placeholderImages = [
    fallbackUrl,
    fallbackUrl
  ];

  const [imgSrc, setImgSrc] = useState(getMediaUrl());

  const handleImageError = () => {
    setImgSrc(placeholderImages[index % placeholderImages.length]);
  };

  // Determine grid span based on aspect ratio
  const getGridClass = () => {
    switch (memory.aspect_ratio) {
      case 'portrait':
        return 'row-span-2';
      case 'landscape':
        return 'col-span-2';
      default:
        return '';
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl cursor-pointer group ${getGridClass()}`}
    >
      {/* Glassmorphism container */}
      <div className="absolute inset-0 bg-background/5 backdrop-blur-sm border border-border/20 rounded-2xl z-0" />
      
      {/* Glow effect on hover */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-rose-light/30 to-gold/30 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 -z-10"
        animate={{ opacity: isHovered ? 0.6 : 0 }}
      />

      {/* Media content */}
      <div className="relative h-full min-h-[200px] md:min-h-[250px] overflow-hidden rounded-2xl">
        {isVideo ? (
          <video
            ref={videoRef}
            src={imgSrc}
            muted
            loop
            playsInline
            className="w-full h-full object-cover transition-transform duration-700"
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          />
        ) : (
          <>
            <motion.img
              src={imgSrc}
              alt={memory.title || 'Memory'}
              className="w-full h-full object-cover"
              onLoad={() => setIsLoaded(true)}
              onError={handleImageError}
              style={{ 
                opacity: isLoaded ? 1 : 0,
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.7s ease-out, opacity 0.3s ease-out'
              }}
            />
            {!isLoaded && (
              <div className="absolute inset-0 bg-muted animate-pulse" />
            )}
          </>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Play icon for videos */}
        {isVideo && !isHovered && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-background/30 backdrop-blur-md flex items-center justify-center border border-border/30">
              <Play className="w-6 h-6 text-primary-foreground fill-primary-foreground ml-1" />
            </div>
          </div>
        )}

        {/* Title overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 p-4 z-20"
        >
          <p className="text-primary-foreground font-display text-lg font-medium drop-shadow-lg truncate">
            {memory.title}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Skeleton loader matching masonry layout
const GallerySkeleton = () => {
  const skeletonPatterns = [
    'row-span-2', '', '', 'col-span-2', '', '', 'col-span-2', ''
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto auto-rows-[200px] md:auto-rows-[250px]">
      {skeletonPatterns.map((pattern, index) => (
        <Skeleton 
          key={index} 
          className={`rounded-2xl bg-muted/50 ${pattern}`}
        />
      ))}
    </div>
  );
};

// Lightbox component
interface LightboxProps {
  memory: Memory | null;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

const Lightbox = ({ memory, isOpen, onClose, onNext, onPrev, hasNext, hasPrev }: LightboxProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const getMediaUrl = (mem: Memory) => {
    if (mem.storage_url) return mem.storage_url;
    const { data } = supabase.storage.from('IMAGES').getPublicUrl(mem.file_path);
    return data.publicUrl;
  };

  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    if (memory) {
      setImgSrc(getMediaUrl(memory));
    }
  }, [memory]);

  if (!memory) return null;

  const isVideo = memory.file_type === 'video';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-background/95 backdrop-blur-xl border-border/30 overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center min-h-[60vh]">
          {/* Close button */}
          <DialogClose className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-background/50 backdrop-blur-md flex items-center justify-center border border-border/30 hover:bg-background/80 transition-colors">
            <X className="w-5 h-5 text-foreground" />
          </DialogClose>

          {/* Navigation buttons */}
          {hasPrev && (
            <button
              onClick={onPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-background/50 backdrop-blur-md flex items-center justify-center border border-border/30 hover:bg-background/80 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
          )}
          {hasNext && (
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-background/50 backdrop-blur-md flex items-center justify-center border border-border/30 hover:bg-background/80 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-foreground" />
            </button>
          )}

          {/* Media content */}
          <div className="w-full h-full flex items-center justify-center p-8">
            {isVideo ? (
              <div className="relative">
                <video
                  ref={videoRef}
                  src={imgSrc}
                  controls
                  autoPlay
                  muted={isMuted}
                  className="max-w-full max-h-[80vh] rounded-xl"
                />
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-background/50 backdrop-blur-md flex items-center justify-center border border-border/30"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-foreground" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-foreground" />
                  )}
                </button>
              </div>
            ) : (
              <img
                src={imgSrc}
                alt={memory.title || 'Memory'}
                className="max-w-full max-h-[80vh] object-contain rounded-xl"
              />
            )}
          </div>

          {/* Title bar */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/80 to-transparent">
            <h3 className="font-display text-2xl text-foreground text-center">{memory.title}</h3>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const PhotoGallery = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        // Fetch direct list from Storage bucket "IMAGES"
        // Increased limit to 200 to handle your 80+ photos
        const { data, error } = await supabase
          .storage
          .from('IMAGES')
          .list('', {
            limit: 200,
            offset: 0,
            sortBy: { column: 'created_at', order: 'desc' },
          });

        if (error) throw error;

        // Filter out system files
        const files = data?.filter(file => file.name !== '.emptyFolderPlaceholder') || [];

        // Map storage files to Memory objects
        // Create an automatic layout pattern: Portrait, Square, Square, Landscape, Square...
        const patterns = ['portrait', 'square', 'square', 'landscape', 'square', 'portrait', 'square', 'landscape'];
        
        const memoriesData: Memory[] = files.map((file, index) => {
          const isVideo = file.metadata?.mimetype?.startsWith('video');
          // Fallback title from filename
          const titleName = file.name.split('.').slice(0, -1).join('.').replace(/[-_]/g, ' ');

          return {
            id: file.id,
            title: titleName, 
            description: null,
            file_path: file.name,
            file_type: isVideo ? 'video' : 'image',
            storage_url: null,
            display_order: index,
            aspect_ratio: patterns[index % patterns.length],
          };
        });

        setMemories(memoriesData);
      } catch (error) {
        console.error('Error fetching memories from storage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMemories();
  }, []);

  const handleOpenLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedIndex(null);
  };

  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < memories.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-light/5 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-gold-light/50 text-secondary-foreground font-medium text-sm tracking-widest uppercase mb-6">
            Gallery
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            Captured <span className="italic text-primary">Moments</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Capturing our forever, one frame at a time
          </p>
        </motion.div>

        {/* Masonry Grid */}
        {/* Added grid-flow-dense to fill gaps created by mixed aspect ratios */}
        {isLoading ? (
          <GallerySkeleton />
        ) : memories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto auto-rows-[200px] md:auto-rows-[250px] grid-flow-dense">
            {memories.map((memory, index) => (
              <MediaCard
                key={memory.id}
                memory={memory}
                index={index}
                onClick={() => handleOpenLightbox(index)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No photos found in the IMAGES bucket.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        memory={selectedIndex !== null ? memories[selectedIndex] : null}
        isOpen={selectedIndex !== null}
        onClose={handleCloseLightbox}
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={selectedIndex !== null && selectedIndex < memories.length - 1}
        hasPrev={selectedIndex !== null && selectedIndex > 0}
      />
    </section>
  );
};

export default PhotoGallery;
