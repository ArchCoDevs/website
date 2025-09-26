import { Suspense, useState, useRef, useEffect } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';

import type { PropertyDetails as TPropertyDetails } from 'lib/types/property-details';
import {
  PropertyDetails as PropertyDetailsType,
  PropertiesCta as PropertiesCTAType
} from 'lib/types/sanity.types';
import BaseLayout from 'templates/base-layout';
import { sanityQuery, BaseQuery } from 'lib/helpers/sanity-query';

import config, { appConfig } from 'app-config';

import { PageError } from 'partials/page-error';
import styles from './styles.module.scss';
import PropertyCardSkeleton from 'components/data-display/property-card/skeleton';
import { useSession } from 'next-auth/react';
import { toggleFavourite } from 'lib/helpers/toggle-favourite';

import { Main } from 'components/layout/main';
import { Padding } from 'components/layout/padding';
import { PhotoGallery } from 'components/data-display/photo-gallery';
import { PropertyTitleBar } from 'components/data-display/property-title-bar';
import { PropertyMetaBar } from 'components/data-display/property-meta-bar';
import { CostBreakdown } from 'components/data-display/cost-breakdown';
import { PropertyEnquiry } from 'components/forms/property-enquiry';
import { Map } from 'components/data-display/map';
import { Grid } from 'components/layout/grid';
import { PropertyCard } from 'components/data-display/property-card';
import { RichText } from 'components/data-display/rich-text';
import PropertiesCta from 'components/data-display/properties-cta';
import createToast from 'lib/helpers/create-toast';
import ReCAPTCHA from 'react-google-recaptcha';
import Link from 'components/data-display/link';
import Icon from 'components/flourishes/icon';

// Feature flags
// const FF_FLEX_LEASE = process.env.NEXT_PUBLIC_FF_FLEX_LEASE === 'true';

export interface Props extends BaseQuery {
  propertyData: TPropertyDetails | null;
  propertyDetails: PropertyDetailsType | null;
  propertiesCta: PropertiesCTAType;
  preview: boolean;
  notFound: boolean;
  initialSubmitStatus: {
    success: boolean;
    message: string;
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const p_ref = params?.p_ref as string;

  // Fetch site configuration from Sanity
  const data = await sanityQuery({
    preview: false,
    query: `
      "propertyDetails": *[_type == "propertyDetails"][0],
      "propertiesCta": *[_type == "propertiesCta"][0]
    `
  });

  const apiUrl = `${
    process.env.KEYSTONE_API_URL
  }/RentalSpace/GetFullDetail?Reference=${encodeURIComponent(p_ref)}`;
  const PropertyDataResponse = await fetch(apiUrl, {
    headers: {
      Token: `${process.env.SERVICE_ACCOUNT_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });

  if (!PropertyDataResponse.ok) {
    console.error('Failed to fetch Property data');
    console.error(await PropertyDataResponse.text());
    return {
      props: {
        ...data,
        propertyData: null,
        globals: null,
        propertyDetails: null,
        preview: false,
        notFound: true,
        initialSubmitStatus: {
          success: false,
          message: ''
        }
      },
      revalidate: appConfig.defaultRevalidationSeconds.propertyDetails
    };
  }
  const propertyData: TPropertyDetails = await PropertyDataResponse.json();

  // Set the initial submit status to an empty state
  const initialSubmitStatus = {
    success: false,
    message: ''
  };

  return {
    props: {
      ...data,
      propertyData,
      preview: params?.preview === 'true',
      notFound: false,
      initialSubmitStatus
    },
    revalidate: 10800 // 3 hours
  };
};

export const PropertyDetails = ({
  propertyData,
  propertiesCta,
  globals,
  navigation,
  propertyDetails,
  notFound,
  initialSubmitStatus
}: Props) => {
  const session = useSession();
  const [formTouched, setFormTouched] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(initialSubmitStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referrer, setReferrer] = useState('');
  const recaptchaRef = useRef<ReCAPTCHA>(null); // Add ReCAPTCHA ref
  const onToggleFavourite = toggleFavourite(session);

  useEffect(() => {
    if (propertyData) {
      console.log(`propertyData ${propertyData.reference}`, propertyData);
    }
  }, [propertyData]);

  useEffect(() => {
    const storedReferrer = sessionStorage.getItem('prevPage');
    setReferrer(storedReferrer || '');
  }, []);

  if (notFound || !propertyData || Object.keys(propertyData).length === 0) {
    return (
      <BaseLayout
        title="Property not found"
        globals={globals}
        navigation={navigation}
      >
        <PageError
          message="We cannot find any available properties that match these details"
          propertySearch
          referrer={{
            title: 'Property Search',
            href: '/properties'
          }}
        />
        <PropertiesCta
          title={propertiesCta.title}
          content={propertiesCta.content}
          ctaLink={propertiesCta.ctaLink}
        />
      </BaseLayout>
    );
  }

  const {
    address,
    reference,
    price_per_month,
    supporting_image_list,
    feature_list,
    use,
    similar_rental_spaces,
    size_sq_ft,
    size_sq_mt,
    service_charge,
    energy_rating,
    deposit,
    business_rates,
    insurance,
    travel_time_list,
    favourite,
    brochure_url,
    is_service_fee,
    is_flex_lease
  } = propertyData;

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
        referrer,
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
    <BaseLayout title={address} globals={globals} navigation={navigation}>
      <Main>
        <Padding vertical>
          <section className={styles['section']}>
            <PropertyTitleBar
              rental_space_id={propertyData.rental_space_id}
              address={address}
              property_ref={reference}
              price_per_month={price_per_month}
              isSaved={favourite}
              onSavedChange={onToggleFavourite}
            />
          </section>
          <PhotoGallery images={supporting_image_list} />
          {is_flex_lease && (
            <div className={styles['flex-lease-bar']}>
              <p>
                <Icon use="star" /> Flexible lease available
              </p>
            </div>
          )}
          <section className={styles['section']}>
            <PropertyMetaBar
              use={use}
              size_sqft={size_sq_ft}
              size_sqm={size_sq_mt}
              brochureLink={brochure_url}
            />
          </section>
          <section className={styles['section-border']}>
            <h2 className={styles['title']}>Property Details</h2>
            <ul className={styles['list']}>
              <li>
                <h3>Reference code</h3>
                <p>{reference}</p>
              </li>
              <li>
                <h3>Energy Rating</h3>
                <p>{energy_rating}</p>
              </li>
              <li>
                <h3>Deposit</h3>
                <p>{deposit}</p>
              </li>
            </ul>
          </section>
          <Grid columns={2} className={styles['grid']}>
            <section className={styles['section']}>
              <CostBreakdown
                pricePerMonth={price_per_month}
                businessRates={business_rates}
                serviceCharge={service_charge}
                insurance={insurance}
                vatRate={config.currentVatRate}
                showMonthly={true}
                isServiceFee={is_service_fee}
              />
            </section>
            <section className={styles['section']}>
              <PropertyEnquiry
                propertyRef={reference}
                onSubmit={handleSubmit} // Use the handleSubmit method here
                isSubmitting={isSubmitting} // Pass the submitting state
                tel={config.contactDetails.tel}
                referrer={referrer}
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
            </section>
          </Grid>
          {propertyData?.feature_list?.length > 0 && (
            <section className={styles['section-border']}>
              <h2 className={styles['title']}>Key Features</h2>
              <ul className={styles['grid-list']}>
                {feature_list?.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </section>
          )}
          <hr className={styles['hr']} />
          {(propertyData?.travel_time_list?.length > 0 ||
            propertyData?.whatthreewords) && (
            <section className={styles['section-border']}>
              <h2 className={styles['title']}>Location</h2>
              {propertyData?.whatthreewords && (
                <p>
                  <Link
                    href={`https://what3words.com/${encodeURIComponent(
                      propertyData.whatthreewords
                    )}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link"
                  >
                    {`///${propertyData.whatthreewords}`}
                  </Link>
                </p>
              )}
              {propertyData?.travel_time_list?.length > 0 && (
                <ul
                  className={`${styles['list']} ${
                    travel_time_list?.length < 3 && styles['short-list']
                  }`}
                >
                  {travel_time_list?.map((item) => (
                    <li key={`${item.location}-${item.journey_length}`}>
                      <h3>
                        {item.journey_length} ({item.journey_type})
                      </h3>
                      <p>{item.location}</p>
                    </li>
                  ))}
                </ul>
              )}
              <div className={styles['map']}>
                <Map properties={[propertyData]} disableAutoBounds />
              </div>
            </section>
          )}
          {propertyDetails && (
            <RichText className={styles['section']}>
              <h2>Terms</h2>
              <p>{propertyDetails?.terms}</p>
              <h2>Why choose us?</h2>
              <p>{propertyDetails?.why_us}</p>
              <Grid columns={3} className={styles['grid']}>
                <div>
                  <h3>{propertyDetails?.reasons_list?.reason1_title}</h3>
                  <p>{propertyDetails?.reasons_list?.reason1_description}</p>
                </div>
                <div>
                  <h3>{propertyDetails?.reasons_list?.reason2_title}</h3>
                  <p>{propertyDetails?.reasons_list?.reason2_description}</p>
                </div>
                <div>
                  <h3>{propertyDetails?.reasons_list?.reason3_title}</h3>
                  <p>{propertyDetails?.reasons_list?.reason3_description}</p>
                </div>
              </Grid>
            </RichText>
          )}
          <hr className={styles['hr']} />
          <section className={styles['section']}>
            <h2 className={styles['title']}>Similar properties</h2>
            {!similar_rental_spaces || similar_rental_spaces?.length === 0 ? (
              <p>No similar properties found</p>
            ) : (
              <Grid
                columns={similar_rental_spaces?.length}
                className={styles['grid']}
              >
                {similar_rental_spaces?.map((similarProperty) => (
                  <Suspense
                    key={similarProperty.rental_space_id}
                    fallback={<PropertyCardSkeleton />}
                  >
                    <PropertyCard
                      rental_space_id={similarProperty.rental_space_id}
                      address={similarProperty.address}
                      price_title={similarProperty.price_title}
                      thumbnail={similarProperty.thumbnail}
                      use={similarProperty.use}
                      size_sq_ft={similarProperty.size_sq_ft}
                      reference={similarProperty.reference}
                      tag={similarProperty.tag}
                      favourite={similarProperty.favourite}
                      onSavedChange={onToggleFavourite}
                    />
                  </Suspense>
                ))}
              </Grid>
            )}
          </section>
        </Padding>
      </Main>
    </BaseLayout>
  );
};

export default PropertyDetails;
