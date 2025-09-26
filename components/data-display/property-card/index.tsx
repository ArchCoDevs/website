import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'components/data-display/link';
import classNames from 'classnames';

/* Types */
import { TPropertyTag } from 'components/data-display/property-tag';

/* Components */
import Button from 'components/data-input/button';
import Tooltip from 'components/feedback/tooltip';
import Icon from 'components/flourishes/icon';
import PropertyTag from 'components/data-display/property-tag';
import styles from './styles.module.scss';
import { Loader } from 'components/feedback/loader';
import { useSession } from 'next-auth/react';

const cx = classNames.bind(styles);
export interface Props extends React.ComponentProps<'section'> {
  rental_space_id: number;
  reference: string;
  address: string;
  price_title: string;
  use: string;
  favourite: boolean;
  size_sq_ft: number;
  tag?: TPropertyTag;
  is_flex_lease?: boolean;
  thumbnail: {
    url: string;
    alt_text: string;
  };
  mini?: boolean;
  selectable?: boolean;
  selected?: boolean;
  onSavedChange?: (
    rental_space_id: number,
    favourite: boolean
  ) => Promise<void>;
  onSelectedChange?: (selected: boolean) => void;
}

/**
 * The Property Card component displays a property with all of the relevant details.
 * It is designed to be used inside a container and will expand to fill the available space.
 */
export const PropertyCard: React.FC<Props> = ({
  rental_space_id,
  reference,
  address,
  price_title,
  use,
  favourite,
  size_sq_ft,
  tag,
  is_flex_lease = false,
  thumbnail,
  mini,
  selectable,
  selected,
  onSavedChange,
  onSelectedChange,
  ...props
}: Props) => {
  const [isSaved, setIsSaved] = useState(favourite);
  const [loadingImage, setLoadingImage] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isSelected, setIsSelected] = useState(selected);

  const session = useSession();

  useEffect(() => {
    console.log(session.data?.userData);
    setIsSaved(
      !!(
        session.data?.userData?.favouriteProperties &&
        session.data?.userData?.favouriteProperties?.includes(reference)
      )
    );
  }, [session]);

  return (
    <section
      className={cx(styles['property-card'], {
        [styles['mini']]: mini,
        [styles['flex-lease']]: is_flex_lease
      })}
      {...props}
    >
      <div className={styles['top']}>
        {selectable && (
          <div className={styles['enquiry-button-container']}>
            <Tooltip
              content={isSelected ? 'Remove from enquiry' : 'Add to enquiry'}
              placement="left"
            >
              <Button
                className={styles['enquiry-button']}
                id={`select-${reference}`}
                name={`select-${reference}`}
                label={isSelected ? 'Remove from enquiry' : 'Add to enquiry'}
                icon={isSelected ? 'minus' : 'plus'}
                shape="circle"
                hideLabel
                onClick={() => {
                  setIsSelected((v) => !v);
                  onSelectedChange?.(!isSelected);
                }}
              />
            </Tooltip>
          </div>
        )}

        {loadingImage && (
          <div className={styles['image-loader']}>
            <Loader label="Loading image..." />
          </div>
        )}
        {imageError && (
          <div className={styles['image-error']}>
            <Icon use="denied" className={styles['denied']} />
            <Icon use="image" className={styles['image']} />
            <span className={styles['message']}>Error loading image.</span>
          </div>
        )}
        <Link
          href={`/properties/${reference}`}
          className={styles['image-container']}
        >
          {!imageError && (
            <Image
              className={styles.image}
              loading="lazy"
              placeholder="empty"
              fill
              src={`${thumbnail.url}?width=450` || ''}
              alt={thumbnail.alt_text || 'Property image'}
              onLoad={() => setLoadingImage(false)}
              onError={() => {
                setLoadingImage(false); // Ensure loader is hidden if there is an error
                setImageError(true);
              }}
              sizes="400px"
            />
          )}
        </Link>

        {tag && <PropertyTag type={tag} className={styles['tag']} />}
        {!mini && (
          <form action="" method="post">
            <Tooltip
              content={isSaved ? 'Remove from saved' : 'Save property'}
              placement="left"
            >
              <Button
                variant="secondary"
                className={styles['save']}
                icon={isSaved ? 'heartfilled' : 'heart'}
                name="save"
                label={isSaved ? 'Remove from saved' : 'Save property'}
                shape="circle"
                alignIcon="right"
                small
                hideLabel
                onClick={(e) => {
                  e.preventDefault();
                  onSavedChange?.(rental_space_id, !isSaved);
                  setIsSaved((v) => !v);
                }}
              />
            </Tooltip>
          </form>
        )}
      </div>
      <div className={styles['bottom']}>
        {is_flex_lease && (
          <p className={styles['flex-lease-bar']}>
            <Icon use="star" />
            <span>Flexible lease available</span>
          </p>
        )}
        <Link href={`/properties/${reference}`}>
          <h2 className={styles['address']}>{address}</h2>
        </Link>
        {!mini && (
          <>
            <p className={styles['detail']}>
              <Icon use="tag" />
              {price_title}
            </p>
            <p className={styles['detail']}>
              <Icon use="floorplan" />
              {`${use} ${size_sq_ft && `| ${size_sq_ft} sq ft`}`}
            </p>
            <p className={styles['detail']}>
              <Icon use="barcode" />
              {reference} (ref code)
            </p>
          </>
        )}
        <div className={styles['actions']}>
          <Link
            href={`/properties/${reference}#maincontent`}
            className="button"
            data-testid="view-details"
          >
            <span>View details</span>
          </Link>
          {!mini && (
            <Link
              href={`/properties/${reference}/enquiry`}
              className="button--secondary"
              data-testid="contact-us"
            >
              <span>Contact us</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default PropertyCard;
