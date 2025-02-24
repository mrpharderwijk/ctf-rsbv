export function capitalizeString(string: string): string {
  return !!string && typeof string === 'string'
    ? `${string?.charAt(0)?.toUpperCase()}${string?.slice(1)}`
    : ''
}
