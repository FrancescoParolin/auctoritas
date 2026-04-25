'use client'

import { useEffect, useState } from 'react'

export default function ReadingProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const scrolled = h.scrollTop
      const max = h.scrollHeight - h.clientHeight
      setPct(max > 0 ? Math.min(1, scrolled / max) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="reading-progress"
      style={{ width: '100%', transform: `scaleX(${pct})` }}
      aria-hidden
    />
  )
}
