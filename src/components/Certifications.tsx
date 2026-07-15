import { certifications } from "@/data/portfolio"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-5xl px-6 py-20" data-gamification-section="certifications">
      <h2 className="text-2xl font-bold text-foreground mb-8">Certifications</h2>
      <div className="relative">
        <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-border" />
        <div className="space-y-6">
          {certifications.map((cert, i) => (
            <div key={i} className="relative ml-12 md:ml-16">
              <div className="absolute left-[-1.6rem] md:left-[-2.1rem] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-emerald-500 bg-background" />
              <Card>
                <CardContent className="p-4 md:p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{cert.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{cert.issuer} • {cert.year}</p>
                    </div>
                    <Badge variant="secondary" className="shrink-0 text-[10px]">{cert.year}</Badge>
                  </div>
                  <a
                    href={cert.credential}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 mt-3 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    View Credential →
                  </a>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
