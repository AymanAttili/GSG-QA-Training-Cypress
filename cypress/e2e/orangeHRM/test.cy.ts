import loginPage from "../../support/pageObjects/mainPages/loginPage";

const myLoginPage = new loginPage();
describe("Sign in", () => {
    beforeEach(() => {
        cy.visit(
            "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
        );
        myLoginPage.login("Admin", "admin123");
    });

    it("add an admin", () => {
        myLoginPage.login("Admin", "admin123");
    });

    it("Forget password", () => {
        myLoginPage.forgetPassword("Ayman");
    });

    it("Verify Login Response", () => {
        cy.request(
            "web/index.php/api/v2/dashboard/employees/locations"
        ).then((response) => {
            expect(response).property("status").to.equal(200);
        });
    });

    it("Verify Add/Delete User", () => {
        cy.request({
            method: "POST",
            url: "web/index.php/api/v2/admin/users",
            body: {
                username: "3llawi11",
                password: "3llawi1",
                status: true,
                userRoleId: 1,
                empNumber: 55,
            },
        })
        .then((response) => {

            const adminId = response.body.data.id;
            
            cy.request({
                method: "DELETE",
                url: "web/index.php/api/v2/admin/users",
                body: {
                    ids: [adminId]
                }
            }).then((response) => {
                expect(response).property("status").to.equal(200);
            });
        });
        
    });

    it("Verify Delete first User", () => {
        let first;
        cy.request({
            method: "GET",
            url: "web/index.php/api/v2/admin/users?limit=50&offset=0&sortField=u.userName&sortOrder=ASC",
        }).then((response) => {
            return response.body.data[1].id;
            
        }).then((first)=>{
            cy.request({
                method: "DELETE",
                url: "web/index.php/api/v2/admin/users",
                body: {
                    ids: [first]
                }
            }).then((response) => {
                expect(response).property("status").to.equal(200);
            });
        })
    });

    it.only('', () => {
        cy.api({
            method: "DELETE",
            url: "web/index.php/api/v2/admin/users",
            body: {
                ids: [123]
            }
        })
    })
});