import table from "../objects/table";

class Recruitment_Candidates{

    private myTable: table = new table();
    
    createTable = () => {
        this.myTable.create(['Vacancy', 'Candidate', 'Hiring Manager', 'Date of Application', 'status']);
        return this.myTable;
    }
    elements = {
        CandidatesPageBTN: () => cy.get('.oxd-topbar-body-nav-tab').contains('Candidates'),
        CandidatesTable: () => cy.get('.oxd-table-body').children(),
        addCandidateBTN: () => cy.get('[type="button"]').contains('Add')
    }

    APIs = {
        candidates : 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates?limit=50&offset=0&model=list&sortField=candidate.dateOfApplication&sortOrder=DESC'
    }


    intercptAPI = (method:string ,api:string, alias:string) => {
        return cy.intercept(
            {
                method: method,
                url: this.APIs[api],
            }
        ).as(alias);
    }
}

export default Recruitment_Candidates;