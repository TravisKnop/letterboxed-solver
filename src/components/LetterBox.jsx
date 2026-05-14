export default function LetterBox({ sides, setSides }) {
  function handleChange(side, index, value) {
    const letter = value.replace(/[^a-zA-Z]/g, '').slice(-1).toUpperCase()
    setSides(prev => {
      const updated = { ...prev, [side]: [...prev[side]] }
      updated[side][index] = letter
      return updated
    })
  }

  function inputProps(side, index) {
    return {
      value: sides[side][index],
      onChange: e => handleChange(side, index, e.target.value),
      maxLength: 1,
      className: 'letter-input',
      'aria-label': `${side} letter ${index + 1}`,
    }
  }

  return (
    <div className="box-wrapper">
      <div className="top-row">
        {[0, 1, 2].map(i => <input key={i} {...inputProps('top', i)} />)}
      </div>

      <div className="middle-row">
        <div className="side-col left-col">
          {[0, 1, 2].map(i => <input key={i} {...inputProps('left', i)} />)}
        </div>
        <div className="box-border" />
        <div className="side-col right-col">
          {[0, 1, 2].map(i => <input key={i} {...inputProps('right', i)} />)}
        </div>
      </div>

      <div className="bottom-row">
        {[0, 1, 2].map(i => <input key={i} {...inputProps('bottom', i)} />)}
      </div>
    </div>
  )
}
