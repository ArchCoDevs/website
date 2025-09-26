import styles from './styles.module.scss';
import { Icon } from 'components/flourishes/icon';

type Props = {
  /**
   * The message to display to the user
   * @default 'We are working on it and will be back soon.'
   */
  message?: string | JSX.Element;
};

/**
 * The Outage partial shows a message to the user when the application is
 * unavailable.
 */
export const Outage = ({ message }: Props) => {
  message = message || 'We are working on it and will be back soon.';

  return (
    <main className={styles['outage-page']}>
      <div className={styles['container']}>
        <div className={styles['inner']}>
          <div className={styles['logo-container']}>
            <Icon use="applogo" size="100%" className={styles['logo']} />
          </div>
          <div className={styles['content']}>
            <h1 className={styles['title']}>
              We are sorry but our website is currently offline
            </h1>

            <div className={styles['message']}>
              {typeof message === 'string' ? <p>{message}</p> : message}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

Outage.displayName = 'Outage';

export default Outage;
