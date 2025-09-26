import { signIn } from 'next-auth/react';

export const toggleFavourite = (session: {
  status: string;
  update?: () => void;
}) => {
  return async (rental_space_id: number, favourite: boolean) => {
    if (session.status !== 'authenticated') {
      signIn(undefined, { callbackUrl: window.location.href });
      return;
    }
    try {
      const request = await fetch(
        `/api/proxy/User/Favourite?RentalSpaceId=${rental_space_id}&Add=${favourite}`,
        {
          method: 'POST'
        }
      );
      const response = await request.json();

      session.update && session.update();
      console.log('Response:', response);
    } catch (error) {
      console.error('Error:', error);
    }
  };
};

export default toggleFavourite;
