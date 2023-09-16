import loginPage from "../../pageObjects/loginPage";
const myLoginPage = new loginPage();
describe('Sign in', () => {
    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    })


    it('add an admin', () => {
        myLoginPage.login('Admin','admin123');
    })

    it('Forget password', ()=> {
        myLoginPage.forgetPassword('Ayman');
    })
});

