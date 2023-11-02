export default class MyTimesheetsPage{
    URLs= {
        submit: (id: number) => {return `/web/index.php/api/v2/time/timesheets/${id}`},
        editEntries: (id: number) => {return `/web/index.php/api/v2/time/timesheets/${id}/entries`},
        getId: '/web/index.php/api/v2/time/timesheets/default',
        page: '/web/index.php/time/viewMyTimesheet'
    }

    visitPage = () => {
        cy.visit(this.URLs.page);
    }

    getTimesheetId = () => {
        return cy.api({
            url: this.URLs.getId,
            method: 'GET',
            body: {}
        }).its('body').its('data').its('id')
    }

    submitTimesheetViaAPI = (id: any) => {
        return cy.api({
            method: 'PUT',
            url: this.URLs.submit(id),
            body:{
                "action":"SUBMIT"
            }
        })
    }

    editTimesheetsViaAPI = (data: any) => {
        return cy.api({
            method: 'PUT',
            url: this.URLs.editEntries(data.timesheets.id),
            body:{
                entries: data.timesheets.entries,
                deletedEntries: data.timesheets.deletedEntries
            }
        })
    }
}