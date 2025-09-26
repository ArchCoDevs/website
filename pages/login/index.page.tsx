import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './styles.module.scss';
import BaseLayout from 'templates/base-layout';

import { sanityQuery, BaseQuery } from 'lib/helpers/sanity-query';

import Link from 'components/data-display/link';

import { Main } from 'components/layout/main';
import { Padding } from 'components/layout/padding';
import { Form } from 'components/forms/form';
import { Fieldset } from 'components/data-input/fieldset';
import { InputFactory } from 'components/factories/input-factory';
import { Button } from 'components/data-input/button';
import { ArrowLink } from 'components/navigation/arrow-link';
import PageLoader from 'partials/page-loader';
import { isValidCallbackUrl } from 'lib/helpers/isValidCallbackUrl';

export async function getStaticProps({ preview = false }) {
  const data = await sanityQuery({
    preview
  });

  return {
    props: data
  };
}

export default function SignIn({ globals, navigation }: BaseQuery) {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  let callbackUrl = (router.query.callbackUrl as string) || '/my-account';

  useEffect(() => {
    if (session && !isSubmitting) {
      const url = isValidCallbackUrl(callbackUrl) ? callbackUrl : '/my-account';

      router.push(url); // Redirect if session exists
    }
  }, [session, router, isSubmitting]);

  if (status === 'loading') {
    return <PageLoader />;
  }

  if (session) {
    return null; // Render nothing while redirecting
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidCallbackUrl(callbackUrl)) {
      console.warn(
        'Invalid callback URL detected, defaulting to my account page'
      );
      callbackUrl = '/my-account';
    }

    setIsSubmitting(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl
      });

      if (result?.error) {
        if (result.error === 'CredentialsSignin') {
          setError('Invalid email or password');
        } else {
          setError(result.error);
        }
      } else if (result?.url) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'login',
          authentication_method: 'email',
          user_id: email
        });
        router.push(result.url);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BaseLayout
      title={'Sign in to your account'}
      globals={globals}
      navigation={navigation}
      noFollow
      noIndex
    >
      <Main>
        <Padding vertical>
          <section className={styles['auth']}>
            <Form name="form" onSubmit={handleSubmit}>
              <Fieldset
                legend="Login to your account"
                className={styles['fieldset']}
              >
                <InputFactory
                  variant="email"
                  name="Email"
                  label="Email"
                  value={email}
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <InputFactory
                  variant="password"
                  name="Password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {error && <p className="error">{error}</p>}
                <div className={styles['form-actions']}>
                  <Link
                    href={`/register?callbackUrl=${encodeURIComponent(
                      callbackUrl
                    )}`}
                  >
                    <span className={styles['register-btn']}>Register</span>
                  </Link>
                  <Button
                    type="submit"
                    label="Sign In"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                    loadingIndicator="Wait..."
                  />
                </div>
              </Fieldset>
            </Form>

            <hr />
            <ArrowLink href="/forgot-password" label="Forgot Password?" />
          </section>
        </Padding>
      </Main>
    </BaseLayout>
  );
}
