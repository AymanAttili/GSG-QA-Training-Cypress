export default class LeaveListPage{
    URLs = {
        leaveAction: (id: number) => {return `/web/index.php/api/v2/leave/employees/leave-requests/${id}`} 
    }

    approveLeaveViaAPI = (leaveId: number) => {
        return cy.api({
            method: 'PUT',
            url: this.URLs.leaveAction(leaveId),
            body:{
                action: "APPROVE"
            }
        }).its('body')
    }
}