import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

function JWTExpirationCheck(): JSX.Element | null {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (status === 'authenticated' && session?.expires) {
      const sessionExpiry = new Date(session.expires).getTime();
      const now = Date.now();
      const timeUntilExpiry = sessionExpiry - now;

      if (timeUntilExpiry <= 0) {
        signOut({ redirect: false }).then(() => {
          router.push('/');
        });
      } else {
        timer = setTimeout(() => {
          signOut({ redirect: false }).then(() => {
            router.push('/');
          });
        }, timeUntilExpiry);
      }
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [session?.expires, status, router]);

  return null;
}

export default JWTExpirationCheck;
