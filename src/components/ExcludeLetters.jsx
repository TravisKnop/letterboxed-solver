import { useState, useRef, useEffect } from 'react'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export default function ExcludeLetters({ excluded, setExcluded }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function toggle(letter) {
    setExcluded(prev =>
      prev.includes(letter) ? prev.filter(l => l !== letter) : [...prev, letter].sort()
    )
  }

  const label = excluded.length === 0
    ? 'Exclude letters'
    : `Excluded: ${excluded.join(', ')}`

  return (
    <div className="exclude-wrapper" ref={ref}>
      <button
        className={`exclude-toggle ${excluded.length > 0 ? 'has-selection' : ''}`}
        onClick={() => setOpen(v => !v)}
        type="button"
      >
        {label}
        <span className="chevron">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="exclude-dropdown">
          <div className="exclude-grid">
            {ALPHABET.map(letter => (
              <label key={letter} className={`exclude-option ${excluded.includes(letter) ? 'checked' : ''}`}>
                <input
                  type="checkbox"
                  checked={excluded.includes(letter)}
                  onChange={() => toggle(letter)}
                />
                {letter}
              </label>
            ))}
          </div>
          {excluded.length > 0 && (
            <button className="clear-excluded" onClick={() => setExcluded([])}>
              Clear all
            </button>
          )}
        </div>
      )}
    </div>
  )
}
