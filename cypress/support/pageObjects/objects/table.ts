class table{
    private columns: Array<string> = new Array;

    create(columns:Array<string>){
        this.columns = columns;
    }

    getCell(row:number,attr:string){
        let ind = this.columns.indexOf(attr);
        
        return cy.get(`div.oxd-table-body > div:nth-child(${row}) > div > div:nth-child(${ind+2}) > div`)
    }

    checkValue(row: number, attr: string, expected: any){
        this.getCell(row, attr).should('contain.text', expected);
    }

}

export default table;