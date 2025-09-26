import React from 'react';
import classNames from 'classnames';

// Import Stylesheet
import styles from './styles.module.scss';

// Import child components
import CardBody from './components/card-body';
import CardHeader from './components/card-header';

const cx = classNames.bind(styles);

// Prop Types
export interface Props extends React.ComponentProps<'div'> {
  /**
   * If true, it will disable the background colour, rendering a transparent card.
   * @default false
   */
  noBg?: boolean;
  /**
   * If true, it will disable the border radius
   * @default false
   */
  noBorderRadius?: boolean;
  /**
   * Include vertical spacing around the card
   * @default false
   */
  vSpacing?: boolean;
  /**
   * Include horizontal spacing around the card
   * @default false
   */
  hSpacing?: boolean;
  /**
   * The children of the component
   */
  children: React.ReactNode;
}

interface ComponentProps extends React.FC<Props> {
  Body: typeof CardBody;
  Header: typeof CardHeader;
}

// Render component
export const Card: ComponentProps = ({
  noBg,
  vSpacing,
  hSpacing,
  children,
  className,
  ...props
}: Props) => {
  return (
    <article
      className={cx(
        styles['card'],
        noBg && styles['no-bg'],
        vSpacing && styles['v-spacing'],
        hSpacing && styles['h-spacing'],
        className
      )}
      {...props}
    >
      {children}
    </article>
  );
};

Card.displayName = 'Card';

Card.Header = CardHeader;
Card.Body = CardBody;

export default Card;

export type CardProps = Props;
