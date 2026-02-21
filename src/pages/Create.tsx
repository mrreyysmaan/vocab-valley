import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import {
  Sparkles, ArrowLeft, Copy, ExternalLink, CheckCircle2,
  BookOpen, AlertTriangle, Loader2, Wand2, RefreshCw,
} from 'lucide-react'
import { generateWordData, hasApiKey } from '../lib/gemini'
import { compressData, type WordEntry } from '../lib/compression'

function WordCard({ entry, index }: { entry: WordEntry; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="parchment gold-frame-thin rounded-xl p-5 relative overflow-hidden"
    >
      {/* Corner ornaments */}
      <div className="absolute top-2 left-2 text-yellow-600/30 font-cinzel text-xs">✦</div>
      <div className="absolute top-2 right-2 text-yellow-600/30 font-cinzel text-xs">✦</div>

      <div className="flex items-start gap-3">
        <div
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-cinzel font-bold text-sm"
          style={{ background: 'linear-gradient(135deg, #f0b429, #c8960c)', color: 'var(--ink)', boxShadow: '0 2px 8px rgba(200,150,12,0.4)' }}
        >
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-cinzel font-bold text-xl capitalize mb-0.5" style={{ color: 'var(--ink)' }}>
            {entry.word}
          </h3>
          <p className="font-nunito text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--stone)' }}>
            Synonym: <span style={{ color: 'var(--forest)' }}>{entry.synonym}</span>
          </p>
          <p className="font-nunito text-sm mb-2" style={{ color: 'var(--ink-light)' }}>
            {entry.definition}
          </p>
          <div className="p-2.5 rounded-lg" style={{ background: 'rgba(30,92,46,0.08)', border: '1px solid rgba(30,92,46,0.2)' }}>
            <p className="font-nunito text-sm italic" style={{ color: 'var(--ink-light)' }}>
              "{entry.sentence}"
            </p>
          </div>
          <p className="font-nunito text-xs mt-2" style={{ color: 'var(--stone)' }}>
            Fill-in: <em>{entry.blankedSentence}</em>
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Create() {
  const navigate = useNavigate()
  const [wordInput, setWordInput] = useState('')
  const [words, setWords] = useState<WordEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [shareUrl, setShareUrl] = useState('')

  const apiKeyMissing = !hasApiKey()

  const parseWords = (input: string): string[] => {
    return input
      .split(/[,\n]+/)
      .map(w => w.trim())
      .filter(w => w.length > 0)
  }

  const handleGenerate = async () => {
    const parsed = parseWords(wordInput)
    if (parsed.length === 0) {
      setError('Please enter at least one word.')
      return
    }
    if (parsed.length > 20) {
      setError('Please enter 20 words or fewer for best results.')
      return
    }

    setError('')
    setLoading(true)
    setWords([])
    setShareUrl('')

    try {
      const result = await generateWordData(parsed)
      setWords(result)
      const compressed = compressData(result)
      const url = `${window.location.origin}/play?data=${compressed}`
      setShareUrl(url)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!shareUrl) return
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handlePreview = () => {
    if (shareUrl) window.open(shareUrl, '_blank')
  }

  const wordCount = parseWords(wordInput).length

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, #2d6a3f 0%, #133d1f 50%, #061408 100%)',
      }}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 px-4 py-3" style={{ background: 'rgba(6,20,8,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(200,150,12,0.2)' }}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 font-cinzel text-sm font-semibold transition-colors"
            style={{ color: 'var(--gold-light)' }}
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to Valley</span>
          </button>
          <div className="flex items-center gap-2">
            <Wand2 size={18} className="text-yellow-400" />
            <span className="font-cinzel font-bold text-yellow-300 text-sm md:text-base">Lesson Forge</span>
          </div>
          <div className="w-24 sm:w-28" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">

        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-cinzel-deco font-bold text-2xl md:text-3xl text-glow-gold mb-2"
              style={{ background: 'linear-gradient(180deg, #ffd700, #c8960c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Forge Your Quest
          </h1>
          <p className="font-nunito text-green-200/70 text-sm">
            Enter your vocabulary words below and let Gemini AI craft the adventure
          </p>
        </motion.div>

        {/* API key warning */}
        <AnimatePresence>
          {apiKeyMissing && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 p-4 rounded-xl flex items-start gap-3"
              style={{ background: 'rgba(155,34,38,0.15)', border: '1.5px solid rgba(155,34,38,0.5)' }}
            >
              <AlertTriangle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-nunito font-bold text-red-300 text-sm">API Key Missing</p>
                <p className="font-nunito text-red-300/80 text-xs mt-0.5">
                  Add <code className="bg-red-900/30 px-1 rounded">VITE_GEMINI_API_KEY=your_key</code> to your <code className="bg-red-900/30 px-1 rounded">.env</code> file and restart the dev server.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Left: Input panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="parchment-aged gold-frame rounded-2xl p-6 scroll-border"
          >
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={18} style={{ color: 'var(--gold)' }} />
              <h2 className="font-cinzel font-bold" style={{ color: 'var(--ink)' }}>Your Word List</h2>
            </div>

            <textarea
              className="rpg-input min-h-[180px] text-sm mb-3"
              placeholder={"brave, cunning, resilient\nmagnificent\nwonder\n…one word per line or comma-separated"}
              value={wordInput}
              onChange={e => setWordInput(e.target.value)}
            />

            <div className="flex items-center justify-between mb-4">
              <span className="font-nunito text-xs" style={{ color: 'var(--stone)' }}>
                {wordCount > 0 ? (
                  <span>
                    <span className="font-bold" style={{ color: wordCount > 20 ? 'var(--crimson)' : 'var(--forest)' }}>{wordCount}</span>
                    {' '}/ 20 words
                  </span>
                ) : 'Enter words above'}
              </span>
              {wordInput && (
                <button
                  className="font-nunito text-xs underline"
                  style={{ color: 'var(--stone)' }}
                  onClick={() => { setWordInput(''); setWords([]); setShareUrl(''); setError('') }}
                >
                  Clear
                </button>
              )}
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="font-nunito text-xs mb-3 p-3 rounded-lg flex items-center gap-2"
                  style={{ background: 'rgba(155,34,38,0.12)', border: '1px solid rgba(155,34,38,0.4)', color: 'var(--crimson)' }}
                >
                  <AlertTriangle size={14} className="flex-shrink-0" />
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              className="btn-rpg w-full flex items-center justify-center gap-2 text-base"
              onClick={handleGenerate}
              disabled={loading || apiKeyMissing || wordCount === 0}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Forging Quest…
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Generate with Gemini
                </>
              )}
            </button>

            {/* Share Section */}
            <AnimatePresence>
              {shareUrl && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-5 overflow-hidden"
                >
                  <div className="ornament-divider mb-4">
                    <span className="font-cinzel text-xs">Share the Quest</span>
                  </div>

                  <div
                    className="p-3 rounded-lg mb-3 break-all"
                    style={{ background: 'rgba(30,92,46,0.1)', border: '1px solid rgba(30,92,46,0.3)' }}
                  >
                    <p className="font-nunito text-xs" style={{ color: 'var(--forest)' }}>{shareUrl}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="btn-rpg flex-1 flex items-center justify-center gap-2 text-sm py-2.5"
                      onClick={handleCopy}
                    >
                      {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                      {copied ? 'Copied!' : 'Copy Link'}
                    </button>
                    <button
                      className="btn-rpg-ghost flex-1 flex items-center justify-center gap-2 text-sm py-2.5"
                      onClick={handlePreview}
                    >
                      <ExternalLink size={16} />
                      Preview
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right: Generated cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-4"
          >
            {loading && (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles size={40} className="text-yellow-400" />
                </motion.div>
                <p className="font-cinzel text-yellow-300/70 text-sm">Gemini is crafting your quest…</p>
                <div className="flex gap-1">
                  {[0,1,2].map(i => (
                    <motion.div key={i} className="w-2 h-2 rounded-full bg-yellow-400"
                      animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }} />
                  ))}
                </div>
              </div>
            )}

            {!loading && words.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 gap-3 opacity-40">
                <div className="text-5xl">📜</div>
                <p className="font-cinzel text-yellow-200 text-sm">Words will appear here</p>
              </div>
            )}

            {!loading && words.length > 0 && (
              <>
                <div className="flex items-center justify-between">
                  <p className="font-cinzel text-sm font-semibold text-green-300">
                    {words.length} words forged! ⚔️
                  </p>
                  <button
                    onClick={handleGenerate}
                    className="flex items-center gap-1 font-nunito text-xs text-yellow-400/70 hover:text-yellow-400 transition-colors"
                  >
                    <RefreshCw size={12} />
                    Regenerate
                  </button>
                </div>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                  {words.map((w, i) => (
                    <WordCard key={w.word + i} entry={w} index={i} />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  )
}
