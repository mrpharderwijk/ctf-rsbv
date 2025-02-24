import { PropsWithChildren, ReactElement } from 'react'

import { ButtonContent, ButtonContentProps } from '../components'

type ButtonWrapperProps = PropsWithChildren<
  {
    renderRoot: (className: string, buttonContent: ReactElement) => ReactElement
  } & ButtonContentProps
>

export function ButtonWrapper({
  renderRoot,
  ...rest
}: ButtonWrapperProps): ReactElement {
  const className = 'button-wrapper block'

  return renderRoot(className, <ButtonContent {...rest} />)
}
