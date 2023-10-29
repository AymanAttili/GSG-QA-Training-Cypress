import AddEmployeePage from "cypress/support/pageObjects/mainPages/AddEmployeePage";
import LoginPage from "cypress/support/pageObjects/mainPages/LoginPage";
import MyTimesheetsPage from "cypress/support/pageObjects/mainPages/Time/Timesheets/MyTimesheetsPage";
import Sidebar from "cypress/support/pageObjects/subPages/Sidebar";
import GenericFunctions from "../conduit/support/GenericFunctions";
import EmployeeTimesheets from "cypress/support/pageObjects/mainPages/Time/Timesheets/EmployeeTimesheets";
import table from "cypress/support/pageObjects/objects/table";

const myLoginPage: LoginPage = new LoginPage();
const myAddEmployeePage: AddEmployeePage = new AddEmployeePage();
const my_MyTimesheetsPage: MyTimesheetsPage = new MyTimesheetsPage();
const mySideBar: Sidebar = new Sidebar();
const myEmployeeTimesheet: EmployeeTimesheets = new EmployeeTimesheets()

describe('Create Employee with Timesheet', () => {
    before(() => {
        // visiting orangeHRM website
        cy.visit("/");

        // login
        myLoginPage.login("Admin", "admin123");

        // declaring a fixture
        cy.fixture('employeeInfo').as('empInfo');

        // Given The system has an employee with user login details
        cy.get('@empInfo').then((empData: any) => {
                myAddEmployeePage.addWithLoginViaAPI(empData).then((body: any) => {
                empData.empNumber = body.data.employee.empNumber;
                cy.writeFile('../../fixtures/employeeInfo.json', JSON.stringify(empData));
            });
        })

        myLoginPage.logout()
    })


    after('Delete employee', () => {
        cy.get('@empInfo').then((empData: any) => {
            myAddEmployeePage.deleteEmployee(empData.empNumber)
        })
    })

    it('Add timesheet to employee', () =>{
        // When The employee logs into the system
        cy.visit("/");

        // login
        cy.get('@empInfo').then((empData: any) => {
            myLoginPage.login(empData.username, empData.password);
            
            // And The employee adds the timesheet 
            my_MyTimesheetsPage.visitPage();
            my_MyTimesheetsPage.getTimesheetId().then((id: number) => {
                console.log(id)
                empData.timesheets.id = id;
                my_MyTimesheetsPage.editTimesheetsViaAPI(empData);
                my_MyTimesheetsPage.submitTimesheetViaAPI(empData.timesheets.id)
            })

            myLoginPage.logout();

            // And Login with Admin user
            cy.visit("/");
            // login
            myLoginPage.login("Admin", "admin123");

            // And Open the Employees timesheets table
            mySideBar.getPage('Time').click();
            const myTable: table = myEmployeeTimesheet.createTimesheetsTable();
            myEmployeeTimesheet.getTimesheetsTableLength().then((length) => {
                length = Math.min(50,length);

                let arr: string[] = []
                const name = empData.firstName + ' ' + empData.middleName + ' ' + empData.lastName;
                for(let i=1 ; i<= length ; i++){
                    myTable.getCellWithoutSelect(i,'Employee Name').then(($el) => {
                        const empName = $el[0].innerText;
                        if(empName === name){
                            cy.log('********Timesheet Found********')
                            return;
                        }
                    })
                }

            
            })


        })

    })
})