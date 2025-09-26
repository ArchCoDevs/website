import classNames from 'classnames';

import styles from './styles.module.scss';
import { Icon } from 'components/flourishes/icon';

const cx = classNames.bind(styles);
export interface Props extends React.ComponentProps<'section'> {
  mini?: boolean;
}

/**
 * The Skeleton loader for the Property Card component displays a skeleton of a property card.
 */
export const PropertyCardSkeleton: React.FC<Props> = ({ mini }: Props) => {
  return (
    <section
      className={cx(styles['property-card'], styles['skeleton'], {
        [styles['mini']]: mini
      })}
    >
      <div className={styles['top']}>
        <div className={styles['tag']} />
        <div className={styles['save']} />
        <Icon use="image" />
      </div>
      <div className={styles['bottom']}>
        <p className={styles['address']}></p>
        {!mini && (
          <>
            <p className={styles['detail']}></p>
            <p className={styles['detail']}></p>
            <p className={styles['detail']}></p>
          </>
        )}
        <div className={styles['actions']}>
          <div className={styles['button']} />
          {!mini && <div className={styles['button']} />}
        </div>
      </div>
    </section>
  );
};

export default PropertyCardSkeleton;
