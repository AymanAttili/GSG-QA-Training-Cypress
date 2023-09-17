import PIMPage from "../../pageObjects/PIMPage";
import addEmployeePage from "../../pageObjects/addEmployeePage";
import employeeDetailsPage from "../../pageObjects/employeeDetailsPage";
import loginPage from "../../pageObjects/loginPage";
import sidebar from "../../pageObjects/sidebar";

const mySideBar: sidebar = new sidebar();
const myLoginPage = new loginPage();
const myPIMPAge: PIMPage = new PIMPage();
const myAddEmployeePage: addEmployeePage = new addEmployeePage();
const myEmployeeDetailsPage: employeeDetailsPage = new employeeDetailsPage();
describe('add Employee process', () => {
    beforeEach(() => {
        cy.visit(
            "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
        );
        myLoginPage.login("Admin", "admin123");
        cy.fixture('employeeInfo').as('empInfo');
    });

    it('add and check', () => {
        cy.get('@empInfo').then((infoData: any) => {
            mySideBar.getPage('PIM').click();
            myPIMPAge.elements.addBTN().click();
            myAddEmployeePage.addWithLogin(infoData.firstName, infoData.middleName, infoData.lastName, infoData.userName, infoData.password);
            cy.wait(10000);
            myEmployeeDetailsPage.elements.employeeFullName().should('have.text', 'Ayman1 Attili')
        })
    })
})