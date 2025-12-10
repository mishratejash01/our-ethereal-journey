import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useRef } from 'react';

const videoCards = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=711&fit=crop',
    title: 'First Date Magic',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400&h=711&fit=crop',
    title: 'Adventures Together',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=711&fit=crop',
    title: 'Stolen Moments',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=711&fit=crop',
    title: 'Forever Us',
  },
];

const VisualPoetry = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            Visual <span className="italic text-primary">Poetry</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl font-light">
            Moments captured in time
          </p>
        </motion.div>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-6 pb-8 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Left Spacer */}
        <div className="flex-shrink-0 w-[calc(50vw-200px)] hidden md:block" />

        {videoCards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex-shrink-0 snap-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative w-[280px] md:w-[320px] aspect-[9/16] rounded-3xl overflow-hidden cursor-pointer group"
            >
              {/* Glassmorphism Background */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl" />
              
              {/* Image */}
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] object-cover rounded-2xl"
              />

              {/* Overlay */}
              <div className="absolute inset-2 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Play Button */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center border border-white/40">
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white ml-1" />
                </div>
              </motion.div>

              {/* Title */}
              <div className="absolute bottom-6 left-6 right-6">
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-white font-playfair text-xl md:text-2xl italic opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  {card.title}
                </motion.p>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
            </motion.div>
          </motion.div>
        ))}

        {/* Right Spacer */}
        <div className="flex-shrink-0 w-[calc(50vw-200px)] hidden md:block" />
      </div>
    </section>
  );
};

export default VisualPoetry;
