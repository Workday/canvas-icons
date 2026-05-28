import {systemIconStencil} from '@workday/canvas-kit-react';
import {cssVar, px2rem} from '@workday/canvas-kit-styling';
import * as systemIcons from '@workday/canvas-system-icons-web';
import {CanvasSystemIcon} from '@workday/canvas-system-icons-web';
import {base} from '@workday/canvas-tokens-web';

import {IconsGallery} from '../../../packages/canvas-icons-docs/components/IconsGallery';

const icons = Object.values(systemIcons).filter(
  (value): value is (typeof systemIcons)[keyof typeof systemIcons] =>
    typeof value === 'object' && value !== null && 'svg' in value && !('fallback' in value)
) as CanvasSystemIcon[];

export const SystemThemedGalleryPage = () => {
  return (
    <IconsGallery
      icons={icons}
      type="system"
      cs={{
        [systemIconStencil.vars.size]: px2rem(56),
        [systemIconStencil.vars.color]: cssVar(base.magenta600),
        [systemIconStencil.vars.accentColor]: cssVar(base.magenta900),
        [systemIconStencil.vars.backgroundColor]: cssVar(base.magenta100),
      }}
    />
  );
};
