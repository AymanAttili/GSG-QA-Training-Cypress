export default class addCandidatePage{
    elements = {
        acceptBTNs: () => cy.get('.oxd-button--success'),
        rejectBTN: () => cy.get('.oxd-button--danger'),
        status: () => cy.get('.orangehrm-recruitment-status > .oxd-text')
    }
}