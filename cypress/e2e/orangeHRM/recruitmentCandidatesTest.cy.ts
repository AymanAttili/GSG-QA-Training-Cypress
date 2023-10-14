import recruitment_Candidates from "cypress/support/pageObjects/mainPages/recruitment_Candidates";
import loginPage from "../../support/pageObjects/mainPages/loginPage";
import sidebar from "../../support/pageObjects/subPages/sidebar";

const mySideBar: sidebar = new sidebar();
const myLoginPage: loginPage = new loginPage();
const myRecruitment_CandidatesPage: recruitment_Candidates = new recruitment_Candidates();

let RowsNum = 0;
describe('recruitment pages test', () => {
    beforeEach('login and open this page', () => {
        // visiting orangeHRM website
        cy.visit("web/index.php/auth/login");

        // login
        myLoginPage.login("Admin", "admin123");

        // intercepting APIs
        myRecruitment_CandidatesPage.intercptAPI('GET','candidates','candidates')
    })

    it('candidates table check', () => {
        // open Recruitments-Candidates page
        mySideBar.getPage('Recruitment').click();
        myRecruitment_CandidatesPage.elements.CandidatesPageBTN().click();

        // checking if the length equals to the data came from API
        cy.wait('@candidates').then((data) => {
            const expectedLength = Math.min(50,data.response?.body.meta.total);
            myRecruitment_CandidatesPage.elements.CandidatesTable().should('have.length', expectedLength);
        })


    })

})