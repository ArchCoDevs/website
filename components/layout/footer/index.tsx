import React from 'react';
import classNames from 'classnames';

/* Import Stylesheet */
import styles from './styles.module.scss';

/* Import Components */
import Link from 'components/data-display/link';
import LinkObject from 'lib/types/link-object';
import Icon, { IconTypes } from 'components/flourishes/icon';
import Tooltip from 'components/feedback/tooltip';

const cx = classNames.bind(styles);

/* Prop Types */
export interface Props extends React.ComponentProps<'div'> {
  /**
   * The links to display in the footer.
   */
  links: LinkObject[];
  /**
   * The social media links to display in the footer.
   */
  socials: LinkObject[];
}

/**
 * The 'Footer' component is used to display the site logo, navigation links, and social media links.
 */
export const Footer: React.FC<Props> = ({
  links,
  socials,
  className
}: Props) => (
  <footer className={cx(styles['footer'], className)}>
    <Icon
      use="applogo"
      className={styles['logo']}
      aria-description="The Arch Co. Logo"
      data-testid="logo"
    />
    <ul className={styles['links']}>
      {links?.map((link, index) => (
        <li key={index}>
          <Link href={link.href} className={styles['link']}>
            <span>{link.label}</span>
          </Link>
        </li>
      ))}
    </ul>
    <ul className={styles['socials']}>
      {socials?.map((social, index) => (
        <li key={index}>
          <Tooltip content={`Open ${social.label} in a new window`}>
            <Link
              href={social.href}
              target="_blank"
              rel="noreferrer noopener"
              className={styles['social']}
            >
              <Icon use={social.icon as IconTypes} aria-label={social.label} />
            </Link>
          </Tooltip>
        </li>
      ))}
    </ul>
    <div className={styles['legal']}>
      <p>
        &copy; {new Date().getFullYear()} The Arch Company. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
