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
 * The `File` component is used to upload files. It is a wrapper around the `<input type="file" />` element.
 */
export const File: React.FC<Props> = ({
  name,
  id,
  disabled,
  className,
  ...props
}: Props) => {
  return (
    <input
      className={cx(styles['input'], className)}
      id={id || changeCase(name, 'kebab')}
      data-testid={id || changeCase(name, 'kebab')}
      name={name}
      disabled={disabled}
      type="file"
      {...props}
    />
  );
};
File.displayName = 'File';

export default File;
