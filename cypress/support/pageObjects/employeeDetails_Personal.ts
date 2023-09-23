class employeeDetails_Personal{
    elements = {
        employeeFullName: () => cy.get('.orangehrm-edit-employee-name > .oxd-text'),
        Id: () => cy.get(':nth-child(3) > :nth-child(1) > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input')
    }
    
}

export default employeeDetails_Personal