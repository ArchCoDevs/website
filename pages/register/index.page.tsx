import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import styles from './styles.module.scss';
import BaseLayout from 'templates/base-layout';
import { sanityQuery, BaseQuery } from 'lib/helpers/sanity-query';

import { signIn, useSession } from 'next-auth/react';
import Link from 'components/data-display/link';

import { Main } from 'components/layout/main';
import { Padding } from 'components/layout/padding';
import { Form } from 'components/forms/form';
import { Fieldset } from 'components/data-input/fieldset';
import { InputFactory } from 'components/factories/input-factory';
import { Button } from 'components/data-input/button';
import PageLoader from 'partials/page-loader';
import { isValidCallbackUrl } from 'lib/helpers/isValidCallbackUrl';
import ReCAPTCHA from 'react-google-recaptcha';
import AlertBanner from 'components/feedback/alert-banner';

interface PageProps extends BaseQuery {}

export async function getStaticProps({ preview = false }) {
  const data = await sanityQuery({
    preview
  });

  return {
    props: data
  };
}

export default function SignUp({ globals, navigation }: PageProps) {
  const { status } = useSession();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const callbackUrl = (router.query.callbackUrl as string) || '/my-account';
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        router.push(
          isValidCallbackUrl(callbackUrl) ? callbackUrl : '/my-account'
        );
      }, 4000);

      return () => clearTimeout(timer);
    } else {
      setIsSuccess(false);
      return;
    }
  }, [isSuccess, callbackUrl, router]);

  if (status === 'loading') {
    return <PageLoader />;
  }

  const handleClick = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setIsSubmitting(true);

    try {
      recaptchaRef.current?.reset();
      const token = await recaptchaRef.current?.executeAsync();

      if (!token) {
        setError('Error getting reCAPTCHA token');
        return;
      }

      const userData = {
        FirstName: firstName,
        LastName: lastName,
        Password: password,
        Phone: phone,
        Username: email,
        RecaptchaToken: token
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ROOT}/auth/signup`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        }
      );

      if (res.ok) {
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
          callbackUrl: isValidCallbackUrl(callbackUrl)
            ? callbackUrl
            : '/my-account'
        });

        if (result?.error) {
          setError(result.error);
        } else if (result?.url) {
          setIsSuccess(true);
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'registration',
            authentication_method: 'email',
            user_id: email
          });
        }
      } else {
        const data = await res.json();
        console.error('An error occurred:', data);
        setError(data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred. Please try again.');
    } finally {
      recaptchaRef.current?.reset(); // reset the captcha after submission
      setIsSubmitting(false);
    }
  };

  return (
    <BaseLayout title={'Sign Up'} globals={globals} navigation={navigation}>
      <Main>
        <Padding vertical>
          <section className={styles['auth']}>
            {isSuccess ? (
              <AlertBanner type="success" title="Success">
                <p>
                  Your account has been created. You will be redirected shortly.
                  <Link
                    href={isValidCallbackUrl(callbackUrl) ? callbackUrl : '/'}
                  >
                    <span>Click here to be redirected now.</span>
                  </Link>{' '}
                </p>
              </AlertBanner>
            ) : (
              <Form name="form" onSubmit={handleClick}>
                <Fieldset legend="Sign Up" className={styles['fieldset']}>
                  <div className={styles['input-container']}>
                    <InputFactory
                      variant="text"
                      name="FirstName"
                      label="First Name"
                      value={firstName}
                      type="text"
                      id="firstName"
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                    <InputFactory
                      variant="text"
                      name="LastName"
                      label="Last Name"
                      value={lastName}
                      type="text"
                      id="lastName"
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
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
                  <div className={styles['input-container']}>
                    <InputFactory
                      variant="password"
                      name="Password"
                      label="Password"
                      type="password"
                      id="password"
                      pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      minLength={8}
                      required
                    />
                    <InputFactory
                      variant="password"
                      name="ConfirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="confirmPassword"
                      pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      minLength={8}
                      required
                    />
                  </div>
                  <p className={styles['password-note']}>
                    <strong>Note:</strong> Passwords must be at least 8
                    characters long and contain a lowercase letter, an uppercase
                    letter, a number, and a special character.
                  </p>
                  <InputFactory
                    variant="tel"
                    name="Phone"
                    label="Phone (optional)"
                    value={phone}
                    type="tel"
                    id="phone"
                    pattern="^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                    size="invisible"
                  />
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  <div className={styles['form-actions']}>
                    <Link href="/">
                      <span className={styles['register-btn']}>Cancel</span>
                    </Link>
                    <Button
                      type="submit"
                      label="Create account"
                      disabled={isSubmitting}
                      isLoading={isSubmitting}
                      loadingIndicator="Creating..."
                    />
                  </div>
                </Fieldset>
              </Form>
            )}
          </section>
        </Padding>
      </Main>
    </BaseLayout>
  );
}
