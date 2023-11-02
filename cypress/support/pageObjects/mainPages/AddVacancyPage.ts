import GenericFunctions from "cypress/e2e/conduit/support/GenericFunctions";
import table from "../objects/table";

export default class AddVacancyPage{

    private attachmentsTable: table = new table();

    createAttachmentsTable = () => {
        this.attachmentsTable.create(['File Name', 'File Size', 'File Type', 'Comment']);
        return this.attachmentsTable;
    }

    elements = {
        vacancyName: () => cy.get('.oxd-form > :nth-child(1) > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input'),
        jobTitle: () => cy.get('.oxd-select-text'),
        saveBTNs: () => cy.get('[type = submit]'),
        CancelBTNs: () => cy.get('button').contains('Cancel'),
        addFileBTN: () => cy.get('.orangehrm-header-container > .oxd-button'),
        downloadFileBTNs: () => cy.get('.oxd-table-cell-actions > :nth-child(2)'),
        fileInput: () => cy.get('[type = "file"]'),
        hiringManager: () => cy.get('.oxd-autocomplete-text-input > input'),
        selectOption: () => cy.get('.oxd-select-option'),
        autocompleteOption: () => cy.get('.oxd-autocomplete-option'),
    }

    URLs = {
        vacancies: 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/vacancies',
        visitPage: (id: number) => {return `/web/index.php/recruitment/addJobVacancy/${id}`}
    }

    addVacancy = (data: any) => {
        this.elements.vacancyName().type(data.vacancyName+ GenericFunctions.genericRandomNumber());
        this.elements.jobTitle().click();
        this.elements.selectOption().eq(1).click();
        this.elements.hiringManager().type('a');
        cy.wait(2000);
        this.elements.autocompleteOption().eq(0).click();
        this.elements.saveBTNs().eq(0).click();
        cy.wait(2000);

        return cy.get('@addVacancyAPI').its('response.body.data.id')
    }

    addAttachment = (path: string) => {
        this.elements.addFileBTN().click();
        this.elements.fileInput().selectFile(path, {force: true});
        this.elements.saveBTNs().eq(1).click();

        // Download the file to guarantee it's uploaded successfuly
        this.elements.downloadFileBTNs().eq(0).click();
    }

    addVacancyWithAttachment = (data: any) => {
        this.addVacancy(data);
        this.addAttachment(data.path);
    }

    visitVacancy = (id: number) => {
        cy.visit(this.URLs.visitPage(id));
    }
}