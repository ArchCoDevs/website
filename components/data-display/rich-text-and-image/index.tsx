import React, { Suspense } from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';
import { PortableTextBlock } from 'next-sanity';
import BrandFolderImage from 'lib/types/brandfolder-image';
import RichText from '../rich-text';
import Image from 'next/image';
import { Loader } from 'components/feedback/loader';

const cx = classNames.bind(styles);

export interface Props extends React.ComponentProps<'div'> {
  /**
   * The Rich text to display
   */
  richText: PortableTextBlock[];
  /**
   * The image to display
   */
  image: BrandFolderImage;
  /**
   * Swap the image and text sides
   */
  swapSides?: boolean;
}

/**
 * The Rich Text and Image component displays a rich text block and an image side by side.
 */
export const RichTextAndImage: React.FC<Props> = ({
  className,
  richText,
  image,
  swapSides,
  ...props
}: Props) => (
  <div
    className={cx(
      styles['rich-text-and-image'],
      {
        [styles['swap-sides']]: swapSides
      },
      className
    )}
    {...props}
  >
    <RichText richText={richText} className={styles['rich-text']} />
    {image && (
      <div className={styles['image']}>
        <Suspense fallback={<Loader />}>
          <Image
            src={image.url as string}
            alt={image.alt_text as string}
            fill
            priority
            placeholder="empty"
          />
        </Suspense>
      </div>
    )}
  </div>
);

export default RichTextAndImage;
