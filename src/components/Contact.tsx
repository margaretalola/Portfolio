import { personal, contact } from "@/data/portfolio"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import cvUrl from "@/assets/CV_Margareta_Lola_Lali_Lulita.pdf"

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-20" data-gamification-section="contact">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-8">
        <h2 className="text-2xl font-bold text-foreground">Contact</h2>
        <Badge variant={personal.available ? "default" : "secondary"}>
          {personal.available ? "🟢 Available for opportunities" : "🔴 Not available"}
        </Badge>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            Tertarik untuk bekerja sama? Silakan hubungi saya melalui salah satu platform di bawah.
          </p>
          <div className="flex flex-col gap-3">
            <a href={`mailto:${contact.email}`} className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 hover:border-indigo-500/50 transition-colors">
              <span className="text-xl">📧</span>
              <div>
                <p className="text-sm font-medium text-foreground">Email</p>
                <p className="text-xs text-muted-foreground">{contact.email}</p>
              </div>
            </a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 hover:border-indigo-500/50 transition-colors">
              <span className="text-xl">💼</span>
              <div>
                <p className="text-sm font-medium text-foreground">LinkedIn</p>
                <p className="text-xs text-muted-foreground">linkedin.com/in/margaretalola</p>
              </div>
            </a>
            <a href={contact.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 hover:border-indigo-500/50 transition-colors">
              <span className="text-xl">🐙</span>
              <div>
                <p className="text-sm font-medium text-foreground">GitHub</p>
                <p className="text-xs text-muted-foreground">github.com/margaretalola</p>
              </div>
            </a>
            <a href={cvUrl} target="_blank" rel="noreferrer" download className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 hover:border-indigo-500/50 transition-colors">
              <span className="text-xl">📄</span>
              <div>
                <p className="text-sm font-medium text-foreground">Resume / CV</p>
                <p className="text-xs text-muted-foreground">Download PDF</p>
              </div>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-sm text-muted-foreground">
          <p className="leading-relaxed">
            Saya selalu terbuka untuk diskusi tentang peluang kerja sama, project menarik, atau sekadar berbagi wawasan seputar data dan teknologi.
          </p>
          <div className="rounded-lg border border-border bg-card p-6">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Availability</p>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-foreground font-medium">
                Open to full-time & freelance opportunities
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="default" className="flex-1">
              <a href={`mailto:${contact.email}`}>Send Email</a>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <a href={cvUrl} target="_blank" rel="noreferrer" download>Download CV</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
