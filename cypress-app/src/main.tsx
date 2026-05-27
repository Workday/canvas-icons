import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import {CanvasProvider} from '@workday/canvas-kit-react';
import '@workday/canvas-tokens-web/css/base/_variables.css';
import '@workday/canvas-tokens-web/css/brand/_variables.css';
import '@workday/canvas-tokens-web/css/component/_variables.css';
import '@workday/canvas-tokens-web/css/system/_variables.css';

import {ExpressiveGalleryPage} from './pages/ExpressiveGalleryPage';
import {SystemGalleryPage} from './pages/SystemGalleryPage';

const routes: Record<string, () => React.ReactNode> = {
  '/expressive': ExpressiveGalleryPage,
  '/system': SystemGalleryPage,
};

const Page = routes[window.location.pathname] ?? SystemGalleryPage;

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container missing in index.html');
}

createRoot(container).render(
  <StrictMode>
    <CanvasProvider>
      <main style={{padding: '2rem'}}>
        <div data-testid="icon-gallery">
          <Page />
        </div>
      </main>
    </CanvasProvider>
  </StrictMode>
);
