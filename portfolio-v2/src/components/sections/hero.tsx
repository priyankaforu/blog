"use client"

import Image from "next/image"
import "bootstrap-icons/font/bootstrap-icons.css"
import { useState, useEffect } from "react"

interface Profile {
  name: string
  tagline: string
  bio: string
  image?: any
  location?: string
  email?: string
  resumeUrl?: string
  availableForWork?: boolean
  socials?: Array<{
    platform: string
    url: string
    username?: string
  }>
}

interface HeroProps {
  profile: Profile | null
}

const socialIconClasses: Record<string, string> = {
  github: "bi-github",
  twitter: "bi-twitter-x",
  linkedin: "bi-linkedin",
  email: "bi-envelope",
}

export function Hero({ profile }: HeroProps) {
  const [time, setTime] = useState("")
  const [showFullImage, setShowFullImage] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const istTime = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      })
      setTime(istTime)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  // Fallback data if Sanity isn't connected yet
  const data = profile || {
    name: "Priyanka Pudi",
    tagline: "An Electrical Engineer, Mastering Computers",
    bio: "I have studied Electrical Engineering for 4 years and got nothing out of it except some mugged up formulae. But I have to agree that my final year has taught me a little about automating stuff using PLCs. Later I have been in Germany for almost 5 years and I can proudly say, this time has transformed me completely who I am now.",
    location: "Vijayawada, India",
    email: "hello@priyankapudi.com",
    availableForWork: true,
    socials: [
      { platform: "github", url: "https://github.com/priyankaforu", username: "priyankaforu" },
      { platform: "twitter", url: "https://x.com/priyankapudi", username: "@priyankapudi" },
      { platform: "linkedin", url: "https://linkedin.com/in/priyankapudi", username: "priyankapudi" },
    ]
  }

  return (
    <section className="flex flex-col justify-start px-6 pt-6 pb-6 max-w-3xl mx-auto">
      {/* Location and Time badge */}
      <div className="flex items-center justify-between text-sm mb-8 w-full">
        <div className="text-sm font-mono text-zinc-400 dark:text-zinc-400">
          IN {time}
        </div>
        <div className="flex items-center gap-2 text-zinc-400 dark:text-zinc-400">
          <i className="bi bi-geo-alt text-xs" />
          <span>{data.location}</span>
        </div>
      </div>

      {/* Profile section */}
      <div className="flex items-center gap-4 mb-4">
        <div 
          className="relative w-16 h-16 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-800 shrink-0 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
          onClick={() => setShowFullImage(true)}
        >
          <Image
            src="/profile.png"
            alt={data.name}
            width={200}
            height={200}
            className="object-cover object-top w-full h-full"
            priority
            unoptimized
          />
        </div>
        <div>
          <h1 className="text-lg sm:text-xl font-bold tracking-wide mb-0.5">
            {data.name}
          </h1>
          {data.socials?.[1] && (
            <a 
              href={data.socials[1].url}
              className="text-zinc-500 hover:text-zinc-300 text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.socials[1].username}
            </a>
          )}
        </div>
      </div>

      {/* Full Image Modal */}
      {showFullImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setShowFullImage(false)}
        >
          <div className="relative max-w-2xl max-h-[90vh]">
            <Image
              src="/profile.png"
              alt={data.name}
              width={800}
              height={800}
              className="object-contain rounded-lg"
              unoptimized
            />
            <button 
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70"
              onClick={() => setShowFullImage(false)}
            >
              <i className="bi bi-x-lg text-xl" />
            </button>
          </div>
        </div>
      )}

      {/* Bio */}
      <div className="text-sm text-zinc-300 dark:text-zinc-300 mb-4 leading-relaxed">
        <p>
          I have studied <span className="text-blue-400 font-medium">Electrical Engineering</span> for 4 years and got nothing out of it except some mugged up formulae. But I have to agree that my final year has taught me a little about automating stuff using <span className="text-blue-400 font-medium">PLCs</span>. Later I have been in <span className="text-blue-400 font-medium">Germany</span> for almost 5 years and I can proudly say, this time has <span className="text-blue-400 font-medium">transformed me completely</span> who I am now.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-2 mb-3">
        <a
          href="https://x.com/priyankapudi"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs rounded-full bg-zinc-800/60 border border-zinc-700 hover:border-blue-500 transition-all"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          I am super active here, just hire me with dm
          <i className="bi bi-twitter-x text-xs" />
        </a>
        {data.resumeUrl && (
          <a
            href={data.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs rounded-full bg-zinc-800/60 border border-zinc-700 hover:border-blue-500 transition-all"
          >
            <i className="bi bi-download text-xs" />
            Download CV
          </a>
        )}
      </div>

      {/* Social Links */}
      <div className="space-y-2">
        <p className="text-xs text-zinc-500 dark:text-zinc-500">
          You can also find me here
        </p>
        <div className="flex flex-wrap gap-2">
          <a
            href="mailto:priyankapudi4u@gmail.com"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs rounded-full bg-zinc-800/60 border border-zinc-700 hover:border-blue-500 transition-all"
          >
            <i className="bi bi-envelope text-xs" />
            Email Me
          </a>
          {data.socials?.map((social) => {
            const iconClass = socialIconClasses[social.platform.toLowerCase()] || "bi-github"
            return (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs rounded-full bg-zinc-800/60 border border-zinc-700 hover:border-blue-500 transition-all capitalize"
              >
                <i className={`bi ${iconClass} text-xs`} />
                {social.platform}
              </a>
            )
          })}
          <a
            href="https://substack.com/@priyankapudi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs rounded-full bg-zinc-800/60 border border-zinc-700 hover:border-blue-500 transition-all"
          >
            <i className="bi bi-substack text-xs" />
            Substack
          </a>
          <a
            href="https://medium.com/@priyankapudi4u"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs rounded-full bg-zinc-800/60 border border-zinc-700 hover:border-blue-500 transition-all"
          >
            <i className="bi bi-medium text-xs" />
            Medium
          </a>
        </div>
      </div>
    </section>
  )
}
