type GeneratePasswordOptions = {
  wordlist: string[]
  numWords?: number
  separator?: string
}

export function generatePassword({
  wordlist,
  numWords = 4,
  separator = "-",
}: GeneratePasswordOptions): string {
  const randomWords = []
  const randomIndices = crypto.getRandomValues(new Uint32Array(numWords))

  for (const randomIndex of randomIndices) {
    randomWords.push(wordlist[randomIndex % wordlist.length])
  }

  return randomWords.join(separator)
}
