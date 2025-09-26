import classNames from 'classnames';
import { format } from 'date-fns';

import styles from './styles.module.scss';

/* Types */
export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Date to display
   */
  date: string;
}

const cx = classNames.bind(styles);

/**
 * The DateBox component displays a box with the day, month, and year of a given date.
 */
export const DateBox: React.FC<Props> = ({ className, date }: Props) => {
  const splitDate = date.split('-');
  const day = format(new Date(date), 'd');
  const month = format(new Date(date), 'MMM');
  const year = splitDate[0];
  return (
    <div className={cx(styles['date-box'], className)}>
      <span className={styles['day']}>{day}</span>
      <span className={styles['month']}>{month}</span>
      <span className={styles['year']}>{year}</span>
    </div>
  );
};
