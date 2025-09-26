import { useRef, useState, useEffect } from 'react';
import BaseLayout from 'templates/base-layout';
import { sanityQuery, BaseQuery } from 'lib/helpers/sanity-query';
import Main from 'components/layout/main';
import Padding from 'components/layout/padding';
import { FormFactory, FormData } from 'components/factories/form-factory';
import ContactCard from 'components/data-display/contact-card';
import Grid from 'components/layout/grid';
import Breadcrumbs from 'components/navigation/breadcrumbs';
import styles from './styles.module.scss';
import { fields, schema } from './form-data';
import config from 'app-config';
import { createToast } from 'lib/helpers/create-toast';
import ReCAPTCHA from 'react-google-recaptcha'; // Import ReCaptcha
import { getCookie } from 'scripts/getCookie';

export async function getStaticProps({ preview = false }) {
  // Fetch global data and other required data
  const data = await sanityQuery({
    preview
  });

  return {
    props: {
      ...data
    }
  };
}

const actions = [
  {
    id: 'submit',
    label: 'Send Enquiry',
    type: 'submit',
    variant: 'tertiary',
    className: styles['submit']
  }
];

export default function ContactUs({ globals, navigation }: BaseQuery) {
  // Read gclid cookie synchronously during initial render
  const initialGclidValue =
    typeof window !== 'undefined' ? getCookie('gclid') : null;
  const [gclidValue, setGclidValue] = useState<string | null>(
    initialGclidValue
  );
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: ''
  });
  const [referrer, setReferrer] = useState('');
  const [formTouched, setFormTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null); // Set up the ReCaptcha reference

  const formData = {
    fieldsets: [
      {
        fields: [
          ...fields,
          {
            id: 'referrer',
            name: 'referrer',
            type: 'hidden',
            value: referrer
          }
        ]
      }
    ],
    actions: actions
  } as FormData;

  useEffect(() => {
    setReferrer(document.referrer || '');
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const gclid = getCookie('gclid');
      setGclidValue(gclid);
    }
  }, []);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (data) => {
    setFormTouched(true);
    setIsSubmitting(true);

    try {
      recaptchaRef.current?.reset();
      const token = await recaptchaRef.current?.executeAsync();

      if (!token) {
        setSubmitStatus({
          success: false,
          message: 'Error getting reCAPTCHA token'
        });
        setIsSubmitting(false);
        return;
      }

      const payload = {
        ...data,
        referrer,
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
        message: result.message
      });
      createToast.success(result.message || 'Enquiry sent successfully');
    } catch (error) {
      console.error('An error occurred:', error);
      setSubmitStatus({
        success: false,
        message: 'An error occurred. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
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
    <BaseLayout title={'Contact Us'} globals={globals} navigation={navigation}>
      <Breadcrumbs
        breadcrumbs={[{ label: 'Contact Us', href: '/contact-us' }]}
      />
      <Main>
        <Padding vertical>
          <h1 className={styles['heading-large']}>Contact Us</h1>
          <Grid columns={2} columnSizes="2:1">
            <div>
              <FormFactory
                name={'contact-us'}
                id={'contact-us'}
                formData={formData}
                schema={schema}
                onSubmit={onSubmit}
                isSubmitting={isSubmitting} // Pass the isSubmitting state to FormFactory
                className={styles['form']}
                defaultValues={{
                  gclid: gclidValue || ''
                }}
              />
              <ReCAPTCHA
                ref={recaptchaRef} // Set the reference
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''} // Use the site key from environment variables
                size="invisible" // Make it invisible, so it triggers on form submission
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
  );
}
