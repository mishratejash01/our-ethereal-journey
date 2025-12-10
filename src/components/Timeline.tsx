import { motion } from 'framer-motion';
import { Heart, Star, MapPin, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

const timelineEvents = [
  {
    date: "August 31, 2022",
    title: "Became Best Friends",
    description: "The day our souls recognized each other. We started as friends, sharing smiles and stories, unaware that this was just the beginning of our forever.",
    icon: Star,
  },
  {
    date: "December 11, 2022",
    title: "Came Together",
    description: "The moment friendship blossomed into love. We took the leap and decided to walk this path together, hand in hand.",
    icon: Heart,
  },
  {
    date: "Present",
    title: "We Are Here",
    description: "Still growing, still loving, and still writing our beautiful story. Every day with you is a new page in our ethereal journey.",
    icon: MapPin,
  },
];

const Timeline = () => {
  return (
    <section className="py-20 px-4 relative bg-gradient-to-b from-white/50 to-white/90 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 font-serif">Our Journey</h2>
          <p className="text-slate-600">From the first hello to forever</p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-rose-200 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={cn(
                  "relative flex items-start md:items-center gap-8",
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Icon Marker */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-rose-100 border-4 border-white shadow-lg flex items-center justify-center transform -translate-x-1/2 z-10">
                  <event.icon className="w-4 h-4 text-rose-500" />
                </div>

                {/* Content Card */}
                <div className={cn(
                  "ml-12 md:ml-0 w-full md:w-[calc(50%-2rem)]",
                  index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                )}>
                  <div className="bg-white p-6 rounded-xl shadow-md border border-rose-100 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center gap-2 text-rose-500 text-sm font-semibold mb-2">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2 font-serif">{event.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      {event.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
