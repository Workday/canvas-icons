'use client';

import type {ReactNode} from 'react';

import {CanvasProvider} from '@workday/canvas-kit-react';

export function Providers({children}: {children: ReactNode}) {
  return <CanvasProvider>{children}</CanvasProvider>;
}
