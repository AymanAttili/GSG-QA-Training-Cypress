import loginPage from "../../pageObjects/mainPages/loginPage";

const myLoginPage: loginPage = new loginPage();
describe('login page test',() => {
    beforeEach('', () => {
        cy.visit("web/index.php/auth/login");
        cy.fixture("loginCases").as("loginCases");
    })  

    it('happy :) ', () => {
    
        cy.get("@loginCases").then((casesData: any) => {
            let testcase = casesData.testcases[0];
            console.log(testcase)
            myLoginPage.login(testcase.username,testcase.password);
            cy.url().should('eq', testcase.page)
        })
    })
})