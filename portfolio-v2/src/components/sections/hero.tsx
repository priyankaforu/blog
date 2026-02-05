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
  const [showEmail, setShowEmail] = useState(false)
  const [copied, setCopied] = useState(false)

  const email = "priyankapudi4u@gmail.com"

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

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
      setShowEmail(false)
    }, 1000)
  }

  // Close email popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (showEmail && !target.closest('[data-email-popup]')) {
        setShowEmail(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [showEmail])

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
          <div className="relative max-w-2xl max-h-[90vh] cursor-pointer">
            <Image
              src="/profile.png"
              alt={data.name}
              width={400}
              height={400}
              className="object-contain rounded-lg cursor-pointer"
              priority
            />
            <button 
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 cursor-pointer"
              onClick={() => setShowFullImage(false)}
            >
              <i className="bi bi-x-lg text-sm" />
            </button>
          </div>
        </div>
      )}

      {/* Bio */}
      <div className="text-sm text-zinc-300 dark:text-zinc-300 mb-4 leading-relaxed space-y-3">
        <p>
          I have studied <span className="text-blue-400 font-medium">Electrical Engineering</span> for 4 years and got nothing out of it except some mugged up formulae. But I have to agree that my final year has taught me a little about automating stuff using <span className="text-blue-400 font-medium">PLCs</span>. Later I have been in <span className="text-blue-400 font-medium">Germany</span> for almost 5 years and I can proudly say, this time has <span className="text-blue-400 font-medium">transformed me completely</span> who I am now.
        </p>
        <p>
          I love building <span className="text-blue-400 font-medium">end-to-end solutions</span>. I can work with any tech stack because I&apos;m a focused learner who picks up whatever&apos;s needed to bring a product to life — whether it&apos;s <span className="text-blue-400 font-medium">hardware or software</span>. My agenda? <span className="text-blue-400 font-medium">Accomplish what you desire</span>. Need me to build for your users or build for you? I jump on it and craft solutions <span className="text-blue-400 font-medium">within hours, not months</span>.
        </p>
        <p>
          Got nightmares with bug fixes or broken systems? Don&apos;t worry — I&apos;m here to even fix your toilet flush at 2 AM. Sounds like a joke, but that&apos;s the truth about who&apos;s gonna work for you. I <span className="text-blue-400 font-medium">love fixing chaos</span>, work with clarity, and communicate honestly. Straight and simple.
        </p>
        <p className="text-zinc-500">
          Okay, that&apos;s the raw talk about me. Now go ahead — hover over my skills and explore my portfolio below.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-2 mb-3">
        <a
          href="https://x.com/priyankapudi"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm rounded-full bg-zinc-800/60 border border-green-500 hover:border-green-400 transition-all"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          I am super active here, just hire me with dm
          <i className="bi bi-twitter-x text-sm" />
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
          <div className="relative" data-email-popup>
            <button
              onClick={() => setShowEmail(!showEmail)}
              className="inline-flex items-center justify-center gap-2 w-28 h-9 text-sm rounded-full bg-zinc-800/60 border border-zinc-700 hover:border-blue-500 transition-all cursor-pointer"
            >
              <i className="bi bi-envelope text-sm" />
              Email Me
            </button>
            {showEmail && (
              <div className="absolute top-full left-0 mt-2 flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 z-10 whitespace-nowrap cursor-pointer">
                <span className="text-xs text-zinc-300">{email}</span>
                <button
                  onClick={handleCopyEmail}
                  className="text-zinc-400 hover:text-blue-400 transition-colors cursor-pointer"
                  title="Copy email"
                >
                  <i className={`bi ${copied ? 'bi-check-lg text-green-400' : 'bi-copy'} text-sm`} />
                </button>
              </div>
            )}
          </div>
          {data.socials?.map((social) => {
            const iconClass = socialIconClasses[social.platform.toLowerCase()] || "bi-github"
            return (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-28 h-9 text-sm rounded-full bg-zinc-800/60 border border-zinc-700 hover:border-blue-500 transition-all capitalize cursor-pointer"
              >
                <i className={`bi ${iconClass} text-sm`} />
                {social.platform}
              </a>
            )
          })}
          <a
            href="https://peerlist.io/priyankapudi4u"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-28 h-9 text-sm rounded-full bg-zinc-800/60 border border-zinc-700 hover:border-blue-500 transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.35 3H15.65C17.6 3 19.15 4.55 19.15 6.5V17.5C19.15 19.45 17.6 21 15.65 21H8.35C6.4 21 4.85 19.45 4.85 17.5V6.5C4.85 4.55 6.4 3 8.35 3ZM8.35 5C7.5 5 6.85 5.65 6.85 6.5V17.5C6.85 18.35 7.5 19 8.35 19H15.65C16.5 19 17.15 18.35 17.15 17.5V6.5C17.15 5.65 16.5 5 15.65 5H8.35ZM12 7C13.65 7 15 8.35 15 10C15 11.65 13.65 13 12 13C10.35 13 9 11.65 9 10C9 8.35 10.35 7 12 7ZM12 9C11.45 9 11 9.45 11 10C11 10.55 11.45 11 12 11C12.55 11 13 10.55 13 10C13 9.45 12.55 9 12 9ZM9 15H15V17H9V15Z"/>
            </svg>
            Peerlist
          </a>
          <a
            href="https://substack.com/@priyankapudi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-28 h-9 text-sm rounded-full bg-zinc-800/60 border border-zinc-700 hover:border-blue-500 transition-all cursor-pointer"
          >
            <i className="bi bi-substack text-sm" />
            Substack
          </a>
          <a
            href="https://medium.com/@priyankapudi4u"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-28 h-9 text-sm rounded-full bg-zinc-800/60 border border-zinc-700 hover:border-blue-500 transition-all cursor-pointer"
          >
            <i className="bi bi-medium text-sm" />
            Medium
          </a>
        </div>
      </div>
    </section>
  )
}
