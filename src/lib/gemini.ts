import { GoogleGenAI } from '@google/genai'
import type { WordEntry } from './compression'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY as string | undefined

export function hasApiKey(): boolean {
  return !!API_KEY && API_KEY !== 'undefined'
}

export async function generateWordData(words: string[]): Promise<WordEntry[]> {
  if (!hasApiKey()) {
    throw new Error('GEMINI_API_KEY is not set. Please add it to your .env file as VITE_GEMINI_API_KEY.')
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY! })

  const wordList = words.join(', ')

  const prompt = `You are a helpful teacher creating vocabulary materials for Malaysian primary school students (ages 10-12).

For each of the following English words, generate a JSON object with these fields:
- word: the vocabulary word (exactly as given)
- definition: a simple, clear definition suitable for children aged 10-12 (max 20 words)
- synonym: one common synonym (single word)
- sentence: a complete example sentence using the word naturally (max 20 words)
- blankedSentence: the same sentence but with the vocabulary word replaced by "______"

Words: ${wordList}

Return ONLY a valid JSON array of objects, no markdown, no explanation, no code blocks. Just raw JSON.
Example format:
[{"word":"brave","definition":"Having courage and not being afraid of danger","synonym":"courageous","sentence":"The brave knight rescued the trapped villagers from the flood.","blankedSentence":"The ______ knight rescued the trapped villagers from the flood."}]`

  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: prompt,
  })

  const text = response.text ?? ''

  // Strip any accidental markdown fences
  const clean = text.replace(/```json|```/gi, '').trim()

  let parsed: WordEntry[]
  try {
    parsed = JSON.parse(clean)
  } catch {
    // Try extracting JSON array from response
    const match = clean.match(/\[[\s\S]*\]/)
    if (!match) throw new Error('Could not parse Gemini response as JSON. Please try again.')
    parsed = JSON.parse(match[0])
  }

  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error('Gemini returned an empty or invalid response. Please try again.')
  }

  return parsed
}
