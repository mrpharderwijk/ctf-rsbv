export const IconSizes = ['xs', 'sm', 'md', 'lg'] as const

export type IconSizesType = (typeof IconSizes)[number]

export function getIconSize(size: IconSizesType): number {
  switch (size) {
    case 'xs':
      return 12
    case 'sm':
      return 16
    case 'md':
      return 20
    case 'lg':
    default:
      return 24
  }
}
