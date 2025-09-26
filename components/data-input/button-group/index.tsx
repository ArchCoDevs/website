import React from 'react';
import classNames from 'classnames';

// Import Components
import { Button } from 'components/data-input/button';

/* Import Stylesheet */
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

// Prop Types
export interface Props extends React.ComponentProps<'div'> {
  /**
   * Do you want to collapse the spacing between the buttons?
   * @default false
   */
  collapseSpacing?: boolean;
  /**
   * Should the button group display vertically or horizontally.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
}

/**
 * The ButtonGroup component groups a collection of Button components together with various display options.
 */
export const ButtonGroup: React.FC<Props> = ({
  collapseSpacing = false,
  orientation = 'horizontal',
  className,
  children,
  ...props
}: Props) => (
  <div
    className={cx(
      styles['button-group'],
      styles[orientation],
      collapseSpacing && styles['collapsed'],
      className
    )}
    {...props}
  >
    {React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === Button) {
        return React.cloneElement(child, {
          // @ts-ignore -- This is a valid prop
          className: cx(child.props.className, styles['grouped-button'])
        });
      }
      throw new Error(
        'ButtonGroup children must be instances of the Button component.'
      );
    })}
  </div>
);

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;
