import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { PortableTextBlock } from 'next-sanity';
import BrandFolderImage from 'lib/types/brandfolder-image';
import RichText from '../rich-text';
import Image from 'next/image';

const cx = classNames.bind(styles);

export interface Props extends React.ComponentProps<'div'> {
  leftSlotType: 'image' | 'richText';
  leftRichText?: PortableTextBlock[];
  leftImage?: BrandFolderImage;
  leftImageAttribution?: string;
  leftImageCaption?: string;
  rightSlotType: 'image' | 'richText';
  rightRichText?: PortableTextBlock[];
  rightImage?: BrandFolderImage;
  rightImageAttribution?: string;
  rightImageCaption?: string;
}

const SlotContents: React.FC<{
  slotType: 'image' | 'richText';
  richText?: PortableTextBlock[];
  image?: BrandFolderImage;
  imageAttribution?: string;
  imageCaption?: string;
}> = ({ slotType, richText, image, imageAttribution, imageCaption }) => {
  if (slotType === 'richText' && richText) {
    return <RichText richText={richText} />;
  }

  if (slotType === 'image' && image) {
    return (
      <figure>
        <div className={styles['image-wrapper']}>
          <Image
            src={image.url as string}
            alt={image.alt_text || ''}
            fill
            priority
            placeholder="empty"
            className={styles['image']}
            style={{ objectFit: 'cover' }}
            sizes="50vw"
          />
          {imageAttribution && (
            <p className={styles['image-attribution']}>{imageAttribution}</p>
          )}
        </div>
        {imageCaption && (
          <figcaption className={styles['caption']}>{imageCaption}</figcaption>
        )}
      </figure>
    );
  }

  return null;
};

export const TwoSlotRichTextImage: React.FC<Props> = ({
  className,
  leftSlotType,
  leftRichText,
  leftImage,
  leftImageAttribution,
  leftImageCaption,
  rightSlotType,
  rightRichText,
  rightImage,
  rightImageAttribution,
  rightImageCaption,
  ...props
}) => {
  const hasCaption = leftImageCaption || rightImageCaption;

  return (
    <div
      className={cx(
        styles['two-slot-rich-text-image'],
        { [styles['has-caption']]: hasCaption },
        className
      )}
      {...props}
    >
      <div className={styles['left-slot']}>
        <SlotContents
          slotType={leftSlotType}
          richText={leftRichText}
          image={leftImage}
          imageAttribution={leftImageAttribution}
          imageCaption={leftImageCaption}
        />
      </div>
      <div className={styles['right-slot']}>
        <SlotContents
          slotType={rightSlotType}
          richText={rightRichText}
          image={rightImage}
          imageAttribution={rightImageAttribution}
          imageCaption={rightImageCaption}
        />
      </div>
    </div>
  );
};

export default TwoSlotRichTextImage;
