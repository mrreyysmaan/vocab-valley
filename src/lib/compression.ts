import LZString from 'lz-string'

export interface WordEntry {
  word: string
  definition: string
  synonym: string
  sentence: string
  blankedSentence: string
}

export function compressData(data: WordEntry[]): string {
  return LZString.compressToEncodedURIComponent(JSON.stringify(data))
}

export function decompressData(encoded: string): WordEntry[] | null {
  try {
    const json = LZString.decompressFromEncodedURIComponent(encoded)
    if (!json) return null
    const parsed = JSON.parse(json)
    if (!Array.isArray(parsed)) return null
    // Validate each entry
    for (const item of parsed) {
      if (
        typeof item.word !== 'string' ||
        typeof item.definition !== 'string' ||
        typeof item.synonym !== 'string' ||
        typeof item.sentence !== 'string' ||
        typeof item.blankedSentence !== 'string'
      ) {
        return null
      }
    }
    return parsed as WordEntry[]
  } catch {
    return null
  }
}
