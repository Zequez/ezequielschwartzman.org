export function resolveTitle(slug: string, title: string) {
  if (title) return title
  const splits = slug.split('/')
  const slugName = splits[splits.length - 1]
    .split('-')
    .slice(2)
    .map((s: any) => s[0].toUpperCase() + s.slice(1))
    .join(' ')
    .replace('.svx', '')
  return slugName
}
