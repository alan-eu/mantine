/* eslint-disable react/button-has-type */
// ^ this is fun – https://github.com/yannickcr/eslint-plugin-react/issues/1555

import React, { forwardRef } from 'react';
import cx from 'clsx';
import { useMantineTheme, DefaultProps, MantineSize, MantineNumberSize } from '@mantine/theme';
import { ComponentPassThrough } from '@mantine/types';
import useStyles from './Button.styles';

interface ButtonBaseProps extends DefaultProps {
  size?: MantineSize;
  type?: 'submit' | 'button' | 'reset';
  color?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  radius?: MantineNumberSize;
}

type _ButtonProps<T extends React.ElementType, U extends HTMLElement> = ComponentPassThrough<
  T,
  ButtonBaseProps
> & { elementRef: React.ForwardedRef<U> };

export function MantineButton<
  T extends React.ElementType = 'button',
  U extends HTMLElement = HTMLButtonElement
>({
  className,
  size = 'md',
  color,
  type = 'button',
  disabled = false,
  children,
  leftIcon,
  rightIcon,
  radius = 'sm',
  component: Element = 'button',
  elementRef,
  ...others
}: _ButtonProps<T, U>) {
  const classes = useStyles({ radius, color, size, theme: useMantineTheme() });

  return (
    <Element
      {...others}
      className={cx(classes.button, className)}
      type={type}
      disabled={disabled}
      data-mantine-composable
      ref={elementRef}
    >
      <div className={classes.inner}>
        {leftIcon && <span className={cx(classes.icon, classes.leftIcon)}>{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className={cx(classes.icon, classes.rightIcon)}>{rightIcon}</span>}
      </div>
    </Element>
  );
}

export const Button = forwardRef(
  (
    props: ComponentPassThrough<'button', ButtonBaseProps>,
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => <MantineButton {...props} elementRef={ref} />
);

export const LinkButton = forwardRef(
  (
    props: ComponentPassThrough<'a', ButtonBaseProps>,
    ref: React.ForwardedRef<HTMLAnchorElement>
  ) => (
    <MantineButton<'a', HTMLAnchorElement> component="a" type={null} elementRef={ref} {...props} />
  )
);

MantineButton.displayName = '@mantine/core/MantineButton';
Button.displayName = '@mantine/core/Button';
LinkButton.displayName = '@mantine/core/LinkButton';
