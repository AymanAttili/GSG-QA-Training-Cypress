import GenericFunctions from "cypress/e2e/conduit/support/genericFunctions";

export default class AddVacancyPage{
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

    addVacancy = (data: any) => {
        this.elements.vacancyName().type(data.vacancyName+ GenericFunctions.genericRandomNumber());
        this.elements.jobTitle().click();
        this.elements.selectOption().eq(1).click();
        this.elements.hiringManager().type('a');
        cy.wait(2000);
        this.elements.autocompleteOption().eq(0).click();
        this.elements.saveBTNs().eq(0).click();
    }

    addAttachment = (path: string) => {
        this.elements.addFileBTN().click();
        this.elements.fileInput().selectFile(path, {force: true});
        this.elements.saveBTNs().eq(1).click();
        this.elements.downloadFileBTNs().eq(0).click();
    }

    addVacancyWithAttachment = (data: any) => {
        this.addVacancy(data);
        this.addAttachment(data.path);
    }
}