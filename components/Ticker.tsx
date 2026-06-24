interface TickerProps {
  items: string[]
  reverse?: boolean
}

export default function Ticker({ items, reverse = false }: TickerProps) {
  const doubled = [...items, ...items]
  return (
    <div className="ticker" style={{ marginTop: 0 }}>
      <div className={`ticker-track${reverse ? ' rev' : ''}`}>
        {doubled.map((item, i) => (
          <span key={i} className="ticker-item">
            {item} <span className="ticker-dot">●</span>
          </span>
        ))}
      </div>
    </div>
  )
}
