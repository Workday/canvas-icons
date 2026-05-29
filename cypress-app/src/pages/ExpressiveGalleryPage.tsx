import * as expressiveIcons from '@workday/canvas-expressive-icons-web';
import {CanvasExpressiveIcon} from '@workday/canvas-expressive-icons-web';

import {IconsGallery} from '../../../packages/canvas-icons-docs/components/IconsGallery';

const icons = Object.values(expressiveIcons).filter(
  (value): value is (typeof expressiveIcons)[keyof typeof expressiveIcons] =>
    typeof value === 'object' && value !== null && 'svg' in value
) as CanvasExpressiveIcon[];

export const ExpressiveGalleryPage = () => {
  return <IconsGallery icons={icons} type="expressive" />;
};
