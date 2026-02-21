import { useEffect } from 'react'
import { motion } from 'motion/react'

interface Props {
  wordIndex: number
  totalWords: number
  onDone: () => void
}

const LANDMARKS = ['🏰', '🌲', '⛰️', '🏔️', '🌊', '🌋', '🗼', '🏛️', '🌙', '⭐']

export default function MapPhase({ wordIndex, totalWords, onDone }: Props) {
  useEffect(() => {
    const timer = setTimeout(onDone, 3200)
    return () => clearTimeout(timer)
  }, [onDone])

  // Which landmarks to show (5 markers for the path)
  const pathSteps = 5
  const completedSteps = Math.round((wordIndex / totalWords) * pathSteps)

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8">

      {/* Map scroll container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Map title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-5"
        >
          <span
            className="font-cinzel font-bold text-sm px-4 py-1.5 rounded-full"
            style={{ background: 'rgba(200,150,12,0.15)', border: '1px solid rgba(200,150,12,0.4)', color: 'var(--gold-light)' }}
          >
            🗺️ Traveling to Level {wordIndex + 1}…
          </span>
        </motion.div>

        {/* The Map */}
        <div
          className="parchment-aged gold-frame rounded-2xl p-6 relative overflow-hidden"
          style={{ minHeight: '280px' }}
        >
          {/* Map background grid / terrain marks */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle, #8b6914 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }} />

          {/* Compass rose */}
          <div className="absolute top-3 right-4 text-2xl opacity-30 font-cinzel font-bold" style={{ color: 'var(--gold)' }}>
            ✧
          </div>

          {/* Path track */}
          <div className="relative flex items-center justify-between py-4 px-2 mb-4">
            {/* Dashed path line */}
            <div
              className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1 rounded-full"
              style={{ background: 'repeating-linear-gradient(90deg, var(--gold) 0, var(--gold) 8px, transparent 8px, transparent 14px)', opacity: 0.5 }}
            />

            {/* Landmarks along path */}
            {[...Array(pathSteps)].map((_, i) => {
              const isDone = i < completedSteps
              const isCurrent = i === completedSteps
              const landmark = LANDMARKS[wordIndex + i] || LANDMARKS[i % LANDMARKS.length]

              return (
                <div key={i} className="relative z-10 flex flex-col items-center gap-1">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: isCurrent ? [1, 1.15, 1] : 1 }}
                    transition={{ repeat: isCurrent ? Infinity : 0, duration: 1.2 }}
                    className="text-2xl"
                    style={{ filter: isDone ? 'none' : isCurrent ? 'none' : 'grayscale(0.7) opacity(0.5)' }}
                  >
                    {isDone ? '✅' : isCurrent ? landmark : '⬜'}
                  </motion.div>
                </div>
              )
            })}
          </div>

          {/* Hero walking */}
          <div className="relative h-16 overflow-hidden rounded-xl mb-4"
            style={{ background: 'rgba(30,92,46,0.2)', border: '1px solid rgba(45,122,66,0.3)' }}>

            {/* Ground */}
            <div className="absolute bottom-0 left-0 right-0 h-4"
              style={{ background: 'linear-gradient(180deg, transparent, rgba(30,92,46,0.4))' }} />

            {/* Walking hero emoji */}
            <motion.div
              className="absolute bottom-3 text-3xl select-none"
              style={{ left: '8%' }}
              animate={{ x: ['0%', '80vw'], scaleX: [1, 1, 1, 1, -1, -1, 1] }}
              transition={{ duration: 3, ease: 'linear', repeat: 0 }}
            >
              🧙
            </motion.div>

            {/* Scenery */}
            {['🌲', '🌿', '🌲', '🌸'].map((item, i) => (
              <div
                key={i}
                className="absolute bottom-3 text-lg select-none opacity-60"
                style={{ left: `${20 + i * 22}%` }}
              >
                {item}
              </div>
            ))}
          </div>

          {/* Flavor text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-nunito italic text-sm text-center"
            style={{ color: 'var(--ink-light)' }}
          >
            {wordIndex === 0
              ? '"Every great adventure begins with a single word…"'
              : wordIndex === totalWords - 1
              ? '"The final challenge awaits. You are ready!"'
              : '"Onwards, brave scholar! Knowledge awaits ahead!"'}
          </motion.p>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center gap-2 mt-6">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: 'var(--gold)' }}
              animate={{ scale: [1, 1.6, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 0.8, delay: i * 0.25, repeat: Infinity }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
