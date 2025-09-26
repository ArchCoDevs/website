import classNames from 'classnames';

import Link from 'components/data-display/link';

import styles from './styles.module.scss';
import Icon from 'components/flourishes/icon';

const cx = classNames.bind(styles);

export interface Props extends React.ComponentProps<'section'> {
  phoneNumber: string;
  email: string;
}

/**
 * The Press Office Card component, used to display information about the press office.
 */
export const PressOfficeCard: React.FC<Props> = ({
  phoneNumber,
  email,
  className,
  ...props
}) => {
  return (
    <section
      className={cx(styles['press-office-card'], className)}
      data-testid="press-office-card"
      {...props}
    >
      <div className={styles['top']}>
        <h2 className={styles['title']}>Press office details</h2>
        <p className={styles['content']}>
          If you are a journalist with a question about The Arch Company or any
          of our properties, please contact our press office team on:
        </p>
      </div>
      <div className={styles['bottom']}>
        <Link href={`tel:${phoneNumber}`} className="button">
          <span>
            <Icon use="phone" className={styles['icon']} />
            {phoneNumber}
          </span>
        </Link>
        <Link href={`mailto:${email}`} className="button">
          <span>
            <Icon use="email" className={styles['icon']} />
            Email us
          </span>
        </Link>
      </div>
    </section>
  );
};

export default PressOfficeCard;
