import React from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';
import Icon from 'components/flourishes/icon';

const cx = classNames.bind(styles);

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

const boundaryCount = 1;
const siblingCount = 1;

const getStartEllipsis = (siblingsStart: number, count: number) => {
  if (siblingsStart > boundaryCount + 2) {
    return ['ellipsis'];
  } else if (boundaryCount + 1 < count - boundaryCount) {
    return [boundaryCount + 1];
  } else {
    return [];
  }
};

const getEndEllipsis = (siblingsEnd: number, count: number) => {
  if (siblingsEnd < count - boundaryCount - 1) {
    return ['ellipsis'];
  } else if (count - boundaryCount > boundaryCount) {
    return [count - boundaryCount];
  } else {
    return [];
  }
};

const getPages = (
  count: number,
  currentPage: number,
  handleClick: (page: number | null) => void
) => {
  const startPages = range(1, Math.min(boundaryCount, count));
  const endPages = range(
    Math.max(count - boundaryCount + 1, boundaryCount + 1),
    count
  );

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      currentPage - siblingCount,
      // Lower boundary when page is high
      count - boundaryCount - siblingCount * 2 - 1
    ),
    // Greater than startPages
    boundaryCount + 2
  );

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      currentPage + siblingCount,
      // Upper boundary when page is low
      boundaryCount + siblingCount * 2 + 2
    ),
    // Less than endPages
    endPages.length > 0 ? endPages[0] - 2 : count - 1
  );

  const itemList = [
    'previous',
    ...startPages,
    ...getStartEllipsis(siblingsStart, count),
    ...range(siblingsStart, siblingsEnd),
    ...getEndEllipsis(siblingsEnd, count),
    ...endPages,
    'next'
  ];

  // Map the button type to its page number
  const buttonPage = (type: string) => {
    switch (type) {
      case 'first':
        return 1;
      case 'previous':
        return currentPage - 1;
      case 'next':
        return currentPage + 1;
      case 'last':
        return count;
      default:
        return null;
    }
  };

  // Convert the basic item list to PaginationItem props objects
  return itemList.map((item) => {
    return typeof item === 'number'
      ? {
          onClick: () => handleClick(item),
          type: 'page',
          page: item,
          selected: item === currentPage,
          'aria-current': item === currentPage ? 'true' : undefined
        }
      : {
          onClick: () => handleClick(buttonPage(item)),
          type: item,
          page: buttonPage(item),
          selected: false,
          disabled:
            item.indexOf('ellipsis') !== -1 ||
            (item === 'previous' && currentPage <= 1) ||
            (item === 'next' && currentPage >= count)
        };
  });
};

type PaginationItemProps = {
  /**
   * The type of item.
   */
  type: string;
  /**
   * The page number of the item.
   */
  page: number | null;
  /**
   * Whether the item is selected.
   */
  selected: boolean;
};
/**
 * The 'Pagination' component is used to navigate through pages of content.
 */
const PaginationItem: React.FC<PaginationItemProps> = ({
  type,
  page,
  selected,
  ...props
}) => {
  let content: React.ReactNode;
  let ariaLabel: string | undefined;

  let className = styles['pagination-item'];
  if (selected) {
    className += ` ${styles['selected']}`;
  }

  switch (type) {
    case 'previous':
      content = <Icon use="chevron" />;
      ariaLabel = 'Go to previous page';
      className += ` ${styles['previous']}`;
      break;
    case 'next':
      content = <Icon use="chevron" />;
      ariaLabel = 'Go to next page';
      className += ` ${styles['next']}`;
      break;
    case 'ellipsis':
      content = '…';
      ariaLabel = 'Show more pages';
      className += ` ${styles['ellipsis']}`;
      break;
    default:
      content = page;
      ariaLabel = `Go to page ${page}`;
  }

  return (
    <button {...props} className={className} aria-label={ariaLabel}>
      {content}
    </button>
  );
};

export interface Props {
  /**
   * The total number of pages.
   */
  count: number;
  /**
   * The current page.
   */
  page: number;
  /**
   * When the page is changed.
   */
  onChange?: (page: number) => void;
  /**
   * Add a custom class name.
   */
  className?: string;
}
/**
 * The 'Pagination' component is used to navigate through pages of content.
 */
const Pagination: React.FC<Props> = ({
  count,
  page,
  onChange,
  className
}: Props) => {
  const handlePageSelected = (newPage: number | null) => {
    onChange && newPage && onChange(newPage);
  };

  const renderButtons = () => {
    const items = getPages(count, page, handlePageSelected);
    return items.map((item, i) => {
      return <PaginationItem {...item} key={i} />;
    });
  };

  return (
    <nav
      role="navigation"
      aria-label="Pagination Navigation"
      className={cx(styles['pagination-container'], className)}
    >
      {renderButtons()}
    </nav>
  );
};

export default Pagination;
