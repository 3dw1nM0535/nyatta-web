import type { PropsWithChildren } from "react";

import { Analytics } from '@vercel/analytics/react'
import { Space_Grotesk } from "next/font/google";

import Layout from "layout/index";
import AppProvider from "providers/app-provider";
import ProtectedPage from "providers/protected-page";
import Providers from "providers/root";

const space_grotesk = Space_Grotesk({
  weight: "600",
  subsets: ["latin"],
  display: "swap",
});

const AppLayout = ({ children }: PropsWithChildren) => (
  <html lang="en" className={space_grotesk.className}>
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
