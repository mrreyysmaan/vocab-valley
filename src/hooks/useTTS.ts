import { useState, useCallback, useRef } from 'react'

export function useTTS() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  const speak = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()
    setIsSpeaking(false)

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.pitch = 1.05
    utterance.volume = 1

    // Try to use a clear English voice
    const voices = window.speechSynthesis.getVoices()
    const preferred = voices.find(v =>
      v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Premium'))
    ) || voices.find(v => v.lang.startsWith('en'))
    if (preferred) utterance.voice = preferred

    utterance.onstart  = () => setIsSpeaking(true)
    utterance.onend    = () => setIsSpeaking(false)
    utterance.onerror  = () => setIsSpeaking(false)

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }, [])

  const stop = useCallback(() => {
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }, [])

  return { speak, stop, isSpeaking, isSupported: 'speechSynthesis' in window }
}
