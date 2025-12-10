import { motion } from 'framer-motion';
import { Heart, Plane, Sparkles } from 'lucide-react';

interface TimelineItemProps {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isLeft?: boolean;
  delay?: number;
}

const TimelineItem = ({ date, title, description, icon, isLeft = true, delay = 0 }: TimelineItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay }}
      className={`flex items-center gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}
    >
      {/* Content Card */}
      <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'} text-center`}>
        <div className="glass-card rounded-2xl p-8 hover:shadow-lifted transition-all duration-500 group">
          <span className="inline-block px-3 py-1 rounded-full bg-rose-light/50 text-primary text-sm font-medium mb-4">
            {date}
          </span>
          <h3 className="font-display text-2xl md:text-3xl text-foreground mb-3 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Center Icon */}
      <div className="relative z-10 flex-shrink-0">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-rose flex items-center justify-center shadow-glow"
        >
          <span className="text-primary-foreground">{icon}</span>
        </motion.div>
      </div>

      {/* Spacer for opposite side */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
};

const Timeline = () => {
  const milestones = [
    {
      date: "December 11, 2022",
      title: "The Beginning",
      description: "The day two souls found each other. A simple 'hello' that turned into forever. The start of our beautiful love story.",
      icon: <Heart className="w-6 h-6" />,
    },
    {
      date: "Our First Adventure",
      title: "Making Memories",
      description: "Every trip, every laugh, every shared sunset became a treasure. We learned that home isn't a place—it's being with each other.",
      icon: <Plane className="w-6 h-6" />,
    },
    {
      date: "December 11, 2025",
      title: "3 Years Strong",
      description: "Still falling for you every single day. Three years of love, growth, and countless beautiful moments. Here's to forever.",
      icon: <Sparkles className="w-6 h-6" />,
    },
  ];

  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-light/10 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-rose-light/50 text-primary font-medium text-sm tracking-widest uppercase mb-6">
            Our Story
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground">
            The <span className="italic text-primary">Journey</span> So Far
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden md:block" />

          <div className="space-y-16 md:space-y-24">
            {milestones.map((milestone, index) => (
              <TimelineItem
                key={index}
                {...milestone}
                isLeft={index % 2 === 0}
                delay={index * 0.2}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
