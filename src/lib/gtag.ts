export const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
  }
}

export function pageView(url: string) {
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  })
}

export function event({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label: string
  value?: number
}) {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  })
}
