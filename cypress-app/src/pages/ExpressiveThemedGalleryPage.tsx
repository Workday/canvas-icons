import * as expressiveIcons from '@workday/canvas-expressive-icons-web';
import {CanvasExpressiveIcon} from '@workday/canvas-expressive-icons-web';
import {expressiveIconStencil} from '@workday/canvas-kit-react';
import {cssVar} from '@workday/canvas-kit-styling';
import {base} from '@workday/canvas-tokens-web';

import {IconsGallery} from '../../../packages/canvas-icons-docs/components/IconsGallery';

const icons = Object.values(expressiveIcons).filter(
  (value): value is (typeof expressiveIcons)[keyof typeof expressiveIcons] =>
    typeof value === 'object' && value !== null && 'svg' in value
) as CanvasExpressiveIcon[];

export const ExpressiveThemedGalleryPage = () => {
  return (
    <IconsGallery
      icons={icons}
      type="expressive"
      cs={{
        [expressiveIconStencil.vars.color]: cssVar(base.magenta600),
        [expressiveIconStencil.vars.accentColor]: cssVar(base.magenta200),
      }}
    />
  );
};
