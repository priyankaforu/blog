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
    <div className="fixed inset-0 bg-zinc-950 flex items-center justify-center z-50">
      <div className="space-y-6 px-6">
        {/* Achievement display */}
        <div className="flex items-center gap-2">
          <span className="text-lg">{achievements[currentAchievement].emoji}</span>
          <p className="text-lg text-zinc-200 font-medium transition-opacity duration-300">
            {achievements[currentAchievement].text}
          </p>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-zinc-500">
              Your best hire in
            </p>
            <p className="text-xs text-zinc-500 font-mono">
              {Math.round(progress)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
