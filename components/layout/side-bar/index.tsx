import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

/* Import Stylesheet */
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

/* Prop Types */
export interface Props extends React.ComponentProps<'div'> {
  /**
   * The toggle open state of the sidebar
   * @default false
   */
  isOpen: boolean;
}

/**
 * The SideBar component is a simple wrapper for content that should be displayed in a sidebar.
 * The sidebar can slide in and out of view, or be fixed in place.
 */
export const SideBar: React.FC<Props> = ({
  children,
  isOpen = false,
  className
}: Props) => {
  const [open, setOpen] = useState(isOpen);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <div
      ref={sidebarRef}
      role="complementary"
      tabIndex={0}
      className={cx(
        styles['side-bar'],
        {
          [styles['open']]: open
        },
        { [styles['closed']]: !open },
        className
      )}
    >
      {children}
    </div>
  );
};

export default SideBar;
