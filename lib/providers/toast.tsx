import React, {
  useState,
  createContext,
  useEffect,
  useRef,
  useCallback
} from 'react';
import { Toast } from 'components/feedback/toast';
import type { Toast as ToastType, ToastProps } from 'components/feedback/toast';
import { Event, eventManager } from 'lib/helpers/event-manager';

import styles from './styles.module.scss';

type ToastProviderProps = React.PropsWithChildren<object>;

type ToastContext = {
  getToastsToRender: () => ToastType[];
  isToastActive: (toastId: ToastProps['toastId']) => boolean;
};

const ToastContext = createContext<ToastContext | null>(null);

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toastIds, setToastIds] = useState<ToastProps['toastId'][]>([]);
  const toastsToRender = useRef(
    new Map<ToastProps['toastId'], ToastType>()
  ).current;
  const isToastActive = (id: ToastProps['toastId']) =>
    toastIds.indexOf(id) !== -1;

  const removeToast = useCallback((toastId: ToastProps['toastId']) => {
    setToastIds((prevValue) =>
      toastId == null ? [] : prevValue.filter((id) => id !== toastId)
    );
  }, []);

  const addToast = useCallback(
    (content: React.ReactNode, props: unknown) => {
      const toastProps = props as ToastProps;
      const { toastId } = toastProps;
      const toast: Toast = {
        content,
        props: { ...toastProps, closeToast: () => removeToast(toastId) }
      };
      toastsToRender.set(toastId, toast);

      setToastIds((state) => [...state, toastId]);
    },
    [toastsToRender, removeToast]
  );

  useEffect(() => {
    eventManager.on(Event.Show, addToast).on(Event.Clear, removeToast);

    return () => {
      eventManager.off(Event.Show, addToast).off(Event.Clear, removeToast);
      toastsToRender.clear();
    };
  }, [addToast, removeToast, toastsToRender]);

  const getToastsToRender = useCallback(() => {
    return Array.from(toastsToRender.values());
  }, [toastsToRender]);

  const value = {
    getToastsToRender,
    isToastActive
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div aria-live="assertive" className={styles['toasts-container']}>
        <div className={styles['toasts-container-inner']}>
          {getToastsToRender().map(({ content, props: toastProps }) => {
            return (
              <Toast
                key={toastProps.toastId}
                isVisible={isToastActive(toastProps.toastId)}
                {...toastProps}
              >
                {content as React.ReactNode}
              </Toast>
            );
          })}
        </div>
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
