import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

/* Components */
import Button from 'components/data-input/button';
import Tooltip from 'components/feedback/tooltip';
import Icon from 'components/flourishes/icon';
import Label from 'components/data-input/label';
import Text from 'components/data-input/text';

const cx = classNames.bind(styles);

import WhatsAppLogo from './images/whatsapp-logo';
import PinterestLogo from './images/pinterest-logo';
import FacebookLogo from './images/facebook-logo';
import TwitterLogo from './images/twitter-logo';

export interface Props extends React.ComponentProps<'div'> {
  /**
   * The url to share
   */
  url: string;
  /**
   * What type of content is being shared
   * @default 'page'
   */
  type?: 'page' | 'property' | 'post';
}

/**
 * The ShareDialog component enables sharing a URL via a copy-to-clipboard action.
 */
export const ShareDialog: React.FC<Props> = ({
  className,
  type = 'page',
  url,
  ...props
}: Props) => {
  const [buttonText, setButtonText] = useState('Copy');

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setButtonText('Copied!');
      setTimeout(() => {
        setButtonText('Copy');
      }, 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={cx(styles['share-dialog'], className)} {...props}>
      <div className={styles['inner']}>
        <Label text={`Share this ${type} with others:`} id="share">
          <Text name="share" value={url} readOnly />
        </Label>
        <Button
          variant="tertiary"
          shape="squared"
          className={styles['button']}
          onClick={handleCopyClick}
        >
          {buttonText}
        </Button>
      </div>
      <div className={styles['social-media']}>
        <span>Or share via:</span>
        <a
          href={`https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
            url
          )}&description=Take a look at this great property!`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Pinterest"
        >
          <Tooltip content="Share on Pinterest" placement="bottom">
            <PinterestLogo />
          </Tooltip>
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
        >
          <Tooltip content="Share on Facebook" placement="bottom">
            <FacebookLogo />
          </Tooltip>
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
            url
          )}&text=Take a look at this great property!`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Twitter"
        >
          <Tooltip content="Share on Twitter" placement="bottom">
            <TwitterLogo />
          </Tooltip>
        </a>
        <a
          href={`https://wa.me/?text=Take a look at this great property! ${encodeURIComponent(
            url
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on WhatsApp"
        >
          <Tooltip content="Share on WhatsApp" placement="bottom">
            <WhatsAppLogo />
          </Tooltip>
        </a>
        <a
          href={`mailto:?subject=Check out this property!&body=${url}`}
          aria-label="Share via email"
        >
          <Tooltip content="Share via email" placement="bottom">
            <Icon use="email" />
          </Tooltip>
        </a>
      </div>
    </div>
  );
};

export default ShareDialog;
