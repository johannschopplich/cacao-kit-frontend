/** Formats the value of a Kirby date field, like `2026-10-06 09:00:00`. */
export function formatDate(value: string, locale: string) {
  // As an ISO date with a time part, every browser parses the value as local time.
  const [date, time = '00:00:00'] = value.split(/[ T]/)
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(`${date}T${time}`))
}
