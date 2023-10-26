import PIMPage from "../../support/pageObjects/mainPages/PIMPage";
import addEmployeePage from "../../support/pageObjects/mainPages/AddEmployeePage";
import loginPage from "../../support/pageObjects/mainPages/LoginPage";
import sidebar from "../../support/pageObjects/subPages/Sidebar";

const mySideBar: sidebar = new sidebar();
const myLoginPage = new loginPage();
const myPIMPAge: PIMPage = new PIMPage();
const myAddEmployeePage: addEmployeePage = new addEmployeePage();

describe('add Employee process', () => {
    beforeEach(() => {
        // visiting orangeHRM website
        cy.visit("/");
        
        // login
        myLoginPage.login("Admin", "admin123");

        // declaring a fixture
        cy.fixture('employeeInfo').as('empInfo');
    });

    it('add employee', () => {
        // getting employee info from the fixture then complete
        cy.get('@empInfo').then((infoData: any) => {

            // going to add new employee page
            mySideBar.getPage('PIM').click();
            myPIMPAge.elements.addBTN().click();

            // adding new employee using UI
            myAddEmployeePage.addWithLogin(infoData.firstName, infoData.middleName, infoData.lastName, infoData.userName, infoData.password);
            cy.wait(10000);        
        })
    })

    
})