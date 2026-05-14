export function filterWords(sides, wordList) {
  const letterSide = {}
  for (const [side, letters] of Object.entries(sides)) {
    for (const letter of letters) {
      if (letter) letterSide[letter.toUpperCase()] = side
    }
  }

  const entered = new Set(Object.keys(letterSide))
  if (entered.size === 0) return []

  return wordList.filter(word => {
    if (word.length < 3) return false
    for (const ch of word) {
      if (!entered.has(ch)) return false
    }
    for (let i = 0; i < word.length - 1; i++) {
      if (letterSide[word[i]] === letterSide[word[i + 1]]) return false
    }
    return true
  })
}
