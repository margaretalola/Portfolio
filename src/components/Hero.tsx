import { personal, quickStats } from "@/data/portfolio"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import cvUrl from "@/assets/CV_Margareta_Lola_Lali_Lulita.pdf"

export default function Hero() {
  return (
    <section id="hero" className="mx-auto max-w-5xl px-6 py-24 flex flex-col items-center text-center gap-8">
      <div className="relative">
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 p-0.5">
          <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-4xl">
            <img src="/src/assets/me.jpeg" alt={personal.name} className="rounded-full w-full h-full object-cover" />
          </div>
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-slate-900" />
      </div>

      <Badge variant="secondary" className="text-xs">
        {personal.available ? "🟢 Open to opportunities" : "🔴 Not available"}
      </Badge>

      <div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-2">
          {personal.name}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
          {personal.title}
        </p>
        <p className="text-base text-muted-foreground/70 mt-1 italic">
          "{personal.tagline}"
        </p>
      </div>

      <p className="text-muted-foreground max-w-2xl text-sm md:text-base leading-relaxed">
        {personal.summary}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
        {quickStats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1 rounded-lg border border-border bg-card p-3">
            <span className="text-xl md:text-2xl font-bold text-foreground">{stat.value}</span>
            <span className="text-[10px] md:text-xs text-muted-foreground text-center leading-tight">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <Button asChild size="lg">
          <a href="#projects">View Projects</a>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href={cvUrl} target="_blank" rel="noreferrer" download>Download CV</a>
        </Button>
        <Button asChild variant="secondary" size="lg">
          <a href="#contact">Contact Me</a>
        </Button>
        {/* <Button asChild variant="ghost" size="lg">
          <a href="#universe">Explore My World 🌌</a>
        </Button> */}
      </div>
    </section>
  )
}
