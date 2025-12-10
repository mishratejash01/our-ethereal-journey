import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Frown, Sun, CloudRain, Moon, Sparkles, X } from 'lucide-react';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

// You should customize these messages with your own personal words!
const cards = [
  {
    id: 'miss',
    title: "Open when you miss me",
    icon: CloudRain,
    color: "bg-blue-100 text-blue-600",
    content: "My love, whenever you miss me, just look at the moon. I'm looking at it too. Close your eyes and feel my hand in yours. I am always with you in spirit, cheering you on and loving you more than words can say. We'll be together soon.",
    decoration: "🌙"
  },
  {
    id: 'sad',
    title: "Open when you feel sad",
    icon: Frown,
    color: "bg-indigo-100 text-indigo-600",
    content: "I hate that you're sad, but it's okay to not be okay sometimes. I wish I could hug you right now. Remember that this feeling is temporary, but my love for you is permanent. You are stronger than you know, and I'm so proud of you.",
    decoration: "🌧️"
  },
  {
    id: 'happy',
    title: "Open when you're happy",
    icon: Sun,
    color: "bg-amber-100 text-amber-600",
    content: "Seeing you happy is my favorite thing in the world! Your smile lights up my life. I hope you capture this moment and keep it in your heart. You deserve all the joy in the universe.",
    decoration: "☀️"
  },
  {
    id: 'fight',
    title: "Open when we fight",
    icon: Moon,
    color: "bg-stone-100 text-stone-600",
    content: "I'm sorry we're fighting. Even in this moment, I want you to know that I love you more than our argument. We are a team, and we can get through anything. Let's take a deep breath and fix this together.",
    decoration: "🕊️"
  },
  {
    id: 'doubt',
    title: "Open when you doubt yourself",
    icon: Sparkles,
    color: "bg-purple-100 text-purple-600",
    content: "Stop right there. You are incredible. You are capable, intelligent, and beautiful. Don't let your mind play tricks on you. I see your worth, and it is infinite. You've got this!",
    decoration: "✨"
  },
  {
    id: 'love',
    title: "Open when you need love",
    icon: Heart,
    color: "bg-rose-100 text-rose-600",
    content: "I love you. I love you in the morning, in the middle of the day, in the hours we are together and the hours we are apart. You are my everything, my best friend, and my soulmate. Never forget that.",
    decoration: "❤️"
  }
];

const OpenWhen = () => {
  const [selectedCard, setSelectedCard] = useState<typeof cards[0] | null>(null);

  return (
    <section className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-rose-100/30 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-blue-100/30 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-rose-100 text-rose-500 font-medium text-sm tracking-widest uppercase mb-6 shadow-sm">
            Emotional Support
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-slate-800 mb-6">
            I'm Here <span className="italic text-rose-500">For You</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            I can't always be there physically, but I want to be there for every emotion. 
            Open these whenever you need me.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <motion.button
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCard(card)}
                className="w-full h-full text-left group relative"
              >
                <div className="absolute inset-0 bg-white rounded-2xl shadow-md transition-shadow duration-300 group-hover:shadow-xl" />
                
                {/* Envelope Flap Effect */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-slate-50/50 to-transparent rounded-t-2xl z-10" />
                
                <div className="relative z-20 p-8 flex flex-col h-full min-h-[220px]">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:rotate-12", card.color)}>
                    <card.icon className="w-7 h-7" />
                  </div>
                  
                  <h3 className="font-display text-2xl text-slate-800 mb-3 group-hover:text-rose-600 transition-colors">
                    {card.title}
                  </h3>
                  
                  <div className="mt-auto flex items-center gap-2 text-sm font-medium text-slate-400 group-hover:text-rose-500 transition-colors uppercase tracking-wider">
                    <Mail className="w-4 h-4" />
                    <span>Read Letter</span>
                  </div>
                </div>

                {/* Wax Seal Decoration */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                  </div>
                </div>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Letter Modal */}
      <Dialog open={!!selectedCard} onOpenChange={() => setSelectedCard(null)}>
        <DialogContent className="max-w-xl bg-[#FFFEF5] border-none p-0 overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            {selectedCard && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative"
              >
                {/* Header Decoration */}
                <div className={cn("h-32 w-full flex items-center justify-center relative overflow-hidden", selectedCard.color.split(' ')[0])}>
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
                  <selectedCard.icon className={cn("w-16 h-16 opacity-20 absolute -bottom-4 -right-4", selectedCard.color.split(' ')[1])} />
                  <span className="text-6xl animate-bounce">{selectedCard.decoration}</span>
                  
                  <DialogClose className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/30 hover:bg-white/50 flex items-center justify-center transition-colors">
                    <X className="w-4 h-4 text-slate-700" />
                  </DialogClose>
                </div>

                <div className="p-8 md:p-10 text-center">
                  <h3 className="font-display text-2xl md:text-3xl text-slate-800 mb-6">
                    {selectedCard.title}
                  </h3>
                  
                  <div className="relative">
                    <span className="absolute -top-4 -left-2 text-6xl text-slate-100 font-serif leading-none">"</span>
                    <p className="text-lg md:text-xl text-slate-600 font-serif leading-relaxed italic relative z-10">
                      {selectedCard.content}
                    </p>
                    <span className="absolute -bottom-8 -right-2 text-6xl text-slate-100 font-serif leading-none">"</span>
                  </div>

                  <div className="mt-10 pt-6 border-t border-slate-100">
                    <p className="font-display text-sm tracking-widest text-slate-400 uppercase">
                      With all my love
                    </p>
                    <p className="font-signature text-3xl text-rose-500 mt-2">
                      Tejash
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default OpenWhen;
