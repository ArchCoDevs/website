import appConfig from 'app-config';
import sanityQuery from 'lib/helpers/sanity-query';

export async function getStaticProps({ preview = false }) {
  const data = await sanityQuery({
    preview,
    query: `"locationsData": *[_type == "location"]`
  });

  const features = await (
    await fetch(`${process.env.KEYSTONE_API_URL}/RentalSpace/Features`, {
      headers: {
        'Content-Type': 'application/json',
        Token: process.env.SERVICE_ACCOUNT_TOKEN as string
      }
    })
  ).json();

  const usesRes = await (
    await fetch(`${process.env.KEYSTONE_API_URL}/RentalSpace/UseClass`, {
      headers: {
        'Content-Type': 'application/json',
        Token: process.env.SERVICE_ACCOUNT_TOKEN as string
      }
    })
  ).json();

  const uses = ['All types', ...usesRes];

  const locations = (
    await (
      await fetch(`${process.env.KEYSTONE_API_URL}/RentalSpace/Location`, {
        headers: {
          'Content-Type': 'application/json',
          Token: process.env.SERVICE_ACCOUNT_TOKEN as string
        }
      })
    ).json()
  ).map((location: { name: string }) => location.name);

  return {
    props: {
      ...data,
      searchOptions: {
        features,
        uses,
        locations
      }
    },
    revalidate: appConfig.defaultRevalidationSeconds.contentOnly
  };
}
