"use client"

import { 
  SiJavascript, 
  SiTypescript, 
  SiPython, 
  SiHtml5, 
  SiCss3,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiGit,
  SiGithub,
  SiVercel,
  SiFigma,
  SiFastapi,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiSupabase
} from "react-icons/si"
import { VscCode } from "react-icons/vsc"

interface Skill {
  _id: string
  category: string
  items: Array<{
    name: string
    icon?: string
  }>
}

interface SkillsProps {
  skills: Skill[] | null
}

// Icon mapping for skills with colors
const skillIcons: Record<string, { icon: React.ComponentType<{ className?: string, style?: React.CSSProperties }>, color: string }> = {
  "JavaScript": { icon: SiJavascript, color: "#F7DF1E" },
  "TypeScript": { icon: SiTypescript, color: "#3178C6" },
  "Python": { icon: SiPython, color: "#3776AB" },
  "HTML": { icon: SiHtml5, color: "#E34F26" },
  "CSS": { icon: SiCss3, color: "#1572B6" },
  "React": { icon: SiReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, color: "#ffffff" },
  "TailwindCSS": { icon: SiTailwindcss, color: "#06B6D4" },
  "Node.js": { icon: SiNodedotjs, color: "#339933" },
  "FastAPI": { icon: SiFastapi, color: "#009688" },
  "Express": { icon: SiExpress, color: "#ffffff" },
  "MongoDB": { icon: SiMongodb, color: "#47A248" },
  "PostgreSQL": { icon: SiPostgresql, color: "#4169E1" },
  "Supabase": { icon: SiSupabase, color: "#3ECF8E" },
  "Git": { icon: SiGit, color: "#F05032" },
  "GitHub": { icon: SiGithub, color: "#ffffff" },
  "VS Code": { icon: VscCode, color: "#007ACC" },
  "Vercel": { icon: SiVercel, color: "#ffffff" },
  "Figma": { icon: SiFigma, color: "#F24E1E" },
}

// Fallback skills data
const fallbackSkills: Skill[] = [
  {
    _id: "1",
    category: "Languages",
    items: [
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "Python" },
      { name: "HTML" },
      { name: "CSS" },
    ]
  },
  {
    _id: "2", 
    category: "Frameworks / Libraries",
    items: [
      { name: "React" },
      { name: "Next.js" },
      { name: "TailwindCSS" },
      { name: "Node.js" },
    ]
  },
  {
    _id: "3",
    category: "Backend",
    items: [
      { name: "FastAPI" },
      { name: "Express" },
    ]
  },
  {
    _id: "4",
    category: "Databases",
    items: [
      { name: "MongoDB" },
      { name: "PostgreSQL" },
      { name: "Supabase" },
    ]
  },
  {
    _id: "5",
    category: "Tools",
    items: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "VS Code" },
      { name: "Vercel" },
      { name: "Figma" },
    ]
  }
]

export function Skills({ skills }: SkillsProps) {
  const data = skills?.length ? skills : fallbackSkills

  return (
    <section className="px-6 py-4 max-w-3xl mx-auto">
      <div className="border-t border-zinc-800 pt-4 mb-4">
        <h2 className="text-xl font-bold tracking-tight mb-1 font-mono">
          Skills{" "}
          <span className="text-zinc-500 text-sm font-normal font-sans">
            Which I use/know
          </span>
        </h2>
        <p className="text-sm text-zinc-400">
          These are the technologies I&apos;ve learned and worked with. This list is constantly evolving as I continue to learn and grow.
        </p>
      </div>

      <div className="space-y-4">
        {data.map((skillGroup) => (
          <div key={skillGroup._id}>
            <h3 className="text-xs text-zinc-500 mb-2 font-mono">
              {"< "}{skillGroup.category.toUpperCase()}{" />"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skillGroup.items.map((skill) => {
                const skillData = skillIcons[skill.name]
                const IconComponent = skillData?.icon
                return (
                  <span
                    key={skill.name}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-zinc-800/60 border border-zinc-700 hover:border-blue-500 transition-all cursor-default"
                  >
                    {IconComponent && (
                      <IconComponent 
                        className="text-sm" 
                        style={{ color: skillData.color }} 
                      />
                    )}
                    {skill.name}
                  </span>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
