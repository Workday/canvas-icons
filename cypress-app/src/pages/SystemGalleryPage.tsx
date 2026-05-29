import {systemIconStencil} from '@workday/canvas-kit-react';
import {px2rem} from '@workday/canvas-kit-styling';
import * as systemIcons from '@workday/canvas-system-icons-web';
import {CanvasSystemIcon} from '@workday/canvas-system-icons-web';

import {IconsGallery} from '../../../packages/canvas-icons-docs/components/IconsGallery';

const icons = Object.values(systemIcons).filter(
  (value): value is (typeof systemIcons)[keyof typeof systemIcons] =>
    typeof value === 'object' && value !== null && 'svg' in value
) as CanvasSystemIcon[];

export const SystemGalleryPage = () => {
  return (
    <IconsGallery
      icons={icons}
      type="system"
      cs={{
        [systemIconStencil.vars.size]: px2rem(56),
      }}
    />
  );
};
