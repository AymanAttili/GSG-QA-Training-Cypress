import table from "cypress/support/pageObjects/objects/table";

export default class EmployeeTimesheets{


    URLs = {
        timesheetsTableData: '/web/index.php/api/v2/time/employees/timesheets/list'
    }

    private timesheetsTable: table = new table();

    createTimesheetsTable(){
        this.timesheetsTable.create(['Employee Name', 'Timesheet Period', 'Action'])
        return this.timesheetsTable;
    }
    getTimesheetsTableLength(){
        return this.timesheetsTable.getNumOfRows(this.URLs.timesheetsTableData);
    }
}