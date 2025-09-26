import { useState } from 'react';
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

export async function getStaticProps({ preview = false }) {
  const data = await sanityQuery({
    preview
  });

  return {
    props: data
  };
}

export default function ForgotPassword({ globals, navigation }: BaseQuery) {
  const { status } = useSession();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (status === 'loading') {
    return <PageLoader />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ROOT}/auth/resetPassword`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
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
                {error && <p className={styles['error']}>{error}</p>}
                {message && <p className={styles['success']}>{message}</p>}
                <Button
                  type="submit"
                  label="Reset Password"
                  isLoading={isLoading}
                  disabled={isLoading}
                  loadingIndicator="Wait..."
                />
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
