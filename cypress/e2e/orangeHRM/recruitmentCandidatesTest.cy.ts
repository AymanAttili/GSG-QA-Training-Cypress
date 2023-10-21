import recruitment_Candidates from "cypress/support/pageObjects/mainPages/Recruitment_Candidates";
import loginPage from "../../support/pageObjects/mainPages/LoginPage";
import sidebar from "../../support/pageObjects/subPages/Sidebar";
import addCandidate from "cypress/support/addCandidateHelper";

const mySideBar: sidebar = new sidebar();
const myLoginPage: loginPage = new loginPage();
const myRecruitment_CandidatesPage: recruitment_Candidates = new recruitment_Candidates();
const myAddCandidateHelper: addCandidate = new addCandidate();


describe('recruitment pages test', () => {
    beforeEach('login and open this page', () => {
        // visiting orangeHRM website
        cy.visit("web/index.php/auth/login");

        // login
        myLoginPage.login("Admin", "admin123");

        // intercepting APIs
        myRecruitment_CandidatesPage.intercptAPI('GET','candidates','candidates')

        // define a fixture contains candidate info
        cy.fixture('candidateInfo').as('candidateInfo');
    })

    it('candidates table check', () => {
        cy.get('@candidateInfo').then((candidateData) => {
            // add candidate via API and use the response then
            myAddCandidateHelper.addCandidateViaAPI(candidateData.data)
        }).then((Cdata) =>{
            // open Recruitments-Candidates page
            mySideBar.getPage('Recruitment').click({force: true});
            myRecruitment_CandidatesPage.elements.CandidatesPageBTN().click();

            // checking if the length equals to the data came from API
            cy.wait('@candidates').then((data) => {
                const expectedLength = Math.min(50,data.response?.body.meta.total);

                const myTable = myRecruitment_CandidatesPage.createTable();
                
                for(let i=1 ; i<=expectedLength ; i++){
                    const has = await myTable.checkValue(i,'Candidate', Cdata.data.firstName + ' ' + Cdata.data.lastName)
                    console.log(has);
                    if(has){
                        console.log('true');
                    }
                    else{
                        console.log(false);
                    }
                    
                        

                    
                }
            })
        })

        

    })

})