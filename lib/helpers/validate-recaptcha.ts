export default async function verifyRecaptchaToken(token: string) {
  try {
    const secret = process.env.RECAPTCHA_SECRET_KEY;

    const fetchQuery = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );

    const apiResponse = await fetchQuery.json();

    return apiResponse?.success === true;
  } catch (error: any) {
    throw new Error('Error while verifying reCAPTCHA');
  }
}
