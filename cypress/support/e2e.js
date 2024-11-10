// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
import 'cypress-real-events/support';

import { faker } from '@faker-js/faker';

Cypress.on('uncaught:exception', (err) => {
    if (err.message.includes("Failed to execute 'measure' on 'Performance'")) {
        return false;
    }
});