export default function WordList({ words }) {
  if (words.length === 0) {
    return <p className="no-words">No valid words yet — enter some letters above.</p>
  }

  return (
    <div className="word-list">
      {words.map(word => (
        <span key={word} className="word-chip">{word}</span>
      ))}
    </div>
  )
}
