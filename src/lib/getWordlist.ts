import { type LanguageCode, type WordlistName } from "../types"

const wordlistUrls: Record<
  WordlistName,
  Record<LanguageCode, string | undefined>
> = {
  "1000-common": {
    en: "https://raw.githubusercontent.com/bukowa/1000-common-words/934f7a24fdc50e57b25e2bd1e0bfa9d6428d6601/English-1000-common.txt",
    es: "https://raw.githubusercontent.com/bukowa/1000-common-words/934f7a24fdc50e57b25e2bd1e0bfa9d6428d6601/Spanish-1000-common.txt",
    de: "https://raw.githubusercontent.com/bukowa/1000-common-words/934f7a24fdc50e57b25e2bd1e0bfa9d6428d6601/German-1000-common.txt",
    fr: "https://raw.githubusercontent.com/bukowa/1000-common-words/934f7a24fdc50e57b25e2bd1e0bfa9d6428d6601/French-1000-common.txt",
    it: "https://raw.githubusercontent.com/bukowa/1000-common-words/934f7a24fdc50e57b25e2bd1e0bfa9d6428d6601/Italian-1000-common.txt",
  },
  diceware: {
    en: undefined,
    es: undefined,
    de: "https://raw.githubusercontent.com/klamann/diceware-dereko/b369abd3fe76c502687bde38c77704657ae62215/diceware-dereko.txt",
    fr: undefined,
    it: undefined,
  },
}

async function fetchWordlist(
  name: WordlistName,
  language: LanguageCode,
): Promise<string> {
  const url = wordlistUrls[name]?.[language]
  if (!url) {
    throw new Error("no such word list")
  }

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(
        `response error: ${response.status} ${response.statusText}`,
      )
    }

    return response.text()
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "<unknown error>"

    console.error(`Failed to fetch wordlist: ${message}`)
    throw new Error(message)
  }
}

function splitLines(lines: string): string[] {
  return lines
    .split(/\r?\n|\r/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
}

function buildWordlist(language: LanguageCode, lines: string[]): string[] {
  const wordlist = new Set<string>()

  for (const line of lines) {
    const words = line
      .replace(/^\d{5}\s/, "") // remove Diceware prefix (11111, 11112, etc.)
      .split(/\s+/)
      .map((word) => word.trim())
      .filter(Boolean)
      .map((word) => word.toLocaleLowerCase(language))
      .map((word) => word.replace(/[.,!¡¿?;:%]/g, "")) // Remove punctuation

    for (const word of words) {
      if (!wordlist.has(word)) {
        wordlist.add(word)
      }
    }
  }

  return Array.from(wordlist)
}

type GetWordlistOptions = {
  name: WordlistName
  language: LanguageCode
  minLength: number
}

export async function getWordlist({
  name,
  language,
  minLength,
}: GetWordlistOptions): Promise<string[]> {
  const text = await fetchWordlist(name, language)
  const lines = splitLines(text)
  const wordlist = buildWordlist(language, lines)

  if (minLength && wordlist.length < minLength) {
    throw new Error("word list too short")
  }

  return wordlist
}
