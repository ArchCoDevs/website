import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React from 'react';
import { FC, ReactNode } from 'react';

const toRemove = [
  /^http:\/\/localhost:3000/i,
  /^https?:\/\/[^.]*arch-co.vercel.app/i,
  /^https?:\/\/(www.)?thearchco.com/i
];

interface LinkProps
  extends NextLinkProps,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string; // Ensure href is always a string
  children: ReactNode;
}

/**
 * Wraps the Next Link component and will rewrite the href to a relative one if it looks like an absolute link to the site.
 *
 * The list of expressions is hardcoded within this component.
 *
 * @component
 */
export const Link: FC<LinkProps> = React.forwardRef(
  ({ href, children, target, rel, ...props }, ref) => {
    let relativeHref = href || '';

    if (typeof relativeHref === 'string' && relativeHref.startsWith('http')) {
      toRemove.forEach((pattern) => {
        if (typeof window === 'undefined') {
          // We'll only log a warning on the server
          if (pattern.test(relativeHref)) {
            console.warn(`Found absolute URL to the site: ${href}`);
            relativeHref = relativeHref.replace(pattern, '');
          }
        } else {
          relativeHref = relativeHref.replace(pattern, '');
        }
      });
    }

    if (relativeHref.startsWith('http') && !target) {
      target = '_blank';
      rel = rel || 'noopener';
    }

    return (
      <NextLink
        ref={ref as any}
        target={target}
        rel={rel}
        href={relativeHref}
        {...props}
      >
        {children}
      </NextLink>
    );
  }
);

Link.displayName = 'Link';

export default Link;
