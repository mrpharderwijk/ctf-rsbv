import classNames from 'classnames';
import { ReactElement, Ref, useMemo } from 'react';
import { IconType } from 'react-icons';

import {
  getIconSize,
  IconSizesType,
  textColorDefaultClassNames,
} from '../../../../utils';
import {
  buttonGrayClassNames,
  buttonGrayHoverClassNames,
  buttonPrimaryClassNames,
} from '../class-names';

type ButtonUiProps = {
  ['data-testid']?: string;
  forwardRef?: Ref<HTMLButtonElement>;
  icon: IconType;
  iconSize?: number;
  onClick?: () => void;
  screenReaderText?: string;
  size?: IconSizesType;
  type?: 'button' | 'submit';
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'gray'
    | 'gray-hover'
    | 'transparent';
};

export function ButtonUi({
  'data-testid': dataTestid,
  forwardRef,
  icon: Icon,
  iconSize,
  onClick,
  screenReaderText,
  size = 'md',
  type = 'button',
  variant = 'gray',
}: ButtonUiProps): ReactElement {
  const buttonClassNames = classNames(
    'flex items-center justify-center rounded-md',
    {
      'p-1': size === 'xs',
      'p-2': size === 'sm' || size === 'md',
      'h-12 w-12 p-3': size === 'lg',
    },
    {
      [`${textColorDefaultClassNames} ${buttonGrayClassNames}`]:
        variant === 'gray',
      [`${textColorDefaultClassNames} ${buttonGrayHoverClassNames}`]:
        variant === 'gray-hover',
      [`text-white ${buttonPrimaryClassNames}`]: variant === 'primary',
      [`${textColorDefaultClassNames} bg-transparent`]:
        variant === 'transparent',
    },
  );
  const dynamicIconSize = useMemo(() => {
    return !iconSize ? getIconSize(size) : iconSize;
  }, [size, iconSize]);

  return (
    <button
      className={buttonClassNames}
      type={type}
      ref={forwardRef}
      onClick={onClick}
      data-testid={dataTestid}
    >
      {!!screenReaderText && (
        <span className="sr-only">{screenReaderText}</span>
      )}
      {Icon && <Icon size={dynamicIconSize} aria-hidden="true" />}
    </button>
  );
}
