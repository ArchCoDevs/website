import BaseLayout from 'templates/base-layout';
import { sanityQuery, BaseQuery } from 'lib/helpers/sanity-query';
import Main from 'components/layout/main';
import Padding from 'components/layout/padding';
import { FormFactory, FieldData } from 'components/factories/form-factory';
import ContactCard from 'components/data-display/contact-card';
import Grid from 'components/layout/grid';
import { FormEventHandler, useState, useRef, useEffect } from 'react';
import Icon from 'components/flourishes/icon';
import styles from './styles.module.scss';
import { fields, schema } from './form-data';
import config, { appConfig } from 'app-config';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import type { FormData } from 'components/factories/form-factory';
import createToast from 'lib/helpers/create-toast';
import ReCAPTCHA from 'react-google-recaptcha';
import PageLoader from 'partials/page-loader';
import Head from 'next/head';
import { getCookie } from 'scripts/getCookie';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  };
};

export async function getStaticProps({
  params,
  preview = false
}: GetStaticPropsContext) {
  const p_ref = params?.p_ref as string;

  // Perform server-side API call
  const submitStatus = { success: false, message: '' };

  // Return default form data including the hidden field for rental space reference
  const formData: FormData = {
    id: 'property-enquiry',
    name: 'property-enquiry',
    action: '/properties/[p_ref]/enquiry',
    fieldsets: [
      {
        fields: [
          ...(fields as FieldData[]),
          {
            id: 'RentalSpaceReference',
            name: 'RentalSpaceReference',
            type: 'hidden',
            label: 'Rental Space Reference',
            hideLabel: true,
            value: p_ref || ''
          }
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

  const data = await sanityQuery({
    preview: false
  });

  return {
    props: {
      ...data,
      formData,
      p_ref,
      submitStatus,
      preview
    },
    revalidate: appConfig.defaultRevalidationSeconds.propertyDetails
  };
}

export default function EnquiryForm({
  globals,
  navigation,
  formData,
  p_ref,
  submitStatus: initialSubmitStatus
}: BaseQuery & {
  formData: FormData;
  p_ref: string;
  submitStatus: { success: boolean; message: string };
}) {
  // Read gclid cookie synchronously during initial render
  const initialGclidValue =
    typeof window !== 'undefined' ? getCookie('gclid') : null;
  const [gclidValue, setGclidValue] = useState<string | null>(
    initialGclidValue
  );
  const [submitStatus, setSubmitStatus] = useState(initialSubmitStatus);
  const [formTouched, setFormTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // State for submission status
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const gclid = getCookie('gclid');
      console.log('gclid from cookie:', gclid);
      console.log('All cookies:', document.cookie);
      setGclidValue(gclid);
    }
  }, []);

  if (!formData) {
    return <PageLoader />;
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = async (data) => {
    setFormTouched(true);
    setIsSubmitting(true); // Set submitting state to true

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
          result.display_message || 'Enquiry sent successfully'
        );
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'An error occurred. Please try again later.'
      });
    } finally {
      setIsSubmitting(false); // Reset submitting state to false
      recaptchaRef.current?.reset(); // Reset the ReCAPTCHA
    }
  };

  const concatAddress = (address: {
    street: string;
    city: string;
    postcode: string;
  }): string => {
    const { street, city, postcode } = address;
    return `${street}, ${city}, ${postcode}`;
  };

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <BaseLayout
        title={`Property Enquiry: ${p_ref}`}
        globals={globals}
        navigation={navigation}
      >
        <Main>
          <Padding>
            <h1 className="heading-large">
              Interested in this property? <br /> Get in touch:
            </h1>
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
                  isSubmitting={isSubmitting} // Pass the submitting state
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
                address={concatAddress(config.contactDetails.address)}
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
