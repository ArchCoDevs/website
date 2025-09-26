import classNames from 'classnames';
import { changeCase } from 'lib/helpers/change-case';

/* Import Stylesheet */
import styles from './styles.module.scss';
import InputComponent from 'lib/types/input-component';

type Props = InputComponent;

const cx = classNames.bind(styles);

/**
 * The Text component is used to collect user input
 */
export const Text: React.FC<Props> = ({
  id,
  name,
  type = 'text',
  status = 'default',
  className,
  ...props
}: Props) => {
  return (
    <input
      id={id || changeCase(name, 'kebab')}
      data-testid={id || changeCase(name, 'kebab')}
      name={name}
      className={cx(
        styles['input'],
        styles[`type-${type}`],
        styles[`status-${status}`],
        className
      )}
      type={type}
      {...props}
    />
  );
};
Text.displayName = 'Text';
export default Text;
