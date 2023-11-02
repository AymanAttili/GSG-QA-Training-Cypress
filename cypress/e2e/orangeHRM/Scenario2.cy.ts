import AddVacancyPage from "cypress/support/pageObjects/mainPages/AddVacancyPage";
import LoginPage from "cypress/support/pageObjects/mainPages/LoginPage";
import Vacancies from "cypress/support/pageObjects/mainPages/Recruitment/Vacancies";
import table from "cypress/support/pageObjects/objects/table";
import Sidebar from "cypress/support/pageObjects/subPages/Sidebar";
import { when } from "cypress/types/jquery";

const myLoginPage: LoginPage = new LoginPage();
const myAddVacancyPage: AddVacancyPage = new AddVacancyPage();
const mySideBar: Sidebar = new Sidebar();
const myVacanciesPage: Vacancies = new Vacancies();

describe('Scenario2', () => {
    before('Scenario2 (Given)',() => {
        // visiting orangeHRM website
        cy.visit("web/index.php/auth/login");

        // login
        myLoginPage.login("Admin", "admin123");

        // define a fixture contains employeeInfo
        cy.fixture("vacancyInfo").as("vacancyInfo");

        // Given The system has a vacancy record
        cy.get('@vacancyInfo').then((vacancyData: any) => {
            cy.intercept('POST','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/vacancies').as('addVacancyAPI');
            mySideBar.getPage('Recruitment').click();
            myVacanciesPage.elements.VacanciesPageBTN().click();
            myVacanciesPage.elements.addVacancyBTN().click();
            myAddVacancyPage.addVacancy(vacancyData).then((vacancyId: number) => {
                vacancyData.vacancyId = vacancyId;
                cy.writeFile('vacancyInfo.json',vacancyData);
            });
        })
    })


    it('Scenario2 (When, Then)', () => {
        cy.get('@vacancyInfo').then((vacancyData: any) => {
            // When The user opens the vacancy form on the edit mode for that vacancy
            myAddVacancyPage.visitVacancy(vacancyData.vacancyId);

            // And The user clicks on Add button in the Attachments area
            // And The user uploads a file for that vacancy and saves the form
            myAddVacancyPage.addAttachment(vacancyData.path);

            // Then The file should be uploaded and added to vacancy

            const myAttachmentsTable: table = myAddVacancyPage.createAttachmentsTable();
            const fileName = vacancyData.path.split('/').pop()
            myAttachmentsTable.checkValue(1, 'File Name', fileName);
        })
    })
})