import { useState } from 'react'
import { motion } from 'motion/react'
import { Volume2, VolumeX, ChevronRight, BookOpen, Sparkles } from 'lucide-react'
import { useTTS } from '../hooks/useTTS'
import type { WordEntry } from '../lib/compression'

interface Props {
  word: WordEntry
  wordIndex: number
  totalWords: number
  onNext: () => void
}

export default function StudyPhase({ word, wordIndex, onNext }: Props) {
  const { speak, stop, isSpeaking, isSupported } = useTTS()
  const [revealed, setRevealed] = useState(false)

  const handleSpeak = () => {
    if (isSpeaking) {
      stop()
    } else {
      speak(`${word.word}. ${word.definition}. Example: ${word.sentence}`)
    }
  }

  const handleNext = () => {
    stop()
    onNext()
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8">

      {/* Level badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-6 flex items-center gap-2"
      >
        <div
          className="px-4 py-1.5 rounded-full font-cinzel font-bold text-xs tracking-wider"
          style={{ background: 'rgba(30,92,46,0.4)', border: '1px solid rgba(45,122,66,0.5)', color: '#6ee7b7' }}
        >
          📖 Study Scroll — Level {wordIndex + 1}
        </div>
      </motion.div>

      {/* Ancient Scroll */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0.3, y: -30 }}
        animate={{ opacity: 1, scaleY: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="w-full max-w-md"
        style={{ transformOrigin: 'top center' }}
      >
        {/* Scroll top rod */}
        <div
          className="h-6 rounded-t-full mx-2"
          style={{
            background: 'linear-gradient(180deg, #8b6914 0%, #6b4f10 50%, #4a360b 100%)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)',
          }}
        />

        {/* Scroll body */}
        <div
          className="parchment-aged scroll-border px-7 py-8 relative"
          style={{
            boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 0 60px rgba(200,150,12,0.05)',
            border: '2px solid rgba(200,150,12,0.3)',
          }}
        >
          {/* Decorative corners */}
          <div className="absolute top-3 left-3 text-yellow-600/40 text-lg">❧</div>
          <div className="absolute top-3 right-3 text-yellow-600/40 text-lg" style={{ transform: 'scaleX(-1)' }}>❧</div>
          <div className="absolute bottom-3 left-3 text-yellow-600/40 text-lg" style={{ transform: 'scaleY(-1)' }}>❧</div>
          <div className="absolute bottom-3 right-3 text-yellow-600/40 text-lg" style={{ transform: 'scale(-1)' }}>❧</div>

          {/* Word */}
          <div className="text-center mb-5">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-cinzel-deco font-black capitalize mb-1"
              style={{
                fontSize: 'clamp(2rem, 8vw, 3rem)',
                background: 'linear-gradient(180deg, #4a2800 0%, #6b3c0a 50%, #3d2b1f 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {word.word}
            </motion.h2>

            {/* TTS button */}
            {isSupported && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                onClick={handleSpeak}
                className="mt-2 mx-auto flex items-center gap-1.5 px-3 py-1 rounded-full font-nunito text-xs font-semibold transition-all"
                style={{
                  background: isSpeaking ? 'rgba(30,92,46,0.15)' : 'rgba(200,150,12,0.12)',
                  border: `1px solid ${isSpeaking ? 'rgba(45,122,66,0.5)' : 'rgba(200,150,12,0.4)'}`,
                  color: isSpeaking ? 'var(--forest)' : 'var(--gold)',
                }}
              >
                {isSpeaking ? (
                  <><VolumeX size={12} /> Stop</>
                ) : (
                  <><Volume2 size={12} /> Hear it pronounced</>
                )}
              </motion.button>
            )}
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="ornament-divider mb-5"
          >
            <span className="font-cinzel text-xs">✦</span>
          </motion.div>

          {/* Definition */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-4"
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <BookOpen size={13} style={{ color: 'var(--gold)' }} />
              <span className="font-cinzel font-bold text-xs uppercase tracking-wider" style={{ color: 'var(--gold)' }}>
                Meaning
              </span>
            </div>
            <p className="font-nunito font-semibold text-base leading-relaxed" style={{ color: 'var(--ink)' }}>
              {word.definition}
            </p>
          </motion.div>

          {/* Synonym */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-4 flex items-center gap-2"
          >
            <span className="font-cinzel font-bold text-xs uppercase tracking-wider" style={{ color: 'var(--stone)' }}>
              Also called:
            </span>
            <span
              className="font-cinzel font-bold text-sm px-2.5 py-0.5 rounded-full capitalize"
              style={{ background: 'rgba(30,92,46,0.12)', border: '1px solid rgba(30,92,46,0.3)', color: 'var(--forest)' }}
            >
              {word.synonym}
            </span>
          </motion.div>

          {/* Example sentence */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <Sparkles size={13} style={{ color: 'var(--gold)' }} />
              <span className="font-cinzel font-bold text-xs uppercase tracking-wider" style={{ color: 'var(--gold)' }}>
                Example
              </span>
            </div>
            <div
              className="p-3 rounded-lg"
              style={{ background: 'rgba(200,150,12,0.08)', border: '1px solid rgba(200,150,12,0.2)' }}
            >
              <p className="font-nunito italic text-sm leading-relaxed" style={{ color: 'var(--ink-light)' }}>
                "{word.sentence}"
              </p>
            </div>
          </motion.div>
        </div>

        {/* Scroll bottom rod */}
        <div
          className="h-6 rounded-b-full mx-2"
          style={{
            background: 'linear-gradient(180deg, #4a360b 0%, #6b4f10 50%, #8b6914 100%)',
            boxShadow: '0 -2px 8px rgba(0,0,0,0.5), inset 0 -1px 0 rgba(255,255,255,0.1)',
          }}
        />
      </motion.div>

      {/* Memory tip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-5 max-w-sm w-full"
      >
        {!revealed ? (
          <button
            className="w-full font-nunito text-xs text-green-300/60 hover:text-green-300 transition-colors py-2"
            onClick={() => setRevealed(true)}
          >
            💡 Tap for a memory tip
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-3 rounded-xl font-nunito text-xs text-green-200/70"
            style={{ background: 'rgba(30,92,46,0.2)', border: '1px dashed rgba(45,122,66,0.3)' }}
          >
            💡 <em>Try to use <strong className="text-green-300">{word.word}</strong> in a sentence about your own life!</em>
          </motion.div>
        )}
      </motion.div>

      {/* Next button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="mt-6"
      >
        <motion.button
          className="btn-rpg flex items-center gap-2 text-base px-8 py-3"
          onClick={handleNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Ready to Challenge!
          <ChevronRight size={18} />
        </motion.button>
      </motion.div>
    </div>
  )
}
