import Link from 'components/data-display/link';

/* Components */
import Icon from 'components/flourishes/icon';

import styles from './styles.module.scss';

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
  ctaLink: string;
}

/**
 * The PropertiesCta component displays an image and some text along with an optional call to action.
 * It is designed to fill an entire row.
 */
export const PropertiesCta: React.FC<Props> = ({
  title = 'Interested in making one of our spaces your own?',
  content = 'Browse available properties near you',
  ctaLink = '/properties',
  ...props
}) => {
  return (
    <section className={styles['properties-cta']} {...props}>
      <h2 className={styles['title']}>{title}</h2>
      <p className={styles['content']}>{content}</p>

      <div className={styles['cta']}>
        <Link href={ctaLink} className="button">
          <span>
            <Icon use="search" />
            Search
          </span>
        </Link>
      </div>
    </section>
  );
};

export default PropertiesCta;
