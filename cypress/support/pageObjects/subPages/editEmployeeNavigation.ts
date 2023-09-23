class editEmployeeNavigation{
    getPage = (page:string) =>{
        return cy.get('.orangehrm-edit-employee-navigation').contains(page);
    }
}

export default editEmployeeNavigation;