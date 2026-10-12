const charsData = [
  { char: '{ }', top: '8%', left: '4%', className: 'float-char accent' },
  { char: '</>', top: '16%', right: '7%', className: 'float-char glow' },
  { char: '01', top: '28%', left: '12%', className: 'float-char dim' },
  { char: '=>', top: '38%', right: '14%', className: 'float-char accent' },
  { char: '[ ]', top: '48%', left: '8%', className: 'float-char' },
  { char: '&&', top: '58%', right: '5%', className: 'float-char glow' },
  { char: '::', top: '68%', left: '15%', className: 'float-char dim' },
  { char: '!=', top: '78%', right: '18%', className: 'float-char accent' },
  { char: ';', top: '88%', left: '6%', className: 'float-char' },
  { char: '#', top: '92%', right: '8%', className: 'float-char dim' },
  { char: '//', top: '22%', left: '42%', className: 'float-char' },
  { char: '$', top: '64%', left: '48%', className: 'float-char accent' },
  { char: '0', top: '82%', left: '38%', className: 'float-char glow' },
  { char: '1', top: '44%', right: '35%', className: 'float-char dim' }
]

export default function FloatingChars() {
  return (
    <div className="floating-chars-layer" aria-hidden="true">
      {charsData.map((item, idx) => (
        <span
          key={idx}
          className={item.className}
          style={{
            top: item.top,
            left: item.left,
            right: item.right
          }}
        >
          {item.char}
        </span>
      ))}
    </div>
  )
}
