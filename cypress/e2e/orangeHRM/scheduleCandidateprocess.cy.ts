import addCandidate from "cypress/support/addCandidateHelper";
import addCandidatePage from "cypress/support/pageObjects/mainPages/addCandidatePage";
import loginPage from "cypress/support/pageObjects/mainPages/loginPage";
import scheduleInterviewPage from "cypress/support/pageObjects/mainPages/scheduleInterviewPage";

const myAddCandidate: addCandidate = new addCandidate();
const myLoginPage: loginPage = new loginPage();
const myAddCandidatePage: addCandidatePage = new addCandidatePage();
const myScheduleInterviewPage: scheduleInterviewPage = new scheduleInterviewPage();
describe('schedule candidate', () => {

    beforeEach(() => {
        // visiting orangeHRM website
        cy.visit("web/index.php/auth/login");
        // login
        myLoginPage.login("Admin", "admin123");

        // define a fixture contains candidate info
        cy.fixture('candidateInfo').as('candidateInfo');
    })


    it('test', () => {
        // bring data from fixture
        cy.get('@candidateInfo').then((candidateData) => {
            // add candidate via API and use the response then
            myAddCandidate.addCandidateViaAPI(candidateData.data).then((res) => {
                let id = res.data.id;
                
                // change candidate status to shortlisted using API
                cy.api({
                    method: 'PUT',
                    url: `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates/${id}/shortlist`
                })

                //  // schedule an interview using UI
                cy.visit(`/web/index.php/recruitment/addCandidate/${id}`);
                myAddCandidatePage.elements.acceptBTNs().click({force: true} );
                // filling required fields
                myScheduleInterviewPage.elements.interviewTitle().type('QA');
                myScheduleInterviewPage.elements.interviewer().type('a');
                cy.wait(3000);
                myScheduleInterviewPage.elements.autocompleteOption().eq(0).click();
                myScheduleInterviewPage.elements.dateInput().type('2023-10-26');
                myScheduleInterviewPage.elements.saveBTN().click();
                //  //

                // checking that the status changed to 'interview scheduled'
                myAddCandidatePage.elements.status().should('have.text', 'Status: Interview Scheduled')
            });
        })
        
        
    })
})