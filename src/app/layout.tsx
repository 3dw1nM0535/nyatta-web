import type { PropsWithChildren } from "react";

import Layout from "@layout";
import { Analytics } from '@vercel/analytics/react'
import { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

import AppProvider from "providers/app-provider";
import ProtectedPage from "providers/protected-page";
import Providers from "providers/root";

export const metadata: Metadata = {
  title: "Nyatta - Find local rental homes",
};

const ibm = Space_Grotesk({
  weight: "600",
  subsets: ["latin"],
  display: "swap",
});

const AppLayout = ({ children }: PropsWithChildren) => (
  <html lang="en" className={ibm.className}>
    <body>
      <Providers>
        <AppProvider>
          <Layout>
            {process.env.NEXT_PUBLIC_ENV === 'production' && <Analytics />}
            <ProtectedPage>{children}</ProtectedPage>
          </Layout>
        </AppProvider>
      </Providers>
    </body>
  </html>
);

export default AppLayout;
