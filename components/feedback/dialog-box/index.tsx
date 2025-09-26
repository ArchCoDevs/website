import React from 'react';
import classNames from 'classnames';
import { Button, buttonVariants } from 'components/data-input/button';

/* Import Stylesheet */
import styles from './styles.module.scss';

export interface Props extends React.ComponentProps<'div'> {
  /**
   * The dialog title
   */
  title: string;
  /**
   * The confirmation message
   */
  message?: string | JSX.Element;
  /**
   * The action to perform if confirmed
   */
  confirmAction: () => void;
  /**
   * The action to perform if denied
   */
  cancelAction?: () => void;
  /**
   * The label of the confirm button
   * @default 'Confirm'
   */
  confirmLabel?: string;
  /**
   * The label of the cancel button
   * @default 'Cancel'
   */
  cancelLabel?: string;
  /**
   * Confirm button variant
   * @default 'create'
   * @see Button
   */
  confirmVariant?: (typeof buttonVariants)[number];
  /**
   * Cancel button variant
   * @default 'destroy'
   * @see Button
   */
  cancelVariant?: (typeof buttonVariants)[number];
  /**
   * Expand the component to fill the width and height of the parent container
   * @default false
   */
  fitContainer?: boolean;
}

const cx = classNames.bind(styles);

/**
 * The 'DialogBox' component presents a dialog to allow a user to perform an action
 */
export const DialogBox: React.FC<Props> = ({
  className,
  title,
  message,
  confirmAction,
  cancelAction,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmVariant = 'create',
  cancelVariant = 'destroy',
  fitContainer = false
}: Props) => (
  <div
    className={cx(
      styles['confirmation-dialogue'],
      fitContainer && styles['fit-container'],
      className
    )}
    role="dialog"
    aria-labelledby="title"
    aria-describedby={message ? 'message' : undefined}
  >
    <h2 id="title" className={styles['title']}>
      {title}
    </h2>
    <div className={cx(styles['inner'], message && styles['has-message'])}>
      {message && (
        <p id="message" className={styles['message']}>
          {message}
        </p>
      )}
      <div
        className={cx(
          styles['button-container'],
          cancelAction && styles['both-buttons']
        )}
      >
        {cancelAction && (
          <Button
            onClick={cancelAction}
            label={cancelLabel}
            variant={cancelVariant}
            transparent
          />
        )}
        <Button
          onClick={confirmAction}
          label={confirmLabel}
          variant={confirmVariant}
        />
      </div>
    </div>
  </div>
);

export default DialogBox;
