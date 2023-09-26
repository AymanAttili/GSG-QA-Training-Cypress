import loginPage from "../../support/pageObjects/mainPages/loginPage";
import '@shelex/cypress-allure-plugin';

const myLoginPage: loginPage = new loginPage();
describe('login home page',() => {
    beforeEach('', () => {
        cy.visit("web/index.php/auth/login");
        cy.fixture("loginCases").as("loginCases");
    })  

    it('Login using valid username and correct password', () => {
        cy.get("@loginCases").then((casesData: any) => {
            let testcase = casesData.testcases[0];
            myLoginPage.login(testcase.username,testcase.password);
            cy.url().should('eq', testcase.page)
        })
    })

    it('Login using valid username and incorrect password', () => {
        cy.get("@loginCases").then((casesData: any) => {
            let testcase = casesData.testcases[1];
            myLoginPage.login(testcase.username,testcase.password);
            myLoginPage.elements.message().should('have.text', testcase.message);
        })
    })

    it('Login using invalid username and valid password', () => {
        cy.get("@loginCases").then((casesData: any) => {
            let testcase = casesData.testcases[2];
            myLoginPage.login(testcase.username,testcase.password);
            myLoginPage.elements.message().should('have.text', testcase.message);
        })
    })

    it('Login using invalid username and invalid password', () => {
        cy.get("@loginCases").then((casesData: any) => {
            let testcase = casesData.testcases[3];
            myLoginPage.login(testcase.username,testcase.password);
            myLoginPage.elements.message().should('have.text', testcase.message);
        })
    })

    it('Login using empty username and valid/invalid password', () => {
        cy.get("@loginCases").then((casesData: any) => {
            let testcase = casesData.testcases[4];
            console.log(testcase)
            myLoginPage.login(testcase.username,testcase.password);
            myLoginPage.elements.usernameError().should('have.text', testcase.usernameError);
        })
    })

    it('Login using valid/invalid username and empty password', () => {
        cy.get("@loginCases").then((casesData: any) => {
            let testcase = casesData.testcases[5];
            console.log(testcase)
            myLoginPage.login(testcase.username,testcase.password);
            myLoginPage.elements.passwordError().should('have.text', testcase.passwordError);
        })
    })

    it('Login using empty username and empty password', () => {
        cy.get("@loginCases").then((casesData: any) => {
            let testcase = casesData.testcases[6];
            console.log(testcase)
            myLoginPage.login(testcase.username,testcase.password);
            myLoginPage.elements.usernameError().should('have.text', testcase.usernameError);
            myLoginPage.elements.passwordError().should('have.text', testcase.passwordError);
        })
    })

    it('Login using case sensetive valid username', () => {
        cy.get("@loginCases").then((casesData: any) => {
            let testcase = casesData.testcases[7];
            console.log(testcase)
            myLoginPage.login(testcase.username,testcase.password);
            cy.url().should('eq', testcase.page);
        })
    })

    it('Login using case sensetive password', () => {
        cy.get("@loginCases").then((casesData: any) => {
            let testcase = casesData.testcases[8];
            console.log(testcase)
            myLoginPage.login(testcase.username,testcase.password);
            myLoginPage.elements.message().should('have.text', testcase.message);
        })
    })

    it('Login using pre-extra spaces in a valid username', () => {
        cy.get("@loginCases").then((casesData: any) => {
            let testcase = casesData.testcases[9];
            console.log(testcase)
            myLoginPage.login(testcase.username,testcase.password);
            myLoginPage.elements.message().should('have.text', testcase.message);
        })
    })

    it('Login post-extra spaces in a valid username', () => {
        cy.get("@loginCases").then((casesData: any) => {
            let testcase = casesData.testcases[10];
            myLoginPage.login(testcase.username,testcase.password);
            myLoginPage.elements.message().should('have.text', testcase.message);
        })
    })

    it('check password is hashed', () => {
        myLoginPage.elements.password().should('have.attr','type', 'password');
    })
})