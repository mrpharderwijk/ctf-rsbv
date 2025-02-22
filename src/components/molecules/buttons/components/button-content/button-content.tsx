import classNames from 'classnames';
import { MouseEvent, PropsWithChildren, ReactElement } from 'react';
import { IconType } from 'react-icons';

import {
  strokeColorDefaultClassNames,
  strokeLinkColorPrimaryClassNames,
  textColorDefaultClassNames,
  textColorGrayClassNames,
  textLinkColorPrimaryClassNames,
  transitionColorClassNames,
} from '../../../../../utils';
import {
  buttonGrayClassNames,
  buttonGrayHoverClassNames,
  buttonPrimaryClassNames,
} from '../../class-names';

export const TID_BUTTON_LOADER = 'button__loader';

export type ButtonContentProps = PropsWithChildren<{
  variant?:
    | 'primary'
    | 'primary-link'
    | 'secondary'
    | 'tertiary'
    | 'gray'
    | 'gray-link'
    | 'gray-hover'
    | 'outline';
  icon?: IconType;
  isLoading?: boolean;
  noPadding?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  outline?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}>;

export function ButtonContent({
  children,
  variant = 'gray',
  icon: Icon,
  isLoading,
  noPadding = false,
  outline,
  size = 'md',
}: ButtonContentProps): ReactElement {
  // disabled:opacity-70 disabled:cursor-not-allowed
  const wrapperClassNames = classNames(
    'relative flex flex-row items-center justify-center overflow-hidden',
    transitionColorClassNames,

    // Text color
    {
      [textColorDefaultClassNames]: variant === 'gray',
      [textColorGrayClassNames]: variant === 'gray-link',
      'text-white': variant === 'primary',
      [textLinkColorPrimaryClassNames]: variant === 'primary-link',
      'text-black': variant === 'outline',
      'text-zinc-50 disabled:text-secondary-700': variant === 'secondary',
      'text-zinc-50 disabled:text-tertiary-700': variant === 'tertiary',
    },

    // Background color
    {
      [`${buttonGrayClassNames}`]: variant === 'gray',
      [`${buttonGrayHoverClassNames}`]: variant === 'gray-hover',
      [`${buttonPrimaryClassNames}`]: variant === 'primary',
      'bg-secondary-600 border-secondary-600 hover:bg-secondary-500 hover:border-secondary-500 active:bg-secondary-700 active:border-secondary-700 disabled:bg-secondary-200 disabled:border-secondary-200':
        variant === 'secondary',
      'bg-tertiary-600 border-tertiary-600 hover:bg-tertiary-500 hover:border-tertiary-500 active:bg-tertiary-700 active:border-tertiary-700 disabled:bg-tertiary-200 disabled:border-tertiary-200':
        variant === 'tertiary',
      'border-2 bg-white border-black': variant === 'outline',
    },

    // Text size weigth and letter spacing
    {
      'text-xs font-semibold tracking-wide': size === 'xs',
      'text-sm font-semibold tracking-wide':
        size === 'sm' || size === 'md' || size === 'lg' || size === 'xl',
    },

    // with padding
    {
      'px-2 py-1': (size === 'xs' || size === 'sm') && !noPadding,
      'px-2.5 py-1.5': size === 'md' && !noPadding,
      'px-3 py-2': size === 'lg' && !noPadding,
      'px-3.5 py-2.5': size === 'xl' && !noPadding,
    },

    // Border radius
    {
      rounded: size === 'xs' || size === 'sm',
      'rounded-md': size === 'md' || size === 'lg' || size === 'xl',
    },
  );

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
          className={classNames('mr-1 flex-auto', {
            [`${strokeColorDefaultClassNames}`]: variant === 'gray',
            [`${strokeColorDefaultClassNames}`]: variant === 'gray-hover',
            'stroke-white': variant === 'primary',
            [`${strokeLinkColorPrimaryClassNames}`]: variant === 'primary-link',
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
  );
}
