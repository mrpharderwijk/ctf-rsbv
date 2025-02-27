import { MouseEvent, PropsWithChildren, ReactElement, Ref } from 'react'

import { ButtonContent, ButtonContentProps } from './components'

import { cn } from '@/utils/class-names'

type ButtonProps = PropsWithChildren<
  {
    disabled?: boolean
    fullWidth?: boolean
    forwardRef?: Ref<HTMLButtonElement>
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
    type?: 'submit' | 'button'
  } & ButtonContentProps
>

export function Button({
  children,
  disabled = false,
  forwardRef,
  fullWidth = false,
  icon: Icon,
  isLoading = false,
  onClick = (): void => {
    return
  },
  type = 'button',
  ...rest
}: ButtonProps): ReactElement {
  const buttonClassNames = cn({
    'w-full': fullWidth,
  })

  return (
    <button
      className={buttonClassNames}
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      ref={forwardRef}
    >
      <ButtonContent icon={Icon} isLoading={isLoading} {...rest}>
        {children}
      </ButtonContent>
    </button>
  )
}
