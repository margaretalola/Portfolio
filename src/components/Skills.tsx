import { skills } from "@/data/portfolio"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function Skills() {
  const categories = Object.keys(skills)

  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-20" data-gamification-section="skills">
      <h2 className="text-2xl font-bold text-foreground mb-8">Skills</h2>
      <Tabs defaultValue={categories[0]}>
        <TabsList className="mb-6 flex flex-wrap h-auto gap-1">
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat} className="text-xs md:text-sm">{cat}</TabsTrigger>
          ))}
        </TabsList>
        <Separator className="mb-6" />
        {categories.map((cat) => (
          <TabsContent key={cat} value={cat} className="flex flex-wrap gap-2">
            {skills[cat].map((skill) => (
              <Badge key={skill} variant="secondary" className="text-sm px-3 py-1">{skill}</Badge>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}
