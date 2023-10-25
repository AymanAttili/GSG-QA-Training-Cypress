class Vacancies{
    elements = {
        VacanciesPageBTN: () => cy.get('.oxd-topbar-body-nav-tab').contains('Vacancies'),
        VacanciesTable: () => cy.get('.oxd-table-body').children(),
        addVacancyBTN: () => cy.get('[type="button"]').contains('Add')
    }
}

export default Vacancies;