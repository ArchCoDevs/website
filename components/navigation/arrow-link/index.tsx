import Link from 'components/data-display/link';
import classNames from 'classnames';

import Icon from 'components/flourishes/icon';

/* Import Stylesheet */
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

export interface Props extends React.HTMLAttributes<HTMLAnchorElement> {
  /**
   * The href of the link
   */
  href: string;
  /**
   * The link label
   */
  label: string;
  /**
   * Switch the arrow direction and position
   */
  reverse?: boolean;
}

/**
 * The ArrowLink component provides a list of links to help users navigate through a tree structure.
 */
export const ArrowLink: React.FC<Props> = ({
  href,
  label,
  reverse,
  className,
  ...props
}: Props) => {
  return (
    <Link
      className={cx(
        styles['arrow-link'],
        {
          [styles['reverse']]: reverse
        },
        className
      )}
      href={href}
      {...props}
    >
      <span>{label}</span>
      <Icon className={styles['icon']} use="chevron" />
    </Link>
  );
};

export default ArrowLink;
