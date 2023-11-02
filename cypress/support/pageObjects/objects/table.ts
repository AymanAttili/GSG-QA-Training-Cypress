class table{
    private columns: Array<string> = new Array;

    create(columns:Array<string>){
        this.columns = columns;
    }

    getNumOfRows(url: string){
        return cy.api({
            url: url,
            method: 'GET',
            body: {}
        }).its('body').its('meta').its('total');
    }

    getCellWithSelect(row:number,attr:string){
        let ind = this.columns.indexOf(attr);
        
        return cy.get(`div.oxd-table-body > div:nth-child(${row}) > div > div:nth-child(${ind+2}) > div`)
    }

    getCellWithoutSelect(row:number,attr:string){
        let ind = this.columns.indexOf(attr);
        
        return cy.get(`div.oxd-table-body > div:nth-child(${row}) > div > div:nth-child(${ind+1}) > div`)
    }

    checkValue(row: number, attr: string, expected: any){
        this.getCellWithSelect(row, attr).should('contain.text', expected);
    }

}

export default table;