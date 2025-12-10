import { motion } from 'framer-motion';
import { useState } from 'react';

interface PhotoItemProps {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
}

const PhotoItem = ({ src, alt, className = '', delay = 0 }: PhotoItemProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ y: -10, scale: 1.02 }}
      className={`relative overflow-hidden rounded-2xl group cursor-pointer ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
      
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        onLoad={() => setIsLoaded(true)}
        style={{ opacity: isLoaded ? 1 : 0 }}
      />
      
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute bottom-4 left-4 right-4 z-20"
      >
        <p className="text-primary-foreground text-sm font-medium">
          {alt}
        </p>
      </motion.div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 shadow-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
};

const PhotoGallery = () => {
  const photos = [
    { src: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80", alt: "Together Forever", className: "row-span-2" },
    { src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&q=80", alt: "Sweet Moments" },
    { src: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=600&q=80", alt: "Adventure Awaits" },
    { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80", alt: "Sunset Love", className: "col-span-2" },
    { src: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=600&q=80", alt: "Hand in Hand" },
    { src: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=600&q=80", alt: "Our Story" },
    { src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600&q=80", alt: "Celebration", className: "col-span-2" },
    { src: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=600&q=80", alt: "Pure Joy" },
  ];

  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto auto-rows-[200px] md:auto-rows-[250px]">
          {photos.map((photo, index) => (
            <PhotoItem
              key={index}
              {...photo}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
