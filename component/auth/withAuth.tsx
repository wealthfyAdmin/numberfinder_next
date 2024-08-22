import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function withAuth(Component: React.ComponentType) {
  return function AuthenticatedComponent(props: any) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'loading') {
        // Do nothing while loading
        return;
      }
      if (!session) {
        // If not authenticated, redirect to sign-in page
        router.push('/signin');
      }
    }, [session, status, router]);

    if (status === 'loading' || !session) {
      return <div>Loading...</div>; // Show a loading state while redirecting
    }

    return <Component {...props} />;
  };
}
