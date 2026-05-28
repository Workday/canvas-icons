declare namespace Cypress {
  interface Chainable {
    /**
     * Take a manual snapshot with Chromatic.
     * @param name Optional custom name for the snapshot.
     */
    takeSnapshot(name?: string): Chainable<any>;
  }
}
