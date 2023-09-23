class employeeDetails_ReportTo{
    elements = {
        supervisor: () => cy.get(':nth-child(2) > .orangehrm-container > .oxd-table > .oxd-table-body > .oxd-table-card > .oxd-table-row > :nth-child(1) > div'),
        addSupervisorBTN: () => cy.get(':nth-child(2) > :nth-child(1) > .orangehrm-action-header > .oxd-button'),
        newSupervisorName: () => cy.get('.oxd-autocomplete-text-input > input'),
        saveNewSupervisorBTN: () => cy.get(':nth-child(2) > .orangehrm-top-padding > .oxd-form > .oxd-form-actions > .oxd-button--secondary'),
        addNewSupervisorReportingMethod: () => cy.get(':nth-child(2) > .orangehrm-top-padding > .oxd-form > .oxd-form-row > .oxd-grid-3 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text'),
        autocompleteOption: () => cy.get('.oxd-autocomplete-option'),
        selectOption: () => cy.get('.oxd-select-option')
        }
    
}

export default employeeDetails_ReportTo