import React from 'react';
import classNames from 'classnames';
import { changeCase } from 'lib/helpers/change-case';

/* Import Stylesheet */
import styles from './styles.module.scss';
const cx = classNames.bind(styles);

/** Import custom types */
import { ComponentStatuses } from 'lib/types/component-statuses';

/* Prop Types */
export interface Props extends React.ComponentProps<'textarea'> {
  /**
   * The name of the input
   */
  name: string;
  /**
   * The state of the input (not providing a value or setting the value to 'default' will all return a default state)
   * @default 'default'
   */
  status?: ComponentStatuses;
}

/**
 * The Textarea component is used to collect long-form user input
 */
export const Textarea: React.FC<Props> = ({
  id,
  name,
  status,
  className,
  ...props
}: Props) => {
  return (
    <textarea
      id={id || changeCase(name, 'kebab')}
      data-testid={id || changeCase(name, 'kebab')}
      name={name}
      className={cx(
        styles['input'],
        styles[`type-multiline`],
        styles[`status-${status || 'default'}`],
        className
      )}
      {...props}
    />
  );
};

Textarea.displayName = 'Textarea';

export default Textarea;
