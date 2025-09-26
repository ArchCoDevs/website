import { SVGAttributes, useState, useEffect } from 'react';
import classNames from 'classnames';

// import styles
import styles from './styles.module.scss';
const cx = classNames.bind(styles);

import { getSizes } from './helpers/get-sizes';
import { getLoader } from './helpers/get-loader';

export const allowedTypes = ['spinner', 'dots', 'bar', 'percentage-bar'];
export const allowedColours = [
  'primary',
  'secondary',
  'tertiary',
  'white',
  'black'
];

export type AllowedTypes = (typeof allowedTypes)[number];
export type AllowedColours = (typeof allowedColours)[number];

// types
export interface Props extends SVGAttributes<SVGElement> {
  /**
   * The type of loader to display
   */
  type?: AllowedTypes;
  /**
   * The colour of the loader
   * @default primary
   */
  variant?: AllowedColours;
  /**
   * A label to display with the loader
   */
  label?: string;
  /**
   * Current % progress of the loader (only used for percentage-bar)
   * @default 0
   */
  progress?: number;
  /**
   * The size of the loader in pixels (width and height)
   * Note: This has no effect on the percentage-bar loader which is always 100% width and 5px height
   * @default 80
   */
  size?: number;
}

/**
 * The Loader component is used to display the loading state of a component or page.
 */
export const Loader: React.FC<Props> = ({
  type = 'spinner',
  variant = 'primary',
  label,
  size = 80,
  progress = 0,
  ...props
}: Props) => {
  const [percentage, setPercentage] = useState(progress);

  useEffect(() => {
    setPercentage(progress);
  }, [progress]);

  if (type !== 'percentage-bar' && progress !== 0) {
    console.warn(
      'The progress prop is only used for the percentage-bar loader type and will be ignored.'
    );
  }

  if (type === 'percentage-bar' && size !== 80) {
    console.warn(
      'The size prop has no effect on the percentage-bar loader type.'
    );
  }

  return (
    <div
      className={cx(
        styles['loader'],
        styles[`is-${type}`],
        styles[`is-${variant}`]
      )}
    >
      <svg
        className={styles['svg']}
        viewBox={getSizes(type, size).viewbox}
        xmlns="http://www.w3.org/2000/svg"
        width={getSizes(type, size).width}
        height={getSizes(type, size).height}
        preserveAspectRatio="none"
        {...props}
        aria-label="Loading"
        aria-busy="true"
        aria-live="polite"
        role={type === 'percentage-bar' ? 'progressbar' : undefined}
        aria-valuenow={type === 'percentage-bar' ? percentage : undefined}
      >
        {getLoader(type, percentage)}
      </svg>
      {label && (
        <div className={styles['label']}>
          <span>{label}</span>
        </div>
      )}
    </div>
  );
};

Loader.displayName = 'Loader';

export default Loader;
