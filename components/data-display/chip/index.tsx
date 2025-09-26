import classNames from 'classnames';

import { Icon, IconTypes } from 'components/flourishes/icon';

import styles from './styles.module.scss';

/* Types */
export interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Text displayed on chip
   */
  text: string;
  /**
   * Custom classname to apply to the chip
   **/
  className?: string;
  /**
   * Icon to display on the chip
   */
  icon?: IconTypes;
}

const cx = classNames.bind(styles);

/**
 * The Chip component displays a small piece of information in a rounded rectangle.
 */
export const Chip: React.FC<Props> = ({ className, text, icon }: Props) => {
  return (
    <div className={cx(styles['chip'], icon && styles['with-icon'], className)}>
      {icon && <Icon use={icon} />}
      <span>{text}</span>
    </div>
  );
};

Chip.displayName = 'Chip';

export default Chip;
