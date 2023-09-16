import forgetPage from "./forgetPage";

const myForgetPage = new forgetPage();
class loginPage{
    elements = {
        userName : () => cy.get('[placeholder="Username"]'),
        password : () => cy.get('[placeholder="Password"]'),
        button: () => cy.get('button'),
        forget: () => cy.get('.orangehrm-login-forgot-header')
    }

    login(userName:string, password:string){
        this.elements.userName().type(userName);
        this.elements.password().type(userName);
        this.elements.button().click();
    }

    forgetPassword(userName:string){
        this.elements.forget().click();
        myForgetPage.typeUserName(userName);
        myForgetPage.reset();
        myForgetPage.checkReset();
    }


}

export default loginPage;