import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto space-y-6">
        {/* Animated Photo Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative aspect-square w-64 mx-auto rounded-full overflow-hidden shadow-xl border-4 border-primary/20"
        >
          <img
            src="https://wnpslcrasdfiabsnrhrt.supabase.co/storage/v1/object/public/IMAGES/IMG-20251210-WA0065.jpg"
            alt="Us"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="space-y-2">
          <h1 className="font-display text-4xl text-primary">Page Not Found</h1>
          <p className="text-muted-foreground">
            Even when we are lost, we are lost together. 💕
          </p>
        </div>

        <Button asChild className="rounded-full gap-2">
          <Link to="/">
            <Heart className="w-4 h-4" />
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
