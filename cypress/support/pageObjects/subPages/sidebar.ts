class Sidebar{
    getPage = (page:string) =>{
        return cy.get('.oxd-main-menu').contains(page);
    }
    
}
export default Sidebar;