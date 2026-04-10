"use client"

import { useState, useEffect } from "react"

const achievements = [
  { emoji: "💪", text: "Love building to the core" },
  { emoji: "⚡", text: "She can ship within hrs not days" },
  { emoji: "💡", text: "Love to work on clients ideas" },
  { emoji: "🚀", text: "Her first prod got sales in 24hrs" },
  { emoji: "🎯", text: "Love to satisfy the users" },
]

export default function Loading() {
  const [progress, setProgress] = useState(0)
  const [currentAchievement, setCurrentAchievement] = useState(0)

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100
        const increment = prev < 70 ? Math.random() * 15 + 5 : Math.random() * 5 + 1
        return Math.min(prev + increment, 99)
      })
    }, 200)

    const achievementInterval = setInterval(() => {
      setCurrentAchievement(prev => (prev + 1) % achievements.length)
    }, 1800)

    return () => {
      clearInterval(progressInterval)
      clearInterval(achievementInterval)
    }
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'var(--background)' }}>
      <div className="space-y-6 px-6">
        {/* Achievement display */}
        <div className="flex items-center gap-2">
          <span className="text-lg">{achievements[currentAchievement].emoji}</span>
          <p className="text-lg font-medium transition-opacity duration-300" style={{ color: 'var(--foreground)' }}>
            {achievements[currentAchievement].text}
          </p>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="w-full h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--muted)' }}>
            <div 
              className="h-full rounded-full transition-all duration-200 ease-out" 
              style={{ width: `${progress}%`, backgroundColor: 'var(--accent)' }}
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
              Your best hire in
            </p>
            <p className="text-xs font-mono" style={{ color: 'var(--muted-foreground)' }}>
              {Math.round(progress)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
