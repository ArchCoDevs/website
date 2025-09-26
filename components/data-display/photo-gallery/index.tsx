import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import styles from './styles.module.scss';
import Icon from 'components/flourishes/icon';
import Button from 'components/data-input/button';
import { Loader } from 'components/feedback/loader';

const cx = classNames.bind(styles);

export interface Props extends React.ComponentProps<'div'> {
  /**
   * The images to display in the gallery.
   */
  images: {
    url: string;
    alt_text: string;
  }[];
}

/**
 * The 'PhotoGallery' component is used to display a collection of images.
 */
export const PhotoGallery: React.FC<Props> = ({
  className,
  images,
  ...props
}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [primaryImageLoaded, setPrimaryImageLoaded] = useState(false);
  const [primaryImageErrored, setPrimaryImageErrored] = useState(false);
  const [loadedImages, setLoadedImages] = useState<number[]>([]);
  const [erroredImages, setErroredImages] = useState<number[]>([]);

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
    setIsOverlayOpen(true);
  };

  const getNextIndex = (index: number) => (index + 1) % images.length;
  const getPrevIndex = (index: number) =>
    (index - 1 + images.length) % images.length;

  const handleNextClick = () => {
    setCurrentIndex(getNextIndex(currentIndex));
  };

  const handlePrevClick = () => {
    setCurrentIndex(getPrevIndex(currentIndex));
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        handleNextClick();
      } else if (event.key === 'ArrowLeft') {
        handlePrevClick();
      } else if (event.key === 'Escape') {
        handleCloseOverlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex]);

  if (primaryImageErrored || !images || images.length === 0) {
    // If the primary image errored or no images, we don't want to render the gallery
    return null;
  }

  return (
    <article className={cx(styles['photo-gallery'], className)} {...props}>
      <div className={styles['image-counter']}>
        <Icon use="camera" />
        {currentIndex + 1} / {images.length}
      </div>
      <div className={styles['main-image-container']}>
        <button
          className={styles['nav-button-left']}
          onClick={handlePrevClick}
          aria-label="Previous Image"
          data-testid="prev-arrow"
        >
          <Icon use="chevron" />
        </button>
        <div
          className={styles['main-image']}
          onClick={() => setIsOverlayOpen(true)}
        >
          {!primaryImageLoaded && !primaryImageErrored && (
            <div className={styles['image-loader']}>
              <Loader label="Loading image..." />
            </div>
          )}
          <Image
            src={`${images[currentIndex].url}?width=800`}
            alt={images[currentIndex].alt_text}
            priority
            width={800}
            height={600}
            placeholder="empty"
            onLoad={() => setPrimaryImageLoaded(true)}
            onError={() => {
              setPrimaryImageLoaded(true);
              setPrimaryImageErrored(true);
            }}
          />
        </div>
        <button
          className={styles['nav-button-right']}
          onClick={handleNextClick}
          aria-label="Next Image"
          data-testid="next-arrow"
        >
          <Icon use="chevron" />
        </button>
      </div>
      <ul className={styles['thumbnail-list']}>
        {Array.from({ length: 3 }).map((_, idx) => {
          const thumbnailIndex = getNextIndex(currentIndex + idx);
          const isLoading =
            !loadedImages.includes(thumbnailIndex) &&
            !erroredImages.includes(thumbnailIndex);
          const isError = erroredImages.includes(thumbnailIndex);

          return (
            <li
              key={`${thumbnailIndex}-${idx}`}
              className={styles['thumbnail-item']}
              onClick={() => handleThumbnailClick(thumbnailIndex)}
            >
              {isLoading && (
                <div className={styles['image-loader']}>
                  <Loader label="Loading image..." />
                </div>
              )}
              {!isError && (
                <Image
                  src={`${images[thumbnailIndex].url}?width=240`}
                  alt={images[thumbnailIndex].alt_text}
                  width={240}
                  height={180}
                  loading="lazy"
                  placeholder="empty"
                  onLoad={() =>
                    setLoadedImages((prevLoadedImages) => [
                      ...prevLoadedImages,
                      thumbnailIndex
                    ])
                  }
                  onError={() =>
                    setErroredImages((prevErroredImages) => [
                      ...prevErroredImages,
                      thumbnailIndex
                    ])
                  }
                />
              )}
            </li>
          );
        })}
      </ul>
      {isOverlayOpen && (
        <div
          data-testid="overlay"
          className={styles['overlay']}
          onClick={handleCloseOverlay}
        >
          <div
            className={styles['overlay-content']}
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              className={styles['close-button']}
              data-testid="close-button"
              variant="tertiary"
              onClick={handleCloseOverlay}
              icon="close"
              shape="circle"
              small
              hideLabel
              label="Close"
            />
            <button
              className={styles['nav-button-left']}
              onClick={handlePrevClick}
              aria-label="Previous Image"
              data-testid="prev-arrow"
            >
              <Icon use="chevron" />
            </button>
            <Image
              src={`${images[currentIndex].url}?width=1280`}
              alt={images[currentIndex].alt_text + ' (full size)'}
              width={1280}
              height={960}
            />
            <button
              className={styles['nav-button-right']}
              onClick={handleNextClick}
              aria-label="Next Image"
              data-testid="next-arrow"
            >
              <Icon use="chevron" />
            </button>
          </div>
        </div>
      )}
    </article>
  );
};

export default PhotoGallery;
