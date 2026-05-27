describe('Expressive Icons', () => {
  beforeEach(() => {
    cy.visit('/expressive');
  });

  it('renders the icon gallery on the page', () => {
    cy.get('[data-testid="icon-gallery"]').should('exist');
  });
});
