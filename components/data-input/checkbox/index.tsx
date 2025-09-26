import { forwardRef } from 'react';
import classNames from 'classnames';
import { changeCase } from 'lib/helpers/change-case';

/** Import custom types */
import InputComponent from 'lib/types/input-component';

type Props = InputComponent;

/* Import Stylesheet */
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

/**
 * The `Checkbox` component is a simple checkbox input. It should be used in conjunction with either the `CheckboxGroup` or `InputFactory` components to ensure that labels are correctly associated with the input.
 */
export const Checkbox = forwardRef<HTMLInputElement, Props>(
  (
    { id, name, status, checked, disabled, value, className, ...props },
    ref
  ) => {
    if (!id && !name) {
      throw new Error(
        'Inputs must have either an id or name prop to be accessible'
      );
    }

    return (
      <span className={cx(styles['icon-container'])}>
        <input
          id={id || changeCase(name, 'kebab')}
          data-testid={id || changeCase(name, 'kebab')}
          name={name}
          type="checkbox"
          className={cx(
            styles['input'],
            status && styles[`status-${status}`],
            className
          )}
          defaultChecked={checked}
          disabled={disabled}
          defaultValue={value}
          ref={ref}
          {...props}
        />
      </span>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
