import GenericFunctions from "cypress/e2e/conduit/support/GenericFunctions";

class AddEmployeePage{
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
    
    urls = {
        employees: '/web/index.php/api/v2/pim/employees',
        users: '/web/index.php/api/v2/admin/users'
    }


    addWithLogin = (firstName: string, middleName: string, lastName: string, userName: string, password: string) => {        
        this.actions.enterFirstName(firstName);
        this.actions.enterMiddleName(middleName);
        this.actions.enterLastName(lastName);
        this.actions.addLoginSwitch();
        this.actions.enterUsername(userName);
        this.actions.enterPassword(password);
        this.actions.enterConfirmPassword(password);
        this.actions.clickSaveBTN();
    }

    actions = {
        enterFirstName: (firstName: string) => this.elements.firstName().type(firstName),
        enterMiddleName: (middleName: string) => this.elements.middleName().type(middleName),
        enterLastName: (lastName: string) => this.elements.lastName().type(lastName),
        addLoginSwitch: () => this.elements.loginDetailsSwitch().click(),
        enterUsername: (userName: string) => this.elements.userName().type(userName),
        enterPassword: (password: string) => this.elements.password().type(password),
        enterConfirmPassword: (password: string) => this.elements.confirmPassword().type(password),
        clickSaveBTN: () => this.elements.saveBTN().click()
    }

    addViaAPI = (empData:any) => { // payload interface have to be added
        return cy.api({
            method: 'POST',
            url: this.urls.employees,
            body:{
                firstName: empData.firstName,
                middleName: empData.middleName,
                lastName: empData.lastName,
                empPicture: null,
                employeeId: `${GenericFunctions.genericRandomNumber(1000)}`
            }
        })
    }

    addWithLoginViaAPI = (empData:any) => { // payload interface have to be added
        return this.addViaAPI(empData).then((res) => {
            const empNo = res.body.data.empNumber
            console.log(empNo)
            cy.api({
                method: 'POST',
                url: this.urls.users,
                body:{
                    username: empData.username,
                    password: empData.password,
                    status: true,
                    userRoleId: 2,
                    empNumber: empNo
                }
            }).its('body');
        })
    }

    deleteEmployee = (id:number) => {
        cy.api({
            method: 'DELETE',
            url: this.urls.employees,
            body:{
                ids: [id]
            }
        })
    }
}

export default AddEmployeePage