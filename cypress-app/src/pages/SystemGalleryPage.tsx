import * as systemIcons from '@workday/canvas-system-icons-web';
import {CanvasSystemIcon} from '@workday/canvas-system-icons-web';

import {IconsGallery} from '../../../packages/canvas-icons-docs/components/IconsGallery';

const icons = Object.values(systemIcons).filter(
  (value): value is (typeof systemIcons)[keyof typeof systemIcons] =>
    typeof value === 'object' && value !== null && 'svg' in value && !('fallback' in value)
) as CanvasSystemIcon[];

export const SystemGalleryPage = () => {
  return (
    <main style={{padding: '2rem', fontFamily: 'system-ui, sans-serif'}}>
      <h1>System Icons</h1>
      <div data-testid="icon-gallery">
        <IconsGallery icons={icons} type="system" />
      </div>
    </main>
  );
};
