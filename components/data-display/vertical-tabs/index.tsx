import { useState, useEffect } from 'react';
import classNames from 'classnames';

/* Components */
import RichText from 'components/data-display/rich-text';
import Icon from 'components/flourishes/icon';

/* Import Stylesheet */
import styles from './styles.module.scss';
import { PortableTextBlock } from 'next-sanity';

const cx = classNames.bind(styles);

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  tabs: Array<{
    // The key of the tab
    _key: string;
    // The label of the tab
    title: string;
    // The content of the tab
    content: PortableTextBlock[];
  }>;
  initialTab?: string;
}
/**
 * Two Column List is a basic component that is used to display a list in a two column format with an optional header and background colour.
 */
export const VerticalTabs: React.FC<Props> = ({
  tabs,
  initialTab,
  className,
  ...props
}: Props) => {
  const [activeTab, setActiveTab] = useState(initialTab || tabs[0]._key);

  const changeTab = (e: React.MouseEvent<HTMLAnchorElement>, _key: string) => {
    e.preventDefault();
    setActiveTab(_key);
  };

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  return (
    <div
      className={cx(styles['vertical-tabs'], className)}
      {...props}
      data-testid="vertical-tabs-container"
    >
      <ul className={styles['tabs']}>
        {tabs?.map((tab) => (
          <li
            key={tab._key}
            className={cx(styles['tab'], {
              [styles['active']]: tab._key === activeTab
            })}
          >
            <a href={`#${tab._key}`} onClick={(e) => changeTab(e, tab._key)}>
              <Icon use="chevron" />
              {tab.title}
            </a>
          </li>
        ))}
      </ul>
      <div className={styles['content']} id="content" data-testid="content">
        {tabs?.map((tab) => (
          <div
            key={tab._key}
            id={tab._key}
            className={cx(styles['tab-content'], {
              [styles['active']]: tab._key === activeTab
            })}
          >
            <RichText richText={tab.content} className={styles['rich-text']} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalTabs;
