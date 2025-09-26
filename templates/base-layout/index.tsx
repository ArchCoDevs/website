import { PropsWithChildren } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import config from 'app-config';

/* Import Styles */
import styles from './styles.module.scss';

/* Import style variables */
import colourvars from 'styles/export/_colours.module.scss';

/* Import components */
import Masthead from 'components/navigation/masthead';
import Footer from 'components/layout/footer';
import SanityPreviewBanner from 'components/feedback/sanity-preview-banner';

import type {
  Globals,
  Navigation,
  FooterLink,
  SocialMediaAccount,
  NavigationItem
} from 'lib/types/sanity.types';
import LinkObject from 'lib/types/link-object';
import { useSession } from 'next-auth/react';
interface Props extends PropsWithChildren {
  /**
   * The title of the page
   */
  title?: string;
  /**
   * The meta description of the page
   */
  description?: string;
  /**
   * The global settings for the site from the CMS
   */
  globals?: Globals;
  /**
   * The main navigation links for the masthead from the CMS
   */
  navigation?: Navigation;
  /**
   * Is the page in preview mode
   */
  preview?: boolean;
  /**
   * NoIndex the page
   * @default false
   */
  noIndex?: boolean;
  /**
   * NoFollow the page
   * @default false
   */
  noFollow?: boolean;
}

/**
 *  The base layout template is used to wrap all pages with a consistent layout
 *  if a different template is required for a page, it should extend this template
 */
export const BaseLayout: React.FC<Props> = ({
  title,
  description,
  globals,
  navigation,
  preview,
  noIndex,
  noFollow,
  children
}: Props) => {
  const { status } = useSession();
  const router = useRouter();

  const siteUrl = config.siteUrl;
  const canonicalUrl = `${siteUrl}${router.asPath.split('?')[0]}`;

  const cleanLinks = <T extends LinkObject>(links?: T[]): LinkObject[] => {
    return links
      ? links.map(({ href, label }) => ({
          href,
          label,
          icon: label.toLocaleLowerCase()
        }))
      : [];
  };

  const navLinks = (
    navigation: Navigation | null
  ): Array<{
    href: string;
    label: string;
    children?: Array<{
      href: string;
      label: string;
      children?: Array<{ href: string; label: string }>;
    }>;
  }> => {
    // If the API fails to return the navigation, use the hardcoded top-level links
    if (!navigation) return config.navLinks;

    // Helper function to map the navigation items
    const mapNavigationItems = (
      items: NavigationItem[] | undefined
    ):
      | Array<{
          href: string;
          label: string;
          children?: Array<{ href: string; label: string }>;
        }>
      | undefined => {
      if (!items) return undefined;
      return items.map((item) => {
        return {
          label: item.label || '',
          href: item.href,
          children: item.subnav ? mapNavigationItems(item.subnav) : undefined
        };
      });
    };

    // Map the top-level links and their children
    return config.navLinks.map((link) => {
      const navKey = link.id as keyof Navigation;
      const navItems = navigation[navKey] as NavigationItem[] | undefined;

      return {
        href: link.href,
        label: link.label,
        children: mapNavigationItems(navItems)
      };
    });
  };

  return (
    <>
      <Head>
        <title>{`${title ? title + ' | ' : ''}${config.appName}`}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="application-name" content={config.appName} />
        <meta name="apple-mobile-web-app-title" content={config.appName} />
        <meta
          name="description"
          content={description || config.appDescription}
        />
        <meta name="theme-color" content={colourvars.colPrimary} />
        <meta name="msapplication-TileColor" content={colourvars.colPrimary} />
        <meta
          name="robots"
          content={`${noIndex ? 'noindex' : 'index'}, ${
            noFollow ? 'nofollow' : 'follow'
          }`}
        />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      {preview && <SanityPreviewBanner />}
      <a className={styles['skip-link']} href="#maincontent">
        Skip to main content
      </a>
      <div className={styles['base-layout']}>
        <div className={styles['main-content']}>
          <nav className={styles['nav-bar']} aria-label="Top navigation">
            <ul>
              {/* <li>
                <a href="#">Register for property updates</a>
              </li> */}
              {status !== 'unauthenticated' ? (
                <li>
                  <a href="/my-account">My account</a>
                </li>
              ) : (
                <li>
                  <a href="/login">Sign in</a>
                </li>
              )}

              <li>
                <a href="/contact-us">Contact us</a>
              </li>
            </ul>
          </nav>
          <Masthead
            className={styles['masthead']}
            navigation={navLinks(navigation as Navigation)}
            tel={config.contactDetails.tel}
          />

          {children}
          <Footer
            links={cleanLinks<FooterLink>(globals?.footerLinks)}
            socials={cleanLinks<SocialMediaAccount>(globals?.socialMedia)}
          />
        </div>
      </div>
    </>
  );
};

export default BaseLayout;
