class addEmployeePage{
    elements = {
        saveBTN: () => cy.get('button').contains('Save'),
        CancelBTN: () => cy.get('button').contains('Cancel'),
        firstName: () => cy.get('[placeholder = "First Name"]'),
        middleName: () => cy.get('[placeholder = "Middle Name"]'),
        lastName: () => cy.get('[placeholder = "Last Name"]'),
        employeeId: () => cy.get(':nth-child(1) > .oxd-grid-2 > .oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-input'),
        loginDetailsSwitch: () => cy.get('.oxd-switch-input'),
        userName: () => cy.get(':nth-child(4) > .oxd-grid-2 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input'),
        password: () => cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input'),
        confirmPassword: () => cy.get('.oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input')
    }


    addWithLogin = (firstName: string, middleName: string, lastName: string, userName: string, password: string) => {
        this.elements.firstName().type(firstName);
        this.elements.middleName().type(middleName);
        this.elements.lastName().type(lastName);
        this.elements.loginDetailsSwitch().click();
        this.elements.userName().type(userName);
        this.elements.password().type(password);
        this.elements.confirmPassword().type(password);
        this.elements.saveBTN().click();
    }
}

export default addEmployeePage