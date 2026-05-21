import * as React from 'react';

import {SystemIcon, systemIconStencil} from '@workday/canvas-kit-react/icon';

import * as systemIcons from '../../packages/canvas-system-icons-web/dist/es6';

const [_, __, ...systemIconNames] = Object.keys(systemIcons);

describe('System Icons', () => {
  systemIconNames.forEach(name => {
    const icon = systemIcons[name as keyof typeof systemIcons] as any;

    describe(`${name}`, () => {
      beforeEach(() => {
        cy.mount(
          <SystemIcon
            id={name}
            icon={icon}
            cs={{padding: '8px', [systemIconStencil.vars.size]: '94px'}}
          />
        );
      });

      it('should have correct class names', () => {
        cy.get(`.wd-icon-${icon.name}`).should('exist');
        cy.get(`.wd-icon-${icon.name}`).should('have.class', 'wd-icon');
      });

      it('should not have g or path with id', () => {
        cy.get(`.wd-icon-${icon.name} g`).should('not.have.attr', 'id');
        cy.get(`.wd-icon-${icon.name} path`).should('not.have.attr', 'id');
      });

      it('should not have g with class name', () => {
        cy.get(`.wd-icon-${icon.name} g`).should('not.have.class', 'Fill');
        cy.get(`.wd-icon-${icon.name} g`).should('not.have.class', 'Accent');
        cy.get(`.wd-icon-${icon.name} g`).should('not.have.class', 'Background');
      });

      it('should have correct path class names', () => {
        cy.get(`.wd-icon-${icon.name} path`).should('satisfy', $el => {
          return $el.each((el: any) => {
            expect(el.className).to.contain('Fill');
            expect(el.className).to.contain('Accent');
            expect(el.className).to.contain('Background');
          });
        });
      });

      it(`should match snapshot for ${name}`, () => {
        cy.get(`.wd-icon-${icon.name}`).takeSnapshot(name);
        cy.wait(100);
      });
    });
  });
});
