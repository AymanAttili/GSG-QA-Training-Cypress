import PIMPage from "../../pageObjects/mainPages/PIMPage";
import addEmployeePage from "../../pageObjects/mainPages/addEmployeePage";
import editEmployeeNavigation from "../../pageObjects/subPages/editEmployeeNavigation";
import employeeDetails_Job from "../../pageObjects/employeeDetails_Job";
import employeeDetails_Personal from "../../pageObjects/employeeDetails_Personal";
import employeeDetails_ReportTo from "../../pageObjects/employeeDetails_ReportTo";
import loginPage from "../../pageObjects/mainPages/loginPage";
import sidebar from "../../pageObjects/subPages/sidebar";
import table from "../../pageObjects/objects/table";

const mySideBar: sidebar = new sidebar();
const myLoginPage = new loginPage();
const myPIMPAge: PIMPage = new PIMPage();
const myAddEmployeePage: addEmployeePage = new addEmployeePage();
const myEmployeeDetails_Personal: employeeDetails_Personal = new employeeDetails_Personal();
const myEmployeeDetails_Job: employeeDetails_Job = new employeeDetails_Job();
const myEmployeeDetails_ReportTo: employeeDetails_ReportTo = new employeeDetails_ReportTo();
const myEditEmployeeNavigation: editEmployeeNavigation = new editEmployeeNavigation();
const myTable: table = new table();
describe('add Employee process', () => {
    beforeEach(() => {
        // visiting orangeHRM website
        cy.visit("web/index.php/auth/login");
        
        // login
        myLoginPage.login("Admin", "admin123");

        // declaring a fixture
        cy.fixture('employeeInfo').as('empInfo');
    });

    it('add and check', () => {
        // getting employee info from the fixture then complete
        cy.get('@empInfo').then((infoData: any) => {

            // going to add new employee page
            mySideBar.getPage('PIM').click();
            myPIMPAge.elements.addBTN().click();

            // adding new employee using UI
            myAddEmployeePage.addWithLogin(infoData.firstName, infoData.middleName, infoData.lastName, infoData.userName, infoData.password);
            cy.wait(10000);

            // Checking that the name saved correctly
            myEmployeeDetails_Personal.elements.employeeFullName().should('have.text', infoData.firstName + ' ' + infoData.lastName);

            // adding Job details from editJob page
            myEditEmployeeNavigation.getPage('Job').click({force:true});
            myEmployeeDetails_Job.elements.newJobTitle().click();
            const jobTitle = myEmployeeDetails_Job.elements.Option().eq(2).click();
            myEmployeeDetails_Job.elements.newSubUnit().click();
            const subUnit = myEmployeeDetails_Job.elements.Option().eq(2).click();
            myEmployeeDetails_Job.elements.newEmploymentStatus().click();
            const employmentStatus = myEmployeeDetails_Job.elements.Option().eq(2).click();
            myEmployeeDetails_Job.elements.newJobSaveBTN().click();


            // adding supervisor from editReportTo page
            myEditEmployeeNavigation.getPage('Report-to').click({force:true});
            myEmployeeDetails_ReportTo.elements.addSupervisorBTN().click({force:true});
            myEmployeeDetails_ReportTo.elements.newSupervisorName().type('a');
            cy.wait(3000);
            myEmployeeDetails_ReportTo.elements.autocompleteOption().eq(1).click();
            myEmployeeDetails_ReportTo.elements.addNewSupervisorReportingMethod().click();
            myEmployeeDetails_ReportTo.elements.selectOption().eq(2).click();
            myEmployeeDetails_ReportTo.elements.saveNewSupervisorBTN().click({force: true});


            // mySideBar.getPage('PIM').click();
            // myTable.create(['Id', 'First (& Middle) Name', 'Last Name', 'Job Title', 'Employment Status', 'Sub Unit', 'Supervisor', 'Actions']);


        
        })
    })

    
})