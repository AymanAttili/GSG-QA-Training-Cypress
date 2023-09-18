class employeeDetails_Job{
    elements = {
        jobTitle: () => cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text-input'),
        employmentStatus: () => cy.get(':nth-child(7) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text-input'),
        subUnit: () => cy.get(':nth-child(5) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text-input'),
        newJobTitle: () => cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text'),
        newEmploymentStatus: () => cy.get(':nth-child(7) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text'),
        newSubUnit: () => cy.get(':nth-child(5) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text'),
        newJobSaveBTN: () => cy.get(':nth-child(1) > .oxd-form > .oxd-form-actions > .oxd-button'),
        Option: () => cy.get('.oxd-select-option'),
    }
    
}

export default employeeDetails_Job