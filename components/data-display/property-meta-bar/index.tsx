import classNames from 'classnames';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);

import Icon from 'components/flourishes/icon';

/* Types */
export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The property type
   */
  use: string;
  /**
   * The propeerty size in square feet
   */
  size_sqft: number;
  /**
   * The property size in square meters
   */
  size_sqm: number;
  /**
   * The link to the property brochure
   */
  brochureLink?: string;
}

/**
 * The PropertyMetaBar component is a wrapper for the PropertyMetaBar component that allows for a property tag to be displayed.
 */
export const PropertyMetaBar: React.FC<Props> = ({
  use,
  size_sqft,
  size_sqm,
  brochureLink,
  ...props
}: Props) => {
  return (
    <div
      className={cx(styles['property-meta-bar'], {
        [styles['no-brochure']]: !brochureLink
      })}
      {...props}
    >
      <span className={styles['use']}>
        <Icon use="arch" className={styles['icon']} /> {use}
      </span>
      <span className={styles['size']}>
        <Icon use="floorplan" className={styles['icon']} /> {size_sqft} sq ft |{' '}
        {size_sqm} sq m
      </span>
      {brochureLink && (
        <a
          href={brochureLink}
          className={styles['brochure-link']}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Icon use="download" className={styles['icon']} /> Download Brochure
        </a>
      )}
    </div>
  );
};

PropertyMetaBar.displayName = 'PropertyMetaBar';

export default PropertyMetaBar;
