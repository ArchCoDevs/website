import React from 'react';
import classNames from 'classnames';

// Import Stylesheet
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

// Prop Types
export type Props = React.ComponentProps<'div'>;

// Render component
export const CardBody: React.FC<Props> = ({ className, children }: Props) => (
  <section className={cx(styles['body'], className)}>{children}</section>
);

CardBody.displayName = 'CardBody';

export default CardBody;
