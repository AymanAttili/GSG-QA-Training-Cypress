import { userAPIPayload } from "../payloads/userAPIPayload";
import { userAPIResponse } from "../responses/userAPIResponse";


declare global {
    namespace Cypress {
        interface Chainable {
            addNewUser: (requestURL: string, userPayload: userAPIPayload) => Chainable<userAPIResponse>;
        }
    }

}


Cypress.Commands.add('addNewUser', (requestURL: string, userPayload: userAPIPayload) => {
    return cy.api(
        {
            method: 'POST',
            url: requestURL,
            body: userPayload,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).its('body');
});