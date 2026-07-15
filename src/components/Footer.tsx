import { personal, contact } from "@/data/portfolio"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="mx-auto max-w-5xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} {personal.name} — Open to opportunities</p>
        <div className="flex gap-2">
          <Button asChild variant="ghost" size="sm">
            <a href={contact.github} target="_blank" rel="noreferrer">GitHub</a>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <a href={`mailto:${contact.email}`}>Email</a>
          </Button>
        </div>
      </div>
    </footer>
  )
}
