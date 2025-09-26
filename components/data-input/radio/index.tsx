import React from 'react';
import classNames from 'classnames';
import { changeCase } from 'lib/helpers/change-case';

/** Import custom types */
import InputComponent from 'lib/types/input-component';

type Props = InputComponent;

/* Import Stylesheet */
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

/**
 * The Radio component is a simple radio input. It should be used in conjunction with either the `RadioGroup` or `InputFactory` components to ensure that labels are correctly associated with the input.
 **/
export const Radio: React.FC<Props> = ({
  disabled,
  className,
  name,
  id,
  status,
  ...props
}: Props) => {
  return (
    <input
      type="radio"
      className={cx(
        styles['input'],
        status && styles[`status-${status}`],
        className
      )}
      name={name}
      id={id || changeCase(name, 'kebab')}
      data-testid={id || changeCase(name, 'kebab')}
      disabled={disabled}
      {...props}
    />
  );
};

Radio.displayName = 'Radio';

export default Radio;
