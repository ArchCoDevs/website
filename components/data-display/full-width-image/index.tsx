import Image from 'next/image';
import classNames from 'classnames';

import type BrandFolderImage from 'lib/types/brandfolder-image';

/* Components */
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

export interface Props extends React.ComponentProps<'div'> {
  /**
   * The image to display.
   */
  image: BrandFolderImage;
  fullHeight?: boolean;
}

/**
 * The ImageRow component displays an image and some text along with an optional call to action.
 * It is designed to fill an entire row.
 */
export const FullWidthImage: React.FC<Props> = ({
  image,
  className,
  fullHeight,
  ...props
}: Props) => {
  return (
    <div
      className={cx(styles['full-width-image'], className)}
      data-testid="full-width-image"
      {...props}
    >
      <Image
        className={cx(styles['image'], fullHeight && styles['full-height'])}
        loading="lazy"
        placeholder="empty"
        fill
        src={image.url || ''}
        alt={image.alt_text || ''}
        sizes="1280px"
      />
    </div>
  );
};

export default FullWidthImage;
