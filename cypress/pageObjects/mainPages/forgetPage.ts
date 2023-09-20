import resetConfirmation from "./resetConfimation";

const myResetConfirmation = new resetConfirmation();
class forgetPage{
    elements={
        userName: ()=> cy.get('[placeholder="Username"]'),
        cancelBTN: ()=> cy.get('.orangehrm-forgot-password-button--cancel'),
        resetBTN: ()=> cy.get('.orangehrm-forgot-password-button--reset'),
    }

    typeUserName(name:string){
        this.elements.userName().type(name).should('have.value', name);;
    }

    cancel(){
        this.elements.cancelBTN().click();
    }

    reset(){
        this.elements.resetBTN().click();
    }

    checkReset(){
        myResetConfirmation.elements.title().should('contain','Reset Password link sent successfully');
        
    }
}

export default forgetPage;