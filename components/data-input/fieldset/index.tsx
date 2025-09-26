import React from 'react';
import classNames from 'classnames';

/* Import Stylesheet */
import styles from './styles.module.scss';

export interface Props extends React.ComponentProps<'fieldset'> {
  /**
   * The legend of the Fieldset
   */
  legend?: string;
  /**
   * A description of the Fieldset (You should provide a legend if you provide a description, or it will look weird)
   */
  description?: string | React.ReactNode;
  /**
   * Display as a card
   * @default false
   */
  useAsCard?: boolean;
  /**
   * Display a border between multiple fieldsets (Is automatically disabled if `useAsCard` is true)
   * @default true
   */
  showBorder?: boolean;
  /**
   * A Test ID for targeting the Fieldset
   * @default 'fieldset' (Or `fieldset-${id}` if an id is provided)
   */
  testID?: string;
  /**
   * A custom classname for the legend
   */
  legendClassName?: string;
}

const cx = classNames.bind(styles);

/**
 * The `Fieldset` component is a simple wrapper around the HTML `<Fieldset>` element as well as providing a legend and description.
 */
export const Fieldset: React.FC<Props> = ({
  legend,
  description,
  id,
  testID = id ? `fieldset-${id}` : 'fieldset',
  useAsCard = false,
  showBorder = true,
  legendClassName,
  className,
  children,
  ...props
}: Props) => {
  if (!id && description) {
    throw new Error(
      'You must provide an id if you provide a description to the Fieldset component'
    );
  }
  return (
    <fieldset
      id={id}
      data-testid={testID}
      className={cx(
        styles['fieldset'],
        useAsCard && styles['card'],
        showBorder && !useAsCard && styles['show-border'],
        className
      )}
      aria-describedby={description ? `${id}-description` : undefined}
      {...props}
    >
      {/* The real legend is hidden as it is difficult to style consistently across browsers */}
      {legend && <legend className={styles['legend']}>{legend}</legend>}
      {legend && (
        <span className={cx(styles['fake-legend'], legendClassName)}>
          {legend}
        </span>
      )}
      {description && id && (
        <div className={styles['description']} id={`${id}-description`}>
          {typeof description === 'string' ? <p>{description}</p> : description}
        </div>
      )}
      {children}
    </fieldset>
  );
};

Fieldset.displayName = 'Fieldset';

export default Fieldset;
