'use client'

import { Tweet } from 'react-tweet'
import { Component, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class TweetBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch() {
    // Silently catch react-tweet entity parsing errors
  }

  render() {
    if (this.state.hasError) {
      return <div className="p-4 text-xs text-zinc-400">Tweet unavailable</div>
    }
    return this.props.children
  }
}

export function SafeTweet({ id }: { id: string }) {
  return (
    <TweetBoundary>
      <Tweet id={id} />
    </TweetBoundary>
  )
}
