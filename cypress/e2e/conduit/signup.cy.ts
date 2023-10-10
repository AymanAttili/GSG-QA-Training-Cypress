import addUser from "./support/signupHelper"

describe('Signup logic', () => {
    it('Signup: user should be able to create a new user', () => {
        addUser.addNewUserViaAPI();
    })
})