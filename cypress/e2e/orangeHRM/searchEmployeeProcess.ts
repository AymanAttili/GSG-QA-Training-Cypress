import loginPage from "../../support/pageObjects/mainPages/LoginPage";
import employeeSearch from "../../support/pageObjects/subPages/EmployeeSearch";
import sidebar from "../../support/pageObjects/subPages/Sidebar";

const mySideBar: sidebar = new sidebar();
const myLoginPage: loginPage= new loginPage();
const myEmployeeSearch: employeeSearch = new employeeSearch()
describe('add Employee process', () => {
    beforeEach(() => {
        // visiting orangeHRM website
        cy.visit("web/index.php/auth/login");
        
        // login
        myLoginPage.login("Admin", "admin123");
    })

    it('Employee Search form testing using UI', () => {
        mySideBar.getPage('PIM').click();
        myEmployeeSearch.searchBy([{key: 'employeeId', value:'123'},{key: 'employeeName', value: 'Ayman'}]);
    })

})