import { useState } from "react"
import { projectShowcase } from "@/data/portfolio"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function ProjectShowcase() {
  const [selectedId, setSelectedId] = useState(projectShowcase[0].id)
  const selected = projectShowcase.find((p) => p.id === selectedId)!

  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-20" data-gamification-section="projects">
      <h2 className="text-2xl font-bold text-foreground mb-8">Project Showcase</h2>

      <div className="grid md:grid-cols-[280px_1fr] gap-6">
        {/* Left panel — project list */}
        <div className="space-y-2">
          {projectShowcase.map((project) => (
            <button
              key={project.id}
              onClick={() => setSelectedId(project.id)}
              className={`w-full text-left rounded-lg border p-3 md:p-4 transition-all ${
                selectedId === project.id
                  ? "border-indigo-500 bg-indigo-500/10"
                  : "border-border bg-card hover:border-indigo-500/50"
              }`}
            >
              <h3 className="text-xs md:text-sm font-medium text-foreground">{project.title}</h3>
              <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5 line-clamp-2">{project.tagline}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {project.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-[9px] md:text-[10px]">{tag}</Badge>
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Right panel — project detail */}
        <Card>
          <CardContent className="p-5 md:p-6 space-y-6">
            <div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h3 className="text-lg font-bold text-foreground">{selected.title}</h3>
                  <p className="text-sm text-muted-foreground italic">{selected.tagline}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button asChild variant="outline" size="sm">
                    <a href={selected.github} target="_blank" rel="noreferrer">GitHub</a>
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mb-4">
                {selected.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Section title="Overview" content={selected.overview} />
              <Section title="Problem Statement" content={selected.problemStatement} />
              <Section title="Solution" content={selected.solution} />
              <Section title="My Contribution" content={selected.contribution} />

              <div>
                <h4 className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wider">Tech Stack</h4>
                <div className="flex flex-wrap gap-1">
                  {selected.techStack.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-[10px]">{tech}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wider">Role</h4>
                <p className="text-xs text-muted-foreground">{selected.role}</p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wider">Timeline</h4>
                <p className="text-xs text-muted-foreground">{selected.timeline}</p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wider">Architecture</h4>
                <div className="rounded-md bg-muted p-3">
                  <code className="text-[10px] text-muted-foreground font-mono">{selected.architecture}</code>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wider">Challenges</h4>
                <p className="text-xs text-muted-foreground">{selected.challenges}</p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wider">Results</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {selected.results.accuracy && (
                    <div className="rounded-lg border border-border bg-card p-3 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Accuracy</p>
                      <p className="text-sm font-bold text-emerald-400">{selected.results.accuracy}</p>
                    </div>
                  )}
                  {selected.results.precision && selected.results.precision !== "—" && (
                    <div className="rounded-lg border border-border bg-card p-3 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Precision</p>
                      <p className="text-sm font-bold text-indigo-400">{selected.results.precision}</p>
                    </div>
                  )}
                  {selected.results.recall && selected.results.recall !== "—" && (
                    <div className="rounded-lg border border-border bg-card p-3 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Recall</p>
                      <p className="text-sm font-bold text-cyan-400">{selected.results.recall}</p>
                    </div>
                  )}
                  <div className="rounded-lg border border-border bg-card p-3 text-center col-span-full md:col-span-1">
                    <p className="text-xs text-muted-foreground mb-1">Business Value</p>
                    <p className="text-[10px] font-medium text-foreground">{selected.results.businessValue}</p>
                  </div>
                </div>
              </div>

              <Section title="Lessons Learned" content={selected.lessonsLearned} />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function Section({ title, content }: { title: string; content: string }) {
  return (
    <div>
      <h4 className="text-xs font-semibold text-foreground mb-1 uppercase tracking-wider">{title}</h4>
      <p className="text-xs text-muted-foreground leading-relaxed">{content}</p>
    </div>
  )
}
