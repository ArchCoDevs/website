import React, { useRef, useState } from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';
import { PortableTextBlock } from 'next-sanity';

import RichText from '../rich-text';
import PropertyEnquiry from 'components/forms/property-enquiry';
import ReCAPTCHA from 'react-google-recaptcha';
import createToast from 'lib/helpers/create-toast';

import config from 'app-config';

const cx = classNames.bind(styles);

export interface Props extends React.ComponentProps<'div'> {
  /**
   * The Rich text to display
   */
  richText: PortableTextBlock[];
  /**
   * Swap the image and text sides
   */
  swapSides?: boolean;
  /**
   * Form header text (optional)
   */
  formHeading?: string;
  /**
   * The Rental Space Reference
   */
  rentalSpaceReference?: string;
}

const initialSubmitStatus = {
  success: false,
  message: ''
};

/**
 * The Rich Text and Form component displays a rich text block and the property enquiry form.
 */
export const RichTextAndForm: React.FC<Props> = ({
  className,
  richText,
  swapSides,
  formHeading,
  rentalSpaceReference,
  ...props
}: Props) => {
  const [formTouched, setFormTouched] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(initialSubmitStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null); // Add ReCAPTCHA ref

  const handleSubmit = async (data: any) => {
    setFormTouched(true);
    setIsSubmitting(true);

    try {
      recaptchaRef.current?.reset();
      const token = await recaptchaRef.current?.executeAsync();

      if (!token) {
        setSubmitStatus({
          success: false,
          message: 'Error obtaining reCAPTCHA token. Please try again.'
        });
        setIsSubmitting(false);
        return;
      }

      const payload = {
        ...data,
        RecaptchaToken: token
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ROOT}/enquiry-proxy`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }
      );

      const result = await response.json();
      setSubmitStatus({
        success: result.success,
        message: result.display_message
      });
      if (result.success) {
        createToast.success(
          submitStatus.message || 'Enquiry sent successfully'
        );
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setSubmitStatus({
        success: false,
        message: 'An error occurred. Please try again later.'
      });
    } finally {
      setIsSubmitting(false); // Reset submitting state to false
      recaptchaRef.current?.reset(); // Reset the ReCAPTCHA
    }
  };
  return (
    <div
      className={cx(
        styles['rich-text-and-form'],
        {
          [styles['swap-sides']]: swapSides
        },
        className
      )}
      {...props}
    >
      <RichText richText={richText} className={styles['rich-text']} />
      {submitStatus.success ? (
        <div className={styles['form']}>
          <p className={styles['success-message']}>
            <strong>Thank you for your enquiry.</strong> <br />
            <br /> A member of our enquiries team will be in touch with you
            shortly
          </p>
        </div>
      ) : (
        <div className={styles['form']}>
          <PropertyEnquiry
            heading={formHeading || 'Interested in a property? Get in touch:'}
            onSubmit={handleSubmit} // Use the handleSubmit method here
            isSubmitting={isSubmitting} // Pass the submitting state
            tel={config.contactDetails.tel}
            propertyRef={rentalSpaceReference || ''}
            errorMessage={
              formTouched && !submitStatus.success
                ? submitStatus.message ||
                  'An error occurred. Please try again later.'
                : ''
            }
          />
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
            size="invisible"
          />
        </div>
      )}
    </div>
  );
};

export default RichTextAndForm;
