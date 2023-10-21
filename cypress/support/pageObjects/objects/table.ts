class table{
    private columns: Array<string> = new Array;

    create(columns:Array<string>){
        this.columns = columns;
    }

    async checkValue(row:number,attr:string,expected:any){
        let ind = this.columns.indexOf(attr);
        
        cy.get(`div.oxd-table-body > div:nth-child(${row}) > div > div:nth-child(${ind+2}) > div`).then(($el) => {
            const text = $el[0].innerText
            return text == expected
        });
        
    }

}

export default table;