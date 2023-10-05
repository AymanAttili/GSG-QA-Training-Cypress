import loginPage from "../../support/pageObjects/mainPages/loginPage";
import sidebar from "../../support/pageObjects/subPages/sidebar";
import PIMPage from "../../support/pageObjects/mainPages/PIMPage";
import addEmployeePage from "../../support/pageObjects/mainPages/addEmployeePage";
import employeeDetails_Personal from "../../support/pageObjects/employeeDetails_Personal";
import employeeDetails_Job from "../../support/pageObjects/employeeDetails_Job";
import employeeDetails_ReportTo from "../../support/pageObjects/employeeDetails_ReportTo";
import editEmployeeNavigation from "../../support/pageObjects/subPages/editEmployeeNavigation";
import employeeSearch from "../../support/pageObjects/subPages/employeeSearch";
import table from "../../support/pageObjects/objects/table";

const myEmployeeDetails_Personal: employeeDetails_Personal = new employeeDetails_Personal();
const myEmployeeDetails_Job: employeeDetails_Job = new employeeDetails_Job();
const myEmployeeDetails_ReportTo: employeeDetails_ReportTo = new employeeDetails_ReportTo();
const myEditEmployeeNavigation: editEmployeeNavigation = new editEmployeeNavigation();
const mySideBar: sidebar = new sidebar();
const myPIMPAge: PIMPage = new PIMPage();
const myLoginPage: loginPage = new loginPage();
const myAddEmployeePage: addEmployeePage = new addEmployeePage();
const myEmployeeSearch: employeeSearch = new employeeSearch();
const myTable: table = new table();
describe("Assignment 4", () => {
    // declaring global variables
    let employeeId = 1;
    beforeEach(() => {
        // visiting orangeHRM website
        cy.visit("web/index.php/auth/login");

        // login
        myLoginPage.login("Admin", "admin123");

        // declaring a fixture
        cy.fixture("employeeInfo").as("empInfo");

        // adding new employee using API
        cy.get("@empInfo").then((infoData: any) => {
            // finding emplyeeId
            mySideBar.getPage('PIM').click();
            
            myPIMPAge.elements.addBTN().click();
            myAddEmployeePage.elements.employeeId().then(($el:any) => {
                infoData.employeeId = $el[0]._value;
                cy.request({
                    method: "POST",
                    url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees",
                    body: {
                        employeeId: infoData.employeeId,
                        firstName: infoData.firstName,
                        middleName: infoData.middleName,
                        lastName: infoData.lastName,
                    },
                }).then((res) => {
                    infoData.empNumber = res.body.data.empNumber;
                    // updating empInfo to have empNumber
                    cy.writeFile('../../fixtures/employeeInfo.json', JSON.stringify(infoData));
                })

            });
        });
    });

    it("add employee informtion and check", () => {
        cy.get("@empInfo").then((infoData: any) => {
            // Checking that the name saved correctly
            cy.intercept(`https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPersonalDetails/empNumber/${infoData.empNumber}`).as('empDetails')
            cy.visit(`https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPersonalDetails/empNumber/${infoData.empNumber}`);
            cy.wait('@empDetails');
            myEmployeeDetails_Personal.elements.employeeFullName().should('have.text', `${infoData.firstName} ${infoData.lastName}`);

            // adding Job details from editJob page
            myEditEmployeeNavigation.getPage('Job').click({ force: true });
            myEmployeeDetails_Job.elements.newJobTitle().click();
            myEmployeeDetails_Job.elements.Option().eq(1).click().then(($el) => {
                infoData.jobTitle = $el[0].innerText;
            });
            myEmployeeDetails_Job.elements.newSubUnit().click();
            myEmployeeDetails_Job.elements.Option().eq(1).click().then(($el) => {
                infoData.subUnit = $el[0].innerText;
            });
            myEmployeeDetails_Job.elements.newEmploymentStatus().click();
            myEmployeeDetails_Job.elements.Option().eq(1).click().then(($el) => {
                infoData.employmentStatus = $el[0].innerText;
            });
            myEmployeeDetails_Job.elements.newJobSaveBTN().click();

            // adding supervisor from editReportTo page
            myEditEmployeeNavigation.getPage('Report-to').click({ force: true });
            myEmployeeDetails_ReportTo.elements.addSupervisorBTN().click({ force: true });
            myEmployeeDetails_ReportTo.elements.newSupervisorName().type('a');

            cy.wait(3000);
            myEmployeeDetails_ReportTo.elements.autocompleteOption().eq(0).click().then(($el) => {
                infoData.supervisor = $el[0].innerText;
                cy.writeFile('../../fixtures/employeeInfo.json', infoData);
                myEmployeeDetails_ReportTo.elements.addNewSupervisorReportingMethod().click();
                myEmployeeDetails_ReportTo.elements.selectOption().eq(1).click();
                myEmployeeDetails_ReportTo.elements.saveNewSupervisorBTN().click({ force: true });

                // search for employee by id using UI
                mySideBar.getPage('PIM').click();
                myEmployeeSearch.searchBy([{ key: "employeeId", value: infoData.employeeId }]);

                // check that values shown in table is correct
                myTable.create(['Check', 'Id', 'First (& Middle) Name', 'Last Name', 'Job Title', 'Employment Status', 'Sub Unit', 'Supervisor', 'Actions']);
                myTable.checkValue(1, 'Id', infoData.employeeId);
                myTable.checkValue(1, 'First (& Middle) Name', `${infoData.firstName} ${infoData.middleName}`);
                myTable.checkValue(1, 'Last Name', infoData.lastName);
                myTable.checkValue(1, 'Job Title', infoData.jobTitle);
                myTable.checkValue(1, 'Employment Status', infoData.employmentStatus);
                myTable.checkValue(1, 'Sub Unit', infoData.subUnit);
                myTable.checkValue(1, 'Supervisor', infoData.supervisor.split(' ')[0] + ' ' + infoData.supervisor.split(' ')[2]);
            });

        })
    });
});
