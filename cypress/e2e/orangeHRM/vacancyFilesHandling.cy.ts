import LoginPage from "cypress/support/pageObjects/mainPages/LoginPage";
import Vacancies from "cypress/support/pageObjects/mainPages/Recruitment/Vacancies";
import AddVacancyPage from "cypress/support/pageObjects/mainPages/AddVacancyPage";
import Sidebar from "cypress/support/pageObjects/subPages/Sidebar";

const myLoginPage: LoginPage = new LoginPage();
const mySideBar: Sidebar = new Sidebar();
const myVacanciesPage: Vacancies = new Vacancies();
const myAddVacancyPage: AddVacancyPage = new AddVacancyPage();


describe('Vacancy files handling', () => {
    beforeEach(() => {
        // visiting orangeHRM website
        cy.visit("web/index.php/auth/login");

        // login
        myLoginPage.login("Admin", "admin123");

        // define a fixture contains employeeInfo
        cy.fixture("vacancyInfo").as("vacancyInfo");
    })

    it('', () => {
        mySideBar.getPage('Recruitment').click();
        myVacanciesPage.elements.VacanciesPageBTN().click();
        myVacanciesPage.elements.addVacancyBTN().click();
        cy.get('@vacancyInfo').then((vacancyData) => {
            myAddVacancyPage.addVacancyWithAttachment(vacancyData)
            cy.wait(2000);
            const filePath = './cypress/downloads/Book1.xlsx'
            cy.task('convertXlsxToJSON', filePath);
        })
    })
})