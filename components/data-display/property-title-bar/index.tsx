import { useState, useEffect } from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);

import Icon from 'components/flourishes/icon';
import Modal from 'components/layout/modal';
import ShareDialog from 'components/feedback/share-dialog';
import { formatNumberForMoney } from 'lib/helpers/format-number-for-cost';
import { useSession } from 'next-auth/react';

/* Types */
export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The rental space ID
   */
  rental_space_id: number;
  /**
   * The property address
   */
  address: string;
  /**
   * Price per month
   */
  price_per_month: number;
  /**
   * Property ref (for share link)
   */
  property_ref: string;
  /**
   * Has the user saved this property
   * @default false
   */
  isSaved: boolean;
  /**
   * The callback to call when the user updates the save status
   */
  onSavedChange?: (
    rental_space_id: number,
    favourite: boolean
  ) => Promise<void>;
}

/**
 * The PropertyTitleBar component is a wrapper for the PropertyTitleBar component that allows for a property tag to be displayed.
 */
export const PropertyTitleBar: React.FC<Props> = ({
  rental_space_id,
  address,
  price_per_month,
  property_ref,
  isSaved = false,
  onSavedChange,
  ...props
}: Props) => {
  const session = useSession();
  const [saved, setSaved] = useState(isSaved);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    console.log(session.data?.userData);
    setSaved(
      !!(
        session.data?.userData?.favouriteProperties &&
        session.data?.userData?.favouriteProperties?.includes(property_ref)
      )
    );
  }, [session]);

  const handleSave = () => {
    onSavedChange?.(rental_space_id, !isSaved);
    setSaved(!isSaved);
  };

  return (
    <div className={styles[`property-title-bar`]} {...props}>
      <div className={styles['address-and-price']}>
        <h1 className={styles['address']}>
          <Icon use="address" className={styles['icon']} />
          {address}
        </h1>
        <span className={styles['price']}>
          <Icon use="tag" className={styles['icon']} /> &pound;
          {formatNumberForMoney(price_per_month)} per month + VAT
          <span className={styles['ppm']}>
            &pound;{formatNumberForMoney(price_per_month * 12)} per year
          </span>
        </span>
      </div>
      <div className={styles['share-and-save']}>
        <button
          className={cx(styles['save-button'], {
            [styles['is-saved']]: saved
          })}
          onClick={handleSave}
          aria-label={saved ? 'Unsave property' : 'Save property'}
        >
          <span className={styles['text']}>{saved ? 'Unsave' : 'Save'}</span>
          <Icon
            use={saved ? 'heartfilled' : 'heart'}
            className={styles['icon']}
          />
        </button>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setShowShareModal(true);
          }}
          className={styles['share-link']}
          aria-label="Share property"
        >
          <span className={styles['text']}>Share</span>
          <Icon use="share" className={styles['icon']} />
        </a>
      </div>
      <Modal
        modalName="share"
        size="md"
        isOpen={showShareModal}
        onDismiss={() => setShowShareModal(false)}
        className={styles['share-modal']}
      >
        <ShareDialog
          url={`https://www.thearchco.com/properties/${property_ref}`}
          type="property"
          className={styles['share-dialog']}
        />
      </Modal>
    </div>
  );
};

PropertyTitleBar.displayName = 'PropertyTitleBar';

export default PropertyTitleBar;
