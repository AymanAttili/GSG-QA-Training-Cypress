import userInit from "./Initializers/userInit"

export const URLs = {
    users: '/api/users'
}

export default class addUser{
    static addNewUserViaAPI(){
        cy.addNewUser(URLs.users, userInit.initUser())
    }
}