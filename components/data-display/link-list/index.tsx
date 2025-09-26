import React from 'react';
import classNames from 'classnames';

import { Icon } from 'components/flourishes/icon';

/* Import Stylesheet */
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

type ListItemType = {
  title: string;
  url: string;
};

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The an array of items to display in the list
   */
  items: ListItemType[];
  /**
   * List title
   * @default 'Quick Links'
   */
  title?: string;
}

/**
 * Two Column List is a basic component that is used to display a list in a two column format with an optional header and background colour.
 */
export const LinkList: React.FC<Props> = ({
  items,
  title = 'Quick Links',
  className,
  ...props
}: Props) => {
  const ListItems = items?.map((item) => (
    <li key={item.title}>
      <a href={item.url} className={styles['link']}>
        <Icon use="chevron" />
        {item.title}
      </a>
    </li>
  ));

  return (
    <div className={cx(styles['link-list'], className)} {...props}>
      {title && <h2 className={styles['title']}>{title}</h2>}
      <ul>{ListItems}</ul>
    </div>
  );
};

export default LinkList;
