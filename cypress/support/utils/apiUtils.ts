import { addCandidatePayload } from "../API_Helpers/payloads/addCandidatePayload";
import { addCandidateResponse } from "../API_Helpers/responses/addCandidateResponse";


declare global {
    namespace Cypress {
        interface Chainable {
            addNewCandidate: (requestURL: string, candidatePayload: addCandidatePayload) => Chainable<addCandidateResponse>;
        }
    }

}


Cypress.Commands.add('addNewCandidate', (requestURL: string, candidatePayload: addCandidatePayload) => {
    return cy.api(
        {
            method: 'POST',
            url: requestURL,
            body: candidatePayload,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).its('body');
});