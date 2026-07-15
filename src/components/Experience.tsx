import { useState } from "react"
import { experience } from "@/data/portfolio"
import { Badge } from "@/components/ui/badge"

export default function Experience() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-20" data-gamification-section="experience">
      <h2 className="text-2xl font-bold text-foreground mb-8">Experience</h2>
      <div className="relative">
        <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-border" />
        <div className="space-y-6">
          {experience.map((exp, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(selectedIndex === i ? null : i)}
              className="relative w-full text-left group"
            >
              <div className={`ml-12 md:ml-16 rounded-lg border p-4 md:p-5 transition-all ${selectedIndex === i
                ? "border-indigo-500 bg-indigo-500/5"
                : "border-border bg-card hover:border-indigo-500/50"
                }`}>
                <div className="absolute left-[-1.6rem] md:left-[-2.1rem] top-6 w-3 h-3 rounded-full border-2 border-indigo-500 bg-background" />
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 mb-1">
                  <h3 className="text-sm font-semibold text-foreground">{exp.role}</h3>
                  <span className="text-xs text-muted-foreground">{exp.period}</span>
                </div>
                <p className="text-xs text-indigo-400 font-medium mb-2">{exp.company}</p>
                <p className="text-xs text-muted-foreground">{exp.description}</p>

                {selectedIndex === i && (
                  <div className="mt-4 space-y-4 border-t border-border pt-4">
                    <div>
                      <h4 className="text-xs font-semibold text-foreground mb-2">Responsibilities</h4>
                      <ul className="space-y-1">
                        {exp.responsibilities.map((r, j) => (
                          <li key={j} className="text-xs text-muted-foreground flex items-start gap-2">
                            <span className="text-indigo-400 mt-0.5">•</span>
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-foreground mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-1">
                        {exp.technologies.map((t) => (
                          <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
