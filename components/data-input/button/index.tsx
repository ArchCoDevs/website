import React, { forwardRef } from 'react';
import classNames from 'classnames';

// Import components
import { Loader } from 'components/feedback/loader';

import { Icon, IconTypes } from 'components/flourishes/icon';

export const buttonVariants = [
  'primary',
  'secondary',
  'tertiary',
  'quaternary',
  'create',
  'destroy'
];

/* Import Types */
export interface Props extends React.ComponentProps<'button'> {
  /**
   * The button label. If the `hideLabel` prop is set (e.g. in an icon only button) you must provide the label prop accessibility purposes and should be a short, descriptive label of the button's purpose.
   * If the button has no children, this label will be used as the button's text content.
   */
  label?: string;
  /**
   * The if you want to include an icon, this specifies the side of the button the icon should appear on.
   * @default 'left'
   */
  alignIcon?: 'left' | 'right';
  /**
   * If the icon should be on it's own with no visible text, set this property to `true`.
   * Note: The label prop must still be provided for accessibility purposes.
   **/
  hideLabel?: boolean;
  /**
   * Is a small button?
   */
  small?: boolean;
  /**
   * What is the button's shape?
   * @default 'pill'
   */
  shape?: 'pill' | 'squared' | 'circle';
  /**
   * Optional button variant.
   * @default 'primary'
   */
  variant?: (typeof buttonVariants)[number];
  /**
   * Make the background transparent and the text the background color.
   */
  transparent?: boolean;
  /**
   * Render the button to look like a link.
   */
  link?: boolean;
  /**
   * Make the button full width.
   */
  fullWidth?: boolean;
  /**
   * Include an icon from the icon library.
   */
  icon?: IconTypes | 'custom';
  /**
   * Shows a loading indicator instead of text.
   * @default false
   */
  isLoading?: boolean;
  /**
   * The loading indicator to be read out for accessability.
   * @default "Loading"
   */
  loadingIndicator?: string;
}

/* Import Stylesheet */
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

/**
 * The Button component allows a user to place a button on the page.
 */
export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      label = '',
      alignIcon = 'left',
      hideLabel = false,
      small,
      fullWidth,
      icon,
      isLoading = false,
      loadingIndicator,
      children,
      className,
      disabled,
      variant = 'primary',
      transparent = false,
      link = false,
      shape = 'pill',
      ...props
    }: Props,
    ref
  ) => {
    if (hideLabel && !label && !children) {
      throw new Error(
        'If the button has no children, you must provide a label for accessibility purposes.'
      );
    }

    if (!children && !label) {
      throw new Error(
        'You must provide either a label or children for the button.'
      );
    }

    const buildStyle = () => {
      let variantClass = `button-${variant}`;
      if (transparent) {
        variantClass = `button-${variant}-transparent`;
      }
      if (link) {
        variantClass = `button-${variant}-link`;
      }
      return variantClass;
    };

    return (
      <button
        ref={ref}
        aria-label={label || undefined}
        className={cx(
          styles['master-button'],
          styles[buildStyle()],
          (icon || isLoading) &&
            styles[`icon-${hideLabel ? 'only' : alignIcon}`],
          icon && hideLabel && styles[`hide-label`],
          styles[`shape-${shape}`],
          fullWidth && styles['full-width'],
          small && styles['small'],
          className
        )}
        tabIndex={disabled ? -1 : 0}
        disabled={disabled ?? isLoading}
        aria-disabled={disabled ?? isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {!isLoading && (
          <span>
            {icon && icon !== 'custom' && <Icon use={icon} />}
            {children}
            {!hideLabel && label}
          </span>
        )}
        {isLoading && (
          <>
            <span>
              <Loader variant="black" />
              {!hideLabel && <span>{loadingIndicator ?? 'Loading...'}</span>}
            </span>
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;

export type ButtonProps = Props;
