'use client';

import {capitalCase} from 'change-case-all';

import {CanvasExpressiveIcon} from '@workday/canvas-expressive-icons-web';
import {ExpressiveIcon, SystemIcon} from '@workday/canvas-kit-react/icon';
import {createStencil} from '@workday/canvas-kit-styling';
import {CanvasSystemIcon} from '@workday/canvas-system-icons-web';
import {system} from '@workday/canvas-tokens-web';

type IconsGalleryProps = {
  icons: (CanvasSystemIcon | CanvasExpressiveIcon)[];
  type: 'system' | 'expressive';
};

const galleryStyles = createStencil({
  parts: {
    iconCard: 'gallery-icon-card',
  },
  base: ({iconCardPart}) => ({
    display: 'grid',
    gap: system.gap.md,
    [iconCardPart]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: system.gap.md,
      padding: system.padding.md,
      border: `1px solid transparent`,
      borderRadius: system.shape.md,
      span: {
        ...system.type.subtext.md,
        textAlign: 'center',
      },
      '&:hover': {
        backgroundColor: system.color.surface.alt.default,
        cursor: 'pointer',
        borderColor: system.color.border.default,
      },
      '&[aria-selected="true"]': {
        backgroundColor: system.color.surface.alt.default,
        borderColor: system.color.border.default,
      },
    },
  }),
  modifiers: {
    type: {
      system: {
        gridTemplateColumns: 'repeat(auto-fill, minmax(7rem, 1fr))',
      },
      expressive: {
        gridTemplateColumns: 'repeat(auto-fill, minmax(9rem, 1fr))',
      },
    },
  },
});

export const IconsGallery = ({icons, type}: IconsGalleryProps) => {
  return (
    <div {...galleryStyles({type})}>
      {icons.map(icon => (
        <div key={icon.name} {...galleryStyles.parts.iconCard}>
          {icon.type === 'system' ? <SystemIcon icon={icon} /> : <ExpressiveIcon icon={icon} />}
          <span>{capitalCase(icon.name)}</span>
        </div>
      ))}
    </div>
  );
};
