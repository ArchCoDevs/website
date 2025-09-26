import Link from 'components/data-display/link';
import Image from 'next/image';

/* Components */
import Icon from 'components/flourishes/icon';

import styles from './styles.module.scss';

import DefaultImage from './images/default.png';

interface Props extends React.ComponentProps<'section'> {
  /**
   * The text to display in the content area.
   */
  content: string;

  /**
   * The text to display in the title area.
   */
  title: string;

  /**
   * The CTA link
   */
  directLink?: string;
  /**
   * Flippingbook link
   */
  flippingbookLink?: string;
  /**
   * Custom background image
   */
  backgroundImage?: string;
}

/**
 * The PDFCard component is used to display a PDF card with a title, content, and CTA buttons.
 * It is designed to fill an entire row.
 */
export const PDFCard: React.FC<Props> = ({
  title = 'Download the latest brochure',
  content,
  directLink,
  flippingbookLink,
  backgroundImage,
  ...props
}) => {
  return (
    <section
      className={styles['pdf-card']}
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})` }
          : undefined
      }
      {...props}
    >
      <h2 className={styles['title']}>{title}</h2>
      <p className={styles['content']}>{content}</p>

      <div className={styles['ctas']}>
        {flippingbookLink && (
          <Link
            href={flippingbookLink}
            className={styles['flippingbook-button']}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              <Icon use="flippingbook" /> Open in flippingBook
            </span>
          </Link>
        )}
        {directLink && (
          <Link href={directLink} className={styles['direct-button']}>
            <span>
              <Icon use="download" />
              Download PDF
            </span>
          </Link>
        )}
      </div>
      <p className={styles['disclaimer']}>
        FlippingBook links open in a new tab
      </p>
      <div className={styles['overlay']} />
      {!backgroundImage && (
        <Image
          className={styles['background']}
          src={DefaultImage}
          alt="Background"
          layout="fill"
          objectFit="cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      )}
    </section>
  );
};

export default PDFCard;
