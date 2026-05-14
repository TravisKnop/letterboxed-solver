import { useState, useEffect } from 'react'
import LetterBox from './components/LetterBox'
import WordList from './components/WordList'
import ExcludeLetters from './components/ExcludeLetters'
import { filterWords } from './utils/wordFilter'
import './App.css'

const EMPTY_SIDES = { top: ['', '', ''], right: ['', '', ''], bottom: ['', '', ''], left: ['', '', ''] }

export default function App() {
  const [sides, setSides] = useState(EMPTY_SIDES)
  const [wordList, setWordList] = useState([])
  const [loading, setLoading] = useState(true)
  const [showList, setShowList] = useState(false)
  const [excluded, setExcluded] = useState([])

  useEffect(() => {
    fetch('/enable.txt')
      .then(r => r.text())
      .then(text => {
        setWordList(text.split('\n').map(w => w.trim().toUpperCase()).filter(Boolean))
        setLoading(false)
      })
  }, [])

  const validWords = loading ? [] : filterWords(sides, wordList, excluded)

  function handleClear() {
    setSides(EMPTY_SIDES)
    setExcluded([])
    setShowList(false)
  }

  return (
    <div className="app">
      <h1>Letterboxed Solver</h1>

      <div className="count-bar">
        {loading ? (
          <span className="loading">Loading word list…</span>
        ) : (
          <span className="count">{validWords.length.toLocaleString()} valid word{validWords.length !== 1 ? 's' : ''}</span>
        )}
      </div>

      <LetterBox sides={sides} setSides={setSides} />

      <ExcludeLetters excluded={excluded} setExcluded={setExcluded} />

      <div className="controls">
        <button
          className="btn-primary"
          onClick={() => setShowList(v => !v)}
          disabled={loading || validWords.length === 0}
        >
          {showList ? 'Hide List' : 'View List'}
        </button>
        <button className="btn-secondary" onClick={handleClear}>Clear</button>
      </div>

      {showList && <WordList words={validWords} />}
    </div>
  )
}
