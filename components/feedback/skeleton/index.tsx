import React from 'react';
import classNames from 'classnames';
import { changeCase } from 'lib/helpers/change-case';

export interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The loading state of the skeleton.
   * @default false
   */
  isLoading?: boolean;
  /**
   * Is the skeleton a circle?
   * @default false
   */
  isCircle?: boolean;
  /**
   * Toggle between inline and block display.
   * @default false
   */
  isInline?: boolean;
}

/* Import Stylesheet */
import styles from './styles.module.scss';

// Allows for multiple classes on one element
const cx = classNames.bind(styles);

/**
 * Skeleton is a component that can be used to create a skeleton of a component for loading purposes.
 */
const Skeleton: React.FC<Props> = ({
  children,
  className,
  isLoading = false,
  isCircle = false,
  isInline = false,
  ...props
}: Props) => {
  if (!isLoading) {
    return <>{children}</>;
  }

  // Get the attributes of the child element
  const childProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return {
        type:
          typeof child.type === 'string'
            ? child.type
            : // @ts-ignore - We know that the child could have a displayName
              child.type.name || child.type.displayName || '',
        props: child.props
      };
    }
    return null;
  })?.[0];

  if (React.Children.count(children) > 1) {
    throw new Error('Skeleton component only accepts a single child element');
  }

  return (
    <span
      className={cx(
        styles['skeleton'],
        styles[`is-${isInline ? 'inline' : 'block'}`],
        styles[`is-${isCircle ? 'circle' : 'rectangle'}`],
        styles[`child-is-${changeCase(childProps?.type, 'kebab')}`],
        className
      )}
      aria-busy={isLoading}
      {...props}
    >
      <div>{children}</div>
    </span>
  );
};

export default Skeleton;
