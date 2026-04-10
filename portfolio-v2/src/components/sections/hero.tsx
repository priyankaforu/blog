"use client"

import Image from "next/image"
import "bootstrap-icons/font/bootstrap-icons.css"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

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
  const [linkCopied, setLinkCopied] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const email = "priyankapudi4u@gmail.com"

  useEffect(() => {
    setMounted(true)
  }, [])

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

  const handleShareProfile = async () => {
    const url = 'https://priyankapudi.com'
    
    // Check if it's a mobile device with native share
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    
    if (isMobile && navigator.share) {
      try {
        await navigator.share({
          title: 'Priyanka Pudi | Freelancer & Builder',
          text: 'Check out Priyanka Pudi - She ships products in hours, not months!',
          url: url
        })
      } catch (err) {
        // User cancelled share
      }
    } else {
      // Desktop/tablet: copy URL and show feedback
      await navigator.clipboard.writeText(url)
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    }
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

  const isLight = mounted && theme === "light"

  return (
    <>
      {/* Location and Time — full width, pinned to edges */}
      <div className="flex items-center justify-between text-sm px-4 sm:px-6 pt-4 pb-6 w-full" style={{ fontFamily: "'Onest', sans-serif", color: 'var(--foreground)' }}>
        <a href="https://www.timeanddate.com/worldclock/converter.html?iso=20260410T00&p1=44" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">
          IN&nbsp;&nbsp;{time}
        </a>
        <div className="flex items-center gap-1.5">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="mr-2 cursor-pointer hover:opacity-70 transition-opacity"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <i className="bi bi-sun text-sm" />
              ) : (
                <i className="bi bi-moon-fill text-sm" />
              )}
            </button>
          )}
          <a href="https://www.google.com/maps/place/Vijayawada" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-[var(--accent)] transition-colors">
            <i className="bi bi-geo-alt text-xs" />
            <span>{data.location}</span>
          </a>
        </div>
      </div>

    <section className="flex flex-col justify-start px-6 pt-2 pb-6 max-w-3xl mx-auto">

      {/* Profile section */}
      <div className="flex items-center gap-4 mb-4">
        <div 
          className="relative w-16 h-16 rounded-full overflow-hidden bg-[var(--muted)] shrink-0 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
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
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-lg sm:text-xl font-bold tracking-wide">
              {data.name}
            </h1>
            <button
              onClick={handleShareProfile}
              className="cursor-pointer flex items-center gap-1.5"
              title="Share profile"
            >
              <span className="w-6 h-6 flex items-center justify-center rounded border border-blue-500 hover:border-blue-400 transition-colors">
                <i className="bi bi-box-arrow-up text-sm" style={{ color: 'var(--foreground)' }} />
              </span>
              {linkCopied && <span className="text-xs text-green-600">Link copied!</span>}
            </button>
            <a
              href="https://drive.google.com/file/d/1U2yej9hKHxyfYXaNG1_V6p9pBRBA2Ejr/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 text-xs sm:text-sm rounded-full bg-[var(--muted)] hover:border-blue-500 hover:text-[var(--accent)] transition-all ml-auto"
              style={{ color: 'var(--cv-text)', borderWidth: '1px', borderColor: 'var(--cv-border)' }}
            >
              <i className="bi bi-download text-xs" />
              Download CV
            </a>
          </div>
          {data.socials?.[1] && (
            <a 
              href={data.socials[1].url}
              className="text-zinc-500 hover:text-[var(--foreground)] text-sm"
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
      <div className="text-sm mb-4 leading-relaxed space-y-3" style={{ color: 'var(--foreground)', opacity: 0.85 }}>
        <p>
          I have studied <span className="font-medium" style={{ color: 'var(--accent)' }}>Electrical Engineering</span> for 4 years and got nothing out of it except some mugged up formulae. But I have to agree that my final year has taught me a little about automating stuff using <span className="font-medium" style={{ color: 'var(--accent)' }}>PLCs</span>. Later I have been in <span className="font-medium" style={{ color: 'var(--accent)' }}>Germany</span> for almost 5 years and I can proudly say, this time has <span className="font-medium" style={{ color: 'var(--accent)' }}>transformed me completely</span> who I am now.
        </p>
        <p>
          I love building <span className="font-medium" style={{ color: 'var(--accent)' }}>end-to-end solutions</span>. I can work with any tech stack because I&apos;m a focused learner who picks up whatever&apos;s needed to bring a product to life — whether it&apos;s <span className="font-medium" style={{ color: 'var(--accent)' }}>hardware or software</span>. My agenda? <span className="font-medium" style={{ color: 'var(--accent)' }}>Accomplish what you desire</span>. Need me to build for your users or build for you? I jump on it and craft solutions <span className="font-medium" style={{ color: 'var(--accent)' }}>within hours, not months</span>.
        </p>
        <p>
          Got nightmares with bug fixes or broken systems? Don&apos;t worry — I&apos;m here to even fix your toilet flush at 2 AM. Sounds like a joke, but that&apos;s the truth about who&apos;s gonna work for you. I <span className="font-medium" style={{ color: 'var(--accent)' }}>love fixing chaos</span>, work with clarity, and communicate honestly. Straight and simple.
        </p>
        <p style={{ color: 'var(--muted-foreground)' }}>
          Okay, that&apos;s the raw talk about me. Now go ahead — hover over my skills and explore my portfolio below.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-2 mb-3">
        <a
          href="https://drive.google.com/file/d/1U2yej9hKHxyfYXaNG1_V6p9pBRBA2Ejr/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="sm:hidden inline-flex items-center gap-2 px-3 py-2 text-xs rounded-full bg-[var(--muted)] hover:border-blue-500 hover:text-[var(--accent)] transition-all"
          style={{ color: 'var(--cv-text)', borderWidth: '1px', borderColor: 'var(--cv-border)' }}
        >
          <i className="bi bi-download text-xs" />
          Download CV
        </a>
        <a
          href="https://x.com/priyankapudi"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm rounded-full bg-[var(--muted)] border border-green-600 hover:border-green-500 transition-all"
        >
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-600 animate-pulse" />
          I am super active here, just hire me with dm
          <i className="bi bi-twitter-x text-xs sm:text-sm" />
        </a>
        <a
          href="https://topmate.io/priyankapudi"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm rounded-full bg-[var(--muted)] border border-blue-500 hover:border-blue-400 transition-all"
        >
          <i className="bi bi-calendar-check text-xs sm:text-sm" />
          Book a call to discuss your ideas
        </a>
      </div>

      {/* Social Links */}
      <div className="space-y-2">
        <p className="text-xs text-zinc-500">
          You can also find me here
        </p>
        <div className="flex flex-wrap gap-2">
          <div className="relative" data-email-popup>
            <button
              onClick={() => setShowEmail(!showEmail)}
              className="inline-flex items-center justify-center gap-2 w-28 h-9 text-sm rounded-full bg-[var(--muted)] border border-[var(--border)] hover:border-blue-500 transition-all cursor-pointer"
            >
              <i className="bi bi-envelope text-sm" />
              Email Me
            </button>
            {showEmail && (
              <div className="absolute top-full left-0 mt-2 flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--card)] border border-[var(--border)] z-10 whitespace-nowrap cursor-pointer">
                <span className="text-xs text-[var(--foreground)]">{email}</span>
                <button
                  onClick={handleCopyEmail}
                  className="text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors cursor-pointer"
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
                className="inline-flex items-center justify-center gap-2 w-28 h-9 text-sm rounded-full bg-[var(--muted)] border border-[var(--border)] hover:border-blue-500 transition-all capitalize cursor-pointer"
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
            className="inline-flex items-center justify-center gap-2 w-28 h-9 text-sm rounded-full bg-[var(--muted)] border border-[var(--border)] hover:border-blue-500 transition-all cursor-pointer"
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
            className="inline-flex items-center justify-center gap-2 w-28 h-9 text-sm rounded-full bg-[var(--muted)] border border-[var(--border)] hover:border-blue-500 transition-all cursor-pointer"
          >
            <i className="bi bi-substack text-sm" />
            Substack
          </a>
          <a
            href="https://medium.com/@priyankapudi4u"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-28 h-9 text-sm rounded-full bg-[var(--muted)] border border-[var(--border)] hover:border-blue-500 transition-all cursor-pointer"
          >
            <i className="bi bi-medium text-sm" />
            Medium
          </a>
        </div>
      </div>
    </section>
    </>
  )
}