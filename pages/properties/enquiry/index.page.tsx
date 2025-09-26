import BaseLayout from 'templates/base-layout';
import { sanityQuery, BaseQuery } from 'lib/helpers/sanity-query';
import Main from 'components/layout/main';
import Padding from 'components/layout/padding';
import { FormFactory, FieldData } from 'components/factories/form-factory';
import ContactCard from 'components/data-display/contact-card';
import Grid from 'components/layout/grid';
import { FormEventHandler, useState, useRef, useMemo, useEffect } from 'react';
import Icon from 'components/flourishes/icon';
import styles from './styles.module.scss';
import { fields, schema } from './form-data';
import config from 'app-config';
import { GetServerSidePropsContext } from 'next';
import type { FormData } from 'components/factories/form-factory';
import createToast from 'lib/helpers/create-toast';
import ReCAPTCHA from 'react-google-recaptcha';
import PageLoader from 'partials/page-loader';
import Head from 'next/head';
import Link from 'next/link';
import Button from 'components/data-input/button';
import { getCookie } from 'scripts/getCookie';

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const properties = query.properties as string | undefined;

  // Perform server-side API call
  const submitStatus = { success: false, message: '' };

  // Return default form data including the hidden field for rental space reference
  const data = await sanityQuery({
    preview: false
  });

  return {
    props: {
      ...data,
      properties: properties || '',
      submitStatus
    }
  };
}

export default function EnquiryForm({
  globals,
  navigation,
  properties,
  submitStatus: initialSubmitStatus
}: BaseQuery & {
  properties: string;
  submitStatus: { success: boolean; message: string };
}) {
  const [submitStatus, setSubmitStatus] = useState(initialSubmitStatus);
  const [formTouched, setFormTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialGclidValue =
    typeof window !== 'undefined' ? getCookie('gclid') : null;
  const [gclidValue, setGclidValue] = useState<string | null>(
    initialGclidValue
  );
  const [enquiryList, setEnquiryList] = useState<string[]>(
    properties ? properties.split(',') : []
  );
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('useEffect running, checking for gclid cookie...');
      const gclid = getCookie('gclid');
      console.log('gclid from cookie:', gclid);
      console.log('All cookies:', document.cookie);
      setGclidValue(gclid);
    }
  }, []);

  // Rebuild the form data dynamically based on enquiryList changes
  const formData: FormData = useMemo(() => {
    console.log('Building formData with gclidValue:', gclidValue);
    console.log('enquiryList:', enquiryList);
    console.log('fields:', fields);

    const updatedFields = (fields as FieldData[]).map((field) => {
      if (field.name === 'gclid') {
        return {
          ...field,
          value: gclidValue || ''
        };
      }
      return field;
    });

    return {
      id: 'property-enquiry',
      name: 'property-enquiry',
      action: '/properties/enquiry',
      fieldsets: [
        {
          fields: [
            ...updatedFields,
            ...(enquiryList.length > 0
              ? [
                  {
                    id: 'RentalSpaceReference',
                    name: 'RentalSpaceReference',
                    type: 'hidden',
                    label: 'Rental Space Reference',
                    hideLabel: true,
                    value: enquiryList.join(',')
                  }
                ]
              : [])
          ]
        }
      ],
      actions: [
        {
          id: 'submit',
          label: 'Send Enquiry',
          type: 'submit',
          variant: 'tertiary',
          className: styles['submit']
        }
      ]
    };
  }, [enquiryList, fields, gclidValue]);

  // Debug: log the final formData fields
  useEffect(() => {
    if (formData) {
      console.log('Final formData fields:', formData.fieldsets[0]?.fields);
    }
  }, [formData]);

  if (!formData) {
    return <PageLoader />;
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = async (data) => {
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
        RecaptchaToken: token,
        ...(gclidValue && { gclid: gclidValue })
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ROOT}/enquiry-proxy`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
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
          result.display_message || 'Enquiry sent successfully'
        );
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'An error occurred. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
      recaptchaRef.current?.reset();
    }
  };

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <BaseLayout
        title={`Property Enquiry: ${enquiryList.join(', ')}`}
        globals={globals}
        navigation={navigation}
      >
        <Main>
          <Padding>
            <h1 className="heading-large mt-2">
              Enquire about{' '}
              {enquiryList.length > 1 ? 'these properties' : 'this property'}?
            </h1>
            {enquiryList.length > 0 ? (
              <ul className={styles['enquiry-list']}>
                {enquiryList.map((property, index) => (
                  <li key={index}>
                    <Link href={`/properties/${property}`}>{property}</Link>
                    <Button
                      hideLabel
                      icon="delete"
                      label="remove"
                      onClick={() =>
                        setEnquiryList((list) =>
                          list.filter((item) => item !== property)
                        )
                      }
                      small
                      variant="destroy"
                      className={styles['btn-remove']}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <div className={styles['no-properties']}>
                <p>
                  No properties selected for enquiry. This will just be a
                  general enquiry.
                </p>
                <p>
                  Try <Link href="/properties">searching for properties</Link>{' '}
                </p>
              </div>
            )}

            <span className={styles['speak-to-agent']}>
              Talk to us:{' '}
              <a href={`tel:${config.contactDetails.tel}`}>
                <Icon use="phone" />
                {config.contactDetails.tel}
              </a>
            </span>
            <Grid columns={2} columnSizes="2:1">
              <div>
                <FormFactory
                  name="property-enquiry"
                  id="property-enquiry"
                  formData={formData}
                  schema={schema}
                  onSubmit={onSubmit}
                  isSubmitting={isSubmitting}
                  className={styles['form']}
                  defaultValues={{
                    gclid: gclidValue || ''
                  }}
                />
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                  size="invisible"
                />
                {formTouched && !isSubmitting && !submitStatus.success && (
                  <p className={styles['error-message']}>
                    {submitStatus.message ||
                      'An error occurred. Please try again later.'}
                  </p>
                )}
              </div>
              <ContactCard
                address={`${config.contactDetails.address.street}, ${config.contactDetails.address.city}, ${config.contactDetails.address.postcode}`}
                email={config.contactDetails.email}
                registrationNo={config.businessRegistrationNumber}
                tel={config.contactDetails.tel}
              />
            </Grid>
          </Padding>
        </Main>
      </BaseLayout>
    </>
  );
}
