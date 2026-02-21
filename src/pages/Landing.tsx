import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { Sword, BookOpen, Sparkles, Map, Star, Crown } from 'lucide-react'

const floatingItems = [
  { icon: '⚔️', x: '8%',  y: '15%', delay: 0,   size: '2rem' },
  { icon: '🗺️', x: '88%', y: '12%', delay: 0.5, size: '2.2rem' },
  { icon: '🏰', x: '5%',  y: '72%', delay: 1,   size: '2.4rem' },
  { icon: '🌟', x: '92%', y: '68%', delay: 0.3, size: '1.8rem' },
  { icon: '📜', x: '15%', y: '45%', delay: 0.7, size: '1.9rem' },
  { icon: '🔮', x: '82%', y: '40%', delay: 1.2, size: '2rem' },
  { icon: '🐉', x: '50%', y: '8%',  delay: 0.9, size: '2.5rem' },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, #2d6a3f 0%, #1a4a26 30%, #0d2b15 70%, #061408 100%)',
      }}
    >
      {/* Starfield */}
      <div className="absolute inset-0 starfield opacity-70 pointer-events-none" />

      {/* Animated background forest silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none">
        <svg viewBox="0 0 1440 160" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
          <path
            d="M0,160 L0,80 L40,40 L80,70 L120,30 L160,60 L200,20 L240,55 L280,25 L320,65 L360,15 L400,50 L440,30 L480,60 L520,10 L560,45 L600,20 L640,55 L680,25 L720,60 L760,15 L800,50 L840,30 L880,65 L920,20 L960,55 L1000,35 L1040,70 L1080,25 L1120,60 L1160,40 L1200,65 L1240,30 L1280,60 L1320,45 L1360,70 L1400,40 L1440,80 L1440,160 Z"
            fill="rgba(6,20,8,0.8)"
          />
          <path
            d="M0,160 L0,100 L60,70 L120,90 L180,55 L240,85 L300,65 L360,95 L420,70 L480,90 L540,60 L600,85 L660,70 L720,95 L780,65 L840,90 L900,75 L960,100 L1020,70 L1080,95 L1140,75 L1200,100 L1260,80 L1320,105 L1380,85 L1440,110 L1440,160 Z"
            fill="rgba(6,20,8,0.95)"
          />
        </svg>
      </div>

      {/* Floating decorative items */}
      {floatingItems.map((item, i) => (
        <motion.div
          key={i}
          className="absolute select-none pointer-events-none"
          style={{ left: item.x, top: item.y, fontSize: item.size }}
          animate={{ y: [0, -10, 0], rotate: [-3, 3, -3] }}
          transition={{ duration: 3 + i * 0.3, delay: item.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          {item.icon}
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-4 py-12 max-w-2xl mx-auto text-center">

        {/* Logo / Title */}
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          className="mb-2"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <motion.div animate={{ rotate: [-10, 10, -10] }} transition={{ duration: 2, repeat: Infinity }}>
              <Sword size={36} className="text-yellow-400 drop-shadow-lg" />
            </motion.div>
            <Crown size={28} className="text-yellow-300 animate-pulse" />
            <motion.div animate={{ rotate: [10, -10, 10] }} transition={{ duration: 2, repeat: Infinity }}>
              <Sword size={36} className="text-yellow-400 drop-shadow-lg scale-x-[-1]" />
            </motion.div>
          </div>

          <h1
            className="font-cinzel-deco font-black text-glow-gold"
            style={{
              fontSize: 'clamp(2.8rem, 8vw, 5rem)',
              lineHeight: 1.1,
              background: 'linear-gradient(180deg, #ffd700 0%, #f0b429 40%, #c8960c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Vocab
          </h1>
          <h1
            className="font-cinzel-deco font-black"
            style={{
              fontSize: 'clamp(2.8rem, 8vw, 5rem)',
              lineHeight: 1.1,
              background: 'linear-gradient(180deg, #6ee7b7 0%, #34d399 40%, #10b981 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Valley
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-cinzel text-yellow-200/80 text-sm md:text-base tracking-widest mb-10 uppercase"
        >
          ✦ The Word Adventure ✦
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full mb-8">

          {/* Create a Lesson */}
          <motion.button
            onClick={() => navigate('/create')}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.97 }}
            className="parchment-aged gold-frame scroll-border rounded-xl p-6 text-left cursor-pointer group"
            style={{ transformOrigin: 'center' }}
          >
            <div className="flex items-start gap-4">
              <div
                className="p-3 rounded-xl flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #f0b429, #c8960c)', boxShadow: '0 4px 12px rgba(200,150,12,0.4)' }}
              >
                <BookOpen size={28} className="text-amber-900" />
              </div>
              <div>
                <h2 className="font-cinzel font-bold text-lg mb-1.5" style={{ color: 'var(--ink)' }}>
                  Create a Lesson
                </h2>
                <p className="font-nunito text-sm" style={{ color: 'var(--ink-light)' }}>
                  Teachers: Enter your word list and let AI craft the quest!
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 font-cinzel text-xs font-semibold" style={{ color: 'var(--gold)' }}>
              <Sparkles size={14} />
              <span>Powered by Gemini AI</span>
            </div>
          </motion.button>

          {/* Have a Code */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="rounded-xl p-6 text-left"
            style={{
              background: 'linear-gradient(135deg, rgba(30,92,46,0.6), rgba(19,61,31,0.8))',
              border: '2px solid rgba(45,122,66,0.5)',
              boxShadow: '0 4px 20px rgba(19,61,31,0.5)',
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="p-3 rounded-xl flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #2d7a42, #133d1f)', boxShadow: '0 4px 12px rgba(19,61,31,0.5)' }}
              >
                <Map size={28} className="text-green-200" />
              </div>
              <div>
                <h2 className="font-cinzel font-bold text-lg mb-1.5 text-green-100">
                  Join the Quest
                </h2>
                <p className="font-nunito text-sm text-green-200/80">
                  Got a link from your teacher? Open it to begin your adventure!
                </p>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-lg" style={{ background: 'rgba(0,0,0,0.2)', border: '1px dashed rgba(45,122,66,0.5)' }}>
              <p className="font-nunito text-xs text-green-300/70 leading-relaxed">
                📨 Your teacher will share a special link. Just click it and the quest will start automatically!
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stars decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex items-center gap-3"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
            >
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.2 }}
          className="font-nunito text-xs text-green-200 mt-3"
        >
          For Malaysian classrooms · Made with ✨ magic & code
        </motion.p>
      </div>
    </div>
  )
}
