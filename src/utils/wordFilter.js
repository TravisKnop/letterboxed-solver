export function filterWords(sides, wordList, excluded = []) {
  const letterSide = {}
  for (const [side, letters] of Object.entries(sides)) {
    for (const letter of letters) {
      if (letter) letterSide[letter.toUpperCase()] = side
    }
  }

  const entered = new Set(Object.keys(letterSide))
  if (entered.size === 0) return []

  const allFilled = entered.size === 12

  const excludedSet = new Set(excluded)

  return wordList.filter(word => {
    if (word.length < 3) return false
    for (const ch of word) {
      if (excludedSet.has(ch)) return false
    }

    if (allFilled) {
      // Full board: word may only use the 12 entered letters
      for (const ch of word) {
        if (!entered.has(ch)) return false
      }
    } else {
      // Partial input: word must contain every entered letter at least once
      for (const letter of entered) {
        if (!word.includes(letter)) return false
      }
    }

    // No two consecutive letters from the same side (only for placed letters)
    for (let i = 0; i < word.length - 1; i++) {
      const sideA = letterSide[word[i]]
      const sideB = letterSide[word[i + 1]]
      if (sideA && sideB && sideA === sideB) return false
    }

    return true
  })
}
