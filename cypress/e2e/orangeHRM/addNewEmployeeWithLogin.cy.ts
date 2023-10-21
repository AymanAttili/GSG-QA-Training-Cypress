import addEmployeePage from "cypress/support/pageObjects/mainPages/AddEmployeePage";
import loginPage from "cypress/support/pageObjects/mainPages/LoginPage";

const myAddEmployeePage: addEmployeePage = new addEmployeePage();
const myLoginPage: loginPage = new loginPage();
describe('add new Employee with login', () => {
    beforeEach(() => {
         // visiting orangeHRM website
        cy.visit("web/index.php/auth/login");

         // login
        myLoginPage.login("Admin", "admin123");

        // define a fixture contains employeeInfo
        cy.fixture("employeeInfo").as("empInfo");
    })

    // afterEach(() => { // I have a problem here
    //     cy.get('@empInfo').then((empData: any) => {
    //         cy.visit("web/index.php/auth/login");

    //         // login
    //         myLoginPage.login("Admin", "admin123");
    //         myAddEmployeePage.deleteEmployee(empData.id)
    //     })
    // })


    it('add new Employee with login via API', () => {
        cy.get('@empInfo').then((empData: any) => {
            myAddEmployeePage.addWithLoginViaAPI(empData).then((res: any) => {
                empData.id = res.data.id;
                empData.username = res.data.userName;
                cy.writeFile('../../fixtures/employeeInfo.json', JSON.stringify(empData));
                myLoginPage.logout();
                cy.visit("web/index.php/auth/login");
                myLoginPage.login(empData.username, empData.password);
            });
            
        })
        
    });
})