import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { Home, Trophy, Star, Swords } from 'lucide-react'
import confetti from 'canvas-confetti'

interface Props {
  score: number
  totalWords: number
}

function getTitle(score: number, max: number): { title: string; emoji: string; color: string } {
  const pct = score / max
  if (pct === 1)     return { title: 'Word Legend!',   emoji: '👑', color: '#ffd700' }
  if (pct >= 0.8)    return { title: 'Word Warrior!',  emoji: '⚔️', color: '#f0b429' }
  if (pct >= 0.6)    return { title: 'Word Apprentice!', emoji: '📜', color: '#6ee7b7' }
  return               { title: 'Word Explorer!',  emoji: '🗺️', color: '#60a5fa' }
}

function StarRating({ score, max }: { score: number; max: number }) {
  const stars = Math.round((score / max) * 5)
  return (
    <div className="flex items-center justify-center gap-2 my-4">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 200 }}
        >
          <Star
            size={32}
            className={i < stars ? 'text-yellow-400 fill-yellow-400' : 'text-yellow-900'}
            style={{ filter: i < stars ? 'drop-shadow(0 0 6px rgba(200,150,12,0.7))' : 'none' }}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default function GameComplete({ score, totalWords }: Props) {
  const navigate = useNavigate()
  const maxScore = totalWords * 100
  const { title, emoji, color } = getTitle(score, maxScore)

  useEffect(() => {
    // Big celebration burst
    const end = Date.now() + 3000
    const colors = ['#ffd700', '#f0b429', '#6ee7b7', '#34d399', '#60a5fa', '#a78bfa']

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
        zIndex: 9999,
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
        zIndex: 9999,
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">

      {/* Trophy animation */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 150, damping: 12, delay: 0.1 }}
        className="text-8xl mb-4"
        style={{ filter: 'drop-shadow(0 0 20px rgba(200,150,12,0.6))' }}
      >
        🏆
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="font-cinzel-deco font-black text-2xl md:text-3xl text-center mb-1"
        style={{ color }}
      >
        Quest Complete!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="font-cinzel text-yellow-200/70 text-sm tracking-widest mb-6"
      >
        {emoji} {title}
      </motion.p>

      {/* Score card */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0.5 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="parchment-aged gold-frame scroll-border rounded-2xl p-8 max-w-sm w-full text-center mb-6"
      >
        {/* Score display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-2"
        >
          <p className="font-cinzel text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--stone)' }}>
            Final Score
          </p>
          <motion.p
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: 'spring', stiffness: 150 }}
            className="font-cinzel-deco font-black text-5xl mb-1"
            style={{
              background: `linear-gradient(180deg, ${color} 0%, var(--gold) 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {score}
          </motion.p>
          <p className="font-nunito text-sm" style={{ color: 'var(--stone)' }}>
            out of {maxScore} points
          </p>
        </motion.div>

        <StarRating score={score} max={maxScore} />

        <div className="ornament-divider my-4">
          <span className="font-cinzel text-xs">✦</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Words', value: totalWords, icon: '📚' },
            { label: 'Correct', value: score / 100, icon: '✅' },
            { label: 'Accuracy', value: `${Math.round((score / maxScore) * 100)}%`, icon: '🎯' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              className="p-3 rounded-xl text-center"
              style={{ background: 'rgba(200,150,12,0.08)', border: '1px solid rgba(200,150,12,0.2)' }}
            >
              <div className="text-xl mb-1">{stat.icon}</div>
              <p className="font-cinzel font-bold text-lg" style={{ color: 'var(--ink)' }}>{stat.value}</p>
              <p className="font-nunito text-xs" style={{ color: 'var(--stone)' }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Motivational message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="font-nunito italic text-sm text-center max-w-xs mb-8"
        style={{ color: 'var(--gold-light)', opacity: 0.8 }}
      >
        {score === maxScore
          ? '"Perfect! You are a true master of words. The valley bows before you!"'
          : score >= maxScore * 0.6
          ? '"Well done, brave adventurer! Practice makes perfect — try again!"'
          : '"Every great journey starts with a first step. Come back and try again!"'}
      </motion.p>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="flex flex-col sm:flex-row gap-3 items-center"
      >
        <motion.button
          className="btn-rpg flex items-center gap-2 text-base px-8 py-3"
          onClick={() => window.location.reload()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Swords size={18} />
          Play Again
        </motion.button>
        <motion.button
          className="btn-rpg-ghost flex items-center gap-2 text-sm px-6 py-3"
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Home size={16} />
          Return Home
        </motion.button>
      </motion.div>

      {/* Floating trophies */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none text-2xl"
          style={{
            left: `${5 + i * 22}%`,
            top: `${15 + (i % 3) * 20}%`,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2], rotate: [-5, 5, -5] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.5 }}
        >
          {['⭐', '🌟', '✨', '💫', '🏅'][i]}
        </motion.div>
      ))}
    </div>
  )
}
