'use client';

import {CanvasProvider} from '@workday/canvas-kit-react';

export function Providers({children}: {children: React.ReactNode}) {
  return <CanvasProvider>{children}</CanvasProvider>;
}
