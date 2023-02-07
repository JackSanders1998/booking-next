import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "focus-visible";
import "@/styles/tailwind.css"

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
