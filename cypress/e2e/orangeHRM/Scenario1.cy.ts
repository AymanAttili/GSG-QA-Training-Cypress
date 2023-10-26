import AddEmployeePage from "cypress/support/pageObjects/mainPages/AddEmployeePage";
import AddEntitlementsPage from "cypress/support/pageObjects/mainPages/Leave/Entitlements/AddEntitlementsPage";
import ApplyLeavePage from "cypress/support/pageObjects/mainPages/Leave/ApplyLeavePage";
import LoginPage from "cypress/support/pageObjects/mainPages/LoginPage";
import LeaveListPage from "cypress/support/pageObjects/mainPages/Leave/LeaveListPage";
import Sidebar from "cypress/support/pageObjects/subPages/Sidebar";
import MyLeavePage from "cypress/support/pageObjects/mainPages/Leave/MyLeavePage";
import table from "cypress/support/pageObjects/objects/table";

const myLoginPage: LoginPage = new LoginPage();
const myAddEmployeePage: AddEmployeePage = new AddEmployeePage()
const myAddEntitlementsPage: AddEntitlementsPage = new AddEntitlementsPage();
const myApplyLeavePage: ApplyLeavePage = new ApplyLeavePage();
const myLeaveListPage: LeaveListPage = new LeaveListPage();
const mySidebar: Sidebar = new Sidebar();
const my_MyLeavePage: MyLeavePage = new MyLeavePage();
describe('Scenario1', () => {

    before('Scenario1 (Given)',() => {
        cy.log('***************Create New Employee***************')

        // visiting orangeHRM website
        cy.visit("/");
        
        // login
        myLoginPage.login("Admin", "admin123");

        // declaring a fixture
        cy.fixture('employeeInfo').as('empInfo');

        // Create Employee
        cy.get('@empInfo').then((empData: any) => {
            // Given The system has an Employee with Login Details
            myAddEmployeePage.addWithLoginViaAPI(empData).then((body: any) => {
                empData.empNumber = body.data.employee.empNumber;
                empData.username = body.data.userName;

                // And The employee has number of entitlement (by API)
                myAddEntitlementsPage.addEntitlementViaAPI(empData);

                cy.writeFile('../../fixtures/employeeInfo.json', JSON.stringify(empData));
            });
        })

        myLoginPage.logout();
    })

    it('Scenario1 (When, Then)',() => {

        cy.clearCookies()
        cy.visit("/");

        cy.get('@empInfo').then((empData: any) => {
            // When The employee login to the system
            myLoginPage.login(empData.username, empData.password);
            cy.wait(2000);
            //  And The employee requests a leave day in the future (by API)
            myApplyLeavePage.applyLeaveViaAPI(empData.leaveInfo).then((res: any) => {
                empData.leaveInfo.leaveId = res.data.id;
                cy.writeFile('../../fixtures/employeeInfo.json', JSON.stringify(empData));
            })
            .then(() => {
                myLoginPage.logout();

                // And The admin login to the system
                myLoginPage.login("Admin", "admin123");
                cy.wait(2000);

                // And The admin approves the leave request (by API)
                myLeaveListPage.approveLeaveViaAPI(empData.leaveInfo.leaveId);
            })

            myLoginPage.logout();

            // And The employee login to the system
            myLoginPage.login(empData.username, empData.password);
            cy.wait(2000);

            // And Open the My Leave page
            mySidebar.getPage('Leave').click();

            // Then The leave should exist in the records table with status Scheduled
            const myTable:table = my_MyLeavePage.createTable();
            myTable.getCell(1,'Status').should('contain.text', 'Scheduled');

        })
        
    })
})