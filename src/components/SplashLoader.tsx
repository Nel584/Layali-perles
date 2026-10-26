import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface SplashLoaderProps {
  onComplete: () => void;
  durationSeconds?: number;
}

export function SplashLoader({ onComplete, durationSeconds = 3 }: SplashLoaderProps) {
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const totalMs = durationSeconds * 1000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(100, Math.round((elapsed / totalMs) * 100));
      const remaining = Math.max(0, Number(((totalMs - elapsed) / 1000).toFixed(1)));

      setProgress(newProgress);
      setTimeLeft(remaining);

      if (elapsed >= totalMs) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 150);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [durationSeconds, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="splash-screen"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-950 text-stone-100 overflow-hidden select-none"
      >
        {/* Subtle Luxury Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(197,160,89,0.18)_0%,transparent_65%)] pointer-events-none" />
        
        {/* Decorative Delicate Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center">
          
          {/* Animated Gold Ring & Pearls */}
          <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
            {/* Spinning decorative orbit */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-amber-500/20"
            />
            
            {/* Counter-spinning pearl dots */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-2"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.8)] absolute top-0 left-1/2 -translate-x-1/2" />
              <div className="w-2 h-2 rounded-full bg-stone-300 shadow-[0_0_10px_rgba(255,255,255,0.7)] absolute bottom-0 left-1/2 -translate-x-1/2" />
              <div className="w-2 h-2 rounded-full bg-amber-400/80 shadow-[0_0_8px_rgba(245,158,11,0.6)] absolute top-1/2 right-0 -translate-y-1/2" />
            </motion.div>

            {/* Circular SVG Progress Ring */}
            <svg className="w-28 h-28 -rotate-90 transform" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                className="stroke-stone-800"
                strokeWidth="2.5"
                fill="transparent"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="42"
                className="stroke-amber-400"
                strokeWidth="2.5"
                strokeDasharray={264}
                strokeDashoffset={264 - (264 * progress) / 100}
                strokeLinecap="round"
                fill="transparent"
                style={{ transition: 'stroke-dashoffset 40ms linear' }}
              />
            </svg>

            {/* Center Monogram / Logo */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              <img
                src="/assets/aistudio/Logo_minimaliste_avec_main_et_perles_c4f96bc6.png"
                alt="Logo Layali Perles"
                className="w-16 h-16 rounded-full object-cover border-2 border-amber-300/40 shadow-lg"
                referrerPolicy="no-referrer"
              />
              <span className="text-[9px] uppercase tracking-widest text-amber-400 font-mono mt-1 font-bold">
                {timeLeft > 0 ? `${timeLeft.toFixed(1)}s` : 'Prêt'}
              </span>
            </div>
          </div>

          {/* Brand Name & Typography */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase text-amber-400/90 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Layali Perles &bull; Cotonou</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>

            <h1 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-stone-100">
              Layali <span className="italic font-light text-amber-300">Perles</span>
            </h1>

            <p className="mt-3 text-sm text-stone-400 font-light leading-relaxed max-w-xs mx-auto">
              L'art ancestral des parures de hanches et bijoux traditionnels africains faits main.
            </p>
          </motion.div>

          {/* Progress Bar & Percentage */}
          <div className="w-full max-w-xs mt-8">
            <div className="flex justify-between items-center text-xs text-stone-500 mb-2 font-mono">
              <span className="text-amber-400/80">Chargement de l'univers...</span>
              <span className="text-stone-300 font-semibold">{progress}%</span>
            </div>
            
            <div className="w-full h-1 bg-stone-900 rounded-full overflow-hidden p-0.5 border border-stone-800">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Skip CTA */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={onComplete}
            className="mt-8 inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-amber-300 transition-colors py-1.5 px-3 rounded-full border border-stone-800 hover:border-amber-500/40"
          >
            <span>Passer l'introduction</span>
            <ArrowRight className="w-3 h-3" />
          </motion.button>
        </div>

        {/* Footer Credit */}
        <div className="absolute bottom-6 text-[11px] text-stone-600 tracking-wider uppercase font-mono">
          Création Artisanale Béninoise &bull; 100% Fait Main
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
