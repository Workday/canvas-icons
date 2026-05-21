import * as React from 'react';

import {Icon} from '@workday/canvas-kit-react/icon';

import * as expressiveIcons from '../../packages/canvas-expressive-icons-web/dist/es6';

const [_, ...expressiveIconNames] = Object.keys(expressiveIcons);

describe('Expressive Icons', () => {
  expressiveIconNames.forEach(name => {
    const icon = expressiveIcons[name as keyof typeof expressiveIcons] as any;

    it(`should match snapshot for ${name}`, () => {
      cy.mount(<Icon id={name} icon={icon} style={{padding: '8px'}} />);
      cy.get(`#${name}`).takeSnapshot(name);
    });
  });
});
