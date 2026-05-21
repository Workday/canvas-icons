import '@chromatic-com/cypress/support';
import {mount} from 'cypress/react18';

Cypress.Commands.add('mount', mount);
