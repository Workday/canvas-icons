import * as systemIcons from '@workday/canvas-system-icons-web';
import {CanvasSystemIcon} from '@workday/canvas-system-icons-web';

const icons = Object.keys(systemIcons)
  .map(key => systemIcons[key as keyof typeof systemIcons])
  .filter(icon => 'svg' in icon && !('fallback' in icon)) as CanvasSystemIcon[];

describe('System Icons', () => {
  beforeEach(() => {
    cy.visit('/system');
  });

  it('renders the icon gallery on the page', () => {
    cy.get('[data-testid="icon-gallery"]').should('exist');
  });

  it('all icons are rendered correctly', () => {
    icons.forEach(icon => {
      // Check that the icon is rendered
      cy.get(`.wd-icon.wd-icon-${icon.name}`).should('exist');

      // Check that at least one path element with class 'wd-icon-fill' exists
      cy.get(`.wd-icon.wd-icon-${icon.name} path.wd-icon-fill`)
        .its('length')
        .should('be.greaterThan', 0);

      // Assert that there is no path with a incorrect icon color class
      cy.get(`.wd-icon.wd-icon-${icon.name} path`).should($paths => {
        // path must have one of the three color classes
        const colorClasses = ['wd-icon-fill', 'wd-icon-accent', 'wd-icon-background'];
        const invalidPaths = $paths
          .toArray()
          .filter(el => !colorClasses.some(cls => el.classList.contains(cls)));

        expect(invalidPaths.length).to.be.lessThan(1);
      });
    });
  });
});
