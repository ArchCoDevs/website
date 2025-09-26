import classNames from 'classnames';
import React, { useState, useEffect } from 'react';

import { useToast } from 'components/feedback/toast/helpers/use-toast';
import { ProgressBar } from './components/progress-bar';
import { Icon, IconTypes } from 'components/flourishes/icon';
import { Button } from 'components/data-input/button';

import styles from './styles.module.scss';

export interface ToastProps {
  toastId: number | string;
  isVisible?: boolean;
  pauseOnFocusLoss: boolean;
  pauseOnHover: boolean;
  closeOnClick: boolean;
  type?: 'success' | 'error' | 'warning' | 'info' | 'default';
  autoClose: number | false;
  closeToast: () => void;
}

export interface CloseButton {
  type: ToastProps['type'];
  closeToast: () => void;
}

export interface Toast {
  content: React.ReactNode | ((props: ToastProps) => React.ReactNode);
  props: ToastProps;
}

interface Props extends ToastProps, React.PropsWithChildren<object> {}

export const Toast: React.FC<Props> = (props: Props) => {
  const {
    children,
    isVisible = false,
    closeToast,
    autoClose,
    type = 'default',
    closeOnClick
  } = props;
  const { toastRef, isRunning, eventHandlers } = useToast(props);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsTransitioning(true);
    } else {
      setTimeout(() => setIsTransitioning(false), 300); // Matches the duration of the CSS transition
    }
  }, [isVisible]);

  if (!isTransitioning && !isVisible) {
    return null;
  }

  return (
    <div
      ref={toastRef}
      className={classNames(styles['toast'], styles[type], {
        [styles['cursor-pointer']]: closeOnClick,
        [styles['toast-enter']]: isVisible,
        [styles['toast-exit']]: !isVisible
      })}
      {...eventHandlers}
      role="alert"
      aria-live={type === 'success' ? 'polite' : 'assertive'}
    >
      <div className={styles['toast-container']}>
        {type !== 'default' && (
          <Icon use={type as IconTypes} className={styles['toast-icon']} />
        )}

        <div className={classNames(styles['toast-content'], styles[type])}>
          {children}
        </div>
        {closeToast && (
          <Button
            className={styles['toast-close-button']}
            transparent
            icon="close"
            hideLabel
            onClick={closeToast}
            label="Close"
          />
        )}
      </div>
      {autoClose && (
        <ProgressBar
          delay={autoClose as number}
          isRunning={isRunning}
          isVisible={isVisible}
          closeToast={closeToast}
          type={type}
        />
      )}
    </div>
  );
};

Toast.displayName = 'Toast';

export default Toast;
