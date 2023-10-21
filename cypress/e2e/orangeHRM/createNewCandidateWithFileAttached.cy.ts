import addCandidatePage from "cypress/support/pageObjects/mainPages/AddCandidatePage";
import loginPage from "cypress/support/pageObjects/mainPages/LoginPage";
import recruitment_Candidates from "cypress/support/pageObjects/mainPages/Recruitment_Candidates";
import sidebar from "cypress/support/pageObjects/subPages/Sidebar";

const myRecruitment_Candidates: recruitment_Candidates = new recruitment_Candidates();
const myaddCandidatePage: addCandidatePage = new addCandidatePage();
const mySideBar: sidebar = new sidebar();
const myLoginPage: loginPage = new loginPage();
describe('upload file Example', () => {
    beforeEach(() => {
        // visiting orangeHRM website
        cy.visit("web/index.php/auth/login");

        // login
        myLoginPage.login("Admin", "admin123");

        // define a fixture contains candidate info
        cy.fixture('candidateInfo').as('candidateInfo');
    })

    it('Create candidate with file attached',() => {
        mySideBar.getPage('Recruitment').click();
        myRecruitment_Candidates.elements.addCandidateBTN().click();


        cy.get('@candidateInfo').then((candidateData) => {
            myaddCandidatePage.addCandidateWithResume(candidateData.data);
        })
    })
})