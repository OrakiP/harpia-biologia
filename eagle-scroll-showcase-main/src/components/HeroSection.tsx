import { motion } from 'framer-motion';
import { ChevronDown, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HarpyModel from './HarpyModel';

interface HeroSectionProps {
  scrollProgress: number;
  onScrollToNext: () => void;
  onNavigateToConservation?: () => void;
}

export default function HeroSection({ scrollProgress, onScrollToNext, onNavigateToConservation }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen py-10 lg:py-20 px-8 lg:px-16 overflow-x-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20 overflow-hidden">
        <div className="absolute top-20 left-0 lg:left-20 w-48 lg:w-96 h-48 lg:h-96 bg-accent/10 rounded-full blur-3xl feather-float transform -translate-x-1/4 lg:translate-x-0" />
        <div className="absolute bottom-20 right-0 lg:right-20 w-48 lg:w-96 h-48 lg:h-96 bg-primary-glow/10 rounded-full blur-3xl feather-float transform translate-x-1/4 lg:translate-x-0" style={{ animationDelay: '3s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 min-h-screen flex flex-col-reverse md:flex-row items-center justify-center md:justify-between overflow-x-hidden">
        {/* Left Content */}
        <motion.div
          className="flex-1 max-w-2xl text-center md:text-left z-20 px-4 md:px-0"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.div
            className="mb-6 flex justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse" />
              Harpia harpyja
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl lg:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <span className="text-majesty">HARPIA</span>
            <br />
            <span className="text-foreground">Gavião Real</span>
          </motion.h1>

          <motion.p
            className="text-lg lg:text-2xl text-muted-foreground mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            A águia mais poderosa do planeta. Com garras que podem exercer uma pressão de
            <span className="text-accent font-semibold"> 42 kg/cm²</span>, a Harpia reina absoluta
            nas florestas tropicais da América do Sul.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Button
              size="lg"
              className="btn-royal px-8 py-4 text-lg font-semibold"
              onClick={onScrollToNext}
            >
              <Play className="mr-2 h-5 w-5" />
              Descobrir Mais
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg font-semibold border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              onClick={onNavigateToConservation}
            >
              Estado de Conservação
            </Button>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center gap-6 mt-12 text-sm text-muted-foreground justify-center md:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-accent rounded-full" />
              <span>Envergadura: +200cm</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary-glow rounded-full" />
              <span>Peso: até 9kg</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-secondary rounded-full" />
              <span>Quase Ameaçada</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right 3D Model */}
        <div
          className="relative w-full h-[45vh] md:h-screen md:flex-1 flex items-center justify-center z-10"
        >
          <div className="w-full h-full relative">
            <HarpyModel scrollProgress={scrollProgress} isVisible={true} />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="hidden md:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <button
          onClick={onScrollToNext}
          className="flex flex-col items-center gap-2 text-accent hover:text-accent/80 transition-colors group"
        >
          <span className="text-sm font-medium">Scroll para descobrir</span>
          <div className="w-6 h-10 border-2 border-accent rounded-full flex justify-center scroll-indicator">
            <motion.div
              className="w-1 h-3 bg-accent rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </button>
      </motion.div>
    </section>
  );
}