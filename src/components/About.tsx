import { personal } from "@/data/portfolio"
import { Card, CardContent } from "@/components/ui/card"

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-20" data-gamification-section="about">
      <h2 className="text-2xl font-bold text-foreground mb-8">About Me</h2>
      <Card>
        <CardContent className="p-8 space-y-4">
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            {personal.bio}
          </p>
          <div className="grid md:grid-cols-2 gap-6 pt-4">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground">Background</h3>
              <p className="text-sm text-muted-foreground">
                Informatics Engineering graduate with a strong interest in Data Analytics, Business Intelligence, and Decision Support Systems.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground">Approach</h3>
              <p className="text-sm text-muted-foreground">
                Passionate about using data-driven approaches to analyze problems and support informed business and operational decision-making.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground">Collaboration</h3>
              <p className="text-sm text-muted-foreground">
                Experienced in collaborating with cross-functional teams to support system implementation and operational requirements.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground">Value</h3>
              <p className="text-sm text-muted-foreground">
                Committed to delivering reliable data analysis and practical solutions that support business and operational goals.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
