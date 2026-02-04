"use client"

import { Tweet } from "react-tweet"
import "bootstrap-icons/font/bootstrap-icons.css"

// All testimonials organized
const testimonials = {
  products: {
    doodlenotes: ["2018232456181133352", "2018399087591321989", "2017672155090112526", "2017630315661889547"],
    postmaker: ["1990279446318956766", "1994694881227497750", "1990494366432178600"],
    jadaworks: ["2001416808104948146"]
  },
  work: {
    postmaker: ["1990074123402314091", "1990094837605859661", "1990094930723893413", "1990079307893416186", "1990167668226175289"],
    jadaworks: ["1997820506041720925", "2001416576139169992"]
  }
}

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

function TweetRow({ ids, label }: { ids: string[], label: string }) {
  return (
    <div className="mb-4">
      <p className="text-[10px] text-zinc-500 mb-2 uppercase tracking-wider">{label}</p>
      <div className="flex flex-wrap gap-2">
        {ids.map((id) => (
          <TweetCard key={id} id={id} />
        ))}
      </div>
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="px-6 py-4 max-w-3xl mx-auto">
      <div className="border-t border-zinc-800 pt-4 mb-4">
        <h2 className="text-xl font-bold tracking-tight mb-1 font-mono">
          Testimonials
        </h2>
      </div>

      <div className="space-y-6">
        {/* Products Section */}
        <div>
          <h3 className="text-sm font-medium text-zinc-300 mb-3 flex items-center gap-1.5">
            <i className="bi bi-box text-blue-400" />
            What people say about my <span className="text-blue-400">products</span>
          </h3>
          <TweetRow ids={testimonials.products.doodlenotes} label="DoodleNotes" />
          <TweetRow ids={testimonials.products.postmaker} label="PostMaker" />
          <TweetRow ids={testimonials.products.jadaworks} label="JadaWorks" />
        </div>

        {/* Work Section */}
        <div>
          <h3 className="text-sm font-medium text-zinc-300 mb-3 flex items-center gap-1.5">
            <i className="bi bi-briefcase text-blue-400" />
            What people say about my <span className="text-blue-400">work</span>
          </h3>
          <TweetRow ids={testimonials.work.postmaker} label="PostMaker Dev" />
          <TweetRow ids={testimonials.work.jadaworks} label="JadaWorks Dev" />
        </div>
      </div>
    </section>
  )
}
