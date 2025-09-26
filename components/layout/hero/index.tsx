import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';

/* Import Stylesheet */
import styles from './styles.module.scss';
import Image from 'next/image';
import BrandFolderImage from 'lib/types/brandfolder-image';

const cx = classNames.bind(styles);

/* Prop Types */
export interface Props extends React.ComponentProps<'div'> {
  /**
   * The image to display as the hero
   */
  image?: BrandFolderImage;
  /**
   * The Video url to display as the hero
   */
  video_url?: string;
  /**
   * Show the overlay?
   */
  overlay?: boolean;
  /**
   * Custom title text
   */
  title?: string;
  /**
   * Custom body text
   */
  body?: string;
}

/**
 * The 'Hero' component is used to display the site logo, navigation links, and social media links.
 */
export const Hero: React.FC<Props> = ({
  image,
  video_url,
  overlay,
  title,
  body,
  className,
  children
}: Props) => {
  if (children && (title || body)) {
    console.warn(
      'Hero component has both children and title/body props. Children will be used.'
    );
  }

  const videoRef = useRef<HTMLVideoElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const playIfVisible = () => {
    if (videoRef.current?.offsetParent) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  };

  useEffect(() => {
    playIfVisible();

    window.addEventListener('resize', playIfVisible);

    return () => {
      window.removeEventListener('resize', playIfVisible);
    };
  });

  return (
    <section
      data-testid="hero"
      className={cx(
        styles['hero'],
        {
          [styles['overlay']]: overlay
        },
        video_url ? styles['has-video'] : styles['no-video'],
        image?.url ? styles['has-image'] : styles['no-image'],
        className
      )}
    >
      <div
        className={cx(styles['content'], {
          [styles['with-copy']]: title || body
        })}
      >
        {children || (
          <>
            {title && <h1>{title}</h1>}
            {body && <p>{body}</p>}
          </>
        )}
      </div>
      {video_url && (
        <video
          id="background-video"
          className={styles['video']}
          loop
          muted
          playsInline
          preload="none"
          width={'100%'}
          height={'100%'}
          ref={videoRef}
        >
          <source src={video_url} type="video/mp4" />
        </video>
      )}
      {image?.url && (
        <Image
          src={image.url}
          alt={image.alt_text || 'Hero Image'}
          priority={!video_url}
          fill
          placeholder="empty"
          quality={100}
          className={styles['image']}
          ref={imgRef}
        />
      )}
    </section>
  );
};

export default Hero;
