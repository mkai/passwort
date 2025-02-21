export const wordlists = {
  "1000-common": "1000 Common Words",
}

export type WordlistName = keyof typeof wordlists

export function isSupportedWordlistName(value: unknown): value is WordlistName {
  return typeof value === "string" && value in wordlists
}

export const languages = {
  en: "English",
  es: "Spanish",
  de: "German",
  fr: "French",
  it: "Italian",
}

export type LanguageCode = keyof typeof languages

export function isSupportedLanguageCode(value: unknown): value is LanguageCode {
  return typeof value === "string" && value in languages
}
