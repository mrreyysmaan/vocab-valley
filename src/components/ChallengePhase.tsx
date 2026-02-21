import { useState, useMemo } from 'react'
import { motion } from 'motion/react'
import { CheckCircle2, XCircle, Swords } from 'lucide-react'
import confetti from 'canvas-confetti'
import type { WordEntry } from '../lib/compression'

interface Props {
  word: WordEntry
  allWords: WordEntry[]
  onResult: (correct: boolean) => void
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function fireConfetti() {
  const count = 180
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 }
  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min
  }
  confetti({ ...defaults, particleCount: count * 0.25, origin: { x: randomInRange(0.1, 0.3), y: 0.6 }, colors: ['#ffd700', '#f0b429', '#6ee7b7', '#34d399'] })
  confetti({ ...defaults, particleCount: count * 0.25, origin: { x: randomInRange(0.7, 0.9), y: 0.6 }, colors: ['#ffd700', '#f0b429', '#60a5fa', '#a78bfa'] })
}

export default function ChallengePhase({ word, allWords, onResult }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const [shakeWrong, setShakeWrong] = useState(false)

  // Build 3 choices: 1 correct + 2 distractors
  const choices = useMemo(() => {
    const distractors = shuffle(
      allWords
        .filter(w => w.word !== word.word)
        .map(w => w.word)
    ).slice(0, 2)

    // If not enough words, add generic distractors
    while (distractors.length < 2) {
      const fillers = ['ephemeral', 'meticulous', 'resilient', 'tenacious', 'eloquent',
                       'vivacious', 'ardent', 'serene', 'placid', 'fervent']
      const f = fillers.find(x => !distractors.includes(x) && x !== word.word)
      if (f) distractors.push(f)
      else break
    }

    return shuffle([word.word, ...distractors.slice(0, 2)])
  }, [word, allWords])

  const handleSelect = (choice: string) => {
    if (selected !== null) return
    setSelected(choice)
    const isCorrect = choice === word.word

    if (isCorrect) {
      fireConfetti()
    } else {
      setShakeWrong(true)
      setTimeout(() => setShakeWrong(false), 600)
    }

    onResult(isCorrect)
  }

  const isAnswered = selected !== null

  // Format the blanked sentence to highlight the blank
  const formatSentence = (s: string) => {
    const parts = s.split('______')
    if (parts.length === 1) return <span>{s}</span>
    return (
      <>
        {parts[0]}
        <span
          className="inline-block px-3 py-0.5 rounded font-bold align-middle"
          style={{
            background: isAnswered
              ? selected === word.word
                ? 'linear-gradient(135deg, rgba(30,92,46,0.3), rgba(45,122,66,0.2))'
                : 'rgba(155,34,38,0.15)'
              : 'rgba(200,150,12,0.15)',
            border: `1.5px dashed ${
              isAnswered
                ? selected === word.word ? 'rgba(30,92,46,0.6)' : 'rgba(155,34,38,0.5)'
                : 'rgba(200,150,12,0.6)'
            }`,
            color: isAnswered
              ? selected === word.word ? 'var(--forest)' : 'var(--crimson)'
              : 'var(--gold)',
            minWidth: '5rem',
            textAlign: 'center',
          }}
        >
          {isAnswered ? word.word : '______'}
        </span>
        {parts[1]}
      </>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8">

      {/* Challenge header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-6 flex items-center gap-2"
      >
        <Swords size={18} className="text-yellow-400" />
        <div
          className="px-4 py-1.5 rounded-full font-cinzel font-bold text-xs tracking-wider"
          style={{ background: 'rgba(155,34,38,0.15)', border: '1px solid rgba(155,34,38,0.4)', color: '#fca5a5' }}
        >
          ⚔️ Challenge Time!
        </div>
        <Swords size={18} className="text-yellow-400 scale-x-[-1]" />
      </motion.div>

      {/* Challenge card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`parchment-aged gold-frame scroll-border rounded-2xl p-7 w-full max-w-md ${shakeWrong ? 'animate-shake' : ''}`}
      >
        {/* Decorative corners */}
        <div className="absolute top-3 left-3 text-yellow-600/30 text-lg">⚔️</div>
        <div className="absolute top-3 right-3 text-yellow-600/30 text-lg">⚔️</div>

        {/* Instructions */}
        <p className="font-cinzel text-xs uppercase tracking-wider text-center mb-4" style={{ color: 'var(--stone)' }}>
          Choose the correct word to complete the sentence
        </p>

        {/* Sentence with blank */}
        <div
          className="p-4 rounded-xl mb-6 text-center"
          style={{ background: 'rgba(200,150,12,0.06)', border: '1px solid rgba(200,150,12,0.2)' }}
        >
          <p className="font-nunito font-semibold text-base leading-relaxed" style={{ color: 'var(--ink)' }}>
            {formatSentence(word.blankedSentence)}
          </p>
        </div>

        {/* Choices */}
        <div className="space-y-3">
          {choices.map((choice, i) => {
            let btnClass = 'choice-btn'
            if (isAnswered) {
              if (choice === word.word) btnClass += ' correct'
              else if (choice === selected) btnClass += ' wrong'
            }

            return (
              <motion.button
                key={choice}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className={btnClass}
                onClick={() => handleSelect(choice)}
                disabled={isAnswered}
              >
                <span className="flex items-center gap-3">
                  <span
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-cinzel font-bold text-sm"
                    style={{
                      background: isAnswered && choice === word.word
                        ? 'rgba(30,92,46,0.2)'
                        : isAnswered && choice === selected && choice !== word.word
                          ? 'rgba(155,34,38,0.2)'
                          : 'rgba(200,150,12,0.15)',
                      border: '1.5px solid currentColor',
                    }}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="capitalize font-semibold">{choice}</span>
                  {isAnswered && choice === word.word && (
                    <CheckCircle2 size={16} className="ml-auto text-green-600" />
                  )}
                  {isAnswered && choice === selected && choice !== word.word && (
                    <XCircle size={16} className="ml-auto text-red-500" />
                  )}
                </span>
              </motion.button>
            )
          })}
        </div>

        {/* Result feedback */}
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="mt-5 p-4 rounded-xl text-center"
            style={{
              background: selected === word.word
                ? 'linear-gradient(135deg, rgba(30,92,46,0.15), rgba(45,122,66,0.1))'
                : 'rgba(155,34,38,0.1)',
              border: `1.5px solid ${selected === word.word ? 'rgba(30,92,46,0.4)' : 'rgba(155,34,38,0.3)'}`,
            }}
          >
            <p className="font-cinzel font-bold text-base mb-1"
               style={{ color: selected === word.word ? 'var(--forest)' : 'var(--crimson)' }}>
              {selected === word.word ? '🎉 Correct! +100 pts' : `❌ The answer was "${word.word}"`}
            </p>
            <p className="font-nunito text-xs" style={{ color: 'var(--ink-light)' }}>
              {selected === word.word
                ? 'You are a true word warrior! Moving forward…'
                : 'Keep it up! The next word awaits…'}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
