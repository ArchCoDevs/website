import React from 'react';
import { SessionProvider } from 'next-auth/react';

export const withNextAuth = (Story, context) => {
  // You can customize this mock session as needed
  const mockSession = {
    expires: '1',
    user: { email: 'a@example.com', name: 'Test User' }
  };

  return (
    <SessionProvider session={mockSession}>
      <Story {...context} />
    </SessionProvider>
  );
};
