import { useEffect, useState } from 'react'

type Props = {
  text: string
  speed?: number
  className?: string
}

export default function Typewriter({ text, speed = 40, className }: Props) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])

  return (
    <span className={className}>
      {displayed}
      <span className="inline-block w-[0.6ch] -mb-1 animate-pulse">|</span>
    </span>
  )
}


