import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import BaseLayout from 'templates/base-layout';
import { sanityQuery, BaseQuery } from 'lib/helpers/sanity-query';
import { useSession } from 'next-auth/react';

import { Main } from 'components/layout/main';
import { Padding } from 'components/layout/padding';
import { Form } from 'components/forms/form';
import { Fieldset } from 'components/data-input/fieldset';
import { InputFactory } from 'components/factories/input-factory';
import { Button } from 'components/data-input/button';
import { ArrowLink } from 'components/navigation/arrow-link';
import PageLoader from 'partials/page-loader';
import { useRouter } from 'next/router';
import Link from 'components/data-display/link';

export async function getStaticProps({ preview = false }) {
  const data = await sanityQuery({
    preview
  });

  return {
    props: data
  };
}

export default function ResetPassword({ globals, navigation }: BaseQuery) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetCode, setResetCode] = useState('');

  useEffect(() => {
    const params = router.query;
    const code = params?.code as string;

    if (!session && code !== '') {
      setResetCode(code);
    } else {
      router.push('/');
    }
  }, [session, router]);

  if (status === 'loading') {
    return <PageLoader />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    if (password1 !== password2) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    const body = {
      password1,
      resetCode
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ROOT}/auth/updatePassword`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setError(data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BaseLayout
      title={'Reset Password'}
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
                legend="Reset your password"
                className={styles['fieldset']}
              >
                <p className={styles['password-note']}>
                  <strong>Note:</strong> Passwords must be at least 8 characters
                  long and contain a lowercase letter, an uppercase letter, a
                  number, and a special character.
                </p>
                <InputFactory
                  variant="text"
                  name="Password1"
                  label="Enter your new password"
                  value={password1}
                  type="password"
                  id="password1"
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$"
                  onChange={(e) => setPassword1(e.target.value)}
                  required
                />
                <InputFactory
                  variant="text"
                  name="Password2"
                  label="Confirm your new password"
                  value={password2}
                  type="password"
                  id="password2"
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$"
                  onChange={(e) => setPassword2(e.target.value)}
                  required
                />
                <InputFactory
                  label="Reset Code"
                  id="resetCode"
                  name="resetCode"
                  variant="text"
                  hidden
                  readOnly
                  value={resetCode}
                />
                {error && <p className={styles['error']}>{error}</p>}
                {message && (
                  <p className={styles['success']}>
                    {message}
                    <br />
                    <Link href="/login" className="db link mt-1">
                      Login
                    </Link>
                  </p>
                )}
                <div className={styles['actions']}>
                  <Button
                    type="button"
                    label="Cancel"
                    variant="secondary"
                    onClick={() => router.push('/')}
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    label="Reset Password"
                    disabled={isLoading}
                    isLoading={isLoading}
                    loadingIndicator="Wait..."
                  />
                </div>
              </Fieldset>
            </Form>

            <hr />

            <ArrowLink reverse href="/login" label="Back to Sign In" />
          </section>
        </Padding>
      </Main>
    </BaseLayout>
  );
}
