import table from "../../objects/table";

export default class MyLeavePage{
    private myTable: table = new table();
    
    createTable = () => {
        this.myTable.create(['Date', 'Employee Name', 'Leave Type','Leave Balance (Days)', 'Number of Days','Status', 'Comments']);
        return this.myTable;
    }

    
}