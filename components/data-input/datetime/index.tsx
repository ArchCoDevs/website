import React from 'react';
import classNames from 'classnames';
import { changeCase } from 'lib/helpers/change-case';

/* Import Stylesheet */
import styles from './styles.module.scss';

/** Import custom types */
import InputComponent from 'lib/types/input-component';

type Props = InputComponent;

const cx = classNames.bind(styles);

/**
 * The `Datetime` component uses the native `<input type="date">` element and is a wrapper around it.
 */
export const Datetime: React.FC<Props> = ({
  name,
  id,
  status,
  className,
  ...props
}: Props) => {
  return (
    <input
      className={cx(
        styles['input'],
        styles[`type-date`],
        styles[`status-${status || 'default'}`],
        className
      )}
      id={id || changeCase(name, 'kebab')}
      data-testid={id || changeCase(name, 'kebab')}
      name={name}
      type="date"
      {...props}
    />
  );
};

Datetime.displayName = 'Datetime';

export default Datetime;
