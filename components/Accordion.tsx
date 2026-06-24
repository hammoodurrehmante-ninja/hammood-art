'use client'
import { useState } from 'react'

interface AccordionItem {
  title: string
  text: string
  tags: string[]
}

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState(0)

  const toggle = (i: number) => setOpenIndex(prev => (prev === i ? -1 : i))

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} className={`accordion-item${openIndex === i ? ' open' : ''}`}>
          <button className="accordion-btn" onClick={() => toggle(i)}>
            {item.title}
            <span className="acc-icon">+</span>
          </button>
          <div className="accordion-body">
            <div className="accordion-body-inner">
              <p className="accordion-text">{item.text}</p>
              <div className="acc-tags">
                {item.tags.map(tag => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
