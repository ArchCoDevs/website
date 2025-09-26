import React from 'react';
import classNames from 'classnames';

import ListItem from '../list/components/list-item';

/* Import Stylesheet */
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

type ListItemType = {
  id: string;
  content: React.ReactNode;
};

export interface Props extends React.HTMLAttributes<HTMLUListElement> {
  /**
   * The type of list to display
   * @default 'unordered'
   */
  type?: 'ordered' | 'unordered' | 'none';
  /**
   * The an array of items to display in the list
   */
  items?: string[] | ListItemType[];
  /**
   * List title
   */
  title?: string;
  /**
   * Display background
   */
  showBackground?: boolean;
}

type ComponentProps = React.FC<Props> & {
  Item: typeof ListItem;
};

/**
 * Two Column List is a basic component that is used to display a list in a two column format with an optional header and background colour.
 */
export const TwoColumnList: ComponentProps = ({
  type = 'unordered',
  items,
  title,
  showBackground,
  className,
  children,
  ...props
}: Props) => {
  const Tag = type === 'ordered' ? 'ol' : 'ul';
  if (items) {
    return (
      <div
        className={cx(styles['list-container'], {
          [styles['with-bg']]: showBackground
        })}
      >
        {title && <h2 className={styles['title']}>{title}</h2>}
        <Tag
          className={cx(styles['list'], styles[`type-${type}`], className)}
          {...props}
        >
          {items?.map((item) => {
            const key = typeof item === 'string' ? item : item.id;
            return (
              <ListItem key={key} type={type}>
                {typeof item === 'string' ? item : item.content}
              </ListItem>
            );
          })}
        </Tag>
      </div>
    );
  }
  // If there are no items, just return the children
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      // If the child is a list item, add the type prop
      if (child.type === ListItem) {
        // @ts-ignore - We know that the child is a list item
        return React.cloneElement(child, { type });
      }
      return child;
    }
    return null;
  });

  return (
    <div
      className={cx(styles['list-container'], {
        [styles['with-bg']]: showBackground
      })}
      data-testid="list-container"
    >
      {title && <h2 className={styles['title']}>{title}</h2>}
      <Tag
        className={cx(styles['list'], styles[`type-${type}`], className)}
        {...props}
      >
        {childrenWithProps}
      </Tag>
    </div>
  );
};

TwoColumnList.Item = ListItem;

TwoColumnList.displayName = 'List';

export default TwoColumnList;
