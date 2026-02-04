"use client"

import { Tweet } from "react-tweet"
import "bootstrap-icons/font/bootstrap-icons.css"

// Your Twitter post IDs
const tweetIds = [
  "1981713597341548664",
  "1986790941756465634",
  "2010096219260105083"
]

function TweetCard({ id }: { id: string }) {
  const handleClick = () => {
    window.open(`https://x.com/i/status/${id}`, '_blank')
  }
  
  return (
    <div 
      onClick={handleClick}
      className="shrink-0 w-[220px] h-[180px] overflow-hidden rounded-lg relative cursor-pointer hover:opacity-90 transition-opacity"
    >
      <div className="absolute inset-0 transform scale-[0.55] origin-top-left pointer-events-none" style={{ width: '400px' }}>
        <Tweet id={id} />
      </div>
    </div>
  )
}

export function Ideas() {
  return (
    <section className="px-6 py-4 max-w-3xl mx-auto">
      <div className="border-t border-zinc-800 pt-4 mb-4">
        <h2 className="text-xl font-bold tracking-tight mb-1 font-mono">
          Ideas{" "}
          <span className="text-zinc-500 text-sm font-normal font-sans">
            I&apos;m currently working on
          </span>
        </h2>
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {tweetIds.map((id) => (
          <TweetCard key={id} id={id} />
        ))}
      </div>
    </section>
  )
}
