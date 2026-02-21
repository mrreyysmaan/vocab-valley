import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { Home, AlertTriangle } from 'lucide-react'
import { decompressData, type WordEntry } from '../lib/compression'
import GameIntro from '../components/GameIntro'
import StudyPhase from '../components/StudyPhase'
import MapPhase from '../components/MapPhase'
import ChallengePhase from '../components/ChallengePhase'
import GameComplete from '../components/GameComplete'

export type GamePhase = 'intro' | 'study' | 'map' | 'challenge' | 'complete'

export default function Play() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [words, setWords] = useState<WordEntry[]>([])
  const [error, setError] = useState('')
  const [phase, setPhase] = useState<GamePhase>('intro')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)

  useEffect(() => {
    const data = searchParams.get('data')
    if (!data) {
      setError('No quest data found! Ask your teacher for the adventure link.')
      return
    }
    const decoded = decompressData(data)
    if (!decoded || decoded.length === 0) {
      setError('The quest data seems corrupted. Please ask your teacher for a new link.')
      return
    }
    setWords(decoded)
  }, [searchParams])

  const currentWord = words[currentIndex] ?? null
  const totalWords = words.length
  const progress = totalWords > 0 ? ((currentIndex) / totalWords) * 100 : 0

  const handleStart = () => setPhase('study')

  const handleStudyDone = () => setPhase('map')

  const handleMapDone = () => setPhase('challenge')

  const handleChallengeResult = (correct: boolean) => {
    if (correct) setScore(s => s + 100)
    // Small delay before advancing
    setTimeout(() => {
      if (currentIndex + 1 >= totalWords) {
        setPhase('complete')
      } else {
        setCurrentIndex(i => i + 1)
        setPhase('study')
      }
    }, 1800)
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, #2d6a3f 0%, #133d1f 50%, #061408 100%)' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="parchment-aged gold-frame rounded-2xl p-8 max-w-sm w-full text-center"
        >
          <div className="text-5xl mb-4">🗺️</div>
          <div className="flex items-center justify-center gap-2 mb-3">
            <AlertTriangle className="text-amber-600" size={20} />
            <h2 className="font-cinzel font-bold text-lg" style={{ color: 'var(--ink)' }}>Quest Not Found</h2>
          </div>
          <p className="font-nunito text-sm mb-6" style={{ color: 'var(--ink-light)' }}>{error}</p>
          <button className="btn-rpg flex items-center gap-2 mx-auto" onClick={() => navigate('/')}>
            <Home size={16} />
            Return Home
          </button>
        </motion.div>
      </div>
    )
  }

  if (words.length === 0) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, #2d6a3f 0%, #133d1f 50%, #061408 100%)' }}
      >
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
          <span className="text-4xl">⚔️</span>
        </motion.div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen relative"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, #2d6a3f 0%, #133d1f 50%, #061408 100%)' }}
    >
      {/* Starfield overlay */}
      <div className="absolute inset-0 starfield opacity-50 pointer-events-none" />

      {/* HUD */}
      <AnimatePresence>
        {phase !== 'intro' && phase !== 'complete' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
            style={{ background: 'rgba(6,20,8,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(200,150,12,0.2)' }}
          >
            <div className="max-w-xl mx-auto flex items-center gap-4">
              <button onClick={() => navigate('/')} className="text-yellow-400/60 hover:text-yellow-400 transition-colors">
                <Home size={18} />
              </button>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-cinzel text-xs text-yellow-300/70">
                    Word {currentIndex + 1} of {totalWords}
                  </span>
                  <div className="score-badge text-xs py-1 px-2.5">
                    ⭐ {score} pts
                  </div>
                </div>
                <div className="quest-progress">
                  <motion.div
                    className="quest-progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game phases */}
      <div className={`relative z-10 ${phase !== 'intro' && phase !== 'complete' ? 'pt-16' : ''}`}>
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <GameIntro words={words} onStart={handleStart} />
            </motion.div>
          )}

          {phase === 'study' && currentWord && (
            <motion.div key={`study-${currentIndex}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <StudyPhase word={currentWord} wordIndex={currentIndex} totalWords={totalWords} onNext={handleStudyDone} />
            </motion.div>
          )}

          {phase === 'map' && currentWord && (
            <motion.div key={`map-${currentIndex}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <MapPhase wordIndex={currentIndex} totalWords={totalWords} onDone={handleMapDone} />
            </motion.div>
          )}

          {phase === 'challenge' && currentWord && (
            <motion.div key={`challenge-${currentIndex}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ChallengePhase
                word={currentWord}
                allWords={words}
                onResult={handleChallengeResult}
              />
            </motion.div>
          )}

          {phase === 'complete' && (
            <motion.div key="complete" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <GameComplete score={score} totalWords={totalWords} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
