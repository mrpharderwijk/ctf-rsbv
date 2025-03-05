import { VariantProps } from 'class-variance-authority'
import clsx from 'clsx'
import { MouseEvent, PropsWithChildren, ReactElement } from 'react'
import { IconType } from 'react-icons'

import { buttonContentClassNames } from '@/components/molecules/buttons/components/button-content/button-content.class-names'
import { cn } from '@/utils/class-names'

export const TID_BUTTON_LOADER = 'button__loader'

export type ButtonContentProps = PropsWithChildren<
  VariantProps<typeof buttonContentClassNames> & {
    icon?: IconType
    isLoading?: boolean
    noPadding?: boolean
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
    outline?: boolean
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  }
>

export function ButtonContent({
  children,
  variant = 'gray',
  icon: Icon,
  isLoading,
  noPadding = false,
  size = 'md',
}: ButtonContentProps): ReactElement {
  const wrapperClassNames = cn(
    buttonContentClassNames({ noPadding, size, variant }),
  )

  return (
    <div className={wrapperClassNames}>
      {isLoading && (
        <div
          className="absolute -top-[1px] h-1 w-full"
          data-testid={TID_BUTTON_LOADER}
        >
          <div className="relative h-full w-full bg-slate-50/20">
            <div className="absolute bottom-0 left-0 right-full top-0 h-1 w-9 animate-moveLeftToRight bg-cyan-300/70"></div>
          </div>
        </div>
      )}

      {Icon && (
        <Icon
          size={16}
          color="red"
          stroke="red"
          className={clsx('mr-1 flex-auto', {
            'stroke-white': variant === 'primary',
            'stroke-black': variant === 'outline',
            'stroke-zinc-50 disabled:stroke-secondary-700':
              variant === 'secondary',
            'stroke-zinc-50 disabled:stroke-tertiary-700':
              variant === 'tertiary',
          })}
        />
      )}
      <div className="flex-initial">{children}</div>
    </div>
  )
}
