class employeeDetailsPage{
    elements = {
        employeeFullName: () => cy.get('.orangehrm-edit-employee-name > .oxd-text')
    }
    
}

export default employeeDetailsPage