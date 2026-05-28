describe('Expressive Icons Themed', () => {
  beforeEach(() => {
    cy.visit('/expressive-themed');
  });

  it('Themed Expressive Icon Gallery Snapshot', () => {
    cy.takeSnapshot();
  });

  it('renders the icon gallery on the page', () => {
    cy.get('[data-testid="icon-gallery"]').should('exist');
  });

  it('all icons are rendered with correct fill colors', () => {
    cy.get(`.wd-expressive path.wd-expressive-fill`).should($paths => {
      // should have correct fill color as cssVar
      const fillColor = 'var(--cnvs-base-palette-magenta-600)';
      const allHaveFillColor = Array.from($paths).every(
        path =>
          path.getAttribute('style')?.includes(`fill: ${fillColor}`) ||
          path.style.fill === fillColor
      );

      expect(allHaveFillColor).to.equal(true);
    });
  });

  it('all icons are rendered with correct accent colors', () => {
    cy.get(`.wd-expressive path.wd-expressive-accent`).should($paths => {
      // should have correct accent color as cssVar
      const accentColor = 'var(--cnvs-base-palette-magenta-200)';
      const allHaveAccentColor = Array.from($paths).every(
        path =>
          path.getAttribute('style')?.includes(`fill: ${accentColor}`) ||
          path.style.fill === accentColor
      );
      expect(allHaveAccentColor).to.equal(true);
    });
  });
});
