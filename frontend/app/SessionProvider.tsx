'use client';
import { Session } from 'next-auth';
import { SessionProvider as Provider } from 'next-auth/react';

type TSessionProvider = {
  children: React.ReactNode;
  session: Session | null;
}

export default function SessionProvider({children, session}: TSessionProvider) {
  return (
    <Provider session={session}>
      {children}
    </Provider>
  )
}
