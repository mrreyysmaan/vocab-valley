import { motion } from 'motion/react'
import { Sword, Star } from 'lucide-react'
import type { WordEntry } from '../lib/compression'

interface Props {
  words: WordEntry[]
  onStart: () => void
}

export default function GameIntro({ words, onStart }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">

      {/* Animated banner */}
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
        className="text-7xl mb-6"
      >
        🏰
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="font-cinzel-deco font-black text-center mb-2"
        style={{
          fontSize: 'clamp(2rem, 7vw, 3.5rem)',
          background: 'linear-gradient(180deg, #ffd700 0%, #f0b429 40%, #c8960c 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Word Quest
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="font-cinzel text-yellow-200/70 tracking-widest text-xs md:text-sm mb-8 uppercase"
      >
        ✦ Your Vocabulary Adventure Begins ✦
      </motion.p>

      {/* Quest summary scroll */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0.5 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="parchment-aged gold-frame scroll-border rounded-2xl p-6 max-w-sm w-full mb-8 text-center"
      >
        <p className="font-cinzel font-semibold text-sm mb-1" style={{ color: 'var(--ink)' }}>
          Quest Briefing
        </p>
        <div className="ornament-divider my-3">
          <span className="font-cinzel text-xs">✦</span>
        </div>
        <p className="font-nunito text-sm mb-4" style={{ color: 'var(--ink-light)' }}>
          You will encounter <strong style={{ color: 'var(--forest)' }}>{words.length} magical words</strong> on this journey.
          Study each one, then prove your mastery in a challenge!
        </p>

        {/* Word preview badges */}
        <div className="flex flex-wrap gap-2 justify-center mb-2">
          {words.slice(0, 6).map((w, i) => (
            <motion.span
              key={w.word}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.08 }}
              className="font-cinzel font-bold text-xs px-3 py-1 rounded-full capitalize"
              style={{ background: 'rgba(200,150,12,0.15)', border: '1px solid rgba(200,150,12,0.4)', color: 'var(--gold)' }}
            >
              {w.word}
            </motion.span>
          ))}
          {words.length > 6 && (
            <span className="font-nunito text-xs px-3 py-1 rounded-full"
              style={{ background: 'rgba(200,150,12,0.08)', color: 'var(--stone)' }}>
              +{words.length - 6} more
            </span>
          )}
        </div>

        <div className="mt-3 flex items-center justify-center gap-4 text-xs font-nunito" style={{ color: 'var(--stone)' }}>
          <span>📖 Study</span>
          <span>→</span>
          <span>🗺️ Travel</span>
          <span>→</span>
          <span>⚔️ Challenge</span>
        </div>
      </motion.div>

      {/* Score potential */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="font-cinzel text-yellow-300/60 text-xs mb-6 flex items-center gap-1"
      >
        <Star size={12} className="fill-current" />
        Earn up to {words.length * 100} points!
        <Star size={12} className="fill-current" />
      </motion.p>

      {/* Start button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, type: 'spring', stiffness: 200 }}
      >
        <motion.button
          className="btn-rpg text-lg px-10 py-4 flex items-center gap-3"
          onClick={onStart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Sword size={22} />
          Start Adventure!
        </motion.button>
      </motion.div>

      {/* Floating stars */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{ y: [0, -15, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
        >
          <Star size={8 + (i % 3) * 4} className="text-yellow-400 fill-yellow-400" />
        </motion.div>
      ))}
    </div>
  )
}
