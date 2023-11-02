import BuzzPage from "cypress/support/pageObjects/mainPages/BuzzPage";
import LoginPage from "cypress/support/pageObjects/mainPages/LoginPage";

const myLoginPage: LoginPage = new LoginPage();
const myBuzzPage: BuzzPage = new BuzzPage();

describe('publish a post', () => {
    before(() => {
         // visiting orangeHRM website
        cy.visit("web/index.php/auth/login");

         // login
        myLoginPage.login("Admin", "admin123");

        // create a fixture
        cy.writeFile('../../fixtures/buzz.txt', "لا سمح الله")

    })

    it('test body', () => {
        myBuzzPage.visitPage();

        cy.readFile('../../fixtures/buzz.txt').then((buzz: any) => {
            myBuzzPage.postBuzz(buzz);
            cy.get('.orangehrm-buzz-post-body-text').contains(buzz);
        })
    })
})