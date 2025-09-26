import { FormFactory, FormData } from 'components/factories/form-factory';
import { useEffect, useState } from 'react';

import { fields, schema } from './form-data';

import styles from './styles.module.scss';
import Icon from 'components/flourishes/icon';
import { getCookie } from 'scripts/getCookie';

/** Import custom types */
export interface Props extends React.ComponentProps<'form'> {
  /**
   * The forms header text
   */
  heading?: string;
  /**
   * The name of the PropertyEnquiry
   * @default 'PropertyEnquiry'
   */
  name?: string;
  /**
   * The id of the PropertyEnquiry
   * @default 'PropertyEnquiry'
   */
  id?: string;
  /**
   * The property reference number
   */
  propertyRef?: string;
  /**
   * The telephone number to call
   */
  tel: string;
  /**
   * The callback to call when the form is submitted
   */
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  /**
   * The isSubmitting flag
   */
  isSubmitting?: boolean;
  /**
   * The post was unsuccessful
   */
  errorMessage?: string;
  /**
   * The post was successful
   */
  successMessage?: string;
  /**
   * A HTTP referrer to pass to the form (optional)
   */
  referrer?: string;
}

/**
 * The `PropertyEnquiry` component is a form that puts users in touch with an agent.
 */
export const PropertyEnquiry: React.FC<Props> = ({
  heading = 'Interested in this property? Get in touch:',
  name = 'property-enquiry-form',
  id = 'property-enquiry-form',
  propertyRef,
  tel,
  onSubmit,
  isSubmitting,
  errorMessage,
  successMessage,
  referrer,
  ...props
}) => {
  // Read gclid cookie synchronously during initial render
  const initialGclidValue =
    typeof window !== 'undefined' ? getCookie('gclid') : null;
  const [gclidValue, setGclidValue] = useState<string | null>(
    initialGclidValue
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const gclid = getCookie('gclid');
      console.log('gclid from cookie:', gclid);
      console.log('All cookies:', document.cookie);
      setGclidValue(gclid);
    }
  }, []);

  const actions = [
    {
      id: 'submit',
      label: 'Send',
      type: 'submit',
      variant: 'tertiary',
      className: styles['submit']
    }
  ];

  const formData = {
    fieldsets: [
      {
        fields: [
          ...fields,
          ...(propertyRef
            ? [
                {
                  id: 'RentalSpaceReference',
                  name: 'RentalSpaceReference',
                  value: propertyRef,
                  hidden: true
                }
              ]
            : []),
          ...(referrer
            ? [
                {
                  id: 'Referrer',
                  name: 'Referrer',
                  value: referrer,
                  hidden: true
                }
              ]
            : [])
        ]
      }
    ],
    actions
  } as FormData;

  return (
    <div className={styles['property-enquiry-form']}>
      <h3 className={styles['heading']}>{heading}</h3>
      <span className={styles['cta']}>
        Talk to us
        <a href={`tel:${tel}`}>
          <Icon use="phone" /> {tel}
        </a>
      </span>
      <FormFactory
        {...props}
        name={name}
        id={id}
        formData={formData}
        schema={schema}
        onSubmit={(e) => {
          onSubmit(e);
        }}
        isSubmitting={isSubmitting}
        className={styles['form']}
        defaultValues={{
          gclid: gclidValue || ''
        }}
      />
      {!isSubmitting && errorMessage && (
        <p className={styles['error-message']}>{errorMessage}</p>
      )}
      {!isSubmitting && successMessage && (
        <p className={styles['success-message']}>{successMessage}</p>
      )}
    </div>
  );
};

PropertyEnquiry.displayName = 'PropertyEnquiry';

export default PropertyEnquiry;
