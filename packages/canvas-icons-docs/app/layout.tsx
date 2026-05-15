import {Layout, Navbar, Footer} from 'nextra-theme-docs';
import {Head} from 'nextra/components';
import {getPageMap} from 'nextra/page-map';
import {Logo} from '../components/Logo';
import {Providers} from './providers';

import 'nextra-theme-docs/style.css';
import '../styles/global.css';
import '@workday/canvas-tokens-web/css/base/_variables.css';
import '@workday/canvas-tokens-web/css/system/_variables.css';
import '@workday/canvas-tokens-web/css/brand/_variables.css';

export default async function RootLayout({children}: {children: React.ReactNode}) {
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
