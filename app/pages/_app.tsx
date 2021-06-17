import {
  AppProps,
  ErrorComponent,
  useRouter,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
} from 'blitz';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense, useState } from 'react';
import { GlobalStyle } from 'utils/theme';
import { NotificationsContext } from 'app/core/contexts';
import { NotificationSource } from 'db';

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page);
  const router = useRouter();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      source: NotificationSource.SYSTEM,
      content: 'Test notification 1',
      createdAt: Date.now(),
      isRead: false,
    },
    {
      id: 0,
      source: NotificationSource.INVITATION,
      content: 'Test notification that is so long that it should stretch over',
      createdAt: Date.now(),
      isRead: true,
    },
  ]);

  return (
    <>
      <GlobalStyle />
      <Suspense fallback="Loading...">
        <ErrorBoundary
          FallbackComponent={RootErrorFallback}
          resetKeys={[router.asPath]}
          onReset={useQueryErrorResetBoundary().reset}
        >
          <NotificationsContext.Provider
            //@ts-ignore
            value={notifications}
          >
            {getLayout(<Component {...pageProps} />)}
          </NotificationsContext.Provider>
        </ErrorBoundary>
      </Suspense>
    </>
  );
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  const router = useRouter();
  if (error instanceof AuthenticationError) {
    router.push('/api/auth/twitter');
    resetErrorBoundary();
    return <></>;
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    );
  } else {
    return (
      <ErrorComponent
        statusCode={error.statusCode || 400}
        title={error.message || error.name}
      />
    );
  }
}
