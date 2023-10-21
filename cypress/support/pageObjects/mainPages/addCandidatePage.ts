export default class AddCandidatePage{
    elements = {
        firstName: () => cy.get('.orangehrm-firstname'),
        middleName: () => cy.get('.orangehrm-middlename'),
        lastName: () => cy.get('.orangehrm-lastname'),
        email: () => cy.get(('[placeholder = "Type here"]')).eq(0),
        saveBTN: () => cy.get('button').contains('Save'),
        CancelBTN: () => cy.get('button').contains('Cancel'),
        editBTN: () => cy.get('[type = "checkbox"]'),
        resumeInput: () => cy.get('[type = "file"]'),
        resumeLabel: () => cy.get(`[title = "${this.fileName}"]`),// I think this is horrible but it's ok
        vacancySelect: () => cy.get('.oxd-select-text'),
        selectOption: () => cy.get('.oxd-select-option'),
        acceptBTNs: () => cy.get('.oxd-button--success'),
        rejectBTN: () => cy.get('.oxd-button--danger'),
        status: () => cy.get('.orangehrm-recruitment-status > .oxd-text')
    }

    private fileName = '';

    addResume = (path:string) => {
        return this.elements.resumeInput().selectFile(path, {force:true})
    }

    addCandidateWithResume = (candidate:any) => {
        this.elements.firstName().type(candidate.firstName).should('have.value', candidate.firstName);
        this.elements.lastName().type(candidate.lastName).should('have.value', candidate.lastName);
        this.elements.vacancySelect().click();
        this.elements.selectOption().eq(1).click();
        this.elements.email().type(candidate.email).should('have.value', candidate.email);;
        
        
        this.addResume(candidate.resumePath).then(() => {
            this.elements.saveBTN().click();

            // finding uploaded file name
            this.fileName = candidate.resumePath.split('/')[candidate.resumePath.split('/').length -1]

            // two assertions in one command
            this.elements.resumeLabel().should('have.text', this.fileName + ' ');
        })
        
    }



}