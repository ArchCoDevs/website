import { useState, useEffect } from 'react';
import BaseLayout from 'templates/base-layout';
import { sanityClient } from 'lib/helpers/sanity-client';
import { Globals, Navigation } from 'lib/types/sanity.types';

import styles from './styles.module.scss';
import { FavouritesResponse } from 'lib/types/keystone.types';

import { Main } from 'components/layout/main';
import { Padding } from 'components/layout/padding';
import { Grid } from 'components/layout/grid';
import { PropertyCard } from 'components/data-display/property-card';
import { Button } from 'components/data-input/button';

import { Modal } from 'components/layout/modal';
import { DialogBox } from 'components/feedback/dialog-box';
import { getSession, signOut } from 'next-auth/react';
import { GetServerSideProps } from 'next/types';
import { fields, FormValues, schema } from './form-data';
import { FormFactory, FormData } from 'components/factories/form-factory';
import Link from 'components/data-display/link';
import PageLoader from 'partials/page-loader';
import createToast from 'lib/helpers/create-toast';

interface PageProps {
  globals: Globals;
  navigation: Navigation;
}

interface UserDetails {
  firstname: string;
  lastname: string;
  phone: string;
  username: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false
      }
    };
  }

  const client = sanityClient(false);
  const data = await client.fetch<PageProps>(`{
    "globals": *[_type == "globals"][0],
    "navigation": *[_type == "navigation"][0]
  }`);

  return {
    props: { session, ...data }
  };
};

const actions = [
  {
    id: 'submit',
    label: 'Update Details',
    type: 'submit',
    variant: 'tertiary',
    className: styles['submit']
  }
];

const formData = {
  fieldsets: [
    {
      fields
    }
  ],
  actions: actions
} as FormData;

export const MyAccount = ({ globals, navigation }: PageProps) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [favourites, setFavourites] = useState<FavouritesResponse | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formTouched, setFormTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: ''
  });
  const [defaultValues, setDefaultValues] = useState<FormValues | null>(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_PROXY}/User/GetUserDetails`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (!response.ok) throw new Error('Failed to fetch user data');
      const userData: UserDetails = await response.json();
      setDefaultValues({
        'first-name': userData.firstname,
        'last-name': userData.lastname,
        phone: userData.phone,
        username: userData.username
      });
      setUserDetails(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchFavourites = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_PROXY}/User/GetFavourites?PageSize=999999&PageNumber=1&OrderBy=date_added&OrderAscending=false`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (!response.ok) throw new Error('Failed to fetch favourites');
      const favouritesData: FavouritesResponse = await response.json();
      setFavourites(favouritesData);
    } catch (error) {
      console.error('Error fetching favourites:', error);
    }
  };

  useEffect(() => {
    Promise.all([fetchUserData(), fetchFavourites()]).finally(() =>
      setIsLoading(false)
    );
  }, []);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setFormTouched(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_PROXY}/User/Update`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            FirstName: data['first-name'],
            LastName: data['last-name'],
            Phone: data.phone,
            Username: data.username
          })
        }
      );

      const result = await response.json();

      if (result.success) {
        fetchUserData();
        setShowEditModal(false);
        setSubmitStatus({
          success: true,
          message: 'Details updated successfully'
        });
      } else {
        setSubmitStatus({
          success: false,
          message: result.display_message
        });
      }
    } catch (error) {
      console.log('Error updating user details:', error);
      setSubmitStatus({
        success: false,
        message: 'An error occurred. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onConfirmDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_PROXY}/User/Deactivate`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const result = await response.json();

      if (result.success) {
        console.log('Account deactivated successfully');
        setShowDeleteModal(false);
        setIsDeleted(true);
        await signOut({ redirect: false });
        createToast.success(
          'Account deleted successfully. You will be redirected to the homepage in 5 seconds.'
        );
        setTimeout(() => {
          window.location.href = '/';
        }, 5000);
      } else {
        console.error('Failed to deactivate account:', result.display_message);
      }
    } catch (error) {
      console.error('Error deactivating account:', error);
    }
  };

  const onToggleFavourite = async (
    rental_space_id: number,
    favourite: boolean
  ) => {
    try {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_API_PROXY}/User/Favourite?RentalSpaceId=${rental_space_id}&Add=${favourite}`,
        {
          method: 'POST'
        }
      );
      const response = await request.json();
      console.log('Response:', response);
      fetchFavourites();
    } catch (error) {
      console.error('Error toggling favourite:', error);
    }
  };

  if (isLoading) {
    return <PageLoader />;
  }

  if (isDeleted) {
    return (
      <BaseLayout
        title={'Account deleted'}
        globals={globals}
        navigation={navigation}
        noFollow
        noIndex
      >
        ;
        <Main>
          <Padding vertical>
            <h1 className="heading-large mb-2">Account deleted</h1>
            <p>Your account has been deleted successfully.</p>
            <p>
              You will be redirected to the homepage in 5 seconds. If you are
              not redirected, click{' '}
              <Link href="/" passHref className="link">
                <span>here</span>
              </Link>
              .
            </p>
          </Padding>
        </Main>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout
      title={'Manage your account'}
      globals={globals}
      navigation={navigation}
      preview={false}
      noFollow
      noIndex
    >
      <Main>
        <Padding vertical>
          <div className={styles['page-top']}>
            <h1 className="heading-large">My account</h1>
            <Link
              href="#"
              onClick={() => signOut()}
              passHref
              className={styles['sign-out-link']}
            >
              Sign out
            </Link>
          </div>
          {userDetails && (
            <Grid columns={1}>
              <Padding horizontal={false}>
                <h2 className="heading-medium mt-1">My details</h2>
                <div className={styles['my-details']}>
                  <p>
                    <strong>First name:</strong> {userDetails.firstname}
                  </p>
                  <p>
                    <strong>Last name:</strong> {userDetails.lastname}
                  </p>
                  <p>
                    <strong>Telephone:</strong>{' '}
                    {userDetails.phone || 'Not provided'}
                  </p>
                  <p>
                    <strong>Username:</strong> {userDetails.username}
                  </p>
                </div>
                <div className={styles['actions']}>
                  <Button
                    onClick={() => {
                      setShowEditModal(true);
                    }}
                  >
                    Edit my details
                  </Button>

                  <Button
                    variant="destroy"
                    onClick={() => {
                      setShowDeleteModal(true);
                    }}
                    className={styles['delete-account']}
                  >
                    Delete my account
                  </Button>
                  <Link
                    href="/forgot-password"
                    className={styles['reset-password-link']}
                  >
                    <span>Reset password</span>
                  </Link>
                </div>
              </Padding>
            </Grid>
          )}
          <Grid columns={1}>
            <h2 className="heading-medium">Saved properties</h2>
            {favourites && favourites.rental_space_model_list?.length > 0 ? (
              <Grid columns={3} as="ul" className={styles['property-list']}>
                {favourites.rental_space_model_list.map((property, index) => (
                  <li key={property.rental_space_id}>
                    <PropertyCard
                      key={index}
                      rental_space_id={property.rental_space_id}
                      favourite={property.favourite}
                      address={property.address}
                      onSavedChange={onToggleFavourite}
                      price_title={property.price_title}
                      reference={property.reference}
                      size_sq_ft={property.size_sq_ft || 0}
                      thumbnail={property.thumbnail}
                      use={property.use}
                    />
                  </li>
                ))}
              </Grid>
            ) : (
              <p>No saved properties found.</p>
            )}
          </Grid>
        </Padding>
      </Main>
      <Modal
        isAlert={false}
        modalName="Edit my details"
        onDismiss={() => {
          setShowEditModal(false);
        }}
        size="md"
        isOpen={showEditModal}
      >
        <div
          style={{
            padding: '16px'
          }}
        >
          <FormFactory
            name={'edit-details'}
            id={'edit-details'}
            formData={formData}
            schema={schema}
            defaultValues={defaultValues}
            onSubmit={(data) => {
              onSubmit(data as unknown as FormValues);
            }}
            className={styles['form']}
          />
          {formTouched && !isSubmitting && !submitStatus.success && (
            <p className={styles['error']}>
              {submitStatus.message ||
                'An error occurred. Please try again later.'}
            </p>
          )}
        </div>
      </Modal>
      <Modal
        isAlert
        modalName="Delete account"
        onDismiss={() => {
          setShowDeleteModal(false);
        }}
        size="md"
        isOpen={showDeleteModal}
      >
        <DialogBox
          confirmVariant="destroy"
          cancelVariant="secondary"
          confirmLabel="Yes, delete my account"
          cancelAction={() => {
            setShowDeleteModal(false);
          }}
          confirmAction={() => {
            onConfirmDelete();
          }}
          fitContainer
          title="Are you sure you want to delete your account?"
        />
      </Modal>
    </BaseLayout>
  );
};

export default MyAccount;
