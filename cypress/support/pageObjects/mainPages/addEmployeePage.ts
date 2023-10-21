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
        employees: 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees',
        users: 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/users'
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