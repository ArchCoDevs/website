import React from 'react';
import classNames from 'classnames';

import ListItem from './components/list-item';

/* Import Stylesheet */
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

type ListItemType = {
  _key: string;
  content: React.ReactNode;
};

export interface Props extends React.HTMLAttributes<HTMLUListElement> {
  /**
   * The type of list to display
   * @default 'none'
   */
  type?: 'ordered' | 'unordered' | 'none' | 'arrow';
  /**
   * The an array of items to display in the list
   */
  items?: string[] | ListItemType[];
}

type ComponentProps = React.FC<Props> & {
  Item: typeof ListItem;
};

/**
 * List is a basic component that is used to display a list of items in a presentable manner.
 */
export const List: ComponentProps = ({
  type = 'none',
  items,
  className,
  children,
  ...props
}: Props) => {
  const Tag = type === 'ordered' ? 'ol' : 'ul';
  if (items) {
    return (
      <Tag
        className={cx(styles['list'], styles[`type-${type}`], className)}
        {...props}
      >
        {items?.map((item) => {
          const key = typeof item === 'string' ? item : item._key;
          return (
            <ListItem key={key} type={type}>
              {typeof item === 'string' ? item : item.content}
            </ListItem>
          );
        })}
      </Tag>
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
    <Tag
      className={cx(styles['list'], styles[`type-${type}`], className)}
      {...props}
    >
      {childrenWithProps}
    </Tag>
  );
};

List.Item = ListItem;

List.displayName = 'List';

export default List;
