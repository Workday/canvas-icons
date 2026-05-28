import * as expressiveIcons from '@workday/canvas-expressive-icons-web';
import {CanvasExpressiveIcon} from '@workday/canvas-expressive-icons-web';

const icons = Object.keys(expressiveIcons)
  .map(key => expressiveIcons[key as keyof typeof expressiveIcons])
  .filter(icon => 'svg' in icon && !('fallback' in icon)) as CanvasExpressiveIcon[];

describe('Expressive Icons', () => {
  beforeEach(() => {
    cy.visit('/expressive');
  });

  it('renders the icon gallery on the page', () => {
    cy.get('[data-testid="icon-gallery"]').should('exist');
  });

  it('all icons are rendered correctly', () => {
    icons.forEach(icon => {
      // Check that the icon is rendered
      cy.get(`.wd-expressive.wd-expressive-${icon.name}`).should('exist');

      cy.get(`.wd-expressive.wd-expressive-${icon.name} path.wd-expressive-fill`)
        .its('length')
        .should('be.greaterThan', 0);

      // Assert that there is no path with a incorrect icon color class
      cy.get(`.wd-expressive.wd-expressive-${icon.name} path`).should($paths => {
        // path must have one of the three color classes
        const colorClasses = ['wd-expressive-fill', 'wd-expressive-accent'];
        const invalidPaths = $paths
          .toArray()
          .filter(el => !colorClasses.some(cls => el.classList.contains(cls)));

        expect(invalidPaths.length).to.be.lessThan(1);
      });
    });
  });
});
