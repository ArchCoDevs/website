import { PortableTextComponents } from '@portabletext/react';
import Link from 'components/data-display/link';

/**
 * Used to override the default functionality when converting portable text into react components
 */
export const portableTextComponents: PortableTextComponents = {
  marks: {
    link: ({ value, children }) => <Link {...value}>{children}</Link>
  }
};
