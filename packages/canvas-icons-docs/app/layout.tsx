import {Footer, Layout, Navbar} from 'nextra-theme-docs';
import 'nextra-theme-docs/style.css';
import {Head} from 'nextra/components';
import {getPageMap} from 'nextra/page-map';
import type {ReactNode} from 'react';

import '@workday/canvas-tokens-web/css/base/_variables.css';
import '@workday/canvas-tokens-web/css/brand/_variables.css';
import '@workday/canvas-tokens-web/css/components/_variables.css';
import '@workday/canvas-tokens-web/css/system/_variables.css';

import {Logo} from '../components/Logo';
import '../styles/global.css';
import {Providers} from './providers';

export default async function RootLayout({children}: {children: ReactNode}) {
  const pageMap = await getPageMap();

  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans&family=Roboto+Mono&family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Providers>
          <Layout
            pageMap={pageMap}
            navbar={<Navbar logo={<Logo />} />}
            footer={
              <Footer>
                <p>Copyright © Workday, Inc.</p>
              </Footer>
            }
            docsRepositoryBase="https://github.com/Workday/canvas-icons/tree/main/packages/canvas-icons-docs"
          >
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
