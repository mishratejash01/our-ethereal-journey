import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const receiptItems = [
  { item: "Days Together", value: "1,095", dots: true },
  { item: "Arguments Won by You", value: "100%", dots: true },
  { item: "Patience Tested", value: "Limitless", dots: true },
  { item: "Late Night Talks", value: "∞", dots: true },
  { item: "Inside Jokes Created", value: "847", dots: true },
  { item: "Fries Stolen", value: "4,502", dots: true },
  { item: "Random 'I Love You's", value: "10,000+", dots: true },
  { item: "Forehead Kisses", value: "Countless", dots: true },
  { item: "Adventures Shared", value: "Memory Full", dots: true },
  { item: "My Happiness", value: "Priceless", dots: true },
];

const RelationshipReceipt = () => {
  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll animation
    const receipt = receiptRef.current;
    if (!receipt) return;

    let animationId: number;
    let scrollPos = 0;

    const animate = () => {
      scrollPos += 0.3;
      if (scrollPos >= receipt.scrollHeight - receipt.clientHeight) {
        scrollPos = 0;
      }
      receipt.scrollTop = scrollPos;
      animationId = requestAnimationFrame(animate);
    };

    // Start after delay
    const timeout = setTimeout(() => {
      animationId = requestAnimationFrame(animate);
    }, 2000);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-background to-background/80">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Receipt Paper Effect */}
          <div
            className="relative bg-[#FFFEF5] rounded-sm shadow-2xl overflow-hidden"
            style={{
              fontFamily: "'Courier New', Courier, monospace",
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Torn edge top */}
            <div 
              className="absolute top-0 left-0 right-0 h-4 bg-[#FFFEF5]"
              style={{
                clipPath: 'polygon(0% 100%, 2% 60%, 4% 100%, 6% 70%, 8% 100%, 10% 50%, 12% 100%, 14% 80%, 16% 100%, 18% 60%, 20% 100%, 22% 70%, 24% 100%, 26% 50%, 28% 100%, 30% 80%, 32% 100%, 34% 60%, 36% 100%, 38% 70%, 40% 100%, 42% 50%, 44% 100%, 46% 80%, 48% 100%, 50% 60%, 52% 100%, 54% 70%, 56% 100%, 58% 50%, 60% 100%, 62% 80%, 64% 100%, 66% 60%, 68% 100%, 70% 70%, 72% 100%, 74% 50%, 76% 100%, 78% 80%, 80% 100%, 82% 60%, 84% 100%, 86% 70%, 88% 100%, 90% 50%, 92% 100%, 94% 80%, 96% 100%, 98% 60%, 100% 100%)'
              }}
            />

            {/* Content */}
            <div className="p-6 pt-8 text-gray-800">
              {/* Header */}
              <div className="text-center mb-6 border-b-2 border-dashed border-gray-300 pb-4">
                <p className="text-xs tracking-widest text-gray-500">* * * * * * * * * * * * * *</p>
                <h3 className="text-lg font-bold mt-2 tracking-wider">RECEIPT OF LOVE</h3>
                <p className="text-sm text-gray-600">3 YEARS EDITION</p>
                <p className="text-xs mt-2 text-gray-500">Transaction: #FOREVER</p>
                <p className="text-xs tracking-widest text-gray-500 mt-2">* * * * * * * * * * * * * *</p>
              </div>

              {/* Items */}
              <div 
                ref={receiptRef}
                className="space-y-2 max-h-64 overflow-hidden"
              >
                {receiptItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="flex-shrink-0">{item.item}</span>
                    <span className="flex-1 mx-2 border-b border-dotted border-gray-300" />
                    <span className="flex-shrink-0 font-semibold">{item.value}</span>
                  </motion.div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t-2 border-dashed border-gray-300 my-4" />

              {/* Total */}
              <div className="text-center space-y-2">
                <div className="flex justify-between items-center font-bold text-base">
                  <span>TOTAL:</span>
                  <span className="text-rose-600">MY WHOLE HEART</span>
                </div>
                <p className="text-xs text-gray-500 italic">No refunds. No exchanges. Forever yours.</p>
              </div>

              {/* Divider */}
              <div className="border-t-2 border-dashed border-gray-300 my-4" />

              {/* Barcode */}
              <div className="text-center space-y-2">
                <div className="flex justify-center items-end gap-[2px] h-12">
                  {[...Array(40)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-gray-800"
                      style={{
                        width: Math.random() > 0.5 ? '2px' : '3px',
                        height: `${30 + Math.random() * 20}px`,
                      }}
                    />
                  ))}
                </div>
                <p className="text-xs tracking-[0.2em] text-gray-600">11-12-2022</p>
                <p className="text-[10px] text-gray-400">TEJASH ❤️ AKANKSHA</p>
              </div>

              {/* Footer */}
              <div className="text-center mt-4 pt-4 border-t border-dashed border-gray-300">
                <p className="text-xs text-gray-500">Thank you for choosing me.</p>
                <p className="text-xs text-gray-500">Come again... every day. ❤️</p>
                <p className="text-xs tracking-widest text-gray-400 mt-2">* * * * * * * * * * * * * *</p>
              </div>
            </div>

            {/* Torn edge bottom */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-4 bg-[#FFFEF5]"
              style={{
                clipPath: 'polygon(0% 0%, 2% 40%, 4% 0%, 6% 30%, 8% 0%, 10% 50%, 12% 0%, 14% 20%, 16% 0%, 18% 40%, 20% 0%, 22% 30%, 24% 0%, 26% 50%, 28% 0%, 30% 20%, 32% 0%, 34% 40%, 36% 0%, 38% 30%, 40% 0%, 42% 50%, 44% 0%, 46% 20%, 48% 0%, 50% 40%, 52% 0%, 54% 30%, 56% 0%, 58% 50%, 60% 0%, 62% 20%, 64% 0%, 66% 40%, 68% 0%, 70% 30%, 72% 0%, 74% 50%, 76% 0%, 78% 20%, 80% 0%, 82% 40%, 84% 0%, 86% 30%, 88% 0%, 90% 50%, 92% 0%, 94% 20%, 96% 0%, 98% 40%, 100% 0%)'
              }}
            />
          </div>

          {/* Shadow underneath */}
          <div 
            className="absolute -bottom-2 left-4 right-4 h-8 bg-black/20 blur-xl rounded-full"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default RelationshipReceipt;
