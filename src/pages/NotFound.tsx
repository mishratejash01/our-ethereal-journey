import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const NotFound = () => {
  const location = useLocation();
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    console.error("404 Error: Route not found:", location.pathname);

    // Fetch the specific image from backend
    const { data } = supabase
      .storage
      .from('IMAGES')
      .getPublicUrl('IMG-20251210-WA0065.jpg');

    if (data.publicUrl) {
      setImageUrl(data.publicUrl);
    }
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
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Us"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <Heart className="w-12 h-12 text-muted-foreground" />
            </div>
          )}
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
