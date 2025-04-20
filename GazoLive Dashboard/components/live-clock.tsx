"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

export function LiveClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })

  const formattedDate = time.toLocaleDateString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-1 text-sm">
      <Clock className="h-4 w-4 text-muted-foreground" />
      <span>
        <span className="font-medium">{formattedTime}</span>
        <span className="ml-2 text-muted-foreground">{formattedDate}</span>
      </span>
    </div>
  )
}
